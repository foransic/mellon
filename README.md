# mellon
Secured notes webapp

## Description

Mellon is a secured notes webapp. Secured, because all the stored informations are encrypted with the passphrase provided.

This passphrase is never stored, so you are the only one to know it. By contrast, if you lose it, you will never get your data back ;-)

## Technologies
- Node.js
- MongoDB
- EJS
- Bootstrap
- jQuery

## Requirements
Except the current project, you will need a mongoDB server, node & NPM.

## Installation
- Download the project `git clone https://github.com/foransic/mellon.git`
- Get node modules `npm install`
- Create your own config file depending to your environment, based on config.sample.js
- Start the app `node app.js`

## Testing
- Tests are based on mocha
- Use `mocha` command to launch the test

## Known issues & improvements
Properly manage errors

## Changelog
- 0.0.1 - first version
