module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      email:{
        type: DataTypes.STRING, 
        unique:true
      },
      password: DataTypes.STRING
    });

    User.associate = (models) => {
      User.hasMany(models.Favorite, {
        as: "Favorites"
      });
    };

    return User;
  };
  