module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING, 
      allowNull: true
    },
    srRating:{
      type: DataTypes.INTEGER, 
      allowNull: true
    }

  });

  Team.associate = function(models) {
    Team.hasMany(models.Player, {
      onDelete: "cascade"
    });
  };

  return Team;
}
