# Work-timer

## Inspiration

To aid in focusing on completion of tasks (without interruption), I employ the pomodoro timer technique on a regular basis. The idea is to set a goal and timer for around 25 minutes and then only focus on that goal until the timer is up. Even though there are myriad timer apps out there, I thought it would be a great learning experience to build one myself.

The first iteration of the work timer was a simple jQuery app. The second itertation involved re-writing the app into a component based system using React. Initially, there was no backend but over time I realized it might be useful to store the pomodoros so I have a history of time spent on "focused work". The third iteration involved adding in a nodejs backend to allow users to sign in with Google, and also adding connection to a MongoDB instance to store the sessions upon completion.

Even though the project is very simple, I have enjoyed using it as a way to try to implement CICD best practices.

## Features

- Start, Pause, Stop, & Reset Timer
- Set a custom timer Length
- Set a goal to complete during each timer
- See the number of pomodoros completed today

## Premium Features (If you log in)

- Sign in with Google
- When logged in, completed sessions are stored to your account along with the goal
- History page details all completed sessions
- Summary page shows weekly aggregate metrics

## Architecture

### Client

The client is a React app which uses bootstrap for styling and Redux for state management. It was written before hooks and has not been updated to later React releases since I've been more focused on Backend work lately.

### Server

The server is NodeJS and recently re-written in Typescript. The server uses PassportJs to help with the OAuth2 flow and Mongoose to aid in working with MongoDB which is where all the sessions and account info are stored.

**Prerequisites**

- NodeJS
- Npm
- Git

## Setting up the Frontend

### Clone project & Install dependencies

- Clone the project
- `cd` into the project directory. i.e. `cd work-timer-react/`
- Run `npm install` or `yarn` in the root of the project to install all of the UI dependencies.

### Run the Frontend

To run the frontend, execute `npm start` or `yarn start`

A browser should open and navigate to

[http://localhost:3000](http://localhost:3000)

From here, you can change the settings or start a timer!

Note that logging in and saving sessions to MongoDB requires additional configuration (see next steps below)

## Setting up the Backend Server

Setting up the server is much more complicated because it requires configuring an application through the google developer portal and setting up a MongoDB cluster.

### Install dependencies

- cd into the server folder `cd server/`
- Run `npm install` or `yarn` to install dependencies

### Set up application in the Google developer portal

Follow this [guide](https://developers.google.com/identity/sign-in/web/sign-in) to create an app for google sign in.

Once you've completed all the steps, you will need to create a `.env` file in the `server/` folder and fill out these fields:

```
CLIENT_SECRET=<retrieve from google>
CLIENT_ID=<retrieve from google>
CLIENT_HOME_PAGE_URL=<retrieve from google>
```

Check the `.env.sample` file if you are confused

Once that is done, you need to also update the `.env` file in the root of the application to set the redirect URL (If running locally, it should be `http://localhost:8080`

### Set up a MongoDB atlas free instance:

Follow [this guide](https://docs.atlas.mongodb.com/getting-started/) to set up a free MongoDB cluster

Once that is complete, you need to fill out the `MONGO_URI` field in the env file

### Running the Backend Server

Once you have configured everything, you will need to run two terminals. In the first one, run the frontend. In the second one, you will cd into the `server/` folder and then run `yarn dev` or `npm run dev`
