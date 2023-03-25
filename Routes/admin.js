import { Router } from "express";
import { verifyTokenAndAdmin } from "../Middlewares/verifyUser.js";
import User from "../Models/User.js";

const router = Router();

router.get("/users", verifyTokenAndAdmin, async (req, res) => {
  const users = await User.find({ isAdmin: false });
  res.json({ users });
});

router.get("/anyuser", verifyTokenAndAdmin, async (req, res) => {
  const user = await User.findById(req.query.user).select("-password");
  res.json(user);
});

export default router;
