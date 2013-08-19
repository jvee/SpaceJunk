require.config({
	paths: {
		SpaceObject: 'Space/SpaceObject',
		Planet: 'Space/Planet',
		Vessel: 'Space/Vessel',
		helpers: 'Space/helpers'
	}
});

require(['Planet', 'Vessel'], function (Planet, Vessel) {

	// comments helpers
	// instance of planet ?
	// describe errors
	// грузовой корабль

	var tests = true,
		log = [];

	if (tests && tests === true && console !== undefined && console.assert) {
		require(['tests/SpaceObject', 'tests/Vessel', 'tests/Planet']);
	}

	log.push('var	vessel	=	new Vessel(\'Тысячелетний сокол\', [0,0], 1000),');
	log.push('	planetA	=	new Planet(\'Кашиик\', [0,0], 0),');
	log.push('	planetB	=	new Planet(\'Татуин\', [100, 100], 5000);');

	var vessel = new Vessel('Тысячелетний сокол', [0,0], 1000),
		planetA = new Planet('Кашиик', [0,0], 0),
		planetB = new Planet('Татуин', [100, 100], 5000);

	log.push('');
	log.push(' vessel.report();	- >	' + vessel.report());
	log.push('planetA.report();	- >	' + planetA.report());
	log.push('planetB.report();	- >	' + planetB.report());
	log.push('');
	log.push('vessel.flyTo(planetB);');
	log.push('planetB.loadCargoTo(vessel, 1000);');

	vessel.flyTo(planetB);
	planetB.loadCargoTo(vessel, 1000);

	log.push('');
	log.push(' vessel.report();	- >	' + vessel.report());
	log.push('');
	log.push('vessel.flyTo(planetA);');
	log.push('planetB.loadCargoTo(vessel, 500);');

	vessel.flyTo(planetA);
	planetA.unloadCargoFrom(vessel, 500);

	log.push('');
	log.push(' vessel.report();	- >	' + vessel.report());
	log.push('planetA.report();	- >	' + planetA.report());
	log.push('planetB.report();	- >	' + planetB.report());

	document.body.innerHTML = log.join('<br/>');


});