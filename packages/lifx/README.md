# LIFX Controller
[What is this library?](https://github.com/Sawtaytoes/Smart-Home-Services/blob/master/README.md)

WebSockets-based LIFX Controller software.

For an example use case, look at [`./app.js`](app.js).

## Installation

### npm
```sh
npm i @smart-home-services/lifx-controller
```

### yarn
```sh
yarn @smart-home-services/lifx-controller
```

## Custom Configuration

### WebSocket Server
To configure the Webpack listener, you have 3 options available to modify in your `./localConfig.js`:

```js
module.exports = {
  // ... other config options ...
  hostname: 'raspberry-pi.local',
  port: 36001,
}
```

### LIFX HTTP API Token
Go to [LIFX's cloud settings page](https://cloud.lifx.com/settings) and create a new token for your app. This will go in your `./localConfig.js` as:

```js
module.exports = {
  // ... other config options ...
  lifxApiToken: 'YOUR_LIFX_API_TOKEN',
}
```

### Custom Options for lifx-lan-client
In `./projectConfig.js` or `./localConfig.js`, add a property `lifxLanClient` as an object and its options as properties on that object.

```js
module.exports = {
  lifxLanClient: {
    debug: true,
    messageHandlerTimeout: 2000,
    resendMaxTimes: 3,
  },
}
```

## Testing

### Toggle Group
To test toggling a group, load up a browser, and go to `about:blank`.

Then paste this into the devtools console:
```js
webSocket = new WebSocket('ws://localhost:3000', 'v1')
webSocket.onmessage = console.log
webSocket.onerror = console.error
webSocket.onclose = console.info
webSocket.onopen = () => {
  console.log('READY')

  webSocket
  .send(
    JSON
    .stringify({
      sceneName: 'My Scene Name',
      type: 'REQUEST::TOGGLE_SCENE',
    })
  )
}
```

You can have the WebSocket client reconnect when the app is reloaded by pasting this code instead:
```js
restartWebSocket = () => {
  webSocket = new WebSocket('ws://localhost:3000', 'v1')
  webSocket.onmessage = console.log
  webSocket.onerror = console.error
  webSocket.onclose = () => setTimeout(restartWebSocket, 5000)
  webSocket.onopen = () => {
    console.log('READY')

    webSocket
    .send(
      JSON
      .stringify({
	      sceneName: 'My Scene Name',
	      type: 'REQUEST::TOGGLE_SCENE',
      })
    )
  }
}
restartWebSocket()
```

## API Overview
*Under Construction*

- [`actionsBlacklist`](#actionsblacklist)
- [`groups`](#groups)
- [`lifxNetwork`](#lifxnetwork)
- [`lights`](#lights)
- [`scenes`](#scenes)

## API Docs
*Under Construction*
