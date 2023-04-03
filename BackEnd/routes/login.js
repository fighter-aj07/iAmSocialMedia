const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

/**
 * @swagger
 * /login/:
 *   post:
 *     summary: login of user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object 
 *             properties:
 *               email:
 *                  type: string
 *               password:
 *                  type: string
 
 *     responses:
 *       200:
 *         description: login of user
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
 *                    example: login of user
 *       500:
 *         description: login of user
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
 *                    example: login of user
 */

router.post("/", loginController.login);

module.exports = router;