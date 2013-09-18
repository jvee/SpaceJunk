define(function () {

	/**
	 * Создает экземпляр космического объекта.
	 * @name SpaceObject
	 * @param {String} name Название объекта.
	 * @param {Number}[] position Местоположение объекта.
	 */
	function SpaceObject(name, position) {
		if (!this._isValidArgument({value: name, type: 'string', minLength: 1, maxLength: 100})) {
			throw new Error('Wrong "Name" argument');
		}
		if (!this._isValidArgument({value: position, type: 'position'})) {
			throw new Error('Wrong "Position" argument');
		}

		this._name = name;
		this._position = position;
	}


	/** 
	 * Наименование типа объекта 
	 * @type {String}
	 */
	SpaceObject.prototype._typeName = 'Космический объект';

	/**
	 * Проверяет корректность переданного аргумента
	 * @name SpaceObject._isValidArgument
	 * @param {Object} options Настройки проверки
	 * @param [options.value] Значение аргумента
	 * @param {Boolean} [options.required = true] Обязательность значения;
	 * @param {String|Object} options.type Тип аргумента "Number", "String", Custom (Planet || "Position")
	 * @param {Number} [options.min] Минимальное значение для аргумента типа Number
	 * @param {Number} [options.max] Максимальное значение для аргумента типа Number
	 * @param {Number} [options.minLength] Минимальное значение параметра length, например для строки
	 * @param {Number} [options.maxLength] Максимальное значение параметра length, например для строки
	 * @return {Boolean}
	 * @protected
	 */
	SpaceObject.prototype._isValidArgument = function (options) {

		options.required = options.required !== false;
		options.type = options.type ? options.type : typeof options.value;

		if (options.required && options.value === undefined) return false;

		switch (options.type) {
			case 'number' :
				if (typeof options.value !== 'number') return false;
				if (options.min !== undefined && options.min > options.value ) return false;
				if (options.max !== undefined && options.max < options.value) return false;
				break;
			case 'string' :
				if (typeof options.value !== 'string') return false;
				if (options.minLength !== undefined && options.minLength > options.value.length) return false;
				if (options.maxLength !== undefined && options.maxLength < options.value.length) return false;
				break;
			case 'position' :
			case 'space-position' :
				if (options.value instanceof SpaceObject) return true;
				if (Object.prototype.toString.call(options.value) !== '[object Array]') return false;
				if (options.value.length !== 2) return false;
				if (typeof options.value[0] !== 'number' || typeof options.value[1] !== 'number') return false;
				break;
			default :
				if (typeof options.type === 'string' && typeof options.value !== options.type) return false;
				if (typeof options.type === 'function' && !(options.value instanceof options.type)) return false;
		}

		return true;
	};

	/**
	 * Проверяет, находится ли объект в указанных кординатах
	 * @name SpaceObject.isSamePosition
	 * @param {Array|SpaceObject} position Массив координат или другой объект
	 * @return {Boolean}
	 */
	SpaceObject.prototype.isSamePosition = function(position) {
		if (!this._isValidArgument({value: position, type: 'space-position'})) throw new Error('Wrong "Position" argument');

		if (position instanceof SpaceObject) {
			return position.getCoords().toString() === this.getCoords().toString();
		}

		return position.toString() === this.getCoords().toString();
	};

	/**
	 * Выводит текущее состояние объекта: имя и местоположение.
	 * @example
	 * spaceObject.report(); // Космический объект "Черная дыра". Местоположение: 50,20.
	 * @name SpaceObject.report
	 */
	SpaceObject.prototype.report = function () {
		var position = this._position instanceof SpaceObject ? this._position.getName() : this._position.toString();

		return this._typeName + ' "' + this._name + '". Местоположение: ' + position + '.';
	};

	/**
	 * Возвращет массив с координатами объекта
	 * @name SoaceObject.getCoords
	 * @return {Number}[]
	 */
	SpaceObject.prototype.getCoords = function () {
		if (this._position instanceof SpaceObject) {
			return this._position.getCoords();
		}

		return this._position;
	};

	/**
	 * Возвращает имя объекта
	 * @name SpaceObject.getName
	 * @return {string}
	 */
	SpaceObject.prototype.getName = function () {
		return this._name;
	};

	return SpaceObject;

});