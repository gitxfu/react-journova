import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const LayoutWithNavBar = ({ userID, setUserID }) => (
  <>
    <NavBar userID={userID} setUserID={setUserID} />

    <div className="app-page">
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>

  </>
);

export default LayoutWithNavBar;
