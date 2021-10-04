const express = require("express");
const router = express.Router();

// import defined route
const movieRoute = require("./movie.route");
const castRoute = require("./cast.route");
const userRoute = require("./user.route");
const wishlistRoute = require("./wishlist.route");

// middleware
const { validateToken } = require("../middleware/auth");

const defaultRoutes = [
  {
    path: "/movie",
    auth: validateToken,
    route: movieRoute,
  },
  {
    path: "/cast",
    auth: validateToken,
    route: castRoute,
  },
  {
    path: "/user",
    auth: validateToken,
    route: userRoute,
  },
  {
    path: "/wishlist",
    auth: validateToken,
    route: wishlistRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.auth, route.route);
});

module.exports = router;
