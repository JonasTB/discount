const Courses = require('../model/courses');

module.exports = {
    create: async (req, res) => {
        const { course, percent, full } = req.body;

        try {
            const calcPercent = (( percent / 100 ) * parseFloat(full.replace(".", "").replace(",","."))).toFixed(2);
            const discount = Intl.NumberFormat('de-DE').format((parseFloat(full.replace(".", "").replace(",",".")) - calcPercent).toFixed(2));
            const courseRegister = await Courses.create({ course, percent, full, discount });

            return res.status(201).send(courseRegister);
        } catch (err) {
            res.status(400).send({ error: 'Failed register course' });
        }
    },

    getMany: async (req, res) => {
        try {
            const courseGetMany = await Courses.find();

            if (courseGetMany.length == 0)
                return res.status(404).send({ error: 'Courses does not exist to be returned' });

            return res.status(200).send(courseGetMany);
        } catch (err) {
            res.status(400).send({ error: 'Failed get many courses' });
        }
    },

    getOne: async (req, res) => {
        const _id = req.params.id;

        try {

            if (!_id)
                return res.status(404).send({ error: 'Course does not exist to be returned' });

            const courseGetOne = await Courses.findById(_id);

            return res.status(200).send(courseGetOne);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Failed get one course' });
        }
    },

    update: async (req, res) => {
        const _id = req.params.id;
        const update = req.body;
        try {
            if (!_id)
                return res.status(404).send({ error: 'Course does not exist to be updated' });


            const courseUpdate = await Courses.findByIdAndUpdate(_id, update, { new: true });

            return res.status(200).send(courseUpdate);
        } catch (err) {
            return res.status(400).send({ error: 'Failed to update' });
        }
    },

    delete: async (req, res) => {
        const _id = req.params.id;
        try {

            if (!_id)
                return res.status(404).send({ error: 'Course does not exist to be deleted' });
            await Courses.findByIdAndDelete(_id);

            return res.status(200).send({ OK: 'Successfully deleting' });
        } catch (err) {
            return res.status(400).send({ error: 'Failed to deleting' });
        }
    }
}