import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Notfound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <button id="backToHomeButton" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/account/projects">backToHomeButton</Link>
      </button>
    </div>
  );
};
export default Notfound;
