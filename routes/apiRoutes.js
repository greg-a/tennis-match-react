var db = require("../models");
// const { request } = require("express");
var crypto = require('crypto');
const { Sequelize, sequelize } = require("../models");
const { timeStamp } = require("console");
const Op = Sequelize.Op;

module.exports = function (app) {
    // login in auth
    app.post("/api/login", function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        if (username && password) {
            var hashed_password = crypto.createHash("sha1").update(req.body.password).digest("hex");
            db.User.findAll({
                where: {
                    username: username,
                    password: hashed_password
                }
            }).then(function (results) {
                if (results.length > 0) {
                    console.log("YOU ARE LOGGED IN");
                    req.session.loggedin = true;
                    req.session.userID = results[0].id;
                    req.session.username = results[0].username;
                    req.session.useremail = results[0].email;
                    // res.redirect("/loggedin");
                    res.send({
                        statusString: "loggedin"
                    });
                } else {
                    console.log("WRONG PASS OR USER")
                    res.send({
                        statusString: "wrongPassOrUser"
                    });
                }
            });

        } else {
            res.send({
                statusString: "noPassOrUser"
            });
        }

    });

    //authenticate user logged in w react router
    app.get("/api/checklogin", function(req,res) {
        if (req.session.loggedin) {
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    })

    // Create account
    app.post("/api", function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;

        if (username && password && email) {
            var accountGetObj = {
                username: username
            };

            db.User.findAll({ where: accountGetObj }).then(function (results) {
                // console.log("this works: " + results.length);
                if (results.length === 0) {
                    var hashed_password = crypto.createHash("sha1").update(req.body.password).digest("hex");
                    var postObj = {
                        username: username,
                        password: hashed_password,
                        email: email
                    }
                    db.User.create(postObj).then(function (results2) {
                        res.send({
                            statusString: "userCreateSuccess"
                        });
                    });

                } else {
                    res.send({
                        statusString: "userAlreadyExists"
                    });
                }
            });

        } else {
            res.send({
                statusString: "formNotComplete"
            });
        }
    });

    // get profile info
    app.get("/api/profile", function(req,res) {
        if (req.session.loggedin) {
            db.User.findOne({
                where: {
                    id: req.session.userID
                }
            })
            .then(function(results) {
                res.json(results);
            })
            .catch(err=>console.log(err));
        } else {
            res.sendStatus(404)
        }
        
    });

    app.put("/api", function(req,res) {
        // console.log("UPDATE VALUES: " + JSON.parse(req.body));
        // console.log("STATE: " + typeof req.body.state);
        // console.log("USERID: " + req.session.userID);
        db.User.update(
            req.body,
            {
                where: {
                    id: req.session.userID
                }
            }
        ).then(function(result) {
            // res.json(result);
            // res.send("profileUpdated");
            res.sendStatus(200)
        })
    });

    // create event
    app.post("/api/calendar", function(req,res) {
        if (req.session.loggedin) {
            let requestData = req.body;
            requestData.UserId = req.session.userID;
            db.Event.create(requestData)
                .then(function (results) {
                res.send({
                    statusString: "eventCreated"
                });
            }).catch(err => res.send(err));
        } else {
            res.status(400).end();
        }
        
    });

    // get events for calendar
    // Protect API so people can't see stored events via Postman, etc????
    app.get("/api/calendar", function(req, res) {
        if (req.session.loggedin) {
            db.Event.findAll({ where: { UserId: req.session.userID }}).then(function(results) {
                res.json(results);
            });
        } else {
            res.status(400).end();
        }
        
    });

    // searching for players with availibility on chosen day
    app.get("/api/calendar/propose", function(req, res) {
        if (req.session.loggedin) {
            db.Event.findAll({ where: { 
                [Op.and]:[
                {start: { [Op.like]: req.query.date + "%" }},
                {UserId: {[Op.not]: req.session.userID}},
                {eventStatus: "available"}]
             }}).then(function(results) {
                res.json(results);
            });
        } else {
            res.status(400).end();
        }
        
    });

    // overlap of schedule between users
    app.get("/api/overlap", function (req, res) {
        // This uses User 1 as the input into the query. All returns are in reference to User 1's events. Change this by changing the createdByUser = values in the query
        // let userNum=req.body.userNum;
        let userNum=1;
        sequelize.query("SELECT t2.*, t1.id overlapWithEventID, t1.UserID chosenUser, t3.username eventUserName FROM events t1 JOIN events t2 JOIN users t3 WHERE t1.UserID = " + userNum + " AND t3.id = t2.UserID AND t2.UserID != " + userNum + " AND date(t1.end) >= CURDATE() AND TIMESTAMPDIFF(MINUTE, GREATEST(t1.start, t2.start), LEAST(t1.`end`, t2.`end`)) >= 30;", {type: Sequelize.QueryTypes.SELECT}).then(function (result) {
          res.json(result);
        });
      });

    //   part of overlap test , getting a users events
      app.get("/api/events/:user", function(req,res){
        db.Event.findAll({
          where: {
            UserId: req.params.user
          }
        }).then(function(userEvents){
          res.json(userEvents);
        }).catch(function(error) {
          console.log(error);
        })
      });

    //   path to log a user out of sessions
      app.get("/logout", function(req,res) {
        req.session.destroy();
        res.redirect("/");
      });

    // Delete an example by id
    //   app.delete("/api/examples/:id", function(req, res) {
    //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
    //       res.json(dbExample);
    //     });
    //   });
};