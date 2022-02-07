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

const sequelize = require("../config/connection");
const {User,Tweet} = require("../models")

const seed = async ()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate(users);
    await Tweet.bulkCreate(tweets);
    console.log("all seeded!")
    process.exit(0);
}

seed();