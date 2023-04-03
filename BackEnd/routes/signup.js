const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signupController");

/**
 * @swagger
 * /signup/:
 *   post:
 *     summary: Signup the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object 
 *             properties:
 *               username:
 *                  type: string
 *               email:
 *                  type: string
 *               password:
 *                  type: string
 *               userid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup the user
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
 *                    example: Signup the user
 *       500:
 *         description: Error while signing up the user
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
 *                    example: Error while signing up the user
 */

router.post("/", signupController.signup);

module.exports = router;