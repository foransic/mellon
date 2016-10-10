# mellon
Secured notes webapp

## Description

Mellon is a secured notes webapp. Secured, because all the stored informations are encrypted with the passphrase provided.

This passphrase is never stored, so you are the only one to know it. By contrast, if you lose it, you will never get your data back ;-)

The critical informations are saved on different storage :
- Session secret key (which is used to save passphrase in session), and "Answer" key (which is used to validate the passphrase and get stored notes) are in the config file stored in the project directory, and specific to your server.
- Passphrase is stored in your brain, and nowhere else.
- Notes are stored in MongoDB database, and can be retrieved by a mix of passphrase & answer key.

## Technologies
- Node.js
- Grunt
- Mocha
- MongoDB
- EJS
- Bootstrap
- jQuery

## Requirements
Except the current project, you will need a mongoDB server, node & NPM.

## Installation
- Download the project `git clone https://github.com/foransic/mellon.git`
- Get node modules `npm install`
- Create your own config.js file depending to your environment, based on config.sample.js
- Start the app `node app.js`

## Build

If you wish to change design or behaviour of the application, you will need to use the original CSS (or LESS) and JS file, and minified it with `grunt` command.
`grunt` will launch the tests as well.


## Testing
- Tests are based on mocha
- Use `mocha` command to launch the test

## Known issues & improvements
Properly manage errors

## Changelog
- 0.0.1 - first version
- 0.0.2 - add markdown support
- 0.1.0 - change authentification way.
