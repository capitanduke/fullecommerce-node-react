import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, update } from '../actions/userAction';
import { listMyOrders } from '../actions/orderAction';
import NoAccess from '../components/NoAccess';

function ProfileScreen(props){

    const [name, setName] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, error, success} = userUpdate;

    const [flag, setFlag] = useState(false);


    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({ userId: userInfo._id, name, email, password}))
    }

    if(success){
        let element = document.getElementById('update-profile-success');
        element.classList.add('up-active');
        

        setTimeout(() => {
            element.classList.remove('up-active');
        }, 5000);

    }



    useEffect(() => {
       
        if(userInfo){
            if(userInfo._id){
                setEmail(userInfo.email);
                setName(userInfo.name);
                setPassword(userInfo.password);
            }
        } else {
            setFlag(true);
        }

        
        return () => {
          //
        };
      }, []);

      console.log(flag);


    return flag ? <NoAccess /> : <>
    { <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>User profile</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
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
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={ password || ''} onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">UPDATE</button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="button secondary full-width">Logout</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        
    </div>} </>
}

export default ProfileScreen;