# Getir Backend Challenge

## Introduction

The purpose of this challenge is to create a RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format.

## Table of Contents

1. <a href="#link-to-hosted-app">Link to Hosted App</a>
2. <a href="#link-to-swagger-doc">Link to Swagger Doc</a>
3. <a href="#tech-stack-used">Tech Stack Used</a>
4. <a href="#application-features">Application Features</a>
5. <a href="#how-to-use">How To Use</a>
6. <a href="#author">Author</a>
7. <a href="#license">License</a>

## Link to Hosted App

- [API link](#)

## Link to Swagger Doc

- [Swaager Doc link](#)

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Application Features

- Fetch records based on a given startDate, endDate, minCount and maxCount

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash

# Clone this repository
$ git clone https://github.com/teepha/getir-backend-challenge.git

# Navigate into the cloned repository
$ cd getir-backend-challenge

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the sample.env file and provide the keys

# Run the app
$ npm start

# Check the port on the specified port on the env or 4000

# Run test
$ npm run test
```

## API endpoints

**Base_URL**-> localhost:4000/api/

  - Fetch records:
    
  ```{
    path: 'records',
    method: POST,
    body: {
    startDate: <string>,
    endDate: <string>,
    minCount: <integer>,
    maxCount: <integer>
    }
  } ```
 


## Author

Lateefat Amuda

## License

ISC

---
