# Ivanti
Daniela Berzina's technical test for the Associate Software Engineer position.

I chose to complete the technical test using **Node.js** and **React**. This file introduces the structure and features of the project, along with set-up instructions and a user guide.
The backend is built using **Node.js** and **Express**. The frontend is built with **React**, **Axios**, and **Bootstrap**.

The project creates an API service for receiving temperature inputs, returning the temperature closest to 0. The supporting React app makes requests to the API and displays the temperature data in a chart.

## Pre-requisites
- Must have npm installed: 
`https://docs.npmjs.com/downloading-and-installing-node-js-and-npm`
#
1.  Clone this repository
2.  Open a terminal window and navigate to the 'backend' project folder
3.  Run `npm install` to get all the dependencies for the project
4.  Repeat this process in the 'frontend/temp-app' folder
#

## Node.js backend / API
The backend is implemented using Node.js/Express and provides a simple API for submitting temperature data and getting the value closest to 0.

To run the backend program:
1.  Open a terminal and navigate to the project location on your system
2.  Navigate to the 'controller' folder inside 'backend'
3.  Write `Node TempController.js` to compile and execute the file
4.  `Listening on port 5000` should appear on the terminal

The API listens for requests on port 5000 and accepts the following requests:
 -   `http://localhost:5000/calc` accepts HTTP POST requests, returns the temperature calculated to be closest to 0.
 - The temperatures must be provided as a numerical array in JSON format:
` {"temperatures": [..., ..., ...]}`.
 - The request will be rejected if the provided values are non-numerical or if the JSON body is malformed.
 #
 The backend is structured as follows:
 - **TempController.js** is responsible for setting up the Express app and receiving requests.
 - **TempService.js** is used for utility methods for calculations on temperature data.
 
## React frontend

The frontend is implemented using React, Axios, and Bootstrap, and accepts temperature data input for API requests, producing a chart of the data.

To run the frontend app:
1.  Open a new terminal and navigate to the 'frontend/temp-app' folder
2.  Run `npm start` and wait for the app to launch

Currently, the only available page is the **Temperatures** page, which contains a form for submitting temperatures and a chart of the submitted data.
