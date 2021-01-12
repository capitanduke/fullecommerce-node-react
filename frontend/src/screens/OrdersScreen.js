import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderAction';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NoAccess from '../components/NoAccess';


function OrdersScreen(props) {

  const dispatch = useDispatch(); 

  const userSigned = useSelector(state => state.userSignin);
  const { userInfo } = userSigned;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const orderList = useSelector(state => state.orderList);
  const { loading, orders, success } = orderList;

  const [flag, setFlag] = useState(false);
 
  useEffect(() => {

    if( userInfo ){
      if(userInfo.isAdmin){
        dispatch(listOrders());
      }
    } else {
      setFlag(true);
    }

    return () => {
      //
    };
  }, [orderDelete]);


  /* DIALOG MODAL CONFIRM DELETE*/
  const [status, setStatus] = useState(false);

  const handleClickOpen = () => {
    setStatus(true);
  };

  const handleClose = () => {
    setStatus(false);
  };

  const handleAgree = (order) => {
    dispatch(deleteOrder(order));
    setStatus(false);
  };
  const handleDisagree = () => {
    setStatus(false);
  };

  return <div className="content content-margined">
    { flag ? <NoAccess /> : <>
    
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
                <Button variant="contained" classes={{ root: 'my-class-name' }}>
                  <Link to={"/order/" + order._id} classes={{ label: 'my-class-details-button' }}>Details </Link>
                </Button>
                {' '}
                <Button variant="contained" color="secondary" onClick={() => handleClickOpen()}>Delete</Button>
              </td>
              <Dialog
                open={status}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Order"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to delete this order?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDisagree()} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={() => handleAgree(order._id)} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </tr>
          )}
            
        </tbody>
      </table>
    </div>
    </>
    }
    
    
  </div>
  
  
  
}

export default OrdersScreen;