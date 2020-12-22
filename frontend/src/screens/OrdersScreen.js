import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveorder, listOrders, deleteOrder } from '../actions/orderAction';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function OrdersScreen(props) {

  const dispatch = useDispatch(); 

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const orderList = useSelector(state => state.orderList);
  const { loading, orders, success } = orderList;


  
  useEffect(() => {
    dispatch(listOrders());

    return () => {
      //
    };
  }, [orderDelete]);


  const handleDeleteorder = (order) => {
    dispatch(deleteOrder(order._id));
  }

  return <div className="content content-margined">
    <div className="container-message">
      <h1>{/*successDelete*/}</h1>
    </div>
    <div className="order-header">
      <h3>orders</h3>
    </div>

    <div className="order-list">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>USER</th>
            <th>PAID</th>
            <th>APID AT</th>
            <th>DELIVERED</th>
            <th>DELIVERED AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => 
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice} €</td>
              <td>{order.user}</td>
              <td>{order.isPaid ? <p>Yes</p> : <p>No</p>}</td>
              <td>{order.PaidAt}</td>
              <td>{order.isDelivered}</td>
              <td>{order.DeliveredAt}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary">Details </Link>
                {' '}
                <button type="button" className="button secondary" onClick={() => handleDeleteorder(order)}>Delete</button>
              </td>
            </tr>
          )}
            
        </tbody>
      </table>
    </div>
    
  </div>
  
  
  
}

export default OrdersScreen;