import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Main from './components/Main.jsx';
import { queryClient } from './util/http.jsx';
import Cart from './components/cart-details/Cart.jsx';
import Home from './components/Home.jsx';
import CategoryList from './components/categories-list/CategoryList.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import CheckoutForm from './components/checkout-form/Checkout-Form.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/products",
        element:<Home />
      },
      {
        path:'/cart',
        element:<Cart />
      },
      {
        path:'/categories',
        element:<CategoryList />
      },
      {
        path:'/products/:productId',
        element:<ProductDetails />
      },
      {
        path:'/checkout',
        element:<CheckoutForm />
      },
    ]
  },
  
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
