const { User } = require('../models');

const userData = [
    {
        id: 1,
        user_login: 'butsnieva',
        email: 'test@test.com',
        display_name: 'butsnieva',
        password: 'pass123'
    },
];

const seedComment = () => User.bulkCreate(userData);

module.exports = seedComment;