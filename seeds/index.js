const sequelize = require('../config/connection');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUser();
    console.log('\n----- USER SEEDED -----\n');
    process.exit(0);
};

seedAll();