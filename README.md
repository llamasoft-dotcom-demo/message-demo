# message-demo

This application implements a messaging system for Llamasoft. 

## Required features
* Messages appear near the top of the page.
* Messages fade out after 3 seconds.
* If a new message appears before the previous message fades out, it appears below the most recent visible message.
* Messages have a delete box to dismiss the message before the fade out.

## Extra features
* An indicator was added to let the user know that the messages are running in addition to the text change on the button.
* The layout was updated to make the page more readable, etc. 
* CSS was added to make the page responsive and works on smaller devices.
* A developer pipeline was added to allow for easy installation of development dependencies and testing of the application.
 * Please see package.json file
 * This is a small project so grunt wasn't needed. Used NPM as a task runner.
* A favicon was added as well as various styling choices to make the UI easier to use.
* Msg.html was rewritten extensively. 
 * Language localization
 * Meta tags added
 * CSS classes completely changed in favor of bootstrap
 * Scripts moved to bottom to allow for faster loading of the main HTML
* Msg.css rewritten extensively.
 * Old css removed.
 * Navbar added
 * Footer added
 * Animated glyphicon added
 * Generally more responsive to display changes
* msg.js was rewritten extensively.
 * The loop was mostly the same with some refactoring to remove strange random seeding and simplify in general.
 * Classes were added and OO design principles were used.
 * Javascript to enable the glyphicon animation, button events, and button text changing were added.
 * Code to handle the aggregation and timeout for the alerts.
* A readme.md (this file) was edited.

## Installing the app

Run the command below to install the required files to run this application. 

```
npm install
```

## Running the app

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

```
npm start
```

### Prerequisites

This application requires NodeJS and NPM to be installed. 
The package manager will also only work in a windows environment.

Install NodeJS from: [NodeJS.org](https://nodejs.org/en)

Ensure you have the latest version of NPM by the following command:
```
npm install npm -g
```

## Authors

* **Mark Jazayeri** - *Initial work* - [Mark-Jazayeri](https://github.com/Mark-Jazayeri)

## License

This project is licensed under the ISC License

## Acknowledgments

* Llamasoft


