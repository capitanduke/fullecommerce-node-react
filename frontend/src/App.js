import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const openMenu = () => {
    document.getElementById("sidebar").classList.add("open");

  }

  const closeMenu = () => {
    document.getElementById("sidebar").className = "sidebar";
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
              <Link to="/cart">
                {/*<a className="header-cart" href="cart.html">CART</a>*/}
                CART
              </Link>
              { 
              userInfo ? <Link to="/profile">
                {userInfo.name}
              </Link> 
              : 
              <Link to="/signin">
                SIGN IN
              </Link>
              }
              
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
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id?" component={OrderScreen} />
            <Route path="/signin" component={SigninScreen} /> 
            <Route path="/register" component={RegisterScreen} />
            <Route path="/details/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
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
 