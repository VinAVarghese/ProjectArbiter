const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING, 
        allowNull:false
      },
      email:{
        type: DataTypes.STRING, 
        allowNull:false
      },
      password:{
        type: DataTypes.STRING, 
        allowNull:false
      }
    });

    User.beforeCreate((user) => {
      user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10), null);
    })

    User.associate = (models) => {
      User.hasMany(models.Favorite, {
        as: "Favorites"
      });
    };

    return User;
  };
  