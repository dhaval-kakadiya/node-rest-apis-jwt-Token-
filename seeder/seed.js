const User = require('../models/user');


module.exports = async () => {
    try {
        const admin = await User.findOne({ email: process.env.EMAIL });
        if (!admin) {
            const user = new User();
            user.first_name = process.env.FIRST_NAME;
            user.last_name = process.env.LAST_NAME;
            user.phone = process.env.PHONE;
            user.email = process.env.EMAIL;
            user.password = process.env.PASSWORD;
            user.role = 'admin';

            await user.save();
            console.log('Admin Seeded');
        }
        else {
            console.log('Admin exist');
        }
    } catch (error) {
        console.log(error);
    }
} 