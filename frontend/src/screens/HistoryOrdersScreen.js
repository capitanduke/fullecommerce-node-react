import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders } from '../actions/orderAction';
import NoAccess from '../components/NoAccess';



function HistoryOrdersScreen(props){

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, error: errorOrders, orders } = useSelector(state => state.myOrderList);

    const userSigned = useSelector(state => state.userSignin);
    const { userInfo } = userSigned;

    const [flag, setFlag] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        if( !userInfo ){
            setFlag(true);
        } else {
            dispatch(listMyOrders(userInfo._id));
        }

        return () => {
            
        }
    }, [])
    
    

    return <div className="profile-orders content-margined">
    { 
        flag ? <NoAccess /> :
        loadingOrders ? <div>Loading...</div> :
        errorOrders ? <div>{errorOrders} </div> :
            <table className="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid}</td>
                <td>
                    <Link to={"/order/" + order._id}>DETAILS</Link>
                </td>
                </tr>)}
            </tbody>
            </table>
    }
</div>


}

export default HistoryOrdersScreen;