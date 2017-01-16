import Color = THREE.Color;
import BufferGeometry = THREE.BufferGeometry;
/**
 * Created by Bagdad on 13.01.2017.
 */
let camera, scene, renderer;
let geometry, material, mesh;

/**
 * Объект света
 * @name mainLightObject
 * @type {Object}
 * @property {Object} position Положение объекта
 * @property {number} position.x Положение по X
 * @property {number} position.y Положение по Y
 * @property {number} position.z Положение по Z
 */
let light: THREE.PointLight;

declare let calculatorApplication: any;

calculatorApplication.controller("calculatorController", function ($scope, $filter) {

	/**
	 * Фиксация величин для THREE.js
	 * @type {number}
	 */
	const unitFixation: number = 1 / 1000;

	/**
	 * Растояние между отверстиями в стойках, мм
	 * @type {number} миллиметры
	 */
	const distanceBetweenHoles: number = 25;

	/**
	 * Радиус перфорационных отверстий у стоек, мм
	 * @type {number} миллиметры
	 */
	const holderPerforationRadius: number = 4;

	/**
	 * Высота полки, мм
	 * @type {number} миллиметры
	 */
	const shelveHeight: number = 25;

	/**
	 * Высота изображения
	 * @type {number}
	 */
	const displayHeight: number = 400;

	/**
	 * Массив ящиков
	 * @type {Object[]}
	 */
	const boxesArray: {id: string; title: string; price: number; width: number; height: number; deep: number; sort: number; image: string; url: string; color: string}[] = [
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

	/**
	 * Высоты шкафов
	 * @type {Object[]}
	 */
	const shelvesHeights: {value: number, title: number, selected: boolean, price: number, shelves: {min: number, max: number}}[] = [
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
	 * @name selvesWidths
	 * @version 1.0
	 * @author Bagdad
	 * @type {Object[]}
	 * @property {number} value Значение ширины
	 * @property {number} title Название
	 * @property {Object[]} deeps Массив глубин
	 * @property {number} deeps.value Значение глубины
	 * @property {number} deeps.title Название глубины
	 * @property {number} deeps.price Стоимость
	 */
	const selvesWidths: {value: number; title: number; deeps: {value: number; title: number; price: number}[]}[] = [
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

	$scope.widths = selvesWidths;

	$scope.heights = shelvesHeights;

	$scope.drawHeight = displayHeight;


	$scope.boxes = boxesArray;

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

		let boxMaterial: THREE.MeshLambertMaterial;
		let shelvesCounter: number, holdersCounter: number, boxCounter: number;
		let selectedObject;
		let shelveYPosition: number;
		let shelveMaterial, shelveGeometry, shelveObject;

		let perforatedHolder;

		/**
		 * Фременный объект для нанесения перфорации
		 */
		let cylinderBSP: Object;

		/**
		 * Объект геометрии цилиндра.
		 * Нужен для нанесения перфорации на стойки
		 */
		let cylinderGeometry: Object;

		/**
		 * Счетчик для порфорации стоек
		 * @type {number}
		 */
		let perforationCounter: number;

		/**
		 * Объект цилиндра для вертикальной перфорации
		 * @type {Object}
		 * @property {Object} position Положение объекта
		 * @property {number} position.x Положение по X
		 * @property {number} position.y Положение по Y
		 * @property {number} position.z Положение по Z
		 * @property {Object} rotation - Вращение объекта
		 * @property {Number} rotation.x - Вращение по X
		 * @property {Number} rotation.y - Вращение по Y
		 * @property {Number} rotation.z - Вращение по Z
		 */
		let subtractCylinderGeometry: Object;

		/**
		 * Материал объекта (серый)
		 * @type {Object}
		 * @property {number} color - Цвет
		 * @property {boolean} wireframe - Сетка
		 * @property {number} reflectivity - Отражение
		 * @property {number} transparent - Прозрачность
		 */
		let material: {color: Color, wireframe: boolean, reflectivity: number, transparent: number};

//  Фигура для стойки
		let holderShape;
		//  Параметры вытягивания фигуры
		let extrudeSettings;
		//  Готовая фигура стойки
		let holderGeometry;
		/**
		 * Объекты для стоек
		 * @type {Object[]}
		 * @property {String} name - Имя объекта
		 * @property {Object} rotation - Вращение объекта
		 * @property {Number} rotation.x - Вращение по X
		 * @property {Number} rotation.y - Вращение по Y
		 * @property {Number} rotation.z - Вращение по Z
		 */
		let holder = [];

		if ($scope.cupboard.width && $scope.cupboard.width.value) {
			//console.warn(currentHeight.value);

			material = new THREE.MeshStandardMaterial({
				color: 0x777777,
				wireframe: false,
				reflectivity: 1,
				transparent: 0,
				metalness: 0.25,
			});

			holderShape = new THREE.Shape();
			holderShape.moveTo(0, 0);
			holderShape.lineTo(0, 30 * unitFixation);
			holderShape.lineTo(1 * unitFixation, 30 * unitFixation);
			holderShape.lineTo(1 * unitFixation, 1 * unitFixation);
			holderShape.lineTo(30 * unitFixation, 1 * unitFixation);
			holderShape.lineTo(30 * unitFixation, 0);
			holderShape.lineTo(0, 0);

			extrudeSettings = {
				steps: 2,
				amount: $scope.cupboard.height.value * unitFixation, //500,
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

			// let substractBSP;

			perforatedHolder = new ThreeBSP(holderGeometry);

			//  Перфорация стойки
			//  Создание цилиндра для перфорации
			cylinderGeometry = new THREE.CylinderGeometry(holderPerforationRadius * unitFixation, holderPerforationRadius * unitFixation, 70 * unitFixation, 5);

			subtractCylinderGeometry = new THREE.Mesh(cylinderGeometry, material);
			subtractCylinderGeometry.position.x = 16 * unitFixation;

			for (perforationCounter = 0; perforationCounter < ($scope.cupboard.height.value / distanceBetweenHoles); perforationCounter++) {

				subtractCylinderGeometry.position.z = ((perforationCounter * distanceBetweenHoles) + (shelveHeight / 2)) * unitFixation;

				let cylinderBSP1 = new ThreeBSP(subtractCylinderGeometry);

				subtractCylinderGeometry.rotation.z = THREE.Math.degToRad(90);
				subtractCylinderGeometry.position.y = 16 * unitFixation;

				let cylinderBSP2 = new ThreeBSP(subtractCylinderGeometry);

				perforatedHolder = perforatedHolder.subtract(cylinderBSP1.union(cylinderBSP2));

				subtractCylinderGeometry.position.y = 0;
				subtractCylinderGeometry.rotation.z = THREE.Math.degToRad(0);

				delete cylinderBSP1;
				delete cylinderBSP2;
			}
			//  Конец перфорации стойки

			for (holdersCounter = 1; holdersCounter <= 4; holdersCounter++) {

				holder[holdersCounter] = perforatedHolder.toMesh(material);
				holder[holdersCounter].geometry.computeVertexNormals();
				holder[holdersCounter].name = "shelveHolder" + holdersCounter;
				holder[holdersCounter].castShadow = true;
				holder[holdersCounter].receiveShadow = true;
				holder[holdersCounter].rotation.x = THREE.Math.degToRad(-90);

				//scene.add(holder[holdersCounter]);
			}

			// delete perforatedObject;
			delete perforatedHolder;

			// holder[1].name = "shelveHolder1";
			//holder[1].rotation.x = THREE.Math.degToRad(-90);

			//  Вторая стойка. Повернута на 90 и стоит на расстоянии ширины полки
			holder[2].position.set(($scope.cupboard.width.value + 2) * unitFixation, 0, 0);
			//holder[2].rotation.x = THREE.Math.degToRad(-90);
			holder[2].rotation.z = THREE.Math.degToRad(90);

			//  Третья стойка. Повернута на 180 и стоит на расстоянии ширины полки и на ее глубине
			holder[3].position.set(($scope.cupboard.width.value + 2) * unitFixation, 0, ($scope.cupboard.deep.value * -1 - 2) * unitFixation);
			//holder[3].rotation.x = THREE.Math.degToRad(-90);
			holder[3].rotation.z = THREE.Math.degToRad(180);

			//  Четвертая стойка. Повернута на 270 и стоит на расстоянии глубины полки
			holder[4].position.set(0, 0, ($scope.cupboard.deep.value * -1 - 2) * unitFixation);
			//holder[4].rotation.x = THREE.Math.degToRad(-90);
			holder[4].rotation.z = THREE.Math.degToRad(270);


			let floorGeometry = new THREE.CylinderGeometry(($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation, ($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation, 1 * unitFixation, 32);
			let floorMaterial = new THREE.MeshStandardMaterial({
				color: 0x333333,
				wireframe: false,
				metalness: 0.25
				reflectivity: 1,
				//transparent: 0
			});
			let floorMech = new THREE.Mesh(floorGeometry, floorMaterial);
			floorMech.position.x = ($scope.cupboard.width.value / 2) * unitFixation;
			floorMech.position.z = ($scope.cupboard.deep.value / 2) * unitFixation;
			floorMech.position.y = -1 * unitFixation;
			floorMech.receiveShadow = true;
			scene.add(floorMech);

			light.position.y = ($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation * 3;
			light.position.x = ($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation * 3;
			light.position.z = ($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation * 3;

			for (holdersCounter = 1; holdersCounter <= 4; holdersCounter++) {

				scene.add(holder[holdersCounter]);
			}

			console.log("Vis. Shelves count " + $scope.shelvesCount);

			$scope.shelvesCountOld = $scope.shelvesCount;

			if ($scope.shelvesCount) {
				$scope.boxCounter = 0;
				for (shelvesCounter = 0; shelvesCounter <= $scope.shelvesCount; shelvesCounter++) {

					shelveYPosition = ($scope.cupboard.height.value - (shelvesCounter * $scope.shelveHeight) - (shelveHeight / 2));
					// @todo пофисить
					shelveGeometry = new THREE.BoxGeometry($scope.cupboard.width.value * unitFixation, shelveHeight * unitFixation, $scope.cupboard.deep.value * unitFixation);
					// shelveMaterial = new THREE.MeshBasicMaterial({color: 0x666666});
					shelveObject = new THREE.Mesh(shelveGeometry, material);
					shelveObject.name = "shelve" + shelvesCounter;
					shelveObject.castShadow = true;
					shelveObject.receiveShadow = true;
					shelveObject.position.set(($scope.cupboard.width.value * 0.5 + 1) * unitFixation, shelveYPosition * unitFixation, ($scope.cupboard.deep.value * -0.5 - 1) * unitFixation);
					scene.add(shelveObject);

					//console.log($scope.selectedBox);

					if (shelvesCounter > 0) {

						boxPlaceWidth = (($scope.cupboard.width.value - 29 * 2) / ($scope.boxCount));

						//  Это значение - отступ от края посадочного места
						boxPlacementPadding = ((boxPlaceWidth - $scope.selectedBox.width) / 2);
						boxPlacementMarguin = (($scope.selectedBox.width / 2) + 30);

						console.log("Ширина посадочного места: " + boxPlaceWidth);


						//  Отрисовываем ящики

						boxMaterial = new THREE.MeshStandardMaterial({
							color: 0x2222ff,
							//roughness: 1,
							wireframe: false,
							metalness: 0.1,
						});

						let boxSupGeometry = new THREE.BoxGeometry($scope.selectedBox.width * unitFixation, $scope.selectedBox.height * unitFixation, $scope.selectedBox.deep * unitFixation);
						boxSupGeometryMesh = new THREE.Mesh(boxSupGeometry, boxMaterial);
						//let boxSupBSP = new ThreeBSP(boxSupGeometry);
						//scene.add(boxSubGeometryMesh);
						let boxSubGeometry = new THREE.BoxGeometry(($scope.selectedBox.width - 4) * unitFixation, $scope.selectedBox.height * unitFixation, ($scope.selectedBox.deep - 4) * unitFixation);
						boxSubGeometryMesh = new THREE.Mesh(boxSubGeometry, boxMaterial);
						boxSubGeometryMesh.position.y = 4 * unitFixation;
						//scene.add(boxSubGeometryMesh);
						let boxSupGeometrySubstractor = new ThreeBSP(boxSupGeometryMesh);
						let boxSubGeometrySubstractor = new ThreeBSP(boxSubGeometryMesh);

						let boxGeometry = boxSupGeometrySubstractor.subtract(boxSubGeometrySubstractor);

						// scene.add(boxGeometry.toMesh(boxMaterial));

						//subtractCylinderGeometry = new THREE.Mesh(boxSubGeometry, boxMaterial);
						//subtractCylinderGeometry.position.y = 5;

						for (boxCounter = 0; boxCounter < $scope.boxCount; boxCounter++) {

							$scope.boxCounter++;
							boxYPosition = (shelveYPosition + (shelveHeight / 2) + ($scope.selectedBox.height / 2));

							let boxObject = boxGeometry.toMesh(boxMaterial); //new THREE.Mesh(boxGeometry, boxMaterial);
							boxObject.geometry.computeVertexNormals();
							boxObject.castShadow = true;
							boxObject.receiveShadow = true;
							boxObject.name = "box" + $scope.boxCounter;
							boxObject.position.set((boxCounter * boxPlaceWidth + boxPlacementPadding + boxPlacementMarguin) * unitFixation, boxYPosition * unitFixation, (($scope.selectedBox.deep / -2) - 1) * unitFixation);
							scene.add(boxObject);
						}
					}
				}
			}


			//renderer = new THREE.WebGLRenderer({antialias: true});
			//renderer.setSize(window.innerWidth, window.innerHeight);

			//  Инициализация рендера внутри блока
			//document.getElementById("visualization").appendChild(renderer.domElement);
			camera.position.y = $scope.cupboard.height.value * unitFixation;

			//camera.position.x = $scope.cupboard.height.value + $scope.cupboard.width.value;
			//camera.position.z = $scope.cupboard.height.value + $scope.cupboard.width.value;
			$scope.cameraRadius = Math.sqrt(Math.pow($scope.cupboard.height.value, 2) + Math.pow($scope.cupboard.width.value, 2)) * unitFixation;
			camera.position.x = ($scope.cameraRadius * Math.cos($scope.angle) * 2) * unitFixation;
			camera.position.z = ($scope.cameraRadius * Math.sin($scope.angle) * 2) * unitFixation;
			camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5) * unitFixation, ($scope.cupboard.height.value * 0.5) * unitFixation, ($scope.cupboard.deep.value * -0.5) * unitFixation));

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

			camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5) * unitFixation, ($scope.cupboard.height.value * 0.5) * unitFixation, ($scope.cupboard.deep.value * -0.5) * unitFixation));
			//camera.updateProjectionMatrix();
			//camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5), 0, 0));
			requestAnimationFrame(render);
		}
	}

	function init() {

		const proportion = 4 / 3;
		let width = document.getElementById("visualization").offsetWidth;
		let height = (width / proportion);

		//camera = new THREE.Camera(30, proportion, 1, 10000);
		camera = new THREE.PerspectiveCamera(40, proportion, 1, 5000);
		camera.isPerspectiveCamera = false;

		scene = new THREE.Scene();

		scene.add(new THREE.AmbientLight(0xffffff));

		let hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
		hemiLight.intensity = 00;
		scene.add(hemiLight);

		light = new THREE.PointLight(0xffffff, 1, 100/*, 2*/);
		light.castShadow = true;
		light.shadowMapWidth = 2048; // default is 512
		light.shadowMapHeight = 2048;
		//light.position.x = 500 * unitFixation;
		//light.position.y = 500 * unitFixation;
		//light.position.z = 400 * unitFixation;
		//light.distance = 12000;
		light.power = 180;
		//light.intensity = 0.8;
		// light.boundRadius = 700;
		//light.shadowDarkness = 0.5;
		//light.shadowCameraVisible = true;
		scene.add(light);

		//geometry = new THREE.SphereGeometry(100, 8, 4);
		//material = new THREE.MeshBasicMaterial({color: 0xffaa00});
		//mesh = new THREE.Mesh(geometry, material);
		//mesh.scale.set(0.05, 0.05, 0.05);
		//light.add(mesh);

		renderer = new THREE.WebGLRenderer({antialias: true});

		renderer.setSize(width, (width / proportion));
		renderer.shadowMap.enabled = true;
		//renderer.shadowMapSoft = true;
		//renderer.physicallyCorrectLights = true;
		renderer.toneMappingExposure = Math.pow(1.15, 5.0);
		//renderer.shadowMapWidth = 4096; //8192;
		//renderer.shadowMapHeight = 4096; //8192;
		renderer.toneMapping = THREE.ReinhardToneMapping;
		//renderer.shadowMapBias = 0.5;
		renderer.physicallyCorrectLights = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		//  Инициализация рендера внутри блока
		document.getElementById("visualization").appendChild(renderer.domElement);
	}

	$scope.init = function () {

		let visualizationObject = document.getElementById("visualization");

		if (visualizationObject) {
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
				shelveHeight = Math.floor((currentHeight.value / shelveCount) / distanceBetweenHoles) * distanceBetweenHoles;
			} else {
				// shelveHeight = Math.ceil((currentHeight.value / (shelveCount - 1)) / 25) * 25;
				shelveHeight = Math.floor(($scope.selectedBox.height + 30 + 35) / distanceBetweenHoles) * distanceBetweenHoles;
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
