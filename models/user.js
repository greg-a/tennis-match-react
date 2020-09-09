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
            type: DataTypes.INTEGER,
            allowNull: true
        },
        skilllevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        oppskilllevel: {
            type: DataTypes.INTEGER,
            allowNull: true
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