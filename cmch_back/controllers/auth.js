const User = require("../models/user");
const Saller = require("../models/seller");
const Buyer = require("../models/buyer");
const Supplier = require("../models/supplier");

const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

// using promise
exports.signup = (req, res) => {
  var category = "";
  console.log("req.body", req.body);
  
  if (req.body.category == "seller") category = new Saller(req.body);
  else if (req.body.category == "buyer") category = new Buyer(req.body);
  else if (req.body.category == "supplier") category = new Supplier(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        // error: errorHandler(err)
        error: "Email is taken",
      });
    }
    console.log(category._id);
    const user = new User(req.body);
    console.log("fhjnfzejfznfjk", category._id);
    switch (req.body.category) {
      case "seller":
        user.seller = category._id;
        break;
      case "buyer":
        user.buyer = category._id;
        break;
      case "supplier":
        user.supplier = category._id;
        break;
    }

    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          // error: errorHandler(err)
          error: "Email is taken",
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user,
      });
    });
  });
};

// using async/await
// exports.signup = async (req, res) => {
//     try {
//         const user = await new User(req.body);
//         console.log(req.body);

//         await user.save((err, user) => {
//             if (err) {
//                 // return res.status(400).json({ err });
//                 return res.status(400).json({
//                     error: 'Email is taken'
//                 });
//             }
//             res.status(200).json({ user });
//         });
//     } catch (err) {
//         console.error(err.message);
//     }
// };

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  var type = "";
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }
    console.log("vk:fg,dfg", user);
    if (user.seller) {
      type = "seller";
    }
    //    const _id=user.seller
    //    console.log("fnfjfk:sn",_id)
    //          Saller.findOne({_id},(err,sellerrr)=> {
    // if (err || !sellerrr) {
    //     return res.status(400).json({
    //         error: 'seler moch mawjoud'
    //     });
    // }
    // console.log(sellerrr.role)
    // sellernotadmin=true;
    // console.log("ouioui",sellernotadmin)

    // }
    // )
    if (user.buyer) {
      type = "buyer";
    }
    if (user.supplier) {
      type = "supplier";
    }

    console.log("ouiouiffff", type);
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role }, type });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 2) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};
