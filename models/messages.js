module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        read: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
    });

    Messages.associate = function(models) {
      Messages.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
        Messages.belongsTo(models.User, {
          as: 'recipient',
          foreignKey: {
            name: "secondUser",
            allowNull: false
          }
        });
      };

    return Messages;
};