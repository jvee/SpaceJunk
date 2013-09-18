define(['Planet', 'Vessel'],function (Planet, Vessel) {

	var desc, condition,
		planet = new Planet('Tatooine', [21, 21], 10000),
		vessel = new Vessel('DeathStar', [21,21], 1000),
		Vars;

	// ====================
	desc = '[Planet]: planet._name should return "Tatooine"';
	condition = planet._name === "Tatooine";
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet._position.toString(); should return "21,21"';
	condition = false;
	try {condition = planet._position.toString() === "21,21"} catch (e) {};
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet._amountOfCargo should return 10000';
	condition = planet._amountOfCargo === 10000;
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.report() should return "Планета "Tatooine". Местоположение: 21,21. Доступно груза: 10000т."';
	condition = planet.report() === 'Планета "Tatooine". Местоположение: 21,21. Доступно груза: 10000т.';
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.getAvailableAmountOfCargo() should return 10000"';
	condition = planet.getAvailableAmountOfCargo() === 10000;
	console.assert(condition, desc);




	// ====================
	desc = '[Planet]: planet.loadCargoTo(vessel, 500) should return planet';
	condition = planet.loadCargoTo(vessel, 500) === planet;
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.loadCargoTo(vessel, 500) then planet._amountOfCargo === 9500 && planet.getAvailableAmountOfCargo() === 9500';
	condition = false;
	try { condition = planet._amountOfCargo === 9500 && planet.getAvailableAmountOfCargo() === 9500 } catch (e) {};
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.loadCargoTo(vessel, 500) then vessel._loaded === 500 && vessel.getFreeSpace() === 500 && vessel.getOccupiedSpace() === 500';
	condition = false;
	condition = vessel._loaded === 500 && vessel.getFreeSpace() === 500 && vessel.getOccupiedSpace() === 500;
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.loadCargoTo(vessel, 1500) should throw error "Cargo Amount is too big for vessel"';
	condition = false;
	//condition === planet && (condition = false);
	try {condition = planet.loadCargoTo(vessel, 1500);} catch (e) { condition = e.message === 'Cargo Amount is too big for vessel'};
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.loadCargoTo(vessel, 100000) should throw error: "Not enough amount of cargo"';
	condition = false;
	//condition === planet && (condition = false);
	try {condition = planet.loadCargoTo(vessel, 100000);} catch (e) { condition = e.message === 'Not enough amount of cargo'};
	console.assert(condition, desc);


	// Changind Environment 
	vessel.flyTo([0, 0]);


	// ====================
	desc = '[Planet]: planet.loadCargoTo(vessel, 1500) should trow error: "Vessel too far from planet"';
	condition = false;	
	//condition === planet && (condition = false);
	try {condition = planet.loadCargoTo(vessel, 1500);} catch (e) {condition = e.message === 'Vessel too far from planet'};
	console.assert(condition, desc);


	// Changind Environment 
	vessel.flyTo([21, 21]);

	// ====================
	desc = '[Planet]: planet.unloadCargoFrom(vessel, 500) should return planet';
	condition = planet.unloadCargoFrom(vessel, 500) === planet;
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.unloadCargoFrom(vessel, 500) then planet._amountOfCargo === 10000 && planet.getAvailableAmountOfCargo() === 10000';
	try { condition = planet._amountOfCargo === 10000 && planet.getAvailableAmountOfCargo() === 10000 } catch (e) {};
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.unloadCargoFrom(vessel, 500) then vessel._loaded === 0 && vessel.getFreeSpace() === 1000 && vessel.getOccupiedSpace() === 0';
	try { condition = vessel._loaded === 0 && vessel.getFreeSpace() === 1000 && vessel.getOccupiedSpace() === 0 } catch (e) {};
	console.assert(condition, desc);

	// ====================
	desc = '[Planet]: planet.unloadCargoFrom(vessel, 1500) should throw error: "Cargo Amount is too big"';
	condition = false;
	//condition === planet && (condition = false);
	try {planet.unloadCargoFrom(vessel, 1500);} catch (e) {condition = e.message === 'Cargo Amount is too big' };
	console.assert(condition, desc);


	// Changind Environment 
	vessel.flyTo([0, 0]);


	// ====================
	desc = '[Planet]: planet.unloadCargoFrom(vessel, 1500) should throw error: "Vessel too far from planet"';
	condition = false;
	//condition === planet && (condition = false);
	try {planet.unloadCargoFrom(vessel, 1500);} catch (e) {condition = e.message === 'Vessel too far from planet';}
	console.assert(condition, desc);




	Desc = 'Method _isValidArgument({value: [0,1], type: position}) should return true';
	Vars = {
		planet: new Planet('Tatooine', [0,0], 0),
		target: true
	};
	Condition = Vars.planet._isValidArgument({value: [0,1], type: 'position'}) === Vars.target;
	console.assert(Condition, Desc);

	Desc = 'Method _isValidArgument({value: spaceObject, type: \'position\'}) should return false';
	Vars = {
		planet: new Planet('Tatooine', [0,0], 0),
		vessel: new Vessel('DeathStar', [1,1], 1000),
		target: false
	};
	Condition = Vars.planet._isValidArgument({value: Vars.vessel, type: 'position'}) === Vars.target;
	console.assert(Condition, Desc);

});