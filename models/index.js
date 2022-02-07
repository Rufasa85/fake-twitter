const User = require("./User");
const Tweet = require("./Tweet");

User.hasMany(Tweet,{
    onDelete:"CASCADE"
});
Tweet.belongsTo(User);

module.exports={
    User,
    Tweet
}