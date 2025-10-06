import { Outlet } from 'react-router'
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Body (Dynamic Outlet) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout