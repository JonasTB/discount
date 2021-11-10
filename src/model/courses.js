const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    course: {
        type: String,
        lowercase: true,
        required: true,
    },

    percent: {
        type: Number,
        required: true,
    },

    full: {
        type: String,
        required: true,
    },

    discount: {
        type: String,
        required: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Courses', CoursesSchema);