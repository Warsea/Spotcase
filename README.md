# Spotcase

###Codebreakers-Web-Tech-Hackathon-Project

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
user=<Name of the user of the database>
```

This should allow your nodejs application to use your postgres database.

### Run server

run `npm run dev` on the terminal of server directory.
run `npm start` on the terminal of the client directory.

This should allow you to run the project on the browser now.

Raise an issue, if these steps doesn't work on your computer.
