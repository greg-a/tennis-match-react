# TennisMatch

Deployed application: <https://tennis-match-react.herokuapp.com/>

### Developers
[Greg Allebach](https://www.github.com/greg-a), [Jarrett Dougherty](https://www.github.com/JarrettD5309) & [Patrick Urbankowski](https://www.github.com/psu23)

### Deployed
September 2020

### **App Pictures**

<kbd><img src="md_images/tennis-match-login.png" alt="TennisMatch login" width="500"/></kbd>

<kbd><img src="md_images/tennis-match-cal.png" alt="TennisMatch scheduler" width="500"/></kbd>

<kbd><img src="md_images/tennis-match-chat.png" alt="TennisMatch messenger" width="500"/></kbd>

<kbd><img src="md_images/tennis-match-requests.png" alt="TennisMatch requests" width="500"/></kbd>

### **What is TennisMatch?** 

TennisMatch is an interactive scheduling application that helps players to schedule tennis matches with other players. It allows app users to share their availability and find other people to play tennis with. An easy-to-use interface assists with this process and allows others to schedule games with you based on your availability. Through the messenger, users can communicate directly with other players.

<!-- The messenger allows you to communicate directly with other players.   -->

<!-- The app lets you find others to play with, and allows others to schedule games with you based on your availability in an easy-to-use interface.  -->

**Motivation behind developing TennisMatch**

We wanted an easy way to schedule tennis matches with other people in our area.

### **How do I use TennisMatch?**

* First, create an account or log in. If you do not wish to create an account, feel free to log in with the dummy account: 
```
username: TennisUser 
password: TennisPassword
```
* On the home page you will see the feed which shows you recently confirmed events by yourself and other users.
* On the Profile page you may include more information about yourself including your location.
* If you want to share you availability (this will be public and allow others to find you) you can either click on the (+) or the (calendar) tab. 
* If you want to search for others' availability, you can go to Propose Match, and search for the date you wish to play on. It will list all the players who are seeking someone to play with on the choosen date. Here, you may then propose a specific time to play with a player within their availability.
* You can also propose a match to a specific player by clicking 'Propose Match to Player'. 
* Watch for notifications in the [tennis racket icon] drawer. If somebody has sent you a request to play, there will be a notification dot. Requests from other players to play with you will appear in Requests. You may then confirm or deny these requests.
* All of your availability, proposed matches and confirmed events will appear on the [scheduler (calendar icon here)] page.
* You may also communicate with other players directly by going to Messenger (messenger icon here). 


### **Technologies used**

* MySQL
* Express.js
* React.js
* Node.js
* Crypto
* CSS3
* FullCalendar
* HTML5
* Javascript
* Material-UI
* Moment.js
* React Router
* Sequelize
* Socket.io

### **Plans for future development**
            
* Integrate other social media platforms to aid in building your profile and connections
* Integrate a map to find local courts
* Sync app's calendar with Google Calendar API
* Group chat
* Convert app to React Native
* Finding and matching user with other users based on their skill level
* More robust login system (including: password recovery and email authentication).