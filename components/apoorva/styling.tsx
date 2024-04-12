import React from 'react';

const clubStyle = {
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
};

const nameStyle = {
  color: '#333',
  fontSize: '24px',
};

const descriptionStyle = {
  color: '#666',
  fontSize: '16px',
};

const Club = ({ name, description } :{name: string, description: string}) => {
  return (
    <div style={clubStyle}>
      <h2 style={nameStyle}>{name}</h2>
      <p style={descriptionStyle}>{description}</p>
    </div>
  );
};

export default Club;
