import React from 'react';

export default function Ads() {
  return (
    <div className="rounded-lg shadow-md mx-auto my-2" style={{ width: '80%' }}>
      <img
        src="https://placehold.co/600x400" // Replace with the URL of your ad image
        alt="Advertisement"
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
  );
}
