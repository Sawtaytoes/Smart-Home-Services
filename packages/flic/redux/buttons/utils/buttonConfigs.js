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
	// ------------------------------------
	// Blueberry-Pi
	// ------------------------------------

	'80:e4:da:7a:69:6f': {
		...ACTION_SET.DINING_ROOM,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Kitchen",
		room: "Dining Room",
	},

	'# 80:e4:da:7a:71:81': {
		...ACTION_SET.EAT_IN_KITCHEN,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "West Deck Door",
		room: "Eat-in Kitchen",
	},

	'80:e4:da:7a:be:24': {
		...ACTION_SET.THEATER,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.BLACK,
		location: "Kitchen Desk",
		room: "Family Room",
	},

	'80:e4:da:7a:6a:36': {
		...ACTION_SET.FAMILY_ROOM,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "West Deck Door",
		room: "Family Room",
	},

	'80:e4:da:7a:be:3b': {
		...MULTI_ACTION_SET.ALL_KITCHEN,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.BLACK,
		location: "Garage Kitchen Door",
		room: "Kitchen",
	},

	'80:e4:da:7a:69:86': {
		...MULTI_ACTION_SET.KITCHEN,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Garage Kitchen Door",
		room: "Kitchen",
	},

	'80:e4:da:7a:6a:5b': {
		...ACTION_SET.KITCHEN_SINK,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Kitchen Sink",
		room: "Kitchen",
	},

	'80:e4:da:76:e1:c6': {
		...ACTION_SET.KITCHEN_BATHROOM,
		bluetoothHost: "Blueberry-Pi",
		color: COLOR.WHITE,
		location: "Kitchen Bathroom Door",
		room: "Kitchen Bathroom",
	},


	// ------------------------------------
	// Cherry-Pi
	// ------------------------------------

	'80:e4:da:7a:c1:0b': {
		...ACTION_SET.ASHLEE_VANITY,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Ashlee's Vanity",
		room: "Master Bathroom",
	},

	'80:e4:da:7a:bf:a2': {
		...ACTION_SET.KEVIN_VANITY,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Kevin's Vanity",
		room: "Master Bathroom",
	},

	'80:e4:da:7a:76:81': {
		...MULTI_ACTION_SET.MASTER_BATHROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Master Bathroom Door",
		room: "Master Bathroom",
	},

	'80:e4:da:7a:69:e2': {
		...ACTION_SET.SHOWER,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Master Shower",
		room: "Master Bathroom",
	},

	'80:e4:da:7a:be:69': {
		...ACTION_SET.MASTER_TOILET,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Master Toilet Door",
		room: "Master Bathroom",
	},

	'80:e4:da:7a:70:05': {
		...ACTION_SET.MASTER_CLOSET,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Master Bathroom",
		room: "Master Closet",
	},

	'80:e4:da:7a:6e:c4': {
		...MULTI_ACTION_SET.MASTER_BEDROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Bedroom Hallway Door",
		room: "Master Bedroom",
	},

	'80:e4:da:7a:69:88': {
		...MULTI_ACTION_SET.MASTER_BATHROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.BLACK,
		location: "Master Bathroom Door",
		room: "Master Bedroom",
	},

	'80:e4:da:7a:a8:3f': {
		...MULTI_ACTION_SET.MASTER_BEDROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Mather Bathroom Door",
		room: "Master Bedroom",
	},


	// ------------------------------------
	// Dewberry-Pi
	// ------------------------------------

	'80:e4:da:72:a8:bc': {
		...ACTION_SET.LAUNDRY_ROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Laundry Room Entryway",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:a8:62': {
		...ACTION_SET.GUEST_BEDROOM_CLOSET,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Guest Bedroom Closet Entryway",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:3a:24': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Bedroom Hallway",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:a8:e3': {
		...ACTION_SET.KIDS_BEDROOM_CLOSET,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Kids Bedroom Closet Entryway",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:63:3c': {
		...ACTION_SET.GUEST_BATHROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.GREEN,
		location: "Guest Bathroom Toilet Wall",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:62:29': {
		...ACTION_SET.GUEST_BATHROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.GREEN,
		location: "Guest Bedroom Tub Wall",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:45:77': {
		...MULTI_ACTION_SET.GUEST_BEDROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Guest Bedroom Wall",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:ab:3d': {
		...ACTION_SET.KIDS_BEDROOM_VANITY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.CYAN,
		location: "Kids Bedroom Vanity",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:5f:2b': {
		...MULTI_ACTION_SET.KIDS_BEDROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Kids Bedroom Wall",
		room: "UNSPECIFIED",
	},

	'80:e4:da:73:60:00': {
		...ACTION_SET.GUEST_BEDROOM_VANITY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.CYAN,
		location: "Guest Bedroom Vanity",
		room: "UNSPECIFIED",
	},


	// ------------------------------------
	// Elderberry-Pi
	// ------------------------------------

	'80:e4:da:72:a8:9e': {
		...ACTION_SET.DINING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Entryway",
		room: "Dining Room",
	},

	'80:e4:da:7a:be:10': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Kevin's Desk",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:60:e2': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Living Room Kitchen Entrance",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:3d:6b': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Office Entryway",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:4d:9e': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Dining Room Entryway",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:5a:41': {
		...ACTION_SET.BASEMENT,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Basement Door",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:62:9e': {
		...ACTION_SET.COLISSIO,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.GREEN,
		location: "Kevin's Desk",
		room: "UNSPECIFIED",
	},

	'80:e4:da:72:98:19': {
		...MULTI_ACTION_SET.KITCHEN,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Living Room Kitchen Entrance",
		room: "UNSPECIFIED",
	},

	'80:e4:da:73:5d:fd': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Office Entrance",
		room: "UNSPECIFIED",
	},

	'80:e4:da:73:64:ab': {
		...ACTION_SET.LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Living Room Kitchen Entrance",
		room: "UNSPECIFIED",
	},

	'80:e4:da:77:0c:d8': {
		...ACTION_SET.OFFICE,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Kevin's Desk for Testing",
		room: "UNSPECIFIED",
	},


	// ------------------------------------
	// Farkleberry-Pi
	// ------------------------------------

	// ...
}

module.exports = buttonConfigs
