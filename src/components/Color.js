import React from 'react';

const Color = ({ color, setColor }) => {
  return (
    <>
      <ul className="colors ps-0">
        {color &&
          color?.map((item, index) => (
            <li
              key={index}
              style={{ background: item?.title }}
              onClick={() => setColor(item?._id)}
            />
          ))}
      </ul>
    </>
  );
};

export default Color;
