import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { users, details, update } from '../actions/userAction';

function UsersScreen (props) {

    const dispatch = useDispatch();

    const [id, setId] = useState( '' );
    const [name, setName] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [flag, setFlad] = useState(false);

    const { usersList, loading, error } = useSelector(state => state.usersList);

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate , error: errorUpdate, success} = userUpdate;
    
    useEffect(() => {

        dispatch(users());
        
        return () => {
            
        }
    }, [loadingUpdate])

    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({ userId: id, name, email, password }));
    }

    const showUpdate = (user) => {
        setId(user.user._id);
        setName(user.user.name);
        setEmail( user.user.email );
        setPassword( user.user.password );

    } 


    return <>

    <div className="profile-orders content-margined">
    { 
        
        loading ? <div>Loading...</div> :
        error ? <div>{error} </div> :
            <table className="table">
            <thead>
                <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {usersList.map(user => <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{ user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                    <button onClick={() => showUpdate({user})}>UPDATE</button>
                </td>
                </tr>)}
            </tbody>
            </table>
    }
    </div>

    <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>User profile</h2>
                        </li>
                        <li>
                            {/* {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>} */}
                            <div className="update-profile-success" id="update-profile-success">Profile Updated</div>
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input type="name" name="name" id="name" value={ name || ''} onChange={(e) => setName(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" name="email" id="email" value={ email || ''} onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </li>
                            <li>
                            <button type="submit" className="button primary">UPDATE</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </div>

    </>
}

export default UsersScreen;

