import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';

const Welcome = lazy(() => import('./components/Welcome/Welcome'));
const Theory = lazy(() => import('./components/Theory/Theory'));
const Structure = lazy(() => import('./components/Structure/Structure'));
const Simulator = lazy(() => import('./components/Simulator/Simulator'));
const Contacts = lazy(() => import('./components/Contacts/Contacts'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="theory" element={<Theory />} />
            <Route path="structure" element={<Structure />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
