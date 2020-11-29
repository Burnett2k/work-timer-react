# Work-timer

To aid in focusing on completion of tasks (without interruption), I employ the pomodoro timer technique on a regular basis. The idea is to set a goal and timer for around 25 minutes and then only focus on that goal until the timer is up.

## Features

- Start, Pause, Stop, & Reset Timer
- Set a custom timer Length
- Set a goal to complete during each timer
- See the number of pomodoros completed today

## Premium Features

- Sign in with Google
- When logged in, completed sessions are stored to your account
- History page details all completed sessions
- Summary page shows weekly aggregate metrics

## Architecture

## Client

The client is a React app which uses bootstrap for styling and Redux for state management.

## Server

The server is optional and is what allows the sign-on capabilities. The server uses PassportJs to help with the OAuth2 flow and Mongoose to aid in working with the MongoDB which is where all the sessions and account info is stored.

**Prerequisites**

- NodeJS / npm
- Git

Installing is easy. Simply clone the project and run
`npm install` in the root of the project. If you use yarn, replace npm with yarn

## Getting Started

To run on your local machine, cd into the project directory

`cd work-timer-react/`

To start the server, run

`npm start`

A browser should open and navigate to

[http://localhost:3000](http://localhost:3000)

From here, you can change the settings or start a timer!

###
