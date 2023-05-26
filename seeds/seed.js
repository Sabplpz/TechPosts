const sequelize = require('../config/connection');
const { User, Posts } = require('../models');

const userData = require('./userData.json');
const postsData = require('./postsData.json');

const seedDatabase = async () => {


  await User.bulkCreate(userData, {
    individualHooks: true,
  });

  await Posts.bulkCreate(postsData);

  process.exit(0);
};

sequelize.sync({ force: true }).then(() => {

  seedDatabase();
})
