/**
 * Created by nick on 02.01.17.
 */
caclulatorApplication.controller('calculatorController', function ($scope, $filter) {
	$scope.drawHeight = 400;

	$scope.heights = [
		{value: 500, title: 500, selected: true, price: 115.0, shelves: {min: 3, max: 5}},
		{value: 1000, title: 1000, selected: false, price: 188.0, shelves: {min: 3, max: 11}},
		{value: 1200, title: 1200, selected: false, price: 220.0, shelves: {min: 3, max: 13}},
		{value: 1500, title: 1500, selected: false, price: 268.0, shelves: {min: 3, max: 13}},
		{value: 1800, title: 1800, selected: false, price: 308.0, shelves: {min: 3, max: 13}},
		{value: 2000, title: 2000, selected: false, price: 336.0, shelves: {min: 3, max: 13}},
		{value: 2200, title: 2200, selected: false, price: 370.0, shelves: {min: 3, max: 13}},
		{value: 2300, title: 2300, selected: false, price: 390.0, shelves: {min: 3, max: 13}},
		{value: 2500, title: 2500, selected: false, price: 420.0, shelves: {min: 3, max: 13}}
	];

	$scope.widths = [
		{
			value: 700,
			title: 700,
			deeps: [
				{value: 300, title: 300, price: 303.0},
				{value: 400, title: 400, price: 366.0},
				{value: 500, title: 500, price: 432.0},
				{value: 600, title: 600, price: 518.0},
				{value: 700, title: 700, price: 700.0},
				{value: 800, title: 800, price: 766.0}
			]
		},
		{
			value: 1000,
			title: 1000,
			deeps: [
				{value: 300, title: 300, price: 383.0},
				{value: 400, title: 400, price: 481.0},
				{value: 500, title: 500, price: 554.0},
				{value: 600, title: 600, price: 649.0},
				{value: 700, title: 700, price: 808.0},
				{value: 800, title: 800, price: 914.0}
			]
		},
		{
			value: 1200,
			title: 1200,
			deeps: [
				{value: 300, title: 300, price: 533.0},
				{value: 400, title: 400, price: 630.0},
				{value: 500, title: 500, price: 773.0},
				{value: 600, title: 600, price: 887.0}
			]
		},
		{
			value: 1500,
			title: 1500,
			deeps: [
				{value: 300, title: 300, price: 702.0},
				{value: 400, title: 400, price: 852.0},
				{value: 500, title: 500, price: 1004.0},
				{value: 600, title: 600, price: 1237.0}
			]
		}
	];

	$scope.boxes = [
		{
			id: "12.330.65",
			title: "Контейнер SK 3109",
			price: 91.0,
			width: 117,
			height: 90,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/3109l3.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3109/"
		},
		{
			id: "12.331.65",
			title: "Контейнер SK 31509",
			price: 106.0,
			width: 155,
			height: 90,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/31509dh.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-31509/"
		},
		{
			id: "12.332.65",
			title: "Контейнер SK 3209",
			price: 140.0,
			width: 234,
			height: 90,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/3209hj.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3209/"
		},
		{
			id: "12.333.65",
			title: "Контейнер SK 3214",
			price: 216.0,
			width: 234,
			height: 140,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/32145i.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3214/"
		},
		//  Глубина 400
		{
			id: "12.334.65",
			title: "Контейнер SK 4109",
			price: 117.0,
			width: 117,
			height: 90,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/4109kh.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4109/"
		},
		{
			id: "12.335.65",
			title: "Контейнер SK 41509",
			price: 143.0,
			width: 155,
			height: 90,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/41509yk.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-41509/"
		},
		{
			id: "12.336.65",
			title: "Контейнер SK 4209",
			price: 182.0,
			width: 234,
			height: 90,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/42095y.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4209/"
		},
		{
			id: "12.337.65",
			title: "Контейнер SK 4214",
			price: 306.0,
			width: 234,
			height: 140,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/4214vd.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4214/"
		},
		//  Глубина 500
		{
			id: "12.338.65",
			title: "Контейнер SK 5109",
			price: 132.0,
			width: 117,
			height: 90,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/51092v.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5109/"
		},
		{
			id: "12.339.65",
			title: "Контейнер SK 51509",
			price: 162.0,
			width: 155,
			height: 90,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/51509mi.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-51509/"
		},
		{
			id: "12.340.65",
			title: "Контейнер SK 5209",
			price: 206.0,
			width: 234,
			height: 90,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/5209gf.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5209/"
		},
		{
			id: "12.341.65",
			title: "Контейнер SK 5214",
			price: 316.0,
			width: 234,
			height: 140,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/52144y.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5214/"
		},
		//  Глубина 600
		{
			id: "12.342.65",
			title: "Контейнер SK 6109",
			price: 165.0,
			width: 117,
			height: 90,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/6109bi.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6109/"
		},
		{
			id: "12.343.65",
			title: "Контейнер SK 61509",
			price: 196.0,
			width: 155,
			height: 90,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/61509ht.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-61509/"
		},
		{
			id: "12.344.65",
			title: "Контейнер SK 6209",
			price: 255.0,
			width: 234,
			height: 90,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/6209k3.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6209/"
		},
		{
			id: "12.345.65",
			title: "Контейнер SK 6214",
			price: 397.0,
			width: 234,
			height: 140,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/6214at.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6214/"
		},
		//  Коробки Logic Store
		//  Глубина 300
		{
			id: "12.412",
			title: "Контейнер 12.412",
			price: 110.0,
			width: 225,
			height: 150,
			deep: 300,
			sort: 2,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/12_412dq.jpg",
			url: "http://www.agropak.net/kontejnery-logic-store/12412/"
		},
		{
			id: "12.403.1",
			title: "Контейнер 12.403.1",
			price: 125.0,
			width: 225,
			height: 150,
			deep: 350,
			sort: 2,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/n12-403mn.jpg",
			url: "http://www.agropak.net/kontejnery-logic-store/12_403/"
		},
		{
			id: "12.404.1",
			title: "Контейнер 12.404.1",
			price: 147.0,
			width: 225,
			height: 200,
			deep: 350,
			sort: 2,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/n12-404wb.jpg",
			url: "http://www.agropak.net/kontejnery-logic-store/12_404/"
		},
		{
			id: "12.414",
			title: "Контейнер 12.414",
			price: 151.0,
			width: 225,
			height: 150,
			deep: 400,
			sort: 2,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/12_414.jpg",
			url: "http://www.agropak.net/kontejnery-logic-store/12414/"
		},
		{
			id: "12.405.1",
			title: "Контейнер 12.405.1",
			price: 180.0,
			width: 225,
			height: 150,
			deep: 500,
			sort: 2,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/n12-4050c.jpg",
			url: "http://www.agropak.net/kontejnery-logic-store/12_405/"
		},
		{
			id: "12.406.1",
			title: "Контейнер 12.406.1",
			price: 270.0,
			width: 300,
			height: 200,
			deep: 500,
			sort: 2,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/n12-406b.jpg",
			url: "http://www.agropak.net/kontejnery-logic-store/12_406/"
		},
		{
			id: "12.407.1",
			title: "Контейнер 12.407.1",
			price: 305.0,
			width: 300,
			height: 250,
			deep: 500,
			sort: 2,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/n12-407b.jpg",
			url: "http://www.agropak.net/kontejnery-logic-store/12_407/"
		}
	];

	$scope.Calculation = function () {
		/** Высота стеллажа **/
		var currentHeight = $scope.cupboard.height;
		var currentWidth = $scope.cupboard.width;
		var currentDeep = $scope.cupboard.deep;
		var currentQuantity = 0;
		var drawingAreaHeight = $scope.drawHeight - $scope.drawHeight * 0.05;
		var scale = drawingAreaHeight / currentHeight.value;

		//scale = 1;
		console.log('Текущий масштаб: ' + scale);
		if (angular.isObject($scope.selectedBox)) {
			console.log('Выбран ящик:');
			console.log($scope.selectedBox);
			var shelveCount = Math.floor(currentHeight.value / ($scope.selectedBox.height + 30 + 35));
			if (shelveCount == 1) {
				shelveCount++;
			}

			//  Вычисляем растояние между полками
			var shelveHeight = 0;
			if (shelveCount > 2) {
				shelveHeight = Math.ceil((currentHeight.value / shelveCount) / 25) * 25;
			} else {
				shelveHeight = Math.ceil((currentHeight.value / (shelveCount - 1)) / 25) * 25;
			}
			if (shelveHeight < 145) {
				shelveHeight = 145;
			}
			var boxCount = Math.floor((currentWidth.value - 60) / $scope.selectedBox.width) + 1;
			console.info('Предполагаемое количество полок: ' + shelveCount);
			console.info('Предполагаемое высота полок: ' + shelveHeight);
			console.info('Предполагаемое количество ящиков: ' + boxCount);

			currentQuantity = shelveCount

			var shelveArray = []

			for (var n = 0; n < currentQuantity; n++) {
				var shelve = {
					height: 30 * scale + 'px',
					width: (currentWidth.value * scale) + (30 * scale) + 'px',
					left: 0,
					top: ($scope.drawHeight * 0.025) + (n * shelveHeight * scale) + 'px'
				}
				shelveArray.push(shelve);
			}

			var boxArray = [];

			//  Тут мы рисуем ящики на полках
			//  И у нас реальная проблема с визуализацией
			for (var shelve = 1; shelve < currentQuantity; shelve++) {
				for (var box = 0; box < boxCount; box++) {
					var placementWidth = (currentWidth.value - 60) / boxCount * scale;
					var offset = Math.abs((placementWidth - (($scope.selectedBox.width * 100 / 117) * scale )) / 1);
					console.log(placementWidth + ' ' + ' ' + (($scope.selectedBox.width * 100 / 117) * scale ) + ' ' + offset);
					var newBox = {
						style: {
							top: (((shelve * shelveHeight) - ($scope.selectedBox.height - 15)) * scale) + 'px',
							left: (30 * scale) + offset + (placementWidth * box) + 'px',
							width: (($scope.selectedBox.width * 100 / 117) * scale ) + 'px',
							height: (($scope.selectedBox.height * 100 / 90) * scale ) + 'px'//,
							//border: '1px solid'
						},
						path: {
							xscale: (($scope.selectedBox.width * 100 / 117) / 117 ) * scale,
							yscale: (($scope.selectedBox.height * 100 / 90) / 90) * scale
						},
						width: $scope.selectedBox.width
					};

					boxArray.push(newBox);
				}
				;
			}
		}

		console.log(shelveArray);

		if (angular.isObject(currentDeep)) {

			var priceHeight = currentHeight.price;
			var priceShelve = currentDeep.price;

			$scope.drawing = {
				stoyka1: {
					height: currentHeight.value * scale + 'px',
					width: 30 * scale + 'px',
					left: 0 + 'px',
					'background-color': 'blue',
					top: $scope.drawHeight * 0.025 + 'px'
				},
				stoyka2: {
					height: currentHeight.value * scale + 'px',
					width: 30 * scale + 'px',
					left: currentWidth.value * scale + 'px',
					'background-color': 'blue',
					top: $scope.drawHeight * 0.025 + 'px'
				},
				shelves: shelveArray,
				boxes: boxArray
			}

			console.log(currentDeep.value);
			var thisDeep = currentDeep.value;

			//  Берем только контейнеры, которые подходят по высоте
			/*
			 var filterResult = $filter('filter')($scope.boxes, {
			 height: boxHeightLimit
			 }, function (actual, expected) {
			 return actual <= expected;
			 });
			 */
			//  Берем контейнеры, которые подходят по глубине
			let filterResult = $filter('filter')($scope.boxes, {
				deep: currentDeep.value
			}, function (actual, expected) {
				if ((actual == expected - 50) || (actual == expected)) {
					return true;
				}
				return false;
			});
			$scope.boxResult = $filter('orderBy')(filterResult, ['-deep', '+sort'])
			console.log($scope.boxResult);

		}


	};

	$scope.BoxClick = function (item) {
		//console.log(box);
		$scope.selectedBox = item;
		$scope.boxLineCount = Math.ceil($scope.cupboard.width.value / item.width);
		$scope.boxPrice = $scope.boxLineCount * $scope.cupboard.shelve.value * item.price;
		$scope.totalPrice = $scope.totalPrice = $scope.boxPrice;
		this.Calculation();
		//console.log(item);
	}

	/*
	 $scope.ChangeQuantity = function () {
	 this.Calculation();
	 }
	 */
	/**
	 * Процедура обработки изменения глубины
	 */
	$scope.ChangeDeep = function () {
		this.Calculation();
	};

	/**
	 * Процедура обработки изменения ширины стелажа
	 * @param data
	 * @constructor
	 */
	$scope.ChangeWidth = function () {
		var deeps = [];

		//console.log($scope.cupboard.width.deeps);
		$scope.deeps = $scope.cupboard.width.deeps;
		$scope.cupboard.deep = $scope.deeps[0];

		this.Calculation();
	};

	/**
	 * Процедура обработки изменения высоты стелажа
	 * @param data
	 * @constructor
	 */
	$scope.ChangeHeight = function () {
		var shelves = [];

		angular.forEach($scope.heights, function (value, key) {
			if (value.value == $scope.cupboard.height) {
				this.push(value.shelves);
			}
		}, shelves);

		var shelvesArray = [];

		for (var n = $scope.cupboard.height.shelves.min; n <= $scope.cupboard.height.shelves.max; n++) {
			shelvesArray.push({value: n, title: n});
		}

		$scope.shelves = shelvesArray;
		$scope.cupboard.shelve = $scope.shelves[0];
		//console.log(shelvesArray);

		this.Calculation();
	};
});