import { Outlet, useNavigation } from 'react-router-dom';
import FooterComponent from "../component/FooterComponent";
import HeaderComponent from "../component/HeaderComponent";


function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
    <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
     
    </>
  );
}

export default RootLayout;