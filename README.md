# Spotcase

###Codebreakers-Web-Tech-Hackathon-Project

Prerequisites - Nodejs and postresql must be installed in the system in order to be able to run this project.

Link to video presentation - 

Link to description file - 

## Run the project 

In order to run the project first you need to clone the project in an empty directory, and open 2 terminal in that directory.
The run `cd server` and `cd client` on each terminal to change to the respective directory, and run the following command on both: 

```
npm install
```
### Set up the postgres database in the project.

Create a .env file on the server folder, and set the following

```
PASSWORD=<your password>
jwtSecret=<a string for your jwt. sort of like a password>
database=<Name of the postgres database you are useing>
```

This should allow your nodejs application to use your postgres database.

### Run server

Run `npm run dev` on the terminal of server directory.
Run `npm start` on the terminal of the client directory.

This should allow you to run the project on the browser now.

Raise an issue, if these steps doesn't work on your computer.

## Bugs
There are a few warnings on the frontend, such as a useEffect dependency warning and a few unused imports here and there.
As these are minor fixes, I left them as it is for now, due to time constraint, but will resolve them as soon as possible.
Other than that, there's a error which occurs on startup of the react app, which I need some resesarch on, but it could be due to some issue in one of the dependencies. But as it also doesn't crash or effect the app, I left it for after the hackathon as well. Upon installation, react issues a warning about a high risk issue, which I haven't paid much heed to, although I am aware it wouldn't be wise to ignore it entirely. Other than that, the app works fine on the surface, but upon testing, I am sure there will be plenty to take care of. 

## Future plans
I do plan on working on this project further to transform this into something production ready. Profile page, and comment sections are the first on my priority list of things that I would try implementing. Then I would try to make it complete with settings and sorting options, and might progressively add new features afterwards, like groups and followers.



