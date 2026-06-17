import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryBrowser from './pages/CategoryBrowser';
import HostingWizard from './pages/HostingWizard';
import SellerPortal from './pages/SellerPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:slug" element={<CategoryBrowser />} />
          <Route path="hosting-wizard" element={<HostingWizard />} />
          <Route path="sell" element={<SellerPortal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}