const sequelize = require("../config/connection");
const seedUser = require('./userData');
const seedBlog = require('./blogData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
;
    await seedBlog();
    await seedUser();

    process.exit(0);
};

seedAll();