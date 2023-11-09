import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const LayoutWithNavBar = () => (
  <>
    <NavBar />
    <Outlet /> {/* This is where nested routes will be rendered */}
  </>
);

export default LayoutWithNavBar;
