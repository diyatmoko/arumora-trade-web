import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ensureLiveFeed } from '../store/marketStore';

function App() {
  useEffect(() => {
    ensureLiveFeed();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
