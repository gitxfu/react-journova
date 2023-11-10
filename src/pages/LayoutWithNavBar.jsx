import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const LayoutWithNavBar = ({ userID, setUserID }) => (
  <>
    <NavBar userID={userID} setUserID={setUserID} />
    <Outlet /> {/* This is where nested routes will be rendered */}
  </>
);

export default LayoutWithNavBar;
