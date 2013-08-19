define(['Vessel'], function (Vessel) {

	var Desc, Vars;

	Desc = 'Ошибка при создании экземпляра объекта корабля без параметров'; Vars = {};
	try { new Vessel(); } catch (e) { Vars.error = e; } console.assert(Vars.error, Desc);

	Desc = 'Ошибка при создании экземпляра объекта корабля с неправильным типом параметра "Name"'; Vars = {};
	try { new Vessel(123); } catch (e) { Vars.error = e; } console.assert(Vars.error && Vars.error.message === 'Wrong "Name" argument', Desc);

	Desc = 'Ошибка при создании экземпляра объекта корабля с неправильным типом параметра "Position"'; Vars = {};
	try { new Vessel('DeathStar', '[1, 1]'); } catch (e) { Vars.error = e; } console.assert(Vars.error && Vars.error.message === 'Wrong "Position" argument', Desc);

	Desc = 'Ошибка при создании экземпляра объекта корабля с неправильным типом значений массива параметра "Position"'; Vars = {};
	try { new Vessel('DeathStar', [1, '1']); } catch (e) { Vars.error = e; } console.assert(Vars.error && Vars.error.message === 'Wrong "Position" argument', Desc);

	Desc = 'Ошибка при создании экземпляра объекта корабля с неправильным типом параметра "capacity"'; Vars = {};
	try { new Vessel('DeathStar', [1, 1], '100'); } catch (e) { Vars.error = e; } console.assert(Vars.error && Vars.error.message === 'Wrong "capacity" argument', Desc);

	Desc = 'Создание экземпляра корабля, проверка переменной "name"'; Vars = {};
	Vars.vessel = new Vessel('DeathStar', [1, 1], 1000); console.assert(Vars.vessel._name === 'DeathStar', Desc);

	Desc = 'Создание экземпляра корабля, проверка переменной "position"'; Vars = {};
	Vars.vessel = new Vessel('DeathStar', [1, 1], 1000); console.assert(Vars.vessel._position.toString() === '1,1', Desc);

	Desc = 'Создание экземпляра корабля, проверка переменной "capacity"'; Vars = {};
	Vars.vessel = new Vessel('DeathStar', [1, 1], 1000); console.assert(Vars.vessel._capacity === 1000 , Desc);

	Desc = 'Создание экземпляра корабля, после инициализации переменная "loaded" равна нулю'; Vars = {};
	Vars.vessel = new Vessel('DeathStar', [1, 1], 1000); console.assert(Vars.vessel._loaded === 0 , Desc);

	Desc = 'Проверка метода "report" экземпляра корабля'; Vars = {};
	Vars.vessel = new Vessel('DeathStar', [1, 1], 1000);
	Vars.targetMessage = 'Грузовой корабль "DeathStar". Местоположение: 1,1. Товаров нет.';
	console.assert(Vars.vessel.report() === Vars.targetMessage , Desc + '\n' + Vars.targetMessage + '\n' + Vars.vessel.report());


	Desc = 'Method "getFreeSpace()" of new Vessel instance should be equal 1000';
	Vars = {
		vessel: new Vessel('DeathStar', [1, 1], 1000),
		targetFreeSpace: 1000
	};
	Condition = Vars.vessel.getFreeSpace() === Vars.targetFreeSpace;
	console.assert(Condition, Desc);


	Desc = 'Method "getOccupiedSpace()" of new Vessel instance should be equal 0';
	Vars = {
		vessel: new Vessel('DeathStar', [1, 1], 1000),
		targetLoaded: 0
	};
	Condition = Vars.vessel.getOccupiedSpace() === Vars.targetLoaded;
	console.assert(Condition, Desc);


	Desc = 'Method "flyTo([0, 0])" of new Vessel instance should return this vessel object';
	Vars = {
		vessel: new Vessel('DeathStar', [1, 1], 1000),
		target: function () { return this.vessel;}
	};
	Condition = Vars.vessel.flyTo([0, 0]) === Vars.target();
	console.assert(Condition, Desc);


	Desc = 'Method "flyTo([0, 0])" of new Vessel instance should set this._position.toString() to be equal "0,0"';
	Vars = {
		vessel: new Vessel('DeathStar', [1, 1], 1000),
		target: '0,0'
	};
	Condition = Vars.vessel.flyTo([0, 0])._position.toString() === Vars.target;
	console.assert(Condition, Desc);


});