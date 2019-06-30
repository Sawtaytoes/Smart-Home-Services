#!/usr/bin/env node
require('better-module-alias')(__dirname)

module.exports = {
	buttonPresses: require('$redux/buttonPresses').buttonPresses,
	connections: require('$redux/connections').connections,
}
