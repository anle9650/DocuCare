# DocuCare

A full-stack electronic medical records (EMR) app built with MVVM architecture and a RESTful API. Features a single page application that displays clinic schedule, retrieves and updates patient health history, and accesses hundreds of diagnoses and ICD-10 codes.

<img width="1438" alt="Screen Shot 2021-12-21 at 10 31 02 AM" src="https://user-images.githubusercontent.com/77894900/146973436-7ed69a61-cf27-4740-8205-9d22f827ba70.png">

## Demo

Demo of the app hosted at: https://DocuCare.herokuapp.com

## Features

* Clincal schedule on sidebar.
* Automatically-resizing textareas.
* Patient records automatically update-as-you-type to server.
* Popover on hover over patients to quickly preview patient records witihout disrupting workflow.
* Searchbar suggestions as you type.
* Access to hundreds of diagnoses and ICD-10 (International Classification of Diseases, Tenth Revision) codes. 

## Technologies Used

* [MongoDB](https://www.mongodb.com)
* [Express](https://expressjs.com)
* [Vue](https://v3.vuejs.org)
* [Node](https://nodejs.org/en/)

## Getting Started

```bash
# Clone project 
git clone https://github.com/anle9650/InveStats.git

# Install dependencies
npm install

# Load sample data
node server/PortfolioSeed.js
node server/StockSeed.js

# Run local server
npm start
```

> Visit in browser: http://localhost:3000

## Directory Structure

```
├── client                         // client build
│   ├── vue.config.js              // config
│   ├── public                     // public assets
│   │   ├── favicon.ico            // favicon
│   │   └── index.html             // html template
│   ├── src                        // source code
│   │   ├── assets                 // static resource like themes, fonts
│   │   ├── components             // global public components
│   │   ├── App.vue                // entry view
│   │   └── main.js                // entry for loading components, initialization
│   ├── babel.config.js            // babel-loader config
│   ├── .gitignore                 // gitignore
│   └── package.json               // package.json
├── server                         // server build
│   ├── public                     // public assets 
│   │   ├── css                    // css
│   │   ├── js                     // js
│   │   ├── favicon.ico            // favicon
│   │   └── index.html             // html template
│   ├── models                     // models
│   ├── controllers                // controllers
│   ├── routes                     // request routes
│   ├── index.js                   // entry for server initialization
│   ├── portfolioSeed.js           // load sample portfolio
│   └── stockSeed.js               // load sample stocks
├── .gitignore                     // gitignore 
└── package.json                   // package.json
```

## Acknowledgments

* [Bootstrap](https://getbootstrap.com)
* [apexcharts](https://apexcharts.com/docs/vue-charts/)
* [vue-carousel](https://www.npmjs.com/package/@chenfengyuan/vue-carousel)
* [mongoose](https://mongoosejs.com)
* [Alpha Vantage](https://www.alphavantage.co)
* [News API](https://newsapi.org)
