#!/usr/bin/env node
require('better-module-alias')(__dirname)

module.exports = {
	devices: require('$redux/devices').devices,
}
