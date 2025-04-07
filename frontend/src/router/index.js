import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../views/Dashboard';
import Client from '../views/Client';
import Supplier from '../views/Supplier';
import Inventory from '../views/Inventory';
import Machinery from '../views/Machinery';
import Reports from '../views/Reports';
import Employee from '../views/employees/Employee';
import Attendance from '../views/employees/Attendance';
import Payroll from '../views/employees/Payroll';
import ClientOrder from '../views/orders/clientOrder';
import OrderRequest from '../views/orders/orderRequest';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'clients', element: <Client /> },
      { path: 'suppliers', element: <Supplier /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'machinery', element: <Machinery /> },
      { path: 'reports', element: <Reports /> },
      { path: 'employees', element: <Employee /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'payroll', element: <Payroll /> },
      { path: 'client-orders', element: <ClientOrder /> },
      { path: 'order-requests', element: <OrderRequest /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;