import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './actions/userAction';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/signinScreen';
import RegisterScreen from './screens/registerScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import HistoryOrdersScreen from './screens/HistoryOrdersScreen';
import UsersScreen from './screens/UsersScreen';
import history from './history';


function App(props) {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  }

  const openMenu = () => {
    document.getElementById("sidebar").classList.add("open");

  }

  const closeMenu = () => {
    document.getElementById("sidebar").className = "sidebar";
  }


 const onHover = () => {
    document.getElementById("test").classList.remove("test");
    document.getElementById("test").classList.add("test2");
 }

 const onLeave = () => {
  document.getElementById("test").classList.remove("test2");
  document.getElementById("test").classList.add("test");
}

const onHoverAdmin = () => {
  document.getElementById("testAdmin").classList.remove("testAdmin");
  document.getElementById("testAdmin").classList.add("testAdmin2");
}

const onLeaveAdmin = () => {
document.getElementById("testAdmin").classList.remove("testAdmin2");
document.getElementById("testAdmin").classList.add("testAdmin");
}

let testing;
  
  if( userInfo ){
    if( userInfo.isAdmin ){
      testing = 
        <div className="menu-top-admin" id="menu-top-admin" onMouseOver={onHoverAdmin} onMouseLeave={onLeaveAdmin}>
          <div className="menu-admin-name">
            ADMIN
          </div>
          <div className="testAdmin" id="testAdmin">
            <div>
              <Link to="/Orders">
                Orders
              </Link>
            </div>
            <div>
              <Link to="/products">
                Products
              </Link>
            </div>
          </div>
        </div>
    } 
  } 


  return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="header">
              <div className="brand">
                  <button onClick={openMenu}>
                      &#9776;
                  </button>
                  <Link to="/">
                    amazona
                  </Link>
              </div>
              <div className="header-links">
                <div className="menu-top-profile-home">
                  <div className="menu-top-cart">
                    <Link to="/cart">
                      CART
                    </Link>
                  </div>
                  { 
                    userInfo ? 
                    <div className="menu-top-profile" id="menu-top-profile" onMouseOver={onHover} onMouseLeave={onLeave}>
                        <div className="menu-profile-name">
                          <Link to="/profile">
                            {userInfo.name}
                          </Link>
                        </div>
                        <div className="test" id="test">
                          <div>
                            <Link to="/HistoryOrdersScreen">
                              Orders
                            </Link>
                          </div>
                          <div>
                            <div onClick={handleLogout} >
                              Logout
                            </div>
                          </div>
                        </div>
                        
                    </div>
                    : 
                    <div className="menu-top-profile">
                      <Link to="/signin">
                        SIGN IN
                      </Link>
                    </div>
                  }
                  {
                    testing
                  }
                </div>
              </div>
          </header>
          <aside id="sidebar" className="sidebar">
              <button className="close-button" onClick={closeMenu}>
                  X
              </button>
              <h3>Shopping Categories</h3>
              <ul>
                  <li>
                      <a href="">Pants</a>
                  </li>
                  <li>
                      <a href="">Shirts</a>
                  </li>
              </ul>
          </aside>
          <main className="main">
              <div className="content">
                <Route path="/profile" exact={true} component={ProfileScreen} />
                <Route path="/profileid/:id?" exact={true} component={ProfileScreen} />
                <Route path="/HistoryOrdersScreen" component={HistoryOrdersScreen} />
                <Route path="/Orders" component={OrdersScreen} />
                <Route path="/products" component={ProductsScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/order/:id?" component={OrderScreen} />
                <Route path="/signin" component={SigninScreen} /> 
                <Route path="/register" component={RegisterScreen} />
                <Route path="/details/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/users" component={UsersScreen} />
                <Route path="/" exact={true} component={HomeScreen} />
              </div>
          </main>
          <footer className="footer">
              All right reserved.
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
 