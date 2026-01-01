import './Attractions.css';

import React, { useState } from 'react';

import DataTable from '../../components/DataTable/DataTable';
import Modal from '../../components/Modal/Modal';
import Toast from '../../components/Toast/Toast';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import { useToast } from '../../hooks/useToast';
import { attractionService } from '../../services/attractionService';
import AttractionForm from './AttractionForm';

const Attractions = ({ searchTerm }) => {
  const { data: attractions, refetch, loading } = useFetch(() => attractionService.getAll());
  const { toast, showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns = [
    { 
      key: 'name', 
      label: 'Attraction Name',
      sortable: true
    },
    { 
      key: 'category', 
      label: 'Category',
      sortable: true,
      render: (item) => (
        <span className="badge badge-purple">{item.category}</span>
      )
    },
    { 
      key: 'address', 
      label: 'Address',
      render: (item) => <span className="address-text">{item.address}</span>
    },
    { 
      key: 'crowdLevel', 
      label: 'Crowd Level',
      sortable: true,
      render: (item) => (
        <span className={`badge badge-crowd-${item.crowdLevel}`}>
          {item.crowdLevel}
        </span>
      )
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
      await attractionService.delete(id);
      showToast('Attraction deleted successfully', 'success');
      refetch();
    } catch (err) {
      showToast('Error deleting attraction', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="attractions-page">
      <Toast toast={toast} onClose={() => showToast(null)} />
      
      <DataTable
        columns={columns}
        data={attractions}
        searchTerm={searchTerm}
        searchFields={['name', 'category', 'address']}
        onDelete={handleDelete}
        loading={loading || deleteLoading}
      />

      <Modal
        isOpen={isOpen}
        title="Add New Attraction"
        onClose={closeModal}
        size="large"
      >
        <AttractionForm 
          onSuccess={() => {
            closeModal();
            refetch();
            showToast('Attraction created successfully', 'success');
          }}
          onError={(err) => showToast('Error: ' + err.message, 'error')}
        />
      </Modal>
    </div>
  );
};

export default Attractions;