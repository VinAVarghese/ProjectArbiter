module.exports = function(sequelize, DataTypes) {
    var favorite = sequelize.define("favorite", {
    //   user_id: DataTypes.INTEGER, FOREIGN KEY
      title: DataTypes.STRING,
      note: DataTypes.STRING,
    });
    return favorite;
  };
  