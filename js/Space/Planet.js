define(['helpers', 'SpaceObject', 'Vessel'], function (helpers, SpaceObject, Vessel) {

	/**
	 * Создает экземпляр планеты.
	 * @name Planet
	 * @param {String} name Название Планеты.
	 * @param {Number}[] position Местоположение планеты.
	 * @param {Number} availableAmountOfCargo Доступное количество груза.
	 */
	function Planet(name, position, availableAmountOfCargo) {
		SpaceObject.prototype.constructor.apply(this, [name, position]);

		if (!this._isValidArgument({value: availableAmountOfCargo, type: 'number', min: 0})) {
			throw new Error('Wrong "availableAmountOfCargo" argument');
		}

		this._amountOfCargo = availableAmountOfCargo;
	}

	helpers.extend(Planet, SpaceObject);

	/**
	 * Расширение метода валидации родительского класса SpaceObject
	 * @name Planet._isValidArgument
	 * @param  {Object}  options 
	 * @return {Boolean}
	 */
	Planet.prototype._isValidArgument = function (options) {
		var result = SpaceObject.prototype._isValidArgument.call(this, options);

		if (!result) return false;

		if (options.type === 'position' && Object.prototype.toString.call(options.value) !== '[object Array]') return false;

		return true;
	};

	/** 
	 * Наименование типа объекта 
	 * @type {String}
	 */
	Planet.prototype._typeName = 'Планета';


	/**
	 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
	 * @name Planet.report
	 */
	Planet.prototype.report = function () {
		var amountString = this._amountOfCargo === 0 ? ' Грузов нет.' : ' Доступно груза: ' + this._amountOfCargo + 'т.';
		return Planet.superclass.report.call(this) + amountString;
	};

	/**
	 * Возвращает доступное количество груза планеты.
	 * @name Planet.getAvailableAmountOfCargo
	 */
	Planet.prototype.getAvailableAmountOfCargo = function () {
		return this._amountOfCargo;
	};

	/**
	 * Загружает на корабль заданное количество груза.
	 * 
	 * Перед загрузкой корабль должен приземлиться на планету.
	 * @param {Vessel} vessel Загружаемый корабль.
	 * @param {Number} cargoWeight Вес загружаемого груза.
	 * @name Planet.loadCargoTo
	 */
	Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
		if (!this._isValidArgument({value: vessel, type: Vessel})) {
			throw new Error('Wrong "Vessel" argument');
		}

		if (!this._isValidArgument({value: cargoWeight, type: 'number', min: 0})) {
			throw new Error('Wrong "cargoWeight" argument');
		}

		if (!this.isSamePosition(vessel)) throw new Error('Vessel too far from planet');
		if (this._amountOfCargo < cargoWeight) throw new Error('Not enough amount of cargo');
		if (vessel.getFreeSpace() < cargoWeight) throw new Error('Cargo Amount is too big for vessel');

		vessel.loadCargo(cargoWeight);
		this._amountOfCargo = this._amountOfCargo - cargoWeight;

		return this;
	};

	/**
	 * Выгружает с корабля заданное количество груза.
	 * 
	 * Перед выгрузкой корабль должен приземлиться на планету.
	 * @param {Vessel} vessel Разгружаемый корабль.
	 * @param {Number} cargoWeight Вес выгружаемого груза.
	 * @name Planet.unloadCargoFrom
	 */
	Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
		if (!this._isValidArgument({value: vessel, type: Vessel})) {
			throw new Error('Wrong "Vessel" argument');
		}

		if (!this._isValidArgument({value: cargoWeight, type: 'number', min: 0})) {
			throw new Error('Wrong "cargoWeight" argument');
		}

		if (!this.isSamePosition(vessel)) throw new Error('Vessel too far from planet');
		if (vessel.getOccupiedSpace() < cargoWeight) throw new Error('Cargo Amount is too big');

		vessel.unloadCargo(cargoWeight);
		this._amountOfCargo = this._amountOfCargo + cargoWeight;

		return this;
	};

	return Planet;

});