const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./userData.json');
const postsData = require('./postsData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {


  await User.bulkCreate(userData, {
    individualHooks: true,
  });

  await Posts.bulkCreate(postsData);

  await Comments.bulkCreate(commentsData);

  process.exit(0);
};

sequelize.sync({ force: true }).then(() => {

  seedDatabase();
})
