import './Accommodations.css';

import React, { useState } from 'react';

import DataTable from '../../components/DataTable/DataTable';
import Modal from '../../components/Modal/Modal';
import Toast from '../../components/Toast/Toast';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import { useToast } from '../../hooks/useToast';
import { accommodationService } from '../../services/accommodationService';
import AccommodationForm from './AccommodationForm';

const Accommodations = ({ searchTerm }) => {
  const { data: accommodations, refetch, loading } = useFetch(() => accommodationService.getAll());
  const { toast, showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns = [
    { 
      key: 'name', 
      label: 'Accommodation Name',
      sortable: true
    },
    { 
      key: 'type', 
      label: 'Type',
      sortable: true,
      render: (item) => (
        <span className="badge badge-green">{item.type}</span>
      )
    },
    { 
      key: 'phone', 
      label: 'Phone',
      render: (item) => <a href={`tel:${item.phone}`}>{item.phone}</a>
    },
    { 
      key: 'pricePerNight', 
      label: 'Price/Night',
      sortable: true,
      render: (item) => `₹${item.pricePerNight.toLocaleString('en-IN')}`
    },
    { 
      key: 'totalRooms', 
      label: 'Rooms',
      sortable: true,
      render: (item) => item.totalRooms
    },
    { 
      key: 'rating', 
      label: 'Rating',
      sortable: true,
      render: (item) => (
        <span className="rating">
          ⭐ {item.rating > 0 ? item.rating.toFixed(1) : 'N/A'}
        </span>
      )
    }
  ];

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      await accommodationService.delete(id);
      showToast('Accommodation deleted successfully', 'success');
      refetch();
    } catch (err) {
      showToast('Error deleting accommodation', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    closeModal();
    refetch();
    showToast('Accommodation created successfully', 'success');
  };

  return (
    <div className="accommodations-page">
      <Toast toast={toast} onClose={() => showToast(null)} />
      
      <DataTable
        columns={columns}
        data={accommodations}
        searchTerm={searchTerm}
        searchFields={['name', 'type', 'phone']}
        onDelete={handleDelete}
        loading={loading || deleteLoading}
      />

      <Modal
        isOpen={isOpen}
        title="Add New Accommodation"
        onClose={closeModal}
        size="large"
      >
        <AccommodationForm 
          onSuccess={handleFormSuccess}
          onError={(err) => showToast('Error: ' + err.message, 'error')}
        />
      </Modal>
    </div>
  );
};

export default Accommodations;