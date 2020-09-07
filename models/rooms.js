module.exports = function (sequelize, DataTypes) {
    var Room = sequelize.define("Room", {
        // Giving the Author model a name of type STRING
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Room.associate = function (models) {
        Room.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        }),
        Room.belongsTo(models.User, {
            as: 'secondUser',
            foreignKey: 'recipient'
        }),
        Room.hasMany(models.Messages, {
            onDelete: "cascade"
        });
    };

    return Room;
};