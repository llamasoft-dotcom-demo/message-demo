![](http://jpsierens.com/wp-content/uploads/2016/06/react-eco-wp.gif)

# Implemented by HAMED P

![](https://preview.ibb.co/gPidE5/Screen_Shot_2017_08_19_at_7_09_42_PM.png)

# Message Demo Excercise
This project is created using a react, redux, and react-router with the help of webpack to bundle all files.

Contains:

* a working example of a button that triggers a message-notification simulator.
* it also has a text field (controlled component) connected to the Redux store.
* ES6/7 Support with Babel.
* ```jQuery``` was removed, and ```lodash``` is used instead of ```underscore```.
* bootstrap styling and components for quick implementation of appealing visuals.
* a toaster/notification package compatible with Redux.
* Redux dev tools to keep track of the app's state.
* routing and deep linking.
* hot module replacement (HMR) support so you can change modules or react components without having to reload the browser
* a webpack production config so you can build the app and make it ready for production
* sass and css module support that prevents style-bleeding due to hashing
* autoprefixer package to automatically add the vendor prefixes and remove the unnecessary CSS styles
* eslint to keep the code more readable
* ```shrinkwrap``` is used to lock package versions to avoid potential package discrepancies in future.
* ```immutable``` library was not used. I write pure functions and follow functional paradigm myself, and don't need a library to do the job for me.
* much more...



## Run the app in 'dev' mode:

0. ```npm install```
0. ```npm run dev```


## See the project:

``` http://localhost:9000/  ```


## The redux Dev-Tools settings:
Use the following key combinations after the page is loaded to hide/reposition the Redux dev tools.

```Toggle Visibility Key : CTRL + H```

```Change Position Key : CTRL + W```

## How does the simulator engine work?

Because components render automatically as soon as there is a change to the state/props, the process of sending messages at random times was hard to achieve using normal react lifecycle hooks without sending the app into an infinite/dead loop. I figured this can be done by utilizing the new async/await feature of ES7 to make delays between each rendering. The async/await would work asynchronously with promises, but it's more readable as the code reads like a synchronous code. (Use of '```generator```' functions with '```yield```' could possibly be a better option though). In a real life scenario a more mature setup is required or the data will be provided to the notification component differently.

Implemention of the simulator wasn't the scope of the excercise, and hence I didn't spend much time on it. Please note that there will be two seconds delay before the simulation engine kicks in.

## Build the app for production
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.

![](http://i.imgur.com/uUg2A3S.png)

It should look something like the above image.
