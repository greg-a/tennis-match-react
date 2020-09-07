module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Messages.associate = function(models) {
        Messages.belongsTo(models.Room, {
          foreignKey: {
            allowNull: true
          }
        });

        Messages.belongsTo(models.User, {
          foreignKey: {
            allowNull: true
          }
        });
      };

    return Messages;
};