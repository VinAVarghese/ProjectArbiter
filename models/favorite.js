module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
      title: DataTypes.STRING,
      note: DataTypes.TEXT,
    });

    Favorite.associate = (models) => {
      Favorite.belongsTo(models.User);
    };

    return Favorite;
  };
  