const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    course: {
        type: String,
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
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Courses', CoursesSchema);