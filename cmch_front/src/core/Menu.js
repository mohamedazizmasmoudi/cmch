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
      <nav className='header' style={{ display: "flex", justifyContent:'space-between' }}>
        <ul style={{ display: "flex" }} >
          <Link to='/'>
          <li style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} className="nav-item">
            <i style={{ color: "black" }} className='fa fa-home'></i>
            <label>الرئيسية</label>
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
              <li className="nav-item " style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <i style={{ color: "black" }} className="fa fa-cart-plus"></i>
                <label>عربة التسوق</label>
              </li>
            </Link>
            <Link to="/shop">
              <li className="nav-item " style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <i style={{ color: "black" }} className="fa fa-shopping-cart"></i>
                <label>متجر</label>
              </li>
            </Link>
            {isAuthenticated() &&
              (isAuthenticated().type === "seller" && (
                <Link to="/create/product">
                  <li style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} className="nav-item">
                    <i style={{ color: "black" }} className="fa fa-plus"></i>
                    <label>إنشاء منتج</label>
                  </li>
                </Link>
              ))}
            <Link to="/user/dashboard">
              <li className="nav-item " style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <i style={{ color: "black" }} className="fa fa-user"></i>
                <label>المستعمل</label>
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
