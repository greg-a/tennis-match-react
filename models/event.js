module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type: DataTypes.STRING,
            allowNull: false
        },
        end: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Event.associate = function(models) {
        Event.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Event;
};