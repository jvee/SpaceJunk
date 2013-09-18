define(['helpers', 'SpaceObject'], function (helpers, SpaceObject) {

	/**
	 * Создает экземпляр космического корабля.
	 * @name Vessel
	 * @param {String} name Название корабля.
	 * @param {Number}[] position Местоположение корабля.
	 * @param {Number} capacity Грузоподъемность корабля.
	 */
	function Vessel(name, position, capacity) {
		SpaceObject.prototype.constructor.apply(this, [name, position]);

		if (!this._isValidArgument({value: capacity, type: 'number', min: 0})) {
			throw new Error('Wrong "capacity" argument');
		}

		this._capacity = capacity;
		this._loaded = 0;
	}

	helpers.extend(Vessel, SpaceObject);

	/**
	 * Расширения метода валидации родительского класса SpaceObject
	 * @name Vessel._isValidArgument
	 * @param  {Object}  options 
	 * @return {Boolean}
	 */
	Vessel.prototype._isValidArgument = function (options) {
		var result = SpaceObject.prototype._isValidArgument.call(this, options);

		if (!result) return false;

		if (options.type === 'position' && Object.prototype.toString.call(options.value) !== '[object Array]') {
			if (options.value.constructor.name !== 'Planet') return false;
		}

		return true;
	};

	/** 
	 * Наименование типа объекта 
	 * @type {String}
	 */
	Vessel.prototype._typeName = 'Грузовой корабль';


	/**
	 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
	 * @example
	 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
	 * @example
	 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
	 * @name Vessel.report
	 */
	Vessel.prototype.report = function () {
		var loadedString = this._loaded === 0 ? ' Товаров нет.' : ' Груз: ' + this._loaded + 'т.';
		return Vessel.superclass.report.call(this) + loadedString;
	};


	/**
	 * Выводит количество свободного места на корабле.
	 * @name Vessel.getFreeSpace
	 */
	Vessel.prototype.getFreeSpace = function () {
		return this._capacity - this._loaded;
	};

	/**
	 * Выводит количество занятого места на корабле.
	 * @name Vessel.getOccupiedSpace
	 */
	Vessel.prototype.getOccupiedSpace = function () {
		return this._loaded;
	};

	/**
	 * Переносит корабль в указанную точку.
	 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
	 * @example
	 * vessel.flyTo([1,1]);
	 * @example
	 * var earth = new Planet('Земля', [1,1]);
	 * vessel.flyTo(earth);
	 * @name Vessel.report
	 */
	Vessel.prototype.flyTo = function (newPosition) {
		if (!this._isValidArgument({value: newPosition, type: 'position'})) {
			throw new Error('Wrong "Position" argument');
		}

		this._position = newPosition;

		return this;
	};

	/**
	 * Увеличить кол-во груза на Корабле
	 * @name Vessel.loadCargo
	 * @param {Number} cargoWeight
	 * @return {Vessel}
	 */
	Vessel.prototype.loadCargo = function (cargoWeight) {
		if (!this._isValidArgument({value: cargoWeight, type: 'number', min: 0, max: this.getFreeSpace()})) {
			throw new Error('Wrong "cargoWeight" argument');
		}

		this._loaded = this._loaded + cargoWeight;

		return this;
	};

	/**
	 * Уменьшить кол-во груза на Корабле
	 * @name Vessel.loadCargo
	 * @param {Number} cargoWeight
	 * @return {Vessel}
	 */
	Vessel.prototype.unloadCargo = function (cargoWeight) {
		if (!this._isValidArgument({value: cargoWeight, type: 'number', min: 0, max: this.getOccupiedSpace()})) {
			throw new Error('Wrong "cargoWeight" argument');
		}

		this._loaded = this._loaded - cargoWeight;

		return this;
	};

	return Vessel;

});