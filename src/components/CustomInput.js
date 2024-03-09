import React from 'react';

const CustomInput = (props) => {
  const { type, name, placeholder, classname = '', error } = props;

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control border ${
          error ? 'border-danger ' : ''
        } ${classname}`}
        {...props}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default CustomInput;
