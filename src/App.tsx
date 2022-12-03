import Loader from '@components/Loader/Loader';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'routes/Router';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
