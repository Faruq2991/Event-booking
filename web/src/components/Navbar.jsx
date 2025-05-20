import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './Logout';
import { useAuth } from '../AuthContext';

function Navbar() {
    const auth = useAuth() || {};
    const { isAuthenticated = false, user = null, isLoading = false, logout = () => {} } = auth;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='nav container'>
            <Link to="/">Eventos</Link>
            <div>
                {!isAuthenticated && <Link to="/signup">Sign in</Link>}
                {isAuthenticated && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/create">Create</Link>
                        <LogoutButton logout={logout} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
