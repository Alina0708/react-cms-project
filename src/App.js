import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Theory from './components/Theory/Theory';
import Structure from './components/Structure/Structure';
import Simulator from './components/Simulator/Simulator';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="theory" element={<Theory />} />
          <Route path="structure" element={<Structure />} />
          <Route path="simulator" element={<Simulator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
