# Smart Home Services
Flic, LIFX, and WeMo microservices for controlling smart home devices.

Using these packages, you can hook your Flic buttons up to a Raspberry Pi and control LIFX and WeMo devices. If you want to have other device support, that would need to be added separately.

There's minimal effort required on your part to consume these packages, create a Flic button config file, and get started yourself.

If you'd like to make your a controller for something I haven't covered, there's plenty of example code available in this project to get started.

## Table of Contents

- [Flic](packages/flic) - Microservice listening for Flic button commands and passing actions over WebSockets to other connected microservices.
- [LIFX](packages/lifx) - Microservice for grabbing LIFX lights, toggling groups and scenes, and turning off a group of lights. It does all the hard work in toggling scenes (something not offered by any other LIFX packages).
- [WeMo](packages/wemo) - Microservice to turn on and off WeMo devices such as smart plugs.
