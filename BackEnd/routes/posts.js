const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const postController = require("../controllers/postController");
const singleUpload = require("../middlewares/multer");

router.get("/getposts", postController.getposts);
router.post("/addpost", singleUpload, postController.addpost);

/**
 * @swagger
 * /posts/likeupdate:
 *   post:
 *     summary: updation of like
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object 
 *             properties:
 *               postid:
 *                  type: string
 *               userid:
 *                  type: string
 
 *     responses:
 *       200:
 *         description: updation of like
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 201
 *                  message: 
 *                    type: string
 *                    example: updation of like
 *       500:
 *         description: updation of like
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: integer
 *                    example: 400
 *                  message:
 *                    type: string
 *                    example: updation of like
 */

router.post("/likeupdate", postController.likeupdate);

/**
 * @swagger
 * /posts/updatepostscomment:
 *   post:
 *     summary: updation of post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object 
 *             properties:
 *               userid:
 *                  type: string
 *               comment:
 *                  type: array
 *               comments:
 *                type: number
 
 *     responses:
 *       200:
 *         description: updation of post
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 201
 *                  message: 
 *                    type: string
 *                    example: updation of post
 *       500:
 *         description: updation of post
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: integer
 *                    example: 400
 *                  message:
 *                    type: string
 *                    example: updation of post
 */

router.post("/updatepostscomment", postController.updatepostscomment);
router.delete("/deletePost", postController.deletePost);
module.exports = router;
