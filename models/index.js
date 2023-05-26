const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Posts, {
    foreignKey: 'postedBy'
});
Posts.belongsTo(User, {
    foreignKey: 'postedBy',
    onDelete: 'CASCADE'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id'
});
Comments.belongsTo(User, {
    foreignKey: 'postedBy',
    onDelete: 'CASCADE'
});

module.exports = { User , Posts , Comments };