const User = require('./User');
const Blogpost = require('./Blogposts');

User.hasMany(Blogpost, {
    foreignKey: 'user_id',
});

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User, Blogpost };