# DocuCare

A full-stack electronic medical records (EMR) single page application built with MVVM architecture and a RESTful API. Displays clinic schedule, retrieves and updates patient health history, and accesses hundreds of diagnoses and ICD-10 codes.

<img width="1438" alt="Screen Shot 2021-12-21 at 10 31 02 AM" src="https://user-images.githubusercontent.com/77894900/146973436-7ed69a61-cf27-4740-8205-9d22f827ba70.png">

## Demo

Demo of the app hosted at: https://DocuCare.herokuapp.com

## Features

* Automatically resizing textareas.
* Patient records automatically update-as-you-type to server.
* Popover when hovering over patients to quickly preview patient records without disrupting workflow.
* Searchbar suggestions as you type when searching for records or diagnoses.
* Access to hundreds of diagnoses and ICD-10 (International Classification of Diseases, Tenth Revision) codes. 

## Technologies

* [MongoDB](https://www.mongodb.com)
  * [mongoose](https://mongoosejs.com)
* [Express](https://expressjs.com)
* [Vue 3](https://v3.vuejs.org)
* [Node](https://nodejs.org/en/)
* [Bootstrap 4](https://getbootstrap.com)

## Getting Started

```bash
# Clone project 
git clone https://github.com/anle9650/DocuCare.git

# Install dependencies
npm install

# Load sample data
node providerSeed.js
node patientSeed.js
node recordSeed.js

# Run local server
npm start
```

> Visit in browser: http://localhost:3000

## Directory Structure

```
├── public                     // public assets 
│   ├── css                    // css
│   ├── js                     // js
│   │    ├── DocuCareApp.js    // entry for loading components, initialization 
│   │    └── components        // global public components 
│   ├── favicon.ico            // favicon
│   └── index.html             // html template
├── models                     // models
├── views                      // views
├── controllers                // controllers
├── routes                     // request routes
├── main.js                    // entry for server initialization
├── .gitignore                 // gitignore 
├── package.json               // package.json
├── providerSeed.js            // load sample provider
├── patientSeed.js             // load sample patients
└── recordSeed.js              // load sample records
```

## API Documentation

### Fetch
``` bash
GET /api/records?provider={providerID}&date={date}&nameStarts={nameStarts}&patient={patientID}&diagnosis={diagnosis}
GET /api/patients/:id
```
### Patch
``` bash
PATCH /api/records/:id/patch

# request body (all optional)
{
 "hpi": string,
 "ros": string,
 "exam": string,
 "assessment": string
}
```

``` bash
PATCH /api/records/:id/addDiagnosis/:diagnosis
PATCH /api/records/:id/removeDiagnosis/:diagnosis
```

## Acknowledgments

* [axios](https://axios-http.com/docs/intro)
* [popperjs](https://popper.js.org)
* [National Library for Medicine Clinical Table Search Service](https://clinicaltables.nlm.nih.gov/apidoc/icd10cm/v3/doc.html)
