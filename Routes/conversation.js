import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin } from "../Middlewares/verifyUser.js";
import Conversation from "../Models/Conversation.js";

const router = Router();

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const saveConversations = await newConversation.save();
    res.status(200).json(saveConversations);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
