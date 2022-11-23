import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Loader from '@components/Loader/Loader';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'routes/Router';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <div className="container">
          <div className="main">
            <Header />
            <Router />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
