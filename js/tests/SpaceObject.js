// Тесты объекта SpaceObject
define(['SpaceObject', 'Planet'], function (SpaceObject, Planet) {

	var condition,
		desc = '';

	desc = '[SpaceObject]: Тесты инициализации экземпляра';
	condition = (function () {

		function catchError(evalString) {
			var result = false;
			try {
				result = eval(evalString);
			} catch (e) {
				return e.message;
			}
			return result;
		}

		var spaceObject = new SpaceObject('Черная Дыра', [0, 0]),
			result = true,
			test,
			testParams = [
				{
					desc: '[SpaceObject]: ._name should be equal \'Черная Дыра\'',
					target: 'Черная Дыра',
					method: 'spaceObject._name'
				},
				{
					desc: '[SpaceObject]: ._typeName should be equal \'Космический объект\'',
					target: 'Космический объект',
					method: 'spaceObject._typeName'
				},
				{
					desc: '[SpaceObject]: ._position.toString should be equal \'0,0\'',
					target: '0,0',
					method: 'spaceObject._position.toString()'
				},
				{
					desc: '[SpaceObject]: new SpaceObject(100, [1, 1]) should throw error \'Wrong "Name" argument\'',
					target: 'Wrong "Name" argument',
					method: 'new SpaceObject(100, [1, 1])'
				},
				{
					desc: '[SpaceObject]: new SpaceObject(\'Черная дыра\', \'[1, 1]\') should throw error \'Wrong "Position" argument\'',
					target: 'Wrong "Position" argument',
					method: 'new SpaceObject(\'Черная дыра\', \'[1, 1]\')'
				}
			];

		for (var i = 0; i < testParams.length; i++) {
			test = testParams[i];
			if (typeof test.method === 'string') test.method = catchError(test.method);
			condition = test.target === test.method;
			console.assert(condition, test.desc);
			if (condition === false) result = false;
		}

		return result;

	})();
	console.assert(condition, desc);

	desc = '[SpaceObject]: Тесты метода spaceObject._isValidArgument';
	condition = (function () {

		function catchError(evalString) {
			var result = false;
			try {
				result = eval(evalString);
			} catch (e) {
				return e.message;
			}
			return result;
		}

		var spaceObject = new SpaceObject('Черная Дыра', [0, 0]),
			spaceObjectAlt = new SpaceObject('Sun', [1, 1]),
			planet = new Planet('Tatooine', [0,0], 1000),
			notSpaceObject = {},
			condition = false,
			result = true,
			test,
			testParams = [
			{
				desc: '[SpaceObject]: ._isValidArgument({value: undefined}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: undefined})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: undefined, required: false}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: undefined, required: false})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: 123}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: 123})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: 123, type: \'number\'}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: 123, type: 'number'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: 123, min: 0}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: 123, min: 0})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: 123, min: 200}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: 123, min: 200})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: 123, max: 0}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: 123, max: 0})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: 123, max: 200}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: 123, max: 200})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: \'str\'}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: 'str'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: \'str\', minLength: 2}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: 'str', minLength: 2})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: \'str\', minLength: 5}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: 'str', minLength: 5})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: \'str\', maxLength: 2}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: 'str', maxLength: 2})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: \'str\', maxLength: 5}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: 'str', maxLength: 5})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: spaceObjectAlt, type: SpaceObject}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: spaceObjectAlt, type: SpaceObject})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: notSpaceObject, type: SpaceObject}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: notSpaceObject, type: SpaceObject})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: [1, 1], type: \'position\'}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: [1, 1], type: 'position'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: [1, \'1\'], type: \'position\'}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: [1, '1'], type: 'position'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: \'[1, 1]\', type: \'position\'}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: '[1, 1]', type: 'position'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: [1, 1, 1], type: \'position\'}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: [1, 1, 1], type: 'position'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: [1], type: \'position\'}) should return false',
				target: false,
				method: spaceObject._isValidArgument({value: [1], type: 'position'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: planet, type: \'position\'}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: planet, type: 'position'})
			},
			{
				desc: '[SpaceObject]: ._isValidArgument({value: planet, type: Planet}) should return true',
				target: true,
				method: spaceObject._isValidArgument({value: planet, type: Planet})
			}
		];

		for (var i = 0; i < testParams.length; i++) {
			test = testParams[i];
//			if (test.desc === '[SpaceObject]: ._isValidArgument({value: undefined}) should return false') debugger;
			if (typeof test.method === 'string') test.method = catchError(test.method);
			condition = test.target === test.method;
			console.assert(condition, test.desc);
			if (condition === false) result = false;
		}

		return result;

	})();

	console.assert(condition, desc);

	desc = '[SpaceObject]: Тесты метода spaceObject.isSamePosition';
	condition = (function () {

		function catchError(evalString) {
			var result = false;
			try {
				result = eval(evalString);
			} catch (e) {
				return e.message;
			}
			return result;
		}

		var spaceObject = new SpaceObject('Черная Дыра', [0, 0]),
			spaceObjectAlt = new SpaceObject('Sun', [0, 0]),
			spaceObjectAlt2 = new SpaceObject('Moon', [100, 100]),
			condition = false,
			result = true,
			test,
			testParams = [
				{
					desc: '[SpaceObject]: .isSamePosition([0,0]) should return true',
					target: true,
					method: spaceObject.isSamePosition([0,0])
				},
				{
					desc: '[SpaceObject]: .isSamePosition([100, 100]) should return false',
					target: false,
					method: spaceObject.isSamePosition([100, 100])
				},
				{
					desc: '[SpaceObject]: .isSamePosition(spaceObjectAlt) should return true',
					target: true,
					method: spaceObject.isSamePosition(spaceObjectAlt)
				},
				{
					desc: '[SpaceObject]: .isSamePosition(spaceObjectAlt2) should return false',
					target: false,
					method: spaceObject.isSamePosition(spaceObjectAlt2)
				},
				{
					desc: '[SpaceObject]: .isSamePosition({}) should throw error \'Wrong "Position" argument\'',
					target: 'Wrong "Position" argument',
					method: 'new SpaceObject(\'Черная дыра\', \'[1, 1]\')'
				}
			];

		for (var i = 0; i < testParams.length; i++) {
			test = testParams[i];
			if (typeof test.method === 'string') test.method = catchError(test.method);
			condition = test.target === test.method;
			console.assert(condition, test.desc);
			if (condition === false) result = false;
		}

		return result;

	})();

	console.assert(condition, desc);

	desc = '[SpaceObject]: Тесты метода spaceObject.report';
	condition = (function () {

		function catchError(evalString) {
			var result = false;
			try {
				result = eval(evalString);
			} catch (e) {
				return e.message;
			}
			return result;
		}

		var spaceObject = new SpaceObject('Черная Дыра', [50, 20]),
			condition = false,
			result = true,
			test,
			testParams = [
				{
					desc: '[SpaceObject]: .report() should return \'Космический объект "Черная Дыра". Местоположение: 50,20.\'',
					target: 'Космический объект "Черная Дыра". Местоположение: 50,20.',
					method: 'spaceObject.report()'
				},
				{
					desc: '[SpaceObject]: .report() should return \'Космический объект "Черная Дыра". Местоположение: Космос.\'',
					target: 'Космический объект "Черная Дыра". Местоположение: Космос.',
					method: 'new SpaceObject(\'Черная Дыра\', new SpaceObject(\'Космос\', [0, 0])).report();'
				}
			];

		for (var i = 0; i < testParams.length; i++) {
			test = testParams[i];
			if (typeof test.method === 'string') test.method = catchError(test.method);
			condition = test.target === test.method;
			// console.log(test.target);
			// console.log(test.method);
			console.assert(condition, test.desc);
			if (condition === false) result = false;
		}

		return result;

	})();

	console.assert(condition, desc);

	desc = '[SpaceObject]: Тесты метода spaceObject.getCoords';
	condition = (function () {

		function catchError(evalString) {
			var result = false;
			try {
				result = eval(evalString);
			} catch (e) {
				return e.message;
			}
			return result;
		}

		var spaceObject = new SpaceObject('Черная Дыра', [50, 20]),
			condition = false,
			result = true,
			test,
			testParams = [
				{
					desc: '[SpaceObject]: .getCoords().toString() should return \'50,20\'',
					target: '50,20',
					method: 'spaceObject.getCoords().toString()'
				},
				{
					desc: '[SpaceObject]: .getCoords().toString() should return \'0,0\'',
					target: '0,0',
					method: 'new SpaceObject(\'Черная дыра\', new SpaceObject(\'Космос\', [0, 0])).getCoords().toString();'
				}
			];

		for (var i = 0; i < testParams.length; i++) {
			test = testParams[i];
			if (typeof test.method === 'string') test.method = catchError(test.method);
			condition = test.target === test.method;
			console.assert(condition, test.desc);
			if (condition === false) result = false;
		}

		return result;

	})();

	console.assert(condition, desc);


	desc = '[SpaceObject]: Тесты метода spaceObject.getName';
	condition = (function () {

		function catchError(evalString) {
			var result = false;
			try {
				result = eval(evalString);
			} catch (e) {
				return e.message;
			}
			return result;
		}

		var spaceObject = new SpaceObject('Черная Дыра', [50, 20]),
			condition = false,
			result = true,
			test,
			testParams = [
				{
					desc: '[SpaceObject]: .getName() should return \'Черная Дыра\'',
					target: 'Черная Дыра',
					method: 'spaceObject.getName()'
				}
			];

		for (var i = 0; i < testParams.length; i++) {
			test = testParams[i];
			if (typeof test.method === 'string') test.method = catchError(test.method);
			condition = test.target === test.method;
			console.assert(condition, test.desc);
			if (condition === false) result = false;
		}

		return result;

	})();

	console.assert(condition, desc);


});