module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Messages.associate = function(models) {
      Messages.belongsTo(models.User, {
        as: 'sender',
        foreignKey: "firstUser"
      }),
        Messages.belongsTo(models.User, {
          as: 'recipient',
          foreignKey: "secondUser"
        });
      };

    return Messages;
};