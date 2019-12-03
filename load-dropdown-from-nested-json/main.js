var siteElement = document.getElementById('sites');
var roomElement = document.getElementById('rooms');
var deviceElement = document.getElementById('devices');

var siteDetails = JSON.parse(sites);
var sites = [], rooms = [], devices = [];

siteDetails.forEach(function (site) {
	sites.push(createSite(site.sitename, site.siteid));
	site.rooms.forEach(function (room) {
		rooms.push(createRoom(room.roomname, room.roomid, site.siteid));
		room.devices.forEach(function (device) {
			devices.push(createDevice(device.devicename, device.deviceid, room.roomid, site.siteid));
		});
	});
});

addOptions(siteElement, sites);

function createSite(name, id) {
	return { name: name, id: id };
}

function createRoom(name, id, siteid) {
	return { name: name, id: id, siteid: siteid };
}

function createDevice(name, id, roomid, siteid) {
	return { name: name, id: id, roomid: roomid, siteid: siteid };
}

function removeOptions(select) {
	while (select.options.length > 1) {
		select.remove(1);
	}

	select.value = "";
}

function addOptions(select, options) {
	options.forEach(function (option) {
		select.options.add(new Option(option.name, option.id));
	});

	document.getElementById("displayResults").style.display = "none";

}

function updateRooms() {
	var selectedSite = siteElement.value;
	var options = rooms.filter(function (room) {
		return room.siteid === selectedSite;
	});

	removeOptions(roomElement);
	removeOptions(deviceElement);
	addOptions(roomElement, options);
}

function updateDevices() {
	var selectedRoom = roomElement.value;

	var options = devices.filter(function (device) {
		return device.roomid === selectedRoom && device.siteid === siteElement.value;
	});

	removeOptions(deviceElement);
	addOptions(deviceElement, options);
}

function getIds() {

	document.getElementById("displayResults").style.display = "block";

	document.getElementById("selectedSite").innerHTML = siteElement.value;
	document.getElementById("selectedRoom").innerHTML = roomElement.value;
	document.getElementById("selectedDevice").innerHTML = deviceElement.value;
}