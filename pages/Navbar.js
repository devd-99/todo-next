import React, { useState } from 'react';

export default function Navbar({ userEmail, handleSignOut }) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-4 flex justify-between items-center">
      <div className="logo font-bold">Trusis To-do</div>
      <div className="flex items-center space-x-4">
        <div>
          {userEmail ? (
            <p>Welcome back, {userEmail}</p>
          ) : (
            <p>You are not signed in.</p>
          )}
        </div>
        <div className="relative">
          <button
            onClick={toggleOptions}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md"
          >
            Options
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white text-gray-800 rounded-md shadow-xl">
              <button
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
