const loginsc = require('../models/loginModel');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await loginsc.findOne({email});

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json(user.userid);
        } else {
            res.json('Incorrect password or email');
        }
    } else {
        res.json('Incorrect password or email');
    }
};

exports.login = login;
