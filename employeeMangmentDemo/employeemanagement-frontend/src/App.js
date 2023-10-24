import AddEmployeeComponent,{loader as fetchEmployeeDetail,action as Handleaction} from "./component/AddEmployeeComponent";

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ListEmployeeComponent,{loader as employeesLoader,action as deleteEmployee} from "./component/ListEmployeeComponent"
import RootLayout from "./Page/Root"
import ErrorPage from './Page/Error';

const router=createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children:[
      {
        path :'employee',
        element:<ListEmployeeComponent />,
        loader:employeesLoader,
        action:deleteEmployee,
    
      },
      {
        path:'/add-employee/:id' ,
        element:<AddEmployeeComponent />,
        loader:fetchEmployeeDetail,
        action:Handleaction
    
      },
      {
        path:'/add-employee' ,
        element:<AddEmployeeComponent />,
        action:Handleaction
    
      },
    ]
  },
  
  
])


function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
      
    );
}

export default App;
