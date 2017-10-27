# EmailWorkflow
A Gulp workflow to maintain a data files and use them to maintain modular emails.

## Usage
Having installed [NPM/Node.js](https://nodejs.org/en/) and Gulp globally (npm install gulp-cli -g) or (sudo npm install gulp-cli -g) if the first way doesn't work. Clone this repo and then run:

`npm install`

### Development of Emails
`gulp watch`

This will start the server and let you watch changes to the files as you change the templates. The changed files will go into the build folder and can be deployed from there.


### Folder Structure
```
.
├── build          -> Built emails, and css files 
├── src            -> All files necessary to create content in the emails
    ├── data            -> Where all the json files are stored
    ├── emails          -> Nunjuck files for individual emails
    ├── scss            -> Sass for inlining css
    ├── templates       -> Nunjuck files that make up components and general templates of the emails
        ├── macros          -> Allows you to define reusable chunks of content, similar to a function in a programming language
        ├── partials        -> Components that can be reused in the templates
            ├── components        -> Specific components broken down by template usage
```

## Complex Breakdown

### Using .Json file data in templates
Use .json files to store data that will be pulled into nunjucks templates by using it's name. Example: 

`caevent: require('./src/data/events/UCD-2017-CA.json')`

This would be referenced as: caevent in the eventSlug or thematicSlug area. When referencing any of it's json parts you need to list it as caevent.eventPresentors or caevent.eventHotel. This is countered by my creating an area that saves all the variables as the version with the eventSlug or thematicSlug in front of them. Example:

`{% set eventHotel = eventSlug.eventHotel -%}`
