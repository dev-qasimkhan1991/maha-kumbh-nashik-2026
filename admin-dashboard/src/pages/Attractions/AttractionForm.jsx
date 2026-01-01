import './AttractionForm.css';

import React, { useState } from 'react';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import {
  ATTRACTION_CATEGORIES,
  CROWD_LEVELS,
} from '../../config/constants';
import { attractionService } from '../../services/attractionService';

const AttractionForm = ({ onSuccess, onError, editData = null }) => {
  const [form, setForm] = useState(editData || {
    name: '',
    category: 'religious',
    description: '',
    history: '',
    mythology: '',
    culturalSignificance: '',
    address: '',
    latitude: '',
    longitude: '',
    crowdLevel: 'medium',
    phone: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.latitude) newErrors.latitude = 'Latitude is required';
    if (!form.longitude) newErrors.longitude = 'Longitude is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        location: {
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude)
        }
      };

      if (editData) {
        await attractionService.update(editData._id, payload);
      } else {
        await attractionService.create(payload);
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
    <form onSubmit={handleSubmit} className="attraction-form">
      <Input
        label="Attraction Name"
        type="text"
        name="name"
        placeholder="e.g., Trimbakeshwar Temple"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        options={ATTRACTION_CATEGORIES}
      />

      <div className="form-group-textarea">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          placeholder="Brief description of the attraction"
          value={form.description}
          onChange={handleChange}
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          rows="3"
          required
        ></textarea>
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group-textarea">
        <label className="form-label">History</label>
        <textarea
          name="history"
          placeholder="Historical background"
          value={form.history}
          onChange={handleChange}
          className="form-textarea"
          rows="3"
        ></textarea>
      </div>

      <div className="form-group-textarea">
        <label className="form-label">Mythology</label>
        <textarea
          name="mythology"
          placeholder="Mythological significance"
          value={form.mythology}
          onChange={handleChange}
          className="form-textarea"
          rows="3"
        ></textarea>
      </div>

      <div className="form-group-textarea">
        <label className="form-label">Cultural Significance</label>
        <textarea
          name="culturalSignificance"
          placeholder="Cultural importance"
          value={form.culturalSignificance}
          onChange={handleChange}
          className="form-textarea"
          rows="2"
        ></textarea>
      </div>

      <Input
        label="Address"
        type="text"
        name="address"
        placeholder="Full address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <div className="form-row">
        <Input
          label="Latitude"
          type="number"
          name="latitude"
          placeholder="19.8965"
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
          placeholder="73.7853"
          step="0.0001"
          value={form.longitude}
          onChange={handleChange}
          error={errors.longitude}
          required
        />
      </div>

      <div className="form-row">
        <Input
          label="Phone"
          type="tel"
          name="phone"
          placeholder="Contact number"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="contact@example.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <Select
        label="Crowd Level"
        name="crowdLevel"
        value={form.crowdLevel}
        onChange={handleChange}
        options={CROWD_LEVELS}
      />

      <div className="form-actions">
        <Button 
          type="submit" 
          variant="primary"
          loading={loading}
        >
          {editData ? 'Update' : 'Create'} Attraction
        </Button>
      </div>
    </form>
  );
};

export default AttractionForm;