import express from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/authmiddleware";
export const router = express.Router();
router.post("/signup", register);
router.post("/login", login);
router.post("/logout",logout);
router.get('/me', verifyToken, (req, res) => {
   res.status(200).json({success:true , user:req.user})
    // res.json({ user: req.user });
    // return res.status(401).json({ mssage: 'Unauthorized' });
  
});
export default router