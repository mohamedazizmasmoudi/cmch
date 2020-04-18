import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import signupImage from "../utils/images/signup-image.jpg";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    error: "",
    photo: '',
    job: '',
    formData: '',
    success: false,
  });

  const { name, email, password, category, success, error, job, formData } = values;

  const [checked, setChecked] = useState(true);

  const handleChecked = (type) => {
    setChecked({ checked: !checked });
    setValues({ ...values, category: type });
  };

  const handleCheckedJob = (type) => {
    setChecked({ checked: !checked });
    setValues({ ...values, job: type });
  };

  const handleChangePhoto = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    FormData.set(name, value);
    setValues({ ...values, [name]: value });
};

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, category, job }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          category: "",
          password: "",
          error: "",
          job: '',
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <>
      <section style={{ marginTop: "4%" }} class="signup">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Sign up</h2>
              <form method="POST" class="register-form" id="register-form">
                <div class="form-group">
                  <label className="label-signup" for="name">
                    <i class="fa fa-user"></i>
                  </label>
                  <input
                    onChange={handleChange("name")}
                    type="text"
                    value={name}
                    placeholder="Your Name"
                  />
                </div>
                <div class="form-group">
                  <label className="label-signup" for="email">
                    <i class="fa fa-envelope"></i>
                  </label>
                  <input
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                    name="email"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>
                <div class="form-group">
                  <RadioGroup
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <span for="category">Seller</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleChecked("seller")}
                    />
                    <span for="category">Buyer</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type1"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleChecked("buyer")}
                    />
                    <span for="category">Suplier</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type2"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleChecked("supplier")}
                    />
                  </RadioGroup>
                  {category === 'seller' &&
                  <RadioGroup
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <span for="category">khadhar</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleCheckedJob("khadhar")}
                    />
                    <span for="category">_3atar</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type1"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleCheckedJob("_3atar")}
                    />
                  </RadioGroup>}
                </div>
                <div class="form-group">
                  <label className="label-signup" for="pass">
                    <i class="fa fa-lock"></i>
                  </label>
                  <input
                    onChange={handleChange("password")}
                    type="password"
                    value={password}
                    name="pass"
                    id="pass"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group">
                  <label className="label-signup" for="pass">
                    <i class="fa fa-thumb-tack"></i>
                  </label>
                  <input
                    type="text"
                    name="pass"
                    id="pass"
                    placeholder="location"
                  />
                </div>
                <div className="form-group">
                  <label className="btn btn-secondary">
                    <input
                      onChange={handleChangePhoto("photo")}
                      type="file"
                      name="photo"
                      accept="image/*"
                    />
                  </label>
                </div>
                <div class="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    class="agree-term"
                  />
                  <span
                    style={{ top: -3 }}
                    for="agree-term"
                    class="label-agree-term"
                  >
                    I agree all statements in{" "}
                    <a href="#" class="term-service">
                      Terms of service
                    </a>
                  </span>
                </div>
                <div class="form-group form-button">
                  <input
                    onClick={clickSubmit}
                    type="submit"
                    name="signup"
                    id="signup"
                    class="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div class="signup-image">
              <figure>
                <img src={signupImage} alt="sing up image" />
              </figure>
              <Link to="/signin" class="signup-image-link">
                I am already member
              </Link>
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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    // <Layout
    //     title="Signup"
    //     description="Signup to Node React E-commerce App"
    //     className="container col-md-8 offset-md-2"
    // >
    //     {showSuccess()}
    //     {showError()}
    //     {signUpForm()}
    // </Layout>
    <>
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </>
  );
};

export default Signup;
