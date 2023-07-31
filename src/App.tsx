import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Roles from './components/Roles';
import Demanda from './components/Demanda';
import NoRoutine from './components/NoRoutine';
import Programadas from './components/Programadas';
import PdfScreen from './components/PdfScreen';
import Sidenav from './components/Sidenav';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div style={{ display: 'flex' }} className="h-auto">
      <script src="es6-promise.auto.min.js"></script>
<script src="jspdf.min.js"></script>
<script src="html2canvas.min.js"></script>
<script src="html2pdf.min.js"></script>
      <div>
        <Sidenav />
      </div>
      <div className="w-full overflow-auto max-h-screen bg-[#fcfcfc]">
        {children}
      </div>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout> <Home /> </Layout>} />
      <Route path="/projects" element={<Layout> <Projects /> </Layout>} />
      <Route path="/roles" element={<Layout> <Roles /> </Layout>} />
      <Route path="/demanda" element={<Layout> <Demanda /> </Layout>} />
      <Route path="/no-rutinarias" element={<Layout> <NoRoutine /> </Layout>} />
      <Route path="/programadas" element={<Layout> <Programadas /> </Layout>} />
      {/* Add the new route here without the layout */}
      <Route path="/pdf-screen" element={<PdfScreen />} />
    </Routes>
  );
}

export default App;

