import './Locations.css';

import React from 'react';

import DataTable from '../../components/DataTable/DataTable';
import { useFetch } from '../../hooks/useFetch';
import { locationService } from '../../services/locationService';

const Locations = ({ searchTerm }) => {
  const { data: locations, loading } = useFetch(() => locationService.getAll());

  const columns = [
    { 
      key: 'name', 
      label: 'Location Name',
      sortable: true
    },
    { 
      key: 'type', 
      label: 'Type',
      sortable: true,
      render: (item) => (
        <span className={`badge badge-type-${item.type}`}>
          {item.type}
        </span>
      )
    },
    { 
      key: 'coordinates', 
      label: 'Coordinates',
      render: (item) => (
        <span className="coordinates">
          {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
        </span>
      )
    },
    { 
      key: 'address', 
      label: 'Address',
      render: (item) => (
        <span className="address-text">
          {item.address || '-'}
        </span>
      )
    }
  ];

  return (
    <div className="locations-page">
      <DataTable
        columns={columns}
        data={locations}
        searchTerm={searchTerm}
        searchFields={['name', 'type', 'address']}
        loading={loading}
      />
    </div>
  );
};

export default Locations;