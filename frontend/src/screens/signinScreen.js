import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../actions/userAction';

function SigninScreen (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state=>state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
        return () => {
            
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn(email, password));

    }  
    
    return <div className="form"> 
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h3>Signin</h3>
                        </li>
                        <li>
                            {loading && <div>Loading.....</div>}
                            {error && <div>{error}</div>}
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="details-button full-width">
                                Signin
                            </button>
                        </li>
                        <li>
                            New to amazona?
                        </li>
                        <li>
                        <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary"> Create your amazon account</Link> 
                        </li>
                    </ul>
                </form>
            </div>
            
}

export default SigninScreen;