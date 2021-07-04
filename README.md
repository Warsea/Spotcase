# Spotcase

###Codebreakers-Web-Tech-Hackathon-Project

Prerequisites - Nodejs and postresql must be installed in the system in order to be able to run this project.

Project folder - https://drive.google.com/drive/folders/1V5BJieeszn3rUPhLUZ_2igOfnVwmehVe?usp=sharing

Video presentation - https://drive.google.com/file/d/1VM9pcaSzxQhsKtIT1tfK8Ww8iDS8J2CD/view?usp=sharing

Project description - https://drive.google.com/file/d/1eYdC1Z2BcG70igI6OIXQLr1zdDr94n9h/view?usp=sharing


## Details
This is a platform wher people can easily submit their projects and share it with others, regardless of the field of interest. See the description file in the link above for more details.



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

Email me in case you have issues running the project in your computer.


## Breakdown
This project was built with Reactjs on the frontend connected to the server through a REST API build using Nodejs with the Expressjs, and Postgresql as the database. A fairly secure authentication system has been implemented, which uses jwt to verify the user. The server hashes the password before inserting it into the database. 

With the help of the React Context API, the global state can be imported to any components in the components tree with ease. A library called react-bootstrap is used to create the UI so that it looks neat and standard. Users can create posts, see other’s posts and vote for it if they’d like to. In order to fetch data from the server, a library called Axios has been used, which makes getting and posting requests easy. The application will automatically fetch new posts from the server once the user approaches the end of the page.

On the backend, multer has been set up to handle the image uploaded by the user, and pg has been used to connect Nodejs to the database, and save and get whatever data is necessary. The usual required libraries like cors and dotenv have also been used.


## Bugs
There are a few warnings on the frontend, such as a useEffect dependency warning and a few unused imports here and there.
As these are minor fixes, I left them as it is for now, due to time constraint, but will resolve them as soon as possible.
Other than that, there's a error which occurs on startup of the react app, which I need some resesarch on, but it could be due to some issue in one of the dependencies. But as it also doesn't crash or effect the app, I left it for after the hackathon as well. Upon installation, react issues a warning about a high risk issue, which I haven't paid much heed to, although I am aware it wouldn't be wise to ignore it entirely. Other than that, the app works fine on the surface, but upon testing, I am sure there will be plenty to take care of. 

## Future plans
I do plan on working on this project further to transform this into something production ready. Profile page, and comment sections are the first on my priority list of things that I would try implementing. Then I would try to make it complete with settings and sorting options, and might progressively add new features afterwards, like groups and followers.



