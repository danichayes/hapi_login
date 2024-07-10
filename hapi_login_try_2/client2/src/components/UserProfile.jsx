import Reac, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8080/api/${username}`);
            const result = await response.json()
            setUser(result);
        };
        fetchUser();
    }, [username]);
    const handleEdit = () => {
        navigate(`/edit/${username}`);
    };
    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p>Username: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;