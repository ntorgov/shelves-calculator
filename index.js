/**
 * Created by nick on 02.01.17.
 */
let camera, scene, renderer;
let geometry, material, mesh;
////
caclulatorApplication.controller("calculatorController", function ($scope, $filter) {
	
	/**
	 * Высота изображения
	 * @type {number}
	 */
	$scope.drawHeight = 400;

	/**
	 * Высоты шкафов
	 * @type {Object[]}
	 * @property {number} value Значение
	 * @property {number} title Название
	 * @property {Boolean} selected Автоматический выбор
	 * @property {number} price Стоимость
	 * @property {Object} shelves Полки
	 * @property {number} shelves.min Минимальное количество полок
	 * @property {number} shelves.max Максимальное количество полок
	 */
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

	/**
	 * Ширины шкафов
	 * @type {Object[]}
	 * @property {number} value - Значение
	 * @property {string} title - Название
	 * @property {Object[]} deeps - Глубины
	 * @property {number} deeps[].value - Значение
	 * @property {string} deeps[].title - Название
	 * @property {number} deeps[].price - Цена
	 */
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

	/**
	 * Массив ящиков
	 * @name boxArray
	 * @type {Object[]}
	 * @property {string} id - Артикул
	 * @property {string} title Название
	 * @property {number} price Цена
	 * @property {number} width Ширина
	 * @property {number} height Высота
	 * @property {number} deep Глубина
	 * @property {number} sort Сортировка
	 * @property {string} image Изображение
	 * @property {string} url Ссылка на страницу товара
	 * @property {string} color Цвет
	 */
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3109/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-31509/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3209/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3214/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4109/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-41509/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4209/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4214/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5109/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-51509/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5209/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5214/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6109/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-61509/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6209/",
			color: "blue"
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
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6214/",
			color: "blue"
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
			url: "http://www.agropak.net/kontejnery-logic-store/12412/",
			color: "blue"
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
			url: "http://www.agropak.net/kontejnery-logic-store/12_403/",
			color: "blue"
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
			url: "http://www.agropak.net/kontejnery-logic-store/12_404/",
			color: "blue"
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
			url: "http://www.agropak.net/kontejnery-logic-store/12414/",
			color: "blue"
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
			url: "http://www.agropak.net/kontejnery-logic-store/12_405/",
			color: "blue"
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
			url: "http://www.agropak.net/kontejnery-logic-store/12_406/",
			color: "blue"
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
			url: "http://www.agropak.net/kontejnery-logic-store/12_407/",
			color: "blue"
		}
	];

	$scope.shelvesCount = 0;
	$scope.shelvesCountOld = 0;

	$scope.shelveHeight = 0;
	$scope.boxCount = 0;
	$scope.boxCounter = 0;
	$scope.cameraRadius = 0;
	$scope.angle = 0;

	/**
	 * Инициализация визуализации
	 */
	function visualizationInit() {

		//  Высота выбранного стеллажа
		// const currentHeight = $scope.cupboard.height;

		//  Ширина выбранного стеллажа
		// const currentWidth = $scope.cupboard.width;

		//  Глубина выбранного стеллажа
		// const currentDeep = $scope.cupboard.deep;

		let shelvesCounter, holdersCounter, boxCounter;
		let selectedObject;
		let shelveYPosition;
		let shelveMaterial, shelveGeometry, shelveObject;

		/**
		 * Материал объекта (серый)
		 * @type {Object}
		 * @property {number} color - Цвет
		 * @property {boolean} wireframe - Сетка
		 */
		let material;

//  Фигура для стойки
		let holderShape;
		//  Параметры вытягивания фигуры
		let extrudeSettings;
		//  Готовая фигура стойки
		let holderGeometry;
		let holder1, holder2, holder3, holder4;

		if ($scope.cupboard.width && $scope.cupboard.width.value) {
			//console.warn(currentHeight.value);


			//holderGeometry = new THREE.BoxGeometry(200, 200, 200);
			material = new THREE.MeshLambertMaterial({
				color: 0x777777,
				wireframe: false
			});

			holderShape = new THREE.Shape();
			holderShape.moveTo(0, 0);
			holderShape.lineTo(0, 30);
			holderShape.lineTo(1, 30);
			holderShape.lineTo(1, 1);
			holderShape.lineTo(30, 1);
			holderShape.lineTo(30, 0);
			holderShape.lineTo(0, 0);

			extrudeSettings = {
				steps: 2,
				amount: $scope.cupboard.height.value, //500,
				bevelEnabled: false,
			};

			holderGeometry = new THREE.ExtrudeGeometry(holderShape, extrudeSettings);

			//  Очистка сцены
			for (holdersCounter = 1; holdersCounter <= 4; holdersCounter++) {
				selectedObject = scene.getObjectByName("shelveHolder" + holdersCounter);
				if (selectedObject) {
					scene.remove(selectedObject);
				}
			}
			for (shelvesCounter = 0; shelvesCounter <= $scope.shelvesCountOld; shelvesCounter++) {
				selectedObject = scene.getObjectByName("shelve" + shelvesCounter);
				if (selectedObject) {
					scene.remove(selectedObject);
				}
			}
			for (boxCounter = 0; boxCounter <= $scope.boxCounter; boxCounter++) {
				selectedObject = scene.getObjectByName("box" + boxCounter);
				if (selectedObject) {
					scene.remove(selectedObject);
				}
			}

			// @todo исправить эту поебень на человеческую
			//  Первая стойка. Стоит по координатам 0, 0
			/*
			var holderBSP1 = new ThreeBSP(holderGeometry);
			*/
			holder1 = new THREE.Mesh(holderGeometry, material);
			//var CSG = new CSG();
			/*
			var cylinderGeometry = new THREE.CylinderGeometry(50, 50, 70, 32);
			var cylinderMesh = new THREE.Mesh( cylinderGeometry, material );
			cylinderMesh.rotation.z = THREE.Math.degToRad(90);
			var cylinderBSP = new ThreeBSP(cylinderGeometry);
			var substractBSP = holderBSP1.subtract(cylinderBSP);
			var result = substractBSP.toMesh(material);
			result.position.x = 6;
			result.geometry.computeVertexNormals();
			scene.add( result );
*/
			//cylinderMesh.rotation.x = THREE.Math.degToRad(90);
			//a.setColor(1, 0, 0);
			//scene.add(cylinderMesh);

			holder1.name = "shelveHolder1";
			holder1.rotation.x = THREE.Math.degToRad(-90);

			//  Вторая стойка. Повернута на 90 и стоит на расстоянии ширины полки
			holder2 = new THREE.Mesh(holderGeometry, material);
			holder2.name = "shelveHolder2";
			holder2.position.set($scope.cupboard.width.value + 2, 0, 0);
			holder2.rotation.x = THREE.Math.degToRad(-90);
			holder2.rotation.z = THREE.Math.degToRad(90);

			//  Третья стойка. Повернута на 180 и стоит на расстоянии ширины полки и на ее глубине
			holder3 = new THREE.Mesh(holderGeometry, material);
			holder3.name = "shelveHolder3";
			holder3.position.set($scope.cupboard.width.value + 2, 0, ($scope.cupboard.deep.value * -1 - 2));
			holder3.rotation.x = THREE.Math.degToRad(-90);
			holder3.rotation.z = THREE.Math.degToRad(180);

			//  Четвертая стойка. Повернута на 270 и стоит на расстоянии глубины полки
			holder4 = new THREE.Mesh(holderGeometry, material);
			holder4.name = "shelveHolder4";
			holder4.position.set(0, 0, ($scope.cupboard.deep.value * -1 - 2));
			holder4.rotation.x = THREE.Math.degToRad(-90);
			holder4.rotation.z = THREE.Math.degToRad(270);



			scene.add(holder1);
			scene.add(holder2);
			scene.add(holder3);
			scene.add(holder4);

			console.log("Vis. Shelves count " + $scope.shelvesCount);

			$scope.shelvesCountOld = $scope.shelvesCount;

			if ($scope.shelvesCount) {
				$scope.boxCounter = 0;
				for (shelvesCounter = 0; shelvesCounter <= $scope.shelvesCount; shelvesCounter++) {

					shelveYPosition = $scope.cupboard.height.value - (shelvesCounter * $scope.shelveHeight) - 6.25;
					shelveGeometry = new THREE.BoxGeometry($scope.cupboard.width.value, 12.5, $scope.cupboard.deep.value);
					shelveMaterial = new THREE.MeshBasicMaterial({color: 0x666666});
					shelveObject = new THREE.Mesh(shelveGeometry, shelveMaterial);
					shelveObject.name = "shelve" + shelvesCounter;
					shelveObject.position.set($scope.cupboard.width.value * 0.5 + 1, shelveYPosition, $scope.cupboard.deep.value * -0.5 - 1);
					scene.add(shelveObject);

					//console.log($scope.selectedBox);

					if (shelvesCounter > 0) {

						boxPlaceWidth = ($scope.cupboard.width.value - 29 * 2) / ($scope.boxCount);

						//  Это значение - отступ от края посадочного места
						boxPlacementPadding = (boxPlaceWidth - $scope.selectedBox.width) / 2;
						boxPlacementMarguin = ($scope.selectedBox.width / 2) + 30;

						console.log("Ширина посадочного места: " + boxPlaceWidth);

						for (boxCounter = 0; boxCounter < $scope.boxCount; boxCounter++) {

							$scope.boxCounter++;
							boxYPosition = shelveYPosition + 6.25 + ($scope.selectedBox.height / 2);
							boxGeometry = new THREE.BoxGeometry($scope.selectedBox.width, $scope.selectedBox.height, $scope.selectedBox.deep);
							boxMaterial = new THREE.MeshBasicMaterial({
								color: 0x8888ff,
								wireframe: true,
								transparent: 0.8
							});
							boxObject = new THREE.Mesh(boxGeometry, boxMaterial);
							boxObject.name = "box" + $scope.boxCounter;
							boxObject.position.set(boxCounter * boxPlaceWidth + boxPlacementPadding + boxPlacementMarguin, boxYPosition, ($scope.selectedBox.deep / -2) - 1);
							scene.add(boxObject);
						}
					}
				}
			}


			//renderer = new THREE.WebGLRenderer({antialias: true});
			//renderer.setSize(window.innerWidth, window.innerHeight);

			//  Инициализация рендера внутри блока
			//document.getElementById("visualization").appendChild(renderer.domElement);
			camera.position.y = $scope.cupboard.height.value;

			//camera.position.x = $scope.cupboard.height.value + $scope.cupboard.width.value;
			//camera.position.z = $scope.cupboard.height.value + $scope.cupboard.width.value;
			$scope.cameraRadius = Math.sqrt(Math.pow($scope.cupboard.height.value, 2) + Math.pow($scope.cupboard.width.value, 2));
			camera.position.x = $scope.cameraRadius * Math.cos($scope.angle) * 2;
			camera.position.z = $scope.cameraRadius * Math.sin($scope.angle) * 2;
			camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5), ($scope.cupboard.height.value * 0.5), ($scope.cupboard.deep.value * -0.5)));

			//shelveObject = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 15), new THREE.MeshBasicMaterial({color: 0xff3333}));
			//shelveObject.position.set(($scope.cupboard.width.value * 0.5), ($scope.cupboard.height.value * 0.5), ($scope.cupboard.deep.value * -0.5));
			//scene.add(shelveObject);

		}
	}

	function render() {

		let x, z;
		let radius;

		// console.info(renderer);

		if ($scope.cupboard.width && $scope.cupboard.width.value) {
			renderer.render(scene, camera);
			x = camera.position.x;
			z = camera.position.z;
			radius = $scope.cameraRadius * 2;
			//camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001);
			//camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001);

			camera.position.x = radius * Math.cos($scope.angle);
			camera.position.z = radius * Math.sin($scope.angle);
			// camera.position.y = $scope.cupboard.height.value;
			$scope.angle += 0.002;

			calcRad = Math.sqrt(Math.pow(camera.position.x, 2) + Math.pow(camera.position.z, 2));

			//console.log("R: " + radius + ", x: " + camera.position.x + ", z: " + camera.position.z + ", a: " + $scope.angle + ", cr: " + calcRad);
			//console.log(camera);

			//camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
			//	* Math.cos( phi * Math.PI / 360 );
			//camera.position.y = radious * Math.sin( phi * Math.PI / 360 );

			camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5), ($scope.cupboard.height.value * 0.5), ($scope.cupboard.deep.value * -0.5)));
			//camera.updateProjectionMatrix();
			//camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5), 0, 0));
			requestAnimationFrame(render);
		}
	}

	function init() {

		const proportion = 4 / 3;
		let width = document.getElementById("visualization").offsetWidth;
		let height = (width / proportion);

		//camera = new THREE.Camera(35, proportion, 1, 10000);
		camera = new THREE.PerspectiveCamera(30, proportion, 1, 10000);
		camera.isPerspectiveCamera = false;
		//camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, - 100, 10000 );
		//camera.position.z = 1400;
		//camera.position.y = 550;
		//camera.position.x = 1400;

		scene = new THREE.Scene();

		scene.add(new THREE.AmbientLight(0xffffff));

		var light = new THREE.PointLight(0xffffff);
		light.castShadow = true;
		light.position.copy(camera.position);
		scene.add(light);

		renderer = new THREE.WebGLRenderer({antialias: true});

		renderer.setSize(width, (width / proportion));

		//  Инициализация рендера внутри блока
		document.getElementById("visualization").appendChild(renderer.domElement);
	}

	$scope.init = function () {

		let visualizationObject = document.getElementById("visualization");

		if(visualizationObject) {
			init();
		}
	};

	$scope.init();

	$scope.Calculation = function () {

		/**
		 * Количество полок у стеллажа
		 * @type {number}
		 */
		let shelveCount;
		let priceShelve;
		let priceHeight;
		let filterResult;
		let shelveHeight;

		/**
		 * Количество коробок на полке
		 */
		let boxCount;
		let shelveArray;
		let n;
		let shelve;
		let box;
		let placementWidth;
		let offset;
		let newBox;

		//  Высота выбранного стеллажа
		const currentHeight = $scope.cupboard.height;

		//  Ширина выбранного стеллажа
		const currentWidth = $scope.cupboard.width;

		//  Глубина выбранного стеллажа
		const currentDeep = $scope.cupboard.deep;
		let currentQuantity = 0;

		//  Высота рисунка это высота области, минус 5%
		const drawingAreaHeight = $scope.drawHeight - $scope.drawHeight * 0.05;

		//  Масштаб
		const scale = drawingAreaHeight / currentHeight.value;

		//scale = 1;
		// console.log("Текущий масштаб: " + scale);
		if (angular.isObject($scope.selectedBox)) {
			// console.log("Выбран ящик:");
			// console.log($scope.selectedBox);
			shelveCount = Math.floor(currentHeight.value / ($scope.selectedBox.height + 30 + 35));
			if ((shelveCount + 1) < currentHeight.shelves.min) {
				shelveCount = currentHeight.shelves.min;
			}
			if ((shelveCount + 1) > currentHeight.shelves.max) {
				shelveCount = currentHeight.shelves.max;
			}


			//  Вычисляем растояние между полками
			shelveHeight = 0;
			if (shelveCount > 2) {
				shelveHeight = Math.floor((currentHeight.value / shelveCount) / 25) * 25;
			} else {
				// shelveHeight = Math.ceil((currentHeight.value / (shelveCount - 1)) / 25) * 25;
				shelveHeight = Math.floor(($scope.selectedBox.height + 30 + 35) / 25) * 25;
			}
			if (shelveHeight < 145) {
				shelveHeight = 145;
			}
			if ((shelveCount * shelveHeight) >= currentHeight.value) {
				shelveCount--;
			}

			boxCount = Math.floor((currentWidth.value - 60) / $scope.selectedBox.width);

			$scope.shelvesCount = shelveCount;
			$scope.shelveHeight = shelveHeight;
			$scope.boxCount = boxCount;

			console.log("Предполагаемое количество полок: " + shelveCount);
			console.log("Предполагаемая высота конструкции: " + shelveCount * shelveHeight);
			console.info("Предполагаемое высота полок: " + shelveHeight);
			console.log("Предполагаемое количество ящиков: " + boxCount);

			currentQuantity = shelveCount;


			shelveArray = [];

			/********************
			 * ******************
			 */
			for (n = 0; n < currentQuantity; n++) {
				shelve = {
					height: 30 * scale + "px",
					width: (currentWidth.value * scale) + (30 * scale) + "px",
					left: 0,
					top: ($scope.drawHeight * 0.025) + (n * shelveHeight * scale) + "px"
				};
				shelveArray.push(shelve);
			}

			var boxArray = [];

			//  Тут мы рисуем ящики на полках
			//  И у нас реальная проблема с визуализацией
			for (shelve = 1; shelve < currentQuantity; shelve++) {

				for (box = 0; box < boxCount; box++) {

					placementWidth = (currentWidth.value - 60) / boxCount * scale;
					offset = Math.abs((placementWidth - (($scope.selectedBox.width * 100 / 117) * scale )) / 1);
					console.log(placementWidth + " " + " " + (($scope.selectedBox.width * 100 / 117) * scale ) + " " + offset);
					newBox = {
						style: {
							top: (((shelve * shelveHeight) - ($scope.selectedBox.height - 15)) * scale) + "px",
							left: (30 * scale) + offset + (placementWidth * box) + "px",
							width: (($scope.selectedBox.width * 100 / 117) * scale ) + "px",
							height: (($scope.selectedBox.height * 100 / 90) * scale ) + "px"//,
							//border: "1px solid"
						},
						path: {
							xscale: (($scope.selectedBox.width * 100 / 117) / 117 ) * scale,
							yscale: (($scope.selectedBox.height * 100 / 90) / 90) * scale
						},
						width: $scope.selectedBox.width
					};

					boxArray.push(newBox);
				}
			}
			/**************************
			 *
			 */
		}

		//console.log(shelveArray);

		visualizationInit();
		render();

		//this.Visualization();

		// ***********************************************************************************************
		if (angular.isObject(currentDeep)) {

			priceHeight = currentHeight.price;
			priceShelve = currentDeep.price;

			$scope.drawing = {
				stoyka1: {
					height: currentHeight.value * scale + "px",
					width: 30 * scale + "px",
					left: 0 + "px",
					"background-color": "blue",
					top: $scope.drawHeight * 0.025 + "px"
				},
				stoyka2: {
					height: currentHeight.value * scale + "px",
					width: 30 * scale + "px",
					left: currentWidth.value * scale + "px",
					"background-color": "blue",
					top: $scope.drawHeight * 0.025 + "px"
				},
				shelves: shelveArray,
				boxes: boxArray
			};

			console.log(currentDeep.value);
			var thisDeep = currentDeep.value;

			//  Берем только контейнеры, которые подходят по высоте
			/*
			 filterResult = $filter("filter")($scope.boxes, {
			 height: boxHeightLimit
			 }, function (actual, expected) {
			 return actual <= expected;
			 });
			 */
			//  Берем контейнеры, которые подходят по глубине
			filterResult = $filter("filter")($scope.boxes, {
				deep: currentDeep.value
			}, function (actual, expected) {
				if ((actual == expected - 50) || (actual == expected)) {
					return true;
				}
				return false;
			});
			$scope.boxResult = $filter("orderBy")(filterResult, ["-deep", "+sort"]);
			console.log($scope.boxResult);

		}

//  ************************************************************************************************************

	};


	/*
	 $scope.Visualization = function () {
	 let gl; // глобальная переменная для контекста WebGL

	 //function start() {
	 const canvas = document.getElementById("visualization");

	 gl = this.initWebGL(canvas);      // инициализация контекста GL

	 // продолжать только если WebGL доступен и работает

	 if (gl) {
	 gl.clearColor(0.7, 0.7, 0.7, 1.0);                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
	 gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
	 gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
	 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);      // очистить буфер цвета и буфер глубины.
	 }
	 //}
	 };

	 $scope.initWebGL = function (canvas) {

	 // @todo перенести в скоп
	 gl = null;

	 try {
	 // Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
	 gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	 }
	 catch (e) {
	 }

	 // Если мы не получили контекст GL, завершить работу
	 if (!gl) {
	 alert("Unable to initialize WebGL. Your browser may not support it.");
	 gl = null;
	 }

	 return gl;
	 };
	 */


	/**
	 * Обработчик клика по ящику
	 * @param {Object<boxArray>} item Объект коробки
	 */
	$scope.BoxClick = function (item) {

		$scope.selectedBox = item;
		$scope.boxPrice = $scope.boxCount * $scope.shelvesCount * item.price;
		$scope.totalPrice += $scope.boxPrice;
		this.Calculation();
	};

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
	 */
	$scope.ChangeWidth = function () {

		$scope.deeps = $scope.cupboard.width.deeps;
		$scope.cupboard.deep = $scope.deeps[0];

		this.Calculation();
	};

	/**
	 * Процедура обработки изменения высоты стелажа
	 */
	$scope.ChangeHeight = function () {

		let n;
		let shelvesArray;
		let shelves = [];

		angular.forEach($scope.heights, function (value, key) {
			
			if (value.value == $scope.cupboard.height) {
				
				this.push(value.shelves);
			}
			
		}, shelves);

		shelvesArray = [];

		for (n = $scope.cupboard.height.shelves.min; n <= $scope.cupboard.height.shelves.max; n++) {
			
			shelvesArray.push({value: n, title: n});
		}

		$scope.shelves = shelvesArray;
		$scope.cupboard.shelve = $scope.shelves[0];

		this.Calculation();
	};
});
