import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import "./menu.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <>
      <nav className='header' style={{ display: "flex" }}>
        <ul style={{ display: "flex" }}>
          
          <Link to="/contact">
            <li className="nav-item nav-item-centred">
              <a style={{ textDecoration: "none" }} href="">
                اتصل بنا
              </a>
            </li>
          </Link>
          
          <Link to='/'>
          <li className="nav-item ">
            <a style={{ textDecoration: "none" }} href="">
              عن الشركة
            </a>
          </li>
          </Link>

          <Link to="/">
            <li className="nav-item nav-item-centred">
              <a style={{ textDecoration: "none" }} href="">
                الرئيسية
              </a>
            </li>
          </Link>
        </ul>
        <div className="shop">
          <ul style={{ display: "flex" }}>
          {isAuthenticated() &&
              (isAuthenticated().type === "seller" ||
                isAuthenticated().type === "supplier") && (
                <Link to="/admin/dashboard">
                  <li style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} className="nav-item">
                    <i style={{ color: "black" }} className="fa fa-user-o"></i>
                    <label>مشرف</label>
                  </li>
                </Link>
              )}

            <Link to="/cart">
              <li className="nav-item ">
                <i style={{ color: "black" }} className="fa fa-cart-plus"></i>
              </li>
            </Link>
            <Link to="/shop">
              <li className="nav-item ">
                <i style={{ color: "black" }} className="fa fa-shopping-cart"></i>
              </li>
            </Link>
            <Link to="/user/dashboard">
              <li className="nav-item ">
                <i style={{ color: "black" }} className="fa fa-user"></i>
              </li>
            </Link>
            {isAuthenticated() && (
              <Link to="/signin">
                <li
                  onClick={() =>
                    signout(() => {
                      history.push("/signin");
                    })
                  }
                  className="nav-item"
                >
                  <i style={{ color: "black" }} className="fa fa-sign-out"></i>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </nav>
  </>
);

export default withRouter(Menu);

{
  /* <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/shop")}
          to="/shop"
        >
          Shop
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          Cart{" "}
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() &&
        (isAuthenticated().type === "seller" ||
          isAuthenticated().type === "supplier") && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Signin
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Signup
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div> */
}
