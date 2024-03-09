import React from 'react';

const Dashboard: React.FC = () => {

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
      
      <table className="border-collapse border border-gray-800">
        <tbody>
        
          <tr>
            <td className="border border-gray-800 p-2">name</td>
            <td className="border border-gray-800 p-2">{userData.name}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-2">email ID</td>
            <td className="border border-gray-800 p-2">{userData.email}</td>
          </tr>
        </tbody>
      </table>

      <a href="#" id="logout-link" className="text-blue-500 hover:underline" onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
}

export default Dashboard;
