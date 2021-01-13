import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { users } from '../actions/userAction';

function UsersScreen (props) {

    const dispatch = useDispatch();

    const { usersList, loading, error } = useSelector(state => state.usersList);
    console.log(usersList);

    useEffect(() => {

        dispatch(users());
        
        return () => {
            
        }
    }, [])



    return <div className="profile-orders content-margined">
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
                    <Link to={"/profileid/" + user._id}>DETAILS</Link>
                </td>
                </tr>)}
            </tbody>
            </table>
    }
</div>
}

export default UsersScreen;

