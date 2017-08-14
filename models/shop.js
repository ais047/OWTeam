module.exports = function(sequelize, DataTypes) {
  var Shop = sequelize.define("Shop", {
    shopName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description:{
      type: DataTypes.STRING, 
      allowNull: true
    },

    item: {
      type:DataTypes.STRING,
      allowNull: false,
        description: {
          type:DataTypes.STRING,
          allowNull: true
        },
        price: {
          type: DataTypes.Decimal,
          allowNull: false
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false
        },

    shopDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    item: {
      type:DataTypes.STRING,
      allowNull: false,
      image: {
        type: DataTypes.STRING,
        default: "http://via.placeholder.com/350x350",
        allowNull: false
      },
      price: {
        type: DataTypes.Decimal,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }

  }

  //   Shop.associate = function(models) {
  //   Shop.hasMany(models.Item, {
  //     onDelete: "cascade"
  //   });
  // };

});

=======
  });

  Shop.associate = function(models) {
    Shop.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };
>>>>>>> source/master
  return Shop;
}
