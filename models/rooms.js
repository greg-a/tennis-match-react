module.exports = function (sequelize, DataTypes) {
    var Room = sequelize.define("Room", {
        // Giving the Author model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipient: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Room.associate = function (models) {
        Room.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Room.hasMany(models.Messages, {
            onDelete: "cascade"
        });
    };

    return Room;
};