import express from "express";
import adminController from "../../../controllers/usuarios/admin/adminController.js";
import { checkAuth } from "../../../middleware/checkAuth.js";
const adminRoutes = express.Router();

adminRoutes.post("/admin/sigin", adminController.sigIn);
adminRoutes.get("/admin/getadmin/:id", checkAuth, adminController.getAdminById);
adminRoutes.get("   ", checkAuth, adminController.getAdmins);
adminRoutes.post("/admin/create", checkAuth, adminController.createAdmin);
adminRoutes.put("/admin/update/:id", checkAuth, adminController.updateAdmin);
adminRoutes.delete("/admin/delete/:id", checkAuth, adminController.deleteAdmin);
export default adminRoutes;
