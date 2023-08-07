const { User } = require("../models");

const UserData = [
    {
        user: "username",
        email: "bootcamp@bootcamp.com",
        password: "password12345",
    },
]

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;