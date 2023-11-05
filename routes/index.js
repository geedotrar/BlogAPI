import express from "express";
import { register, login } from "../controllers/UsersController.js";
import { CreateBlogPost, DeleteBlogPost, GetByUserId, UpdateBlogPost, getAllBlogPost } from "../controllers/BlogPostController.js";
import { DeleteComment, UpdateComment, createComment, getByBlogPost, getComments } from "../controllers/CommentsController.js";
const router = express.Router();

router.post("/users", register);
router.post("/login", login);

router.get("/blogPost", getAllBlogPost);
router.post("/blogPost", CreateBlogPost);
router.put("/blogPost/:id", UpdateBlogPost);
router.delete("/blogPost/:id", DeleteBlogPost);
router.get("/blogPost/user/:userId", GetByUserId);

router.get("/comment", getComments);
router.post("/comment", createComment);
router.put("/comment/:id", UpdateComment);
router.get("/comment/post/:postId", getByBlogPost);
router.delete("/comment/:id", DeleteComment);

export default router;
