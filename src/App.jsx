import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader, RootLayout } from "./components";
import { Home, Contact, Admin, AdminError } from "./pages";
import Account from "./components/header/Account";
// import AdminOnlyRoute from "./components/admin/";
import {
  AdminHome,
  AdminOnlyRoute,
  AddProducts,
  ViewAdminProducts,
  AdminOrders,
  EditProduct,
} from "./components/admin/";

const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Reset = lazy(() => import("./pages/Auth/Reset"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "order-history",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderHistory />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "reset",
        element: (
          <Suspense fallback={<Loader />}>
            <Reset />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminOnlyRoute>
        <Admin />
      </AdminOnlyRoute>
    ),
    errorElement: <AdminError />,
    children: [
      {
        index: true,
        element: <AdminHome />,
        errorElement: <AdminError />,
      },
      {
        path: "addProduct",
        element: <AddProducts />,
      },
      {
        path: "viewProducts",
        element: <ViewAdminProducts />,
      },
      {
        path: "viewOrders",
        element: <AdminOrders />,
      },
      {
        path: "editProduct/:id",
        element: <EditProduct />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
