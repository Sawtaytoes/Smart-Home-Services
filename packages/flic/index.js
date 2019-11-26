#!/usr/bin/env node
require('better-module-alias')(__dirname)

module.exports = {
	buttons: require('$redux/buttons').buttons,
	connections: require('$redux/connections').connections,
}
