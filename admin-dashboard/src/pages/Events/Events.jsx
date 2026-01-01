import './Events.css';

import React, { useState } from 'react';

import DataTable from '../../components/DataTable/DataTable';
import Modal from '../../components/Modal/Modal';
import Toast from '../../components/Toast/Toast';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import { useToast } from '../../hooks/useToast';
import { eventService } from '../../services/eventService';
import EventForm from './EventForm';

const Events = ({ searchTerm }) => {
  const { data: events, refetch, loading } = useFetch(() => eventService.getAll());
  const { toast, showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns = [
    { 
      key: 'title', 
      label: 'Event Title',
      sortable: true
    },
    { 
      key: 'date', 
      label: 'Date',
      sortable: true,
      render: (item) => new Date(item.date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    { 
      key: 'time', 
      label: 'Time',
      render: (item) => item.time || '-'
    },
    { 
      key: 'category', 
      label: 'Category',
      sortable: true,
      render: (item) => (
        <span className="badge badge-blue">{item.category}</span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      sortable: true,
      render: (item) => (
        <span className={`badge badge-${item.status}`}>
          {item.status}
        </span>
      )
    },
    { 
      key: 'capacity', 
      label: 'Capacity',
      sortable: true,
      render: (item) => item.capacity ? `${item.capacity.toLocaleString()} people` : '-'
    }
  ];

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      await eventService.delete(id);
      showToast('Event deleted successfully', 'success');
      refetch();
    } catch (err) {
      showToast('Error deleting event: ' + err.message, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    closeModal();
    refetch();
    showToast('Event created successfully', 'success');
  };

  const handleFormError = (error) => {
    showToast('Error creating event: ' + error.message, 'error');
  };

  return (
    <div className="events-page">
      <Toast toast={toast} onClose={() => showToast(null)} />
      
      <DataTable
        columns={columns}
        data={events}
        searchTerm={searchTerm}
        searchFields={['title', 'category']}
        onDelete={handleDelete}
        loading={loading || deleteLoading}
      />

      <Modal
        isOpen={isOpen}
        title="Add New Event"
        onClose={closeModal}
        size="large"
      >
        <EventForm 
          onSuccess={handleFormSuccess}
          onError={handleFormError}
        />
      </Modal>
    </div>
  );
};

export default Events;
