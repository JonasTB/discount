const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },

    password: {
        type: String,
        select: false,
        required: true,
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }

    next();
});

UserSchema.pre('updateOne', async function (next) {
    let admin = this._update;

    if (admin.password) {
        const hash = await bcrypt.hash(this.password, 10);
        admin.password = hash;
    }

    next();
})

module.exports = mongoose.model('User', UserSchema);