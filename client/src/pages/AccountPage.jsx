import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const AccountPage = () => {
    const [redirect, setRedirect] = useState(null);
    const { user, ready, setUser } = useContext(UserContext);
    let { subpage } = useParams();

    if (!ready) {
        return 'loading...'
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);

    }


    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto ">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="bg-primary text-white max-w-sm  mt-2 py-2 px-4 rounded-full">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}

export default AccountPage;