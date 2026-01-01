import './Select.css';

import React from 'react';

const Select = React.forwardRef(({
  label,
  options = [],
  error,
  required,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={`form-select ${error ? 'error' : ''} ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;