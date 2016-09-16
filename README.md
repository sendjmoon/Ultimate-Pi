# Ultimate Pi
`Ultimate Pi` is a full-stack application allowing a client to use a `Raspberry Pi` as an infrared remote. This is done by making HTTP requests to the API which in-turn commands the `Pi` to send the requested signal to the specified device.

To utilize the full power of this application it is required you have a `Raspberry Pi`. It is also required the `Pi` has an infrared transceiver. Without one you can still use the application excluding the physical functionality to operate an infrared receiving device.

## Instructions
To start, you will need to sign-up as a registered user at http://ultimate-pi.herokuapp.com. Upon successful registration the homepage will render with the available buttons programmed to our specified device. Simply click one of the buttons and see the `Pi` do it's work!

## Installation
First, clone down this repo to your `Pi`. Next, `cd` into the cloned directory and in your command-line interface type `npm i` to install necessary dependencies found in the `package.json` file. Finally, in your CLI run `node app.js` to have the `Pi` ready to listen for commands.

## Testing
To run tests type `npm run test` in your CLI. This should use `Karma` to test this front-end application.
