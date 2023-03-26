const loginsc = require('../models/loginModel');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await loginsc.findOne({email});
    console.log(password);
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json(
                {
                    userid: user.userid,
                });
        } else {
            res.json(
                {   
                    userid: null,
                    error: 'Incorrect password or email',
                });
        }
    } else {
        res.json(
            {
                userid: null,
                error: 'Incorrect password or email',
            });
    }
};

exports.login = login;
