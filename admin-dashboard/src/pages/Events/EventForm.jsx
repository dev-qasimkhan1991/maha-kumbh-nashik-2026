import './EventForm.css';

import React, { useState } from 'react';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { EVENT_CATEGORIES } from '../../config/constants';
import { eventService } from '../../services/eventService';

const EventForm = ({ onSuccess, onError, editData = null }) => {
  const [form, setForm] = useState(editData || {
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'ritual',
    latitude: '',
    longitude: '',
    address: '',
    capacity: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) {
      newErrors.title = 'Event title is required';
    }
    if (!form.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!form.date) {
      newErrors.date = 'Date is required';
    }
    if (!form.latitude) {
      newErrors.latitude = 'Latitude is required';
    }
    if (!form.longitude) {
      newErrors.longitude = 'Longitude is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        capacity: parseInt(form.capacity) || 0,
        location: {
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          address: form.address
        }
      };

      if (editData) {
        await eventService.update(editData._id, payload);
      } else {
        await eventService.create(payload);
      }
      
      onSuccess();
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <Input
        label="Event Title"
        type="text"
        name="title"
        placeholder="Enter event title"
        value={form.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <div className="form-group-textarea">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          placeholder="Enter event description"
          value={form.description}
          onChange={handleChange}
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          rows="4"
          required
        ></textarea>
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-row">
        <Input
          label="Date"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          error={errors.date}
          required
        />
        <Input
          label="Time"
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
      </div>

      <Select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        options={EVENT_CATEGORIES}
      />

      <Input
        label="Address"
        type="text"
        name="address"
        placeholder="Enter location address"
        value={form.address}
        onChange={handleChange}
      />

      <div className="form-row">
        <Input
          label="Latitude"
          type="number"
          name="latitude"
          placeholder="e.g., 19.8965"
          step="0.0001"
          value={form.latitude}
          onChange={handleChange}
          error={errors.latitude}
          required
        />
        <Input
          label="Longitude"
          type="number"
          name="longitude"
          placeholder="e.g., 73.7853"
          step="0.0001"
          value={form.longitude}
          onChange={handleChange}
          error={errors.longitude}
          required
        />
      </div>

      <Input
        label="Expected Capacity (People)"
        type="number"
        name="capacity"
        placeholder="e.g., 50000"
        value={form.capacity}
        onChange={handleChange}
      />

      <div className="form-actions">
        <Button 
          type="submit" 
          variant="primary"
          loading={loading}
        >
          {editData ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;