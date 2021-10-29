const User = require('../model/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const path = require('path');

module.exports = {
    create: async (req, res) => {
        const create = req.body;

        try {
            const userRegister = await User.create(create);
            
            userRegister.password = undefined;

            return res.status(201).send(userRegister);
        } catch (err) {
            return res.status(400).send({ error: 'Failed register admin' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email }).select('+password');

            if (!user)
                return res.status(404).send({ error: 'User not found' });

            if (!await bcrypt.compare(password, user.password))
                return res.status(403).send({ error: 'Invalid Credentials' });

            user.password = undefined;

            return res.status(202).send({
                user,
                token: jwt.sign({ id: user.id }, process.env.SECRET, {
                    expiresIn: 86400,
                }),
            });
        } catch (err) {
            return res.status(400).send({ error: 'Failed to login' });
        }
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            const user = await User.findOne({ email });

            if (!user)
                return res.status(404).send({ error: 'User not found' });

            await User.findByIdAndDelete(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetToken: now,
                }
            });
        } catch (err) {
            return res.status(400).send({ error: 'Failed on forgot password, try again' });
        }
    }
}