import React, { useState } from 'react';
import { FaHome, FaTasks, FaFileInvoice, FaUsers, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  const [showIcons, setShowIcons] = useState(false);

  const handleToggle = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div className="bg-gray-800 text-white w-64 h-full">
      <div className="p-4">
        <button onClick={handleToggle} className="text-lg">
          {showIcons ? 'Show Names' : 'Show Icons'}
        </button>
      </div>
      <nav className="flex flex-col">
        <a href="/home" className="flex items-center p-2 hover:bg-gray-700">
          {showIcons ? <FaHome /> : <span>Home</span>}
        </a>
        <a href="/tasks" className="flex items-center p-2 hover:bg-gray-700">
          {showIcons ? <FaTasks /> : <span>Tasks</span>}
        </a>
        <a href="/invoices" className="flex items-center p-2 hover:bg-gray-700">
          {showIcons ? <FaFileInvoice /> : <span>Invoices</span>}
        </a>
        <a href="/customers" className="flex items-center p-2 hover:bg-gray-700">
          {showIcons ? <FaUsers /> : <span>Customers</span>}
        </a>
        <a href="/reports" className="flex items-center p-2 hover:bg-gray-700">
          {showIcons ? <FaChartBar /> : <span>Reports</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
