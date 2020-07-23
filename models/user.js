module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
      user_name: DataTypes.STRING,
      password: DataTypes.STRING
    });
    return user;
  };
  