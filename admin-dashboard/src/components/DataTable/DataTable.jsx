import './DataTable.css';

import React, { useState } from 'react';

import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Eye,
  Trash2,
} from 'lucide-react';

const DataTable = ({ 
  columns, 
  data = [],
  onEdit, 
  onDelete, 
  onView,
  searchTerm = '',
  searchFields = [],
  loading = false
}) => {
  const [sortConfig, setSortConfig] = useState(null);

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    return searchFields.some((field) => {
      const value = item[field];
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div className="datatable-loading">Loading...</div>;
  }

  return (
    <div className="datatable-wrapper">
      <div className="datatable-container">
        <table className="datatable">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={col.sortable !== false ? 'sortable' : ''}
                >
                  <div className="th-content">
                    <span>{col.label}</span>
                    {col.sortable !== false && sortConfig?.key === col.key && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr key={item._id || index}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  <td className="actions-cell">
                    <div className="action-buttons">
                      {onView && (
                        <button 
                          className="btn-action btn-view"
                          onClick={() => onView(item._id)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      {onEdit && (
                        <button 
                          className="btn-action btn-edit"
                          onClick={() => onEdit(item._id)}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          className="btn-action btn-delete"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this item?')) {
                              onDelete(item._id);
                            }
                          }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="empty-cell">
                  <div className="empty-state">
                    <p>No data found</p>
                    <small>Try adjusting your search criteria</small>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {sortedData.length > 0 && (
        <div className="datatable-footer">
          <p className="record-count">Showing {sortedData.length} record(s)</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;