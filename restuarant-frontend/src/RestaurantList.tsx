import { useEffect, useState } from 'react';
import type { Restaurant } from './types';
import { restaurantApi } from './api';

interface RestaurantListProps {
  onEdit: (restaurant: Restaurant | null) => void;
}

export function RestaurantList({ onEdit }: RestaurantListProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantApi.getAll();
      setRestaurants(response.data);
    } catch (err) {
      setError('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await restaurantApi.delete(id);
        setRestaurants(restaurants.filter(r => r.id !== id));
      } catch (err) {
        setError('Failed to delete restaurant');
      }
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="restaurant-list">
      <div className="list-header">
        <h2>Restaurants</h2>
        <button className="primary-button" onClick={() => onEdit(null)}>
          Add New Restaurant
        </button>
      </div>

      {restaurants.length === 0 ? (
        <p>No restaurants found yet.</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="restaurant-card">
              <div>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.location}</p>
                <p>Status: {restaurant.active ? 'Open' : 'Closed'}</p>
              </div>
              <div className="card-actions">
                <button onClick={() => onEdit(restaurant)}>Edit</button>
                <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}