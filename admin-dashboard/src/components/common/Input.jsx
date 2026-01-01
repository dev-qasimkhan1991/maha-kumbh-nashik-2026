import './Input.css';

import React from 'react';

const Input = React.forwardRef(({ 
  label,
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
      <input
        ref={ref}
        className={`form-input ${error ? 'error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;