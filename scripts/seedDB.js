const db = require("../models");

const userSeed = [
    {
        username: "Greg",
        password: "123",
        email: "greg@gmail.com"
    },
    {
        username: "Patrick",
        password: "123",
        email: "patrick@gmail.com"
    },
    {
        username: "Jarrett",
        password: "123",
        email: "jarrett@gmail.com"
    },
];

const eventSeed = [
    {
        title: "Doubles match",
        start: "2020-09-08T17:00:00.000Z",
        end: "2020-09-08T19:00:00.000Z",
        eventStatus: "available",
        UserId: "1"
    },
    {
        title: "Doubles match",
        start: "2020-09-14T17:00:00.000Z",
        end: "2020-09-14T19:00:00.000Z",
        eventStatus: "available",
        UserId: "1"
    },
    {
        title: "Doubles match",
        start: "2020-09-08T18:00:00.000Z",
        end: "2020-09-08T20:00:00.000Z",
        eventStatus: "available",
        UserId: "2"
    },
    {
        title: "Doubles match",
        start: "2020-09-14T11:00:00.000Z",
        end: "2020-09-14T13:00:00.000Z",
        eventStatus: "available",
        UserId: "2"
    },
    {
        title: "Doubles match",
        start: "2020-09-08T13:00:00.000Z",
        end: "2020-09-08T20:00:00.000Z",
        eventStatus: "available",
        UserId: "3"
    },
    {
        title: "Doubles match",
        start: "2020-09-14T17:00:00.000Z",
        end: "2020-09-14T19:00:00.000Z",
        eventStatus: "available",
        UserId: "3"
    }
];

db.User.bulkCreate(userSeed).then(function (results) {
    console.log(results.length + " users inserted!");
}).catch(err => {
    console.log(err);
});

db.Event.bulkCreate(eventSeed).then(function(results) {
    console.log(results.length + " events inserted!");
    process.exit(0);
}).catch(err => {
    console.log(err);
    process.exit(1);
});