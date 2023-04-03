const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const postController = require("../controllers/userdataController");

/**
 * @swagger
 * /userdata/getdetails:
 *   post:
 *     summary: Get details of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object 
 *             properties:
 *               userid:
 *                  type: string
 *     responses:
 *       200:
 *         description: get details of the user
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
 *                    example: get details of the user
 *       500:
 *         description: Error getting details of the user
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
 *                    example: Error getting details of the user
 */

router.post("/getdetails", postController.getdetails);

module.exports = router;
