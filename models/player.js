module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    playerName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      default: "http://via.placeholder.com/350x350",
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      default: "Bio goes here",
      allowNull: false
    },
    twitchLink: {
      type: DataTypes.STRING,
      default: "twitch.tv",
      allowNull: true
    },
    twitterLink: {
      type: DataTypes.STRING,
      default: "twitter.com",
      allowNull: true
    }
  });

  Player.associate = function(models) {
    Player.belongsTo(models.Team, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Player;
};


