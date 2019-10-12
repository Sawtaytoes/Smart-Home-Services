# WeMo SSDP LAN Controller
[What is this library?](https://github.com/Sawtaytoes/Smart-Home-Services/blob/master/README.md)

WebSockets-based WeMo Controller software.

Allows toggling WeMo devices using the SSDP LAN API. This allows the use of Flic buttons to control WeMo devices without the need for a phone. Just pair them with a device running the Flic SDK and have it fire requests at this HTTP server.

For an example use case, look at [`./app.js`](app.js).

## Installation

### npm
```sh
npm i @smart-home-services/wemo-controller
```

### yarn
```sh
yarn @smart-home-services/wemo-controller
```

## Custom Configuration

### WebSocket Server
To configure the Webpack listener, you have 3 options available to modify in your `./localConfig.js`:

```js
module.exports = {
  // ... other config options ...
  hostname: 'raspberry-pi.local',
  port: 36002,
}
```

## API Overview
*Under Construction*

- [`devices`](#devices)

## API Docs
*Under Construction*
