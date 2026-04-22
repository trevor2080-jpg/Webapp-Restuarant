import type { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import type { Restaurant, CreateRestaurantDto, UpdateRestaurantDto } from './types';
import { restaurantApi } from './api';

interface RestaurantFormProps {
  restaurant: Restaurant | null;
  onSave: () => void;
  onCancel: () => void;
}

export function RestaurantForm({ restaurant, onSave, onCancel }: RestaurantFormProps) {
  const [formData, setFormData] = useState<CreateRestaurantDto>({
    name: '',
    location: '',
    active: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        location: restaurant.location,
        active: restaurant.active,
      });
    } else {
      setFormData({
        name: '',
        location: '',
        active: true,
      });
    }
  }, [restaurant]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (restaurant) {
        await restaurantApi.update(restaurant.id, formData as UpdateRestaurantDto);
      } else {
        await restaurantApi.create(formData);
      }
      onSave();
    } catch (err) {
      setError('Failed to save restaurant. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{restaurant ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}