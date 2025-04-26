import React from 'react';

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        {/* Add header content here */}
      </header>
      <main className="dashboard-content">
        {children}
      </main>
      <footer className="dashboard-footer">
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default DashboardShell;