// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const { isAuthenticated } = require("./middleware/jwt.middleware");


const express = require("express");

const app = express();


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// Rutas para los exercises.
const exerciseRoutes = require("./routes/exercise.routes");
app.use("/api", exerciseRoutes)

// Rutas para las Routines
const routineRoutes = require("./routes/routine.routes");
app.use("/api",isAuthenticated, routineRoutes)

// Rutas para el Profile
const profileRouter  = require("./routes/profile.routes");
app.use("/api",isAuthenticated, profileRouter)

//
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Middleware - AuthRouter
const authRouter = require("./routes/auth.routes"); 
app.use("/auth", authRouter);    


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
