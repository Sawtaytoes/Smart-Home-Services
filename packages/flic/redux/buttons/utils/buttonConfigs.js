const {
	ACTION_SET,
	MULTI_ACTION_SET,
} = require('./buttonActionSets')

const COLOR = {
	BLACK: 'black',
	CYAN: 'cyan',
	GREEN: 'green',
	WHITE: 'white',
}

const buttonConfigs = {
	'80:e4:da:72:4c:20': {
		...MULTI_ACTION_SET.ALL_KITCHEN,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.BLACK,
		location: "Kitchen Garage Doorway",
	},

	'80:e4:da:72:a8:62': {
		...ACTION_SET.GUEST_BEDROOM_CLOSET,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Guest Bedroom Closet Entryway",
	},

	'80:e4:da:72:60:ce': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Kevin's Desk",
	},

	'80:e4:da:72:60:e2': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Living Room Kitchen Entrance",
	},

	'80:e4:da:72:3d:6b': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Office Entryway",
	},

	'80:e4:da:72:3a:24': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Bedrooms Hallway",
	},

	'80:e4:da:72:4d:9e': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Dining Room Entryway",
	},

	'80:e4:da:72:a8:bc': {
		...ACTION_SET.LAUNDRY_ROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Laundry Room Entryway",
	},

	'80:e4:da:72:a8:e3': {
		...ACTION_SET.KIDS_BEDROOM_CLOSET,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Kids Bedroom Closet Entryway",
	},

	'80:e4:da:72:3c:c9': {
		...ACTION_SET.ASHLEE_VANITY,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Ashlee's Vanity",
	},

	'80:e4:da:72:5a:41': {
		...ACTION_SET.BASEMENT,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Basement Door",
	},

	'80:e4:da:72:62:9e': {
		...ACTION_SET.COLISSIO,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.GREEN,
		location: "Kevin's Desk",
	},

	'80:e4:da:72:aa:5b': {
		...ACTION_SET.DINING_ROOM,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Dining Room Entryway",
	},

	'80:e4:da:72:a8:9e': {
		...ACTION_SET.DINING_ROOM,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Dining Room Kitchen Doorway",
	},

	'80:e4:da:72:a8:bf': {
		...ACTION_SET.EAT_IN_KITCHEN,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Eat-In Kitchen and Family Room Corner",
	},

	'80:e4:da:72:4c:01': {
		...ACTION_SET.FAMILY_ROOM,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.BLACK,
		location: "Eat-In Kitchen and Family Room Corner",
	},

	'80:e4:da:72:63:3c': {
		...ACTION_SET.GUEST_BATHROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.GREEN,
		location: "Guest Bathroom Toilet Wall",
	},

	'80:e4:da:72:62:29': {
		...ACTION_SET.GUEST_BATHROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.GREEN,
		location: "Guest Bedroom Tub Wall",
	},

	'80:e4:da:72:45:77': {
		...MULTI_ACTION_SET.GUEST_BEDROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Guest Bedroom Wall",
	},

	'80:e4:da:72:35:d3': {
		...ACTION_SET.KEVIN_VANITY,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Kevin's Vanity",
	},

	'80:e4:da:72:a8:a1': {
		color: COLOR.WHITE,
		location: "Unused Buttons",
	},

	'80:e4:da:72:9d:27': {
		...MULTI_ACTION_SET.KITCHEN,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Kitchen Garage Doorway",
	},

	'80:e4:da:72:a8:c1': {
		...ACTION_SET.KITCHEN_SINK,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Kitchen Sink",
	},

	'80:e4:da:72:98:19': {
		...MULTI_ACTION_SET.KITCHEN,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Living Room Kitchen Entrance",
	},

	'80:e4:da:72:ab:3d': {
		...ACTION_SET.KIDS_BEDROOM_VANITY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.CYAN,
		location: "Kids Bedroom Vanity",
	},

	'80:e4:da:72:a3:49': {
		...MULTI_ACTION_SET.MASTER_BATHROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.CYAN,
		location: "Master Bathroom Entrance",
	},

	'80:e4:da:72:4d:eb': {
		...MULTI_ACTION_SET.MASTER_BEDROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Ashlee's Bedstand",
	},

	'80:e4:da:72:40:7c': {
		...MULTI_ACTION_SET.MASTER_BEDROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Kevin's Bedstand",
	},

	'80:e4:da:72:a5:96': {
		...ACTION_SET.MASTER_CLOSET,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.CYAN,
		location: "Master Bedroom Closet Doorway",
	},

	'80:e4:da:72:a8:60': {
		...ACTION_SET.SHOWER,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Master Bedroom Shower Entryway",
	},

	'80:e4:da:72:af:40': {
		...ACTION_SET.MASTER_TOILET,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.CYAN,
		location: "Master Bathroom Toilet Area",
	},

	'80:e4:da:72:5f:2b': {
		...MULTI_ACTION_SET.KIDS_BEDROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Kids Bedroom Wall",
	},

	'80:e4:da:73:5d:fd': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Office Entrance",
	},

	'80:e4:da:73:5f:8b': {
		...MULTI_ACTION_SET.MASTER_BEDROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Master Bedroom Entrance",
	},

	'80:e4:da:73:60:00': {
		...ACTION_SET.GUEST_BEDROOM_VANITY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.CYAN,
		location: "Guest Bedroom Vanity",
	},

	'80:e4:da:73:60:04': {
		...ACTION_SET.THEATER,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.GREEN,
		location: "Kitchen Desk Side",
	},

	'80:e4:da:73:64:ab': {
		...ACTION_SET.LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Living Room Kitchen Entrance",
	},

	'80:e4:da:73:66:dd': {
		color: COLOR.WHITE,
		location: "UNUSED",
	},

	'80:e4:da:76:e1:c6': {
		...ACTION_SET.KITCHEN_BATHROOM,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Kitchen Bathroom",
	},

	'80:e4:da:77:0c:d8': {
		...ACTION_SET.OFFICE,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Kevin's Desk for Testing",
	},
}

module.exports = buttonConfigs
