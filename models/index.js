const User = require("./User");
const Tweet = require("./Tweet");
const Tag = require("./Tag");

User.hasMany(Tweet,{
    onDelete:"CASCADE"
});
Tweet.belongsTo(User);

Tweet.belongsToMany(Tag,{
    through: "TweetsTags"
})
Tag.belongsToMany(Tweet,{
    through: "TweetsTags"
})

module.exports={
    User,
    Tweet,
    Tag
}