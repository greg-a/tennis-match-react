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
            allowNull: false
        },
        eventStatus: DataTypes.STRING,
        location: DataTypes.STRING
    });

    Event.associate = function(models) {
        Event.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        }),
        Event.belongsTo(models.User, {
          as: 'secondUser',
          foreignKey: 'confirmedByUser'
        })
      };

    return Event;
};