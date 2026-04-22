import { useState } from 'react';
import type { Restaurant } from './types';
import { RestaurantList } from './RestaurantList';
import { RestaurantForm } from './RestaurantForm';
import './App.css';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setSelectedRestaurant(null);
    setFormVisible(true);
  };

  const handleEdit = (restaurant: Restaurant | null) => {
    setSelectedRestaurant(restaurant);
    setFormVisible(true);
  };

  const handleSave = () => {
    setFormVisible(false);
    setRefreshKey((key) => key + 1);
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Restaurant Manager</h1>
        <p>Manage restaurants with React and NestJS.</p>
      </header>

      {formVisible ? (
        <RestaurantForm restaurant={selectedRestaurant} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <RestaurantList key={refreshKey} onEdit={handleEdit} />
      )}

      {!formVisible && (
        <div className="action-bar">
          <button onClick={handleAdd}>Add New Restaurant</button>
        </div>
      )}
    </div>
  );
}

export default App;
