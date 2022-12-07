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

	'80:e4:da:7a:c0:db': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Second Floor Stairway",
		room: "Bedroom Hallway",
	},

	'80:e4:da:7a:6b:46': {
		...MULTI_ACTION_SET.GUEST_BEDROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Bedroom Hallway Door",
		room: "Guest Bedroom",
	},

	'80:e4:da:7a:a7:06': {
		...ACTION_SET.GUEST_BATHROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Guest Bathroom Door",
		room: "Guest Bedroom",
	},

	'80:e4:da:7a:be:6d': {
		...ACTION_SET.GUEST_BEDROOM_CLOSET,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Guest Bedroom Closet Door",
		room: "Guest Bedroom",
	},

	'80:e4:da:7a:80:b5': {
		...ACTION_SET.GUEST_BEDROOM_VANITY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Guest Bedroom Vanity",
		room: "Guest Bedroom",
	},

	'80:e4:da:7a:70:76': {
		...MULTI_ACTION_SET.KIDS_BEDROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Bedroom Hallway Door",
		room: "Kids Bedroom",
	},

	'80:e4:da:7a:bf:d0': {
		...ACTION_SET.GUEST_BATHROOM,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Guest Bathroom Door",
		room: "Kids Bedroom",
	},

	'80:e4:da:7a:bf:a8': {
		...ACTION_SET.KIDS_BEDROOM_CLOSET,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.BLACK,
		location: "Kids Bedroom Closet Door",
		room: "Kids Bedroom",
	},

	'80:e4:da:7a:7a:d1': {
		...ACTION_SET.KIDS_BEDROOM_VANITY,
		bluetoothHost: "Dewberry-Pi",
		color: COLOR.WHITE,
		location: "Kids Bedroom Vanity",
		room: "Kids Bedroom",
	},

	'80:e4:da:7a:6e:d0': {
		...ACTION_SET.LAUNDRY_ROOM,
		bluetoothHost: "Cherry-Pi",
		color: COLOR.WHITE,
		location: "Bedroom Hallway Door",
		room: "Laundry Room",
	},


	// ------------------------------------
	// Elderberry-Pi
	// ------------------------------------

	'80:e4:da:7a:6a:69': {
		...ACTION_SET.DINING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Entryway",
		room: "Dining Room",
	},

	'80:e4:da:7a:bf:bb': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Dining Room",
		room: "Entryway",
	},

	'80:e4:da:7a:bf:88': {
		...MULTI_ACTION_SET.ALL_STAIRWAY,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Office",
		room: "Entryway",
	},

	'80:e4:da:7a:be:55': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Entryway",
		room: "Office",
	},

	'80:e4:da:7a:be:10': {
		...MULTI_ACTION_SET.COLISSIO,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Kevin's Desk",
		room: "Office",
	},


	// ------------------------------------
	// Farkleberry-Pi
	// ------------------------------------

	'80:e4:da:7a:69:5c': {
		...ACTION_SET.ENTRYWAY,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Entryway Closet Door",
		room: "Entryway",
	},

	'80:e4:da:7a:bf:cb': {
		...MULTI_ACTION_SET.KITCHEN,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Living Room",
		room: "Kitchen",
	},

	'80:e4:da:7a:69:ee': {
		...ACTION_SET.KITCHEN,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Living Room",
		room: "Kitchen",
	},

	'80:e4:da:7a:bf:dd': {
		...ACTION_SET.BASEMENT,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Basement Door",
		room: "Living Room",
	},

	'80:e4:da:7a:b4:a5': {
		...MULTI_ACTION_SET.ALL_LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.BLACK,
		location: "Kitchen",
		room: "Living Room",
	},

	'80:e4:da:7a:75:3e': {
		...ACTION_SET.LIVING_ROOM,
		bluetoothHost: "Elderberry-Pi",
		color: COLOR.WHITE,
		location: "Kitchen",
		room: "Living Room",
	},

	// ------------------------------------
	// ------------------------------------
}

module.exports = buttonConfigs
