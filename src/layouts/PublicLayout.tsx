import { Outlet } from 'react-router-dom';
import ScrollManager from '../app/ScrollManager';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-bg text-content antialiased">
      <ScrollManager />
      <Outlet />
    </div>
  );
}

export default PublicLayout;
