# Configuration
Default config values are found in [configs/index.js](configs/index.js).

Create a `custom.js` in `configs/` to override default and `process.env` config values.


## Example
```js
module.exports = {
	env: 'development',
	port: 4000,
}
```


# Config Values

## `env`
Node.js environment. This value can be either `'development'` or `'production'`.

### Environment Variables
`NODE_ENV`

### Example
```
env: 'development',
```


## `hostname`
A string representation of the hostname, domain name, or IP address of the webserver. Usually this is left at either '0.0.0.0' or localhost.

### Environment Variables
`HOSTNAME`

### Example
```
hostname: '0.0.0.0',
```


## `port`
A number representing the port for the webserver to listen.

### Environment Variables
`PORT`

### Example
```
port: 36002,
```


## `protocol`
The protocol used to connect to the webserver. Using `https` requires an SSL certificate in the `cert/` directory.

### Environment Variables
`PROTOCOL`

### Example
```
protocol: 'http',
```
