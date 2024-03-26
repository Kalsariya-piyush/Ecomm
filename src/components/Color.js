import React from 'react';

const Color = ({ color, setColor, selectedColor }) => {
  return (
    <>
      <ul className="colors ps-0">
        {color &&
          color?.map((item, index) => (
            <li
              key={index}
              style={{
                background: item?.title,
                border: item?._id === selectedColor ? `1px solid red` : '',
                cursor: 'pointer',
              }}
              onClick={() => setColor(item?._id)}
            />
          ))}
      </ul>
    </>
  );
};

export default Color;
