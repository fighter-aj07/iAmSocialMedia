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


// deletion swagger

/**
 * @swagger
 * /posts/deletePost:
 *   delete:
 *     parameters: 
 *       -  in: query
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: delete post
 *     summary: delete the post.
 *     responses:
 *       200:
 *         description: API to delete post.
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 200
 *                  message: 
 *                    type: string
 *                    example: delete post!
 *       400:
 *         description: delete post.
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
 *                    example: post can not be deleted!
 * 
 */

// Get all posts

/**
 * @swagger
 * /posts/deletePost:
 *   get:
 *     parameters: 
 *       -  in: query
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: get post
 *     summary: getting the post.
 *     responses:
 *       200:
 *         description: API to add post.
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    example: 200
 *                  message: 
 *                    type: string
 *                    example: Add post!
 *       400:
 *         description: add post.
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
 *                    example: post can not be Added!
 *
 */

router.delete("/deletePost", postController.deletePost);
module.exports = router;
