const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tweet extends Model {}

Tweet.init({
    // add properites here, ex:
    body: {
         type: DataTypes.STRING,
         allowNull:false,
         validate:{
             len:[1,240]
         }
    }
},{
    sequelize
});

module.exports=Tweet