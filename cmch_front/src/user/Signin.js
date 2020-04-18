import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import signinImage from "../utils/img/signin-image.jpg";
const Signin = () => {
  const [values, setValues] = useState({
    email: "ryan@gmail.com",
    password: "rrrrrr9",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <>
      <section style={{ marginTop: "4%" }} class="sign-in">
        <div class="containerrr">
          <div class="signin-content">
            <div class="signin-image">
              <figure>
                <img src={signinImage} alt="sing up image" />
              </figure>
              <Link to="/signup" class="signup-image-link">
                لا تملك حساب؟
              </Link>
            </div>

            <div class="signin-form">
              <h2 style={{position: 'relative',right: '-60%'}} class="form-title">تسجيل الدخول</h2>
              <form method="POST" class="register-form" id="login-form">
                <div class="form-group">
                  <label className="label-signup" for="your_name">
                    <i class="fa fa-envelope"></i>
                  </label>
                  <input
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                    placeholder="Your email"
                  />
                </div>
                <div class="form-group">
                  <label className="label-signup" for="your_pass">
                    <i class="fa fa-lock"></i>
                  </label>
                  <input
                    onChange={handleChange("password")}
                    type="password"
                    value={password}
                    placeholder="Password"
                  />
                </div>
                <div style={{float: 'right',marginBottom: 20}} class="form-group">
                  
                  <label
                    className="label-signup"
                    style={{ top: -3 }}
                    for="remember-me"
                    class="label-agree-term"
                  >
                    تذكرنى
                  </label>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    class="agree-term"
                  />
                </div>
                <div style={{marginTop: 60}} class="form-group form-button">
                  <Link to="/">
                    <input
                      onClick={clickSubmit}
                      type="submit"
                      name="signin"
                      id="signin"
                      class="form-submit"
                      value="تسجيل الدخول"
                    />
                  </Link>
                </div>
              </form>
              <div class="social-login">
                <ul class="socials">
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi-facebook fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi-twitter fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi-google fa fa-google"></i>
                    </a>
                  </li>
                </ul>
                <span class="social-label">أو قم بتسجيل الدخول باستخدام</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    // <Layout
    //     title="Signin"
    //     description="Signin to Node React E-commerce App"
    //     className="container col-md-8 offset-md-2"
    // >
    //     {showLoading()}
    //     {showError()}
    //     {signUpForm()}
    //     {redirectUser()}
    // </Layout>
    <>
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </>
  );
};

export default Signin;
