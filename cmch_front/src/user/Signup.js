import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import signupImage from "../utils/img/signup-image.jpg";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    error: "",
    photo: "",
    job: "",
    gender: '',
    formData: "",
    success: false,
  });

  const {
    name,
    email,
    password,
    category,
    success,
    error,
    job,
    gender,
    formData,
  } = values;

  const [checked, setChecked] = useState(true);

  const handleChecked = (type) => {
    setChecked({ checked: !checked });
    setValues({ ...values, category: type });
  };

  const handleCheckedJob = (type) => {
    setChecked({ checked: !checked });
    setValues({ ...values, job: type });
  };
  const handleCheckedGender = (type) => {
    setChecked({ checked: !checked });
    setValues({ ...values, gender: type });
    localStorage.setItem('gender',type)
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, category, job, gender }).then((data) => {
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
          job: "",
          gender: '',
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <>
      <section style={{ marginTop: "4%" }} class="signup">
        <div class="containerrr">
          <div class="signup-content">
            <div class="signup-form">
              <h2
                class="form-title"
                style={{ position: "relative", right: "-80%" }}
              >
                سجل
              </h2>
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
                  <label style={{float: 'right'}}>: النوع</label>
                  <RadioGroup
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <span for="category">تاجر</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleChecked("seller")}
                    />
                    <span for="category">مشتر</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type1"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleChecked("buyer")}
                    />
                    <span for="category">المورد</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type2"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleChecked("supplier")}
                    />
                  </RadioGroup>
                  {category === "seller" && (
                    <RadioGroup
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <span for="category">خضار</span>
                      <Radio
                        name="type"
                        type="radio"
                        value="type"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        onChange={() => handleCheckedJob("khadhar")}
                      />
                      <span for="category">عطار</span>
                      <Radio
                        name="type"
                        type="radio"
                        value="type1"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        onChange={() => handleCheckedJob("_3atar")}
                      />
                    </RadioGroup>
                  )}
                </div>
                <div style={{paddingBottom: 20}}>
                <label style={{float: 'right'}}>: الجنس</label>
                  <RadioGroup
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <span for="category">الذكر</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleCheckedGender("male")}
                    />
                    <span for="category">أنثى</span>
                    <Radio
                      name="type"
                      type="radio"
                      value="type1"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={() => handleCheckedGender("female")}
                    />
                  </RadioGroup>
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
                    placeholder="موقعك"
                  />
                </div>
                <div style={{ float: "right" }} class="form-group">
                  <span
                    style={{ top: -3 }}
                    for="agree-term"
                    class="label-agree-term"
                  >
                    أوافق على جميع البيانات{" "}
                    <a href="#" class="term-service">
                      الواردة في شروط الخدمة
                    </a>
                  </span>
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    class="agree-term"
                  />
                </div>
                <Link to="/">
                  <div
                    style={{ marginTop: 50, width: "100%" }}
                    class="form-group form-button"
                  >
                    <input
                      onClick={clickSubmit}
                      type="submit"
                      name="signup"
                      id="signup"
                      class="form-submit"
                      value="تسجيل"
                    />
                  </div>
                </Link>
              </form>
            </div>
            <div class="signup-image">
              <figure>
                <img src={signupImage} alt="sing up image" />
              </figure>
              <Link to="/signin" class="signup-image-link">
                أنا عضو بالفعل
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
  const redirectUser = () => {
    return <Redirect to="/signin" />;
  };
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
