module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
        room: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Messages.associate = function(models) {
        Messages.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Messages;
};