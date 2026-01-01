import './AccommodationForm.css';

import React, { useState } from 'react';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { ACCOMMODATION_TYPES } from '../../config/constants';
import { accommodationService } from '../../services/accommodationService';

const AccommodationForm = ({ onSuccess, onError, editData = null }) => {
  const [form, setForm] = useState(editData || {
    name: '',
    type: 'hotel',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    latitude: '',
    longitude: '',
    pricePerNight: '',
    totalRooms: '',
    totalCapacity: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!form.latitude) newErrors.latitude = 'Latitude is required';
    if (!form.longitude) newErrors.longitude = 'Longitude is required';
    if (!form.pricePerNight) newErrors.pricePerNight = 'Price is required';
    if (!form.totalRooms) newErrors.totalRooms = 'Number of rooms is required';

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
        },
        pricePerNight: parseFloat(form.pricePerNight),
        totalRooms: parseInt(form.totalRooms),
        totalCapacity: parseInt(form.totalCapacity)
      };

      if (editData) {
        await accommodationService.update(editData._id, payload);
      } else {
        await accommodationService.create(payload);
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
    <form onSubmit={handleSubmit} className="accommodation-form">
      <Input
        label="Accommodation Name"
        type="text"
        name="name"
        placeholder="e.g., Grand Hotel Nashik"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Select
        label="Type"
        name="type"
        value={form.type}
        onChange={handleChange}
        options={ACCOMMODATION_TYPES}
      />

      <div className="form-group-textarea">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
          className="form-textarea"
          rows="3"
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
          label="Phone"
          type="tel"
          name="phone"
          placeholder="10-digit phone number"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          required
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

      <Input
        label="Website"
        type="url"
        name="website"
        placeholder="https://example.com"
        value={form.website}
        onChange={handleChange}
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

      <div className="form-row form-row-three">
        <Input
          label="Price/Night (₹)"
          type="number"
          name="pricePerNight"
          placeholder="2500"
          value={form.pricePerNight}
          onChange={handleChange}
          error={errors.pricePerNight}
          required
        />
        <Input
          label="Total Rooms"
          type="number"
          name="totalRooms"
          placeholder="50"
          value={form.totalRooms}
          onChange={handleChange}
          error={errors.totalRooms}
          required
        />
        <Input
          label="Total Capacity"
          type="number"
          name="totalCapacity"
          placeholder="100"
          value={form.totalCapacity}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <Button 
          type="submit" 
          variant="primary"
          loading={loading}
        >
          {editData ? 'Update' : 'Create'} Accommodation
        </Button>
      </div>
    </form>
  );
};

export default AccommodationForm;