const users = [
    {
        username:"joey",
        email:"joe@joe.joe",
        password:"password"
    },
    {
        username:"bahams",
        email:"bcat@joe.joe",
        password:"ilovetoys"
    },
    {
        username:"shives",
        email:"s_cat@joe.joe",
        password:"ilovefood"
    }
]

const tweets = [
    {
        body:"I have 2 cats!",
        UserId:1
    },
    {
        body:"jingle chirp!",
        UserId:2
    },
    {
        body:"MEOOOOOOOOWWWWWWWWW",
        UserId:2
    },
]

const tags = [
    {
        name:"catTips"
    },
    {
        name:"yolo"
    },
    {
        name:"blessed"
    },
]

const sequelize = require("../config/connection");
const {User,Tweet,Tag} = require("../models")

const seed = async ()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate(users,{individualHooks:true});
    const dbTweets = await Tweet.bulkCreate(tweets);
    const dbTags = await Tag.bulkCreate(tags);
    await dbTweets[0].addTag(2);
    await dbTags[0].addTweet(3);
    console.log(dbTweets)
    process.exit(0);
}

seed();