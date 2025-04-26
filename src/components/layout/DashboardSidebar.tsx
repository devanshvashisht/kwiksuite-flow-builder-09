import React from 'react';

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        <ul className="mt-4">
          <li className="py-2">Item 1</li>
          <li className="py-2">Item 2</li>
          <li className="py-2">Item 3</li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;