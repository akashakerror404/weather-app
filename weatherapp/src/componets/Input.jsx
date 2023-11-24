import React from 'react';

function Input() {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 w-96'>
      <div className='flex justify-center items-center'>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter location..."
        className="border p-2 mt-2"
      />
      </div>
     
      <div className="mt-4 p-2">
        <h2>Weather Details:</h2>
        {/* Display 5 fixed details below the input box */}
        <p className='bg-yellow-200'>Detail 1: Your data here</p>
        <p>Detail 2: Your data here</p>
        <p>Detail 3: Your data here</p>
        <p>Detail 4: Your data here</p>
        <p>Detail 5: Your data here</p>
      </div>
    </div>
  );
}

export default Input;
