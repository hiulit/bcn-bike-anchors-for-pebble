var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var parseFeed = function(data, quantity) {
	var items = [];
	for(var i = 0; i < quantity; i++) {
		// Always upper case the description string
		var title = data.features[i].properties.address;
		//title = title.charAt(0).toUpperCase() + title.substring(1);

		// Get date/time substring
		var time = data.features[i].properties.district;
		//time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);

		// Add to menu items array
		items.push({
			title:title,
			subtitle:time
		});
	}

	// Finally return whole array
	return items;
};

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
	position: new Vector2(0, 0),
	size: new Vector2(144, 168),
	text:'Downloading bike anchors data...',
	font:'GOTHIC_28_BOLD',
	color:'black',
	textOverflow:'wrap',
	textAlign:'center',
	backgroundColor:'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

// Make the request
ajax(
	{
		url: 'http://hiulit.com/bcn-bike-anchors/js/anchors.json',
		type: 'json'
	},
	function(data) {	
		// Create an array of Menu items
		var menuItems = parseFeed(data, 10);
		
		// Construct Menu to show to user
		var resultsMenu = new UI.Menu({
			sections: [{
				title: 'Nearest lalala',
				items: menuItems
			}]
		});

		// Add an action for SELECT
		resultsMenu.on('select', function(e) {
			console.log('Item number ' + e.item + ' was pressed!');
		});

		// Show the Menu, hide the splash
		resultsMenu.show();
		splashWindow.hide();
	},
	function(error) {
		// Failure!
		console.log('Failed fetching data: ' + error);
	}
);