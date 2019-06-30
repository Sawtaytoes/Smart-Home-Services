const processEnvConfigValues = {
	NODE_ENV: 'env',
	PROTOCOL: 'protocol',
	HOSTNAME: 'hostname',
	PORT: 'port',
}

const createConfigObject = (acc, { key, value }) => ({
	...acc,
	[key]: value
})

const getProcessEnvValue = key => ({
	key,
	value: process.env[processEnvConfigValues[key]],
})

const hasValue = ({ value }) => typeof value !== 'undefined'

module.exports = (
	Object
	.keys(processEnvConfigValues)
	.map(getProcessEnvValue)
	.filter(hasValue)
	.reduce(createConfigObject, {})
)
