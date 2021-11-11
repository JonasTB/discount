const User = require('../model/user');

module.exports = {
    defaultAdmin: async () => {
        const user = await new User();
        const name = "admin";
        const email = "admin@admin";
        const password = "admin@admin";

        if (await User.findOne({ email })) {
            return console.log("Standard user admin already created.");
        } else {
            await User.create({ name, email, password }).then(() => {
                console.log("Enter with email: " + email);
                console.log("Enter with password: " + password);
                return console.log("Admin default created successfully!");
            }).catch((err) => {
                return console.log(err);
            })
        }
    }
}