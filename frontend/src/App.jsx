

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './Admin/Admin';
import Dashboard from './Admin/Dashboard';
import Products from './Admin/Products';
import Users from './Admin/Users';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import ProductDetails from './pages/ProductDetails';
import Cart from './Cart/Cart';
import AddProducts from './Admin/AddProducts';
import YourOrders from './Order/YourOrders';
import Checkout from './Order/Checkout';
import OrdersPage from './Admin/Orders';
import { useEffect } from 'react';
import { setUser } from './slice/userSlice';
import { useDispatch } from 'react-redux';

function Layout({ children }) {
  const location = useLocation();

  const noHeaderFooterRoutes = ['/login', '/register', '/admin'];

  const hideHeaderFooter = noHeaderFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Navbar />}
      
      <main className="flex-grow">{children}</main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(setUser(user)); 
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/men" element={<Layout><Men /></Layout>} />
        <Route path="/women" element={<Layout><Women /></Layout>} />
        <Route path="/orders" element={<Layout><YourOrders /></Layout>} />
        <Route path="/productdetails/:id" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />

        {/* Admin Routes - No Navbar/Footer */}
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="add" element={<AddProducts />} />
          <Route path="orders" element={<OrdersPage/>}/>
        </Route>
      </Routes>
      
    </Router>
    
  );
}

export default App;
