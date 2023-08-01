# PowerMate Frontend

Includes the code for the mobile application of the PowerMate system 

## Setup

`$ yarn` to install dependencies

`$ npx expo start` to start the expo server

You can run the application either on your device, in an android simulator or an iOS simulator.

For this, after executing the start command, either press in your terminal:

- `a`: to run on an android simulator
- `i`: to run on an iOS simulator
- `Scan QR-Code`: to open with your phone

## Testing strategy

The application counts with Appium tests, which can only be run locally or in device farm, due to limitations with GitLab runner performance when building the apk.

For running these refer to the [official Appium guide](https://www.javatpoint.com/appium)



