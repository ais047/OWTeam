module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    itemTitle: {
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
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.Shop, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};


