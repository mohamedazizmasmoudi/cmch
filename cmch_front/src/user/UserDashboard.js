import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory, read, update, updateUser } from "./apiUser";
import moment from "moment";
import Menu from "../core/Menu";
import male from "../utils/img/male.png";
import female from "../utils/img/female.png";

import "./profile.css";

const Dashboard = ({ match }) => {
  const [history, setHistory] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });
  const { name, email, password, error, success } = values;
  const { token } = isAuthenticated();
  const {
    user: { _id, name: userName, email: userEmail, password: userPassword },
  } = isAuthenticated();

  const inited = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };
  useEffect(() => {
    inited(match.params.userId);
  }, []);
  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          // console.log(data.error);
          alert(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const userInfo = () => {
    return (
      <div style={{height: '100%', left: '10%',width: '75%'}} className="profileSection container">
        <div className="buttonss">
          <button style={{ backgroundColor: "#0f00ff" }}>
            <i style={{ marginRight: 10 }} className="fa fa-facebook"></i>
            Facebook
          </button>
          <button style={{ backgroundColor: "red" }}>
            <i style={{ marginRight: 10 }} className="fa fa-google"></i>Google
          </button>
          <button style={{ backgroundColor: "#00a2ff" }}>
            <i style={{ marginRight: 10 }} className="fa fa-twitter"></i>Twitter
          </button>
          <div>
            <h2 style={{ marginTop: 50, marginRight: 100, float: "right" }}>
              غير كلمة المرور الخاصة بك
            </h2>
          </div>
        </div>
        <div className="imageSection">
          <img
            width="40%"
            src={localStorage.getItem("gender") === "male" ? male : female}
          />
        </div>
        <div className="inputes">
          <div>
            <div className="inp">
              <span style={{ float: "right" }}>اسم المستخدم المسجل</span>
              <input
                onChange={handleChange("name")}
                placeholder={userName}
                value={userName}
              />
            </div>
            <div className="inp">
              <span style={{ float: "right" }}>اسم المسجل</span>
              <input placeholder="اسم" />
            </div>
            <div className="inp">
              <span style={{ float: "right" }}>بريد الكتروني مسجل</span>
              <input
                onChange={handleChange("email")}
                placeholder={userEmail}
                value={userEmail}
              />
            </div>
            <div>
              <button
                style={{
                  float: "right",
                  background: "none",
                  border: "none",
                  backgroundColor: "#1cb629",
                  color: "white",
                  padding: "10px 20px",
                  fontSize: 14,
                }}
              >
                تحديث التفاصيل
              </button>
            </div>
          </div>

          <div>
            <div className="inp">
              <span style={{ float: "right" }}>أدخل كلمة المرور القديمة</span>
              <input
                onChange={handleChange("password")}
                placeholder=" كلمة المرور"
                value={password}
              />
            </div>
            <div className="inp">
              <span style={{ float: "right" }}>أدخل كلمة المرور القديمة</span>
              <input placeholder=" كلمة المرور" />
            </div>
            <div className="inp">
              <span style={{ float: "right" }}>تأكيد كلمة المرور الجديدة</span>
              <input placeholder=" كلمة المرور" />
            </div>
            <div>
              <button
                style={{
                  float: "right",
                  background: "none",
                  border: "none",
                  backgroundColor: "#e87823",
                  color: "white",
                  padding: "10px 20px",
                  fontSize: 14,
                }}
              >
                تغيير كلمة المرور
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // return (
  //   <div className="card mb-5">
  //     <h3 className="card-header">User Information</h3>
  //     <ul className="list-group">
  //       <li className="list-group-item">{name}</li>
  //       <li className="list-group-item">{email}</li>
  //       <li className="list-group-item">
  //         {role === 1 ? "Admin" : "Registered User"}
  //       </li>
  //     </ul>
  //   </div>
  // );

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <Menu />
      <div className="row">
        {/* <div className="col-3">{userLinks()}</div> */}
        <div className="col-9">
          {userInfo()}
          {/* {purchaseHistory(history)} */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
