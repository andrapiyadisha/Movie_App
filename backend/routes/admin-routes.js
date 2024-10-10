const express = require("express");
const {addAdmin, adminLogin, getAdmins, getAdminById,} = require("../controllers/admin-controller");
const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/:id", getAdminById);
adminRouter.get("/",  getAdmins);



module.exports = adminRouter;
  