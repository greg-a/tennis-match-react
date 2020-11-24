module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: true
        },
        skilllevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pushToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pushEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Event, {
            onDelete: "cascade"
        });

        User.hasMany(models.Messages, {
            onDelete: "cascade"
        })
    };

    return User;
};