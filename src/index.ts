///<reference path="index.d.ts"/>
/**
 * Created by Bagdad on 13.01.2017.
 * eslint-disable func-names
 * tslint-disable func-names
 */
import Color = THREE.Color;
import BufferGeometry = THREE.BufferGeometry;

let camera, scene, renderer;
let geometry, material;

/**
 * Енумератор для серий ящиков
 * @type {number}
 * @property {number} sk SK
 * @property {number} ls LS
 */
const enum BoxSeries {

	sk = 0,
	ls = 1
}

/**
 * Енумератор для цветов
 * @type {number}
 * @property {number} blue Синий
 * @property {number} red Красный
 */
const enum BoxColor {

	blue = 0,
	red = 1,
	yellow = 2
}

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
	 * @type {BoxObjectInterface[]}
	 */
	const boxesArray: BoxObjectInterface[] = [
		{
			id: "12.330.65",
			title: "Контейнер sk 3109",
			price: 91.0,
			width: 117,
			height: 90,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/3109l3.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3109/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.331.65",
			title: "Контейнер sk 31509",
			price: 106.0,
			width: 155,
			height: 90,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/31509dh.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-31509/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		}, {
			id: "12.332.65",
			title: "Контейнер sk 3209",
			price: 140.0,
			width: 234,
			height: 90,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/3209hj.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3209/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.333.65",
			title: "Контейнер sk 3214",
			price: 216.0,
			width: 234,
			height: 140,
			deep: 300,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/32145i.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-3214/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		//  Глубина 400
		{
			id: "12.334.65",
			title: "Контейнер sk 4109",
			price: 117.0,
			width: 117,
			height: 90,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/4109kh.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4109/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.335.65",
			title: "Контейнер sk 41509",
			price: 143.0,
			width: 155,
			height: 90,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/41509yk.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-41509/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.336.65",
			title: "Контейнер sk 4209",
			price: 182.0,
			width: 234,
			height: 90,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/42095y.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4209/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.337.65",
			title: "Контейнер sk 4214",
			price: 306.0,
			width: 234,
			height: 140,
			deep: 400,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/4214vd.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-4214/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		//  Глубина 500
		{
			id: "12.338.65",
			title: "Контейнер sk 5109",
			price: 132.0,
			width: 117,
			height: 90,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/51092v.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5109/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.339.65",
			title: "Контейнер sk 51509",
			price: 162.0,
			width: 155,
			height: 90,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/51509mi.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-51509/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.340.65",
			title: "Контейнер sk 5209",
			price: 206.0,
			width: 234,
			height: 90,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/5209gf.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5209/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.341.65",
			title: "Контейнер sk 5214",
			price: 315.0,
			width: 234,
			height: 140,
			deep: 500,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/52144y.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-5214/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		//  Глубина 600
		{
			id: "12.342.65",
			title: "Контейнер sk 6109",
			price: 165.0,
			width: 117,
			height: 90,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/6109bi.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6109/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.343.65",
			title: "Контейнер sk 61509",
			price: 196.0,
			width: 155,
			height: 90,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/61509ht.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-61509/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.344.65",
			title: "Контейнер sk 6209",
			price: 255.0,
			width: 234,
			height: 90,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/6209k3.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6209/",
			color: BoxColor.blue,
			series: BoxSeries.sk
		},
		{
			id: "12.345.65",
			title: "Контейнер sk 6214",
			price: 397.0,
			width: 234,
			height: 140,
			deep: 600,
			sort: 1,
			image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/6214at.jpg",
			url: "http://www.agropak.net/hgfhgf/kontejner-sk-6214/",
			color: BoxColor.blue,
			series: BoxSeries.sk
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
			color: BoxColor.blue,
			series: BoxSeries.ls
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
			color: BoxColor.blue,
			series: BoxSeries.ls
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
			color: BoxColor.blue,
			series: BoxSeries.ls
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
			color: BoxColor.blue,
			series: BoxSeries.ls
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
			color: BoxColor.blue,
			series: BoxSeries.ls
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
			color: BoxColor.blue,
			series: BoxSeries.ls
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
			color: BoxColor.blue,
			series: BoxSeries.ls
		}
	];

	/**
	 * Высоты шкафов
	 * @name shelvesHeights
	 * @type {Object[]}
	 */
	const shelvesHeights: ShelveHeightInterface[] = [
		{value: 500, title: 500, selected: true, price: 115.0, shelves: {min: 3, max: 5}},
		{
			value: 1000,
			title: 1000,
			selected: false,
			price: 188.0,
			shelves: {min: 3, max: 11}
		},
		{
			value: 1200,
			title: 1200,
			selected: false,
			price: 220.0,
			shelves: {min: 3, max: 13}
		},
		{
			value: 1500,
			title: 1500,
			selected: false,
			price: 268.0,
			shelves: {min: 3, max: 13}
		},
		{
			value: 1800,
			title: 1800,
			selected: false,
			price: 308.0,
			shelves: {min: 3, max: 13}
		},
		{
			value: 2000,
			title: 2000,
			selected: false,
			price: 336.0,
			shelves: {min: 3, max: 13}
		},
		{
			value: 2200,
			title: 2200,
			selected: false,
			price: 370.0,
			shelves: {min: 3, max: 13}
		},
		{
			value: 2300,
			title: 2300,
			selected: false,
			price: 390.0,
			shelves: {min: 3, max: 13}
		},
		{
			value: 2500,
			title: 2500,
			selected: false,
			price: 420.0,
			shelves: {min: 3, max: 13}
		}
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
	const selvesWidths: ShelveWidthInterface[] = [
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
	 * Флаг визуализации
	 * @type {boolean}
	 */
	$scope.isVisualizating = false;

	/**
	 * Флаг калькуляции
	 * @type {boolean}
	 */
	$scope.isCalculating = false;

	/**
	 * Флаг отрендерина ли сцена
	 * @type {boolean}
	 */
	$scope.isRendered = false;

	$scope.oldHeight = 0;
	$scope.oldWidth = 0;
	$scope.oldDeep = 0;

	$scope.shelvesList = () => {
		let heightData = $scope.cupboard.height.shelves.shelves;
		let result = [];
		for (n = 0; n < heightData.max; n++) {
			result.push(n);
		}
		console.log(result);
		return result;
	};

	/**
	 * Инициализация визуализации
	 */
	function visualizationInit() {

		let boxGeometryGroup: any;
		let localBoxGeometry: Array<THREE.Object3D>;
		let secondCylinderBSP: any;
		let firstCylinderBSP: any;
		let additionalCutSubtractor: any;
		let additionalCutMesh: THREE.Mesh;
		let additionalCut: THREE.BoxGeometry;
		let boxObject: any;
		let boxYPosition: number;
		let boxGeometry: any;
		let boxSubGeometrySubstractor: any;
		let boxSupGeometrySubstractor: any;
		let boxSubGeometryMesh: THREE.Mesh;
		let boxSubGeometry: THREE.BoxGeometry;
		/**
		 * Меш внешнего куба для ящиков
		 * @type {THREE.Mesh}
		 */
		let boxSupGeometryMesh: THREE.Mesh;

		/**
		 * Геометрия внешнего куба для ящиков
		 * @type {THREE.BoxGeometry}
		 */
		let boxSupGeometry: THREE.BoxGeometry;

		let boxPlacementPadding: number;
		let boxPlacementMarguin: number;

		/**
		 * Ширина посадочного места для ящика
		 * @type {number}
		 */
		let boxPlaceWidth: number;

		/**
		 * Материал для ящиков
		 * @type {THREE.MeshStandardMaterial}
		 */
		let boxMaterial: THREE.MeshStandardMaterial;

		/**
		 * Материал для стекла
		 * @type {THREE.MeshStandardMaterial}
		 */
		let glassMaterial: THREE.MeshStandardMaterial;
		let shelvesCounter: number, holdersCounter: number, boxCounter: number;
		let selectedObject;
		let shelveYPosition: number;
		let shelveGeometry, shelveObject;

		let perforatedHolder;

		/**
		 * Объект геометрии цилиндра.
		 * Нужен для нанесения перфорации на стойки
		 * @type {THREE.CylinderGeometry}
		 */
		let cylinderGeometry: THREE.CylinderGeometry;

		/**
		 * Счетчик для порфорации стоек
		 * @type {number}
		 */
		let perforationCounter: number;

		/**
		 * Объект цилиндра для вертикальной перфорации
		 * @type {THREE.Mesh}
		 */
		let subtractCylinderGeometry: THREE.Mesh;

		/**
		 * Материал объекта (серый)
		 * @type {Object}
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

		$scope.isVisualizating = true;

		if ($scope.cupboard.width && $scope.cupboard.width.value) {
			// console.warn(currentHeight.value);

			material = new THREE.MeshStandardMaterial({
				color: 0x777777,
				wireframe: false,
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
				amount: $scope.cupboard.height.value * unitFixation, // 500,
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

			perforatedHolder = new ThreeBSP(holderGeometry);

			// Выполнять перфорацию, если стойки 500мм и меньше
			if ($scope.cupboard.height.value <= 500) {
				//  Перфорация стойки
				//  Создание цилиндра для перфорации
				cylinderGeometry = new THREE.CylinderGeometry(holderPerforationRadius * unitFixation, holderPerforationRadius * unitFixation, 70 * unitFixation, 4);

				subtractCylinderGeometry = new THREE.Mesh(cylinderGeometry, material);
				subtractCylinderGeometry.position.x = 16 * unitFixation;

				for (perforationCounter = 0; perforationCounter < ($scope.cupboard.height.value / distanceBetweenHoles); perforationCounter++) {

					subtractCylinderGeometry.position.z = ((perforationCounter * distanceBetweenHoles) + (shelveHeight / 2)) * unitFixation;

					firstCylinderBSP = new ThreeBSP(subtractCylinderGeometry);

					subtractCylinderGeometry.rotation.z = THREE.Math.degToRad(90);
					subtractCylinderGeometry.position.y = 16 * unitFixation;

					secondCylinderBSP = new ThreeBSP(subtractCylinderGeometry);

					perforatedHolder = perforatedHolder.subtract(firstCylinderBSP.union(secondCylinderBSP));

					subtractCylinderGeometry.position.y = 0;
					subtractCylinderGeometry.rotation.z = THREE.Math.degToRad(0);

					firstCylinderBSP = undefined;
					secondCylinderBSP = undefined;
				}
				//  Конец перфорации стойки
			}

			for (holdersCounter = 1; holdersCounter <= 4; holdersCounter++) {

				holder[holdersCounter] = perforatedHolder.toMesh(material);
				holder[holdersCounter].geometry.computeVertexNormals();
				holder[holdersCounter].name = "shelveHolder" + holdersCounter;
				holder[holdersCounter].castShadow = true;
				holder[holdersCounter].receiveShadow = true;
				holder[holdersCounter].rotation.x = THREE.Math.degToRad(-90);
			}

			perforatedHolder = undefined;

			//  Вторая стойка. Повернута на 90 и стоит на расстоянии ширины полки
			holder[2].position.set(($scope.cupboard.width.value + 2) * unitFixation, 0, 0);
			holder[2].rotation.z = THREE.Math.degToRad(90);

			//  Третья стойка. Повернута на 180 и стоит на расстоянии ширины полки и на ее глубине
			holder[3].position.set(($scope.cupboard.width.value + 2) * unitFixation, 0, ($scope.cupboard.deep.value * -1 - 2) * unitFixation);
			holder[3].rotation.z = THREE.Math.degToRad(180);

			//  Четвертая стойка. Повернута на 270 и стоит на расстоянии глубины полки
			holder[4].position.set(0, 0, ($scope.cupboard.deep.value * -1 - 2) * unitFixation);
			holder[4].rotation.z = THREE.Math.degToRad(270);

			light.position.y = ($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation * 3;
			light.position.x = ($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation * 3;
			light.position.z = ($scope.cupboard.width.value + $scope.cupboard.deep.value + $scope.cupboard.height.value) * unitFixation * 3;

			for (holdersCounter = 1; holdersCounter <= 4; holdersCounter++) {

				scene.add(holder[holdersCounter]);
			}

			// console.log("Vis. Shelves count " + $scope.shelvesCount);

			$scope.shelvesCountOld = $scope.shelvesCount;

			// console.log($scope.shelvesCount);

			if ($scope.shelvesCount) {
				$scope.boxCounter = 0;
				shelveGeometry = new THREE.BoxGeometry($scope.cupboard.width.value * unitFixation, shelveHeight * unitFixation, $scope.cupboard.deep.value * unitFixation);
				// if (shelvesCounter > 0) {
				if ($scope.boxCount) {

					boxPlaceWidth = (($scope.cupboard.width.value - 29 * 2) / ($scope.boxCount));

					//  Это значение - отступ от края посадочного места
					boxPlacementPadding = ((boxPlaceWidth - $scope.selectedBox.width) / 2);
					boxPlacementMarguin = (($scope.selectedBox.width / 2) + 30);

					console.log("Ширина посадочного места: " + boxPlaceWidth);


					// Вычисление геометрии ящика
					boxMaterial = new THREE.MeshStandardMaterial({
						color: 0x1111ff,
						wireframe: false,
						transparent: false,
						opacity: 0.7
					});

					glassMaterial = new THREE.MeshStandardMaterial({
						color: 0x9999ff,
						wireframe: false,
						transparent: true,
						opacity: 0.3
					});

					boxSupGeometry = new THREE.BoxGeometry($scope.selectedBox.width * unitFixation, $scope.selectedBox.height * unitFixation, $scope.selectedBox.deep * unitFixation);
					boxSupGeometryMesh = new THREE.Mesh(boxSupGeometry, boxMaterial);

					boxSubGeometry = new THREE.BoxGeometry(($scope.selectedBox.width - 4) * unitFixation, $scope.selectedBox.height * unitFixation, ($scope.selectedBox.deep - 4) * unitFixation);
					boxSubGeometryMesh = new THREE.Mesh(boxSubGeometry, boxMaterial);
					boxSubGeometryMesh.position.y = 4 * unitFixation;

					boxSupGeometrySubstractor = new ThreeBSP(boxSupGeometryMesh);
					boxSubGeometrySubstractor = new ThreeBSP(boxSubGeometryMesh);

					// Геометрия ящика с пустотой
					boxGeometry = boxSupGeometrySubstractor.subtract(boxSubGeometrySubstractor);
					boxGeometryGroup = new THREE.Group();

					if ($scope.selectedBox.series === BoxSeries.sk) {
						console.log("Box SK");
						additionalCut = new THREE.BoxGeometry($scope.selectedBox.width * 0.70 * unitFixation, $scope.selectedBox.height * 0.66 * unitFixation, $scope.selectedBox.deep * 0.30 * unitFixation);
						additionalCutMesh = new THREE.Mesh(additionalCut, boxMaterial);
						additionalCutMesh.position.z = ($scope.selectedBox.deep / 2) * unitFixation;
						additionalCutMesh.position.y = (($scope.selectedBox.height / 2) - ($scope.selectedBox.height * 0.66) / 2) * unitFixation;
						additionalCutSubtractor = new ThreeBSP(additionalCutMesh);
						boxGeometry = boxGeometry.subtract(additionalCutSubtractor);

						let glassPanel = new THREE.BoxGeometry($scope.selectedBox.width * 0.70 * unitFixation, $scope.selectedBox.height * 0.66 * unitFixation, unitFixation);
						let glassPanelMech = new THREE.Mesh(glassPanel, glassMaterial);
						glassPanelMech.position.z = ($scope.selectedBox.deep / 2) * unitFixation;
						glassPanelMech.position.y = (($scope.selectedBox.height / 2) - ($scope.selectedBox.height * 0.66) / 2) * unitFixation;
						// scene.add(glassPanelMech);
						// let glassPanelUnit = new ThreeBSP(glassPanelMech);

						// boxGeometry = boxGeometry.add(glassPanelMech);
						boxGeometryGroup.add(boxGeometry.toMesh(boxMaterial));
						boxGeometryGroup.add(glassPanelMech);
					} else {
						console.log("Box LS");
						additionalCut = new THREE.BoxGeometry($scope.selectedBox.width * unitFixation, $scope.selectedBox.height * 0.66 * unitFixation, $scope.selectedBox.deep * 0.66 * unitFixation);
						additionalCutMesh = new THREE.Mesh(additionalCut, boxMaterial);
						additionalCutMesh.position.z = ($scope.selectedBox.deep / 2) * unitFixation;
						additionalCutMesh.position.y = (($scope.selectedBox.height / 2) - ($scope.selectedBox.height * 0.3) / 2) * unitFixation;
						additionalCutMesh.rotation.x = THREE.Math.degToRad(45);
						additionalCutSubtractor = new ThreeBSP(additionalCutMesh);
						boxGeometry = boxGeometry.subtract(additionalCutSubtractor);
						boxGeometryGroup.add(boxGeometry.toMesh(boxMaterial));
					}
					//  /геометрия ящика
				}

				console.log($scope.shelvesCount);

				for (shelvesCounter = 0; shelvesCounter <= $scope.shelvesCount; shelvesCounter++) {

					shelveYPosition = ($scope.cupboard.height.value - (shelvesCounter * $scope.shelveHeight) - (shelveHeight / 2));

					// shelveMaterial = new THREE.MeshBasicMaterial({color: 0x666666});
					shelveObject = new THREE.Mesh(shelveGeometry, material);
					shelveObject.name = "shelve" + shelvesCounter;
					shelveObject.castShadow = true;
					shelveObject.receiveShadow = true;
					shelveObject.position.set(($scope.cupboard.width.value * 0.5 + 1) * unitFixation, shelveYPosition * unitFixation, ($scope.cupboard.deep.value * -0.5 - 1) * unitFixation);
					scene.add(shelveObject);
					// console.log(shelveObject.position);
					if ($scope.boxCount) {
						//  Отрисовываем ящики
						if (shelvesCounter > 0) {

							localBoxGeometry = [];
							for (boxCounter = 0; boxCounter < $scope.boxCount; boxCounter++) {

								localBoxGeometry[boxCounter] = boxGeometryGroup.clone(); // boxGeometry;
								// let localGlassPanel = glassPanelMech;
								$scope.boxCounter++;
								boxYPosition = (shelveYPosition + (shelveHeight / 2) + ($scope.selectedBox.height / 2));

								localBoxGeometry[boxCounter].name = "box" + $scope.boxCounter;
								// boxObject.position.set((boxCounter * boxPlaceWidth + boxPlacementPadding + boxPlacementMarguin) * unitFixation, boxYPosition * unitFixation, (($scope.selectedBox.deep / -2) - 1) * unitFixation);
								localBoxGeometry[boxCounter].position.set((boxCounter * boxPlaceWidth + boxPlacementPadding + boxPlacementMarguin) * unitFixation, boxYPosition * unitFixation, (($scope.selectedBox.deep / -2) - 1) * unitFixation);
								// scene.add(boxObject);

								scene.add(localBoxGeometry[boxCounter] /* boxGeometryGroup*/);
							}
						}
					}
				}
				// }
			}

			//  Инициализация рендера внутри блока
			camera.position.y = $scope.cupboard.height.value * unitFixation;

			$scope.cameraRadius = Math.sqrt(Math.pow($scope.cupboard.height.value, 2) + Math.pow($scope.cupboard.width.value, 2)) * unitFixation;
			camera.position.x = ($scope.cameraRadius * Math.cos($scope.angle) * 2) * unitFixation;
			camera.position.z = ($scope.cameraRadius * Math.sin($scope.angle) * 2) * unitFixation;
			camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5) * unitFixation, ($scope.cupboard.height.value * 0.5) * unitFixation, ($scope.cupboard.deep.value * -0.5) * unitFixation));

		}
		$scope.isVisualizating = false;
	}

	/**
	 * Функция рендеринга сцены
	 */
	function render() {

		/**
		 * Радиус вращения камеры
		 * @type {number}
		 */
		const radius: number = $scope.cameraRadius * 2;

		let centerScene;

		if ($scope.cupboard.width && $scope.cupboard.width.value) {

			renderer.render(scene, camera);

			camera.position.x = radius * Math.cos($scope.angle) + ($scope.cupboard.width.value * 0.5) * unitFixation;
			camera.position.z = radius * Math.sin($scope.angle) + ($scope.cupboard.deep.value * -0.5) * unitFixation;

			$scope.angle += 0.005;

			centerScene = new THREE.Vector3(($scope.cupboard.width.value * 0.5) * unitFixation, ($scope.cupboard.height.value * 0.5) * unitFixation, ($scope.cupboard.deep.value * -0.5) * unitFixation);

			camera.lookAt(centerScene);

			requestAnimationFrame(render);

			$scope.isRendered = true;
		}
	}

	/**
	 * Инициализация
	 * Всего и вся
	 */
	function init() {

		/**
		 * Пропорция блока с рендером
		 * @type {number}
		 */
		const proportion: number = 3 / 4;

		/**
		 * Ширина блока
		 * @type {number}
		 */
		const visualizationWidth: number = document.getElementById("visualization").offsetWidth * 0.6;

		// console.log(visualizationWidth);
		// console.log(document.getElementById("visualization").offsetWidth);
		/**
		 * Общий свет
		 * @type {THREE.HemisphereLight}
		 */
		let hemiLight: THREE.HemisphereLight;

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(40, proportion, 1, 5000);
		camera.isPerspectiveCamera = false;

		scene.add(new THREE.AmbientLight(0xffffff));

		hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
		hemiLight.intensity = 3.4;
		scene.add(hemiLight);

		light = new THREE.PointLight(0xffffff, 1, 100/*, 2*/);
		light.castShadow = false;
		light.shadowMapWidth = 1024;
		light.shadowMapHeight = 1024;
		light.power = 180;
		scene.add(light);

		renderer = new THREE.WebGLRenderer({antialias: true});

		renderer.setSize(visualizationWidth, (visualizationWidth / proportion));
		renderer.shadowMap.enabled = true;
		renderer.toneMappingExposure = Math.pow(1.15, 5.0);
		renderer.toneMapping = THREE.ReinhardToneMapping;
		renderer.physicallyCorrectLights = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		//  Инициализация рендера внутри блока
		document.getElementById("visualization").appendChild(renderer.domElement);
	}

	/**
	 * Инициализация для angular
	 */
	$scope.init = function () {

		let visualizationObject = document.getElementById("visualization");

		if (visualizationObject) {

			init();
		}
	};

	/**
	 * Запуск инициализации
	 */
	$scope.init();

	/**
	 * Функция вычисления всякой фигни
	 */
	$scope.Calculation = function () {

		// var boxArray: Array;
		/**
		 * Количество полок у стеллажа
		 * @type {number}
		 */
		let shelveCount: number;
		let filterResult: number;
		let shelveHeight: number;

		/**
		 * Количество коробок на полке
		 * @type {number}
		 */
		let boxCount: number;

		/**
		 * Высота выбранного стеллажа
		 * @type {number}
		 */
		const currentHeight: ShelveHeightInterface = $scope.cupboard.height;

		/**
		 * Ширина выбранного стеллажа
		 * @type {number}
		 */
		const currentWidth = $scope.cupboard.width;

		/**
		 * Глубина выбранного стеллажа
		 * @type {number}
		 */
		const currentDeep = $scope.cupboard.deep;

		if ($scope.isCalculating === false) {

			$scope.oldHeight = currentHeight;
			$scope.oldWidth = currentWidth;
			$scope.oldDeep = currentDeep;

			$scope.isCalculating = true;

			// console.log($scope.selectedBox);
			if ($scope.selectedBox) {

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

				console.info("Предполагаемое количество полок: " + shelveCount);
				console.info("Предполагаемая высота конструкции: " + shelveCount * shelveHeight);
				console.info("Предполагаемое высота полок: " + shelveHeight);
				console.info("Предполагаемое количество ящиков: " + boxCount);

			} else {

				// console.info($scope.cupboard.height);
				//S$scope.shelvesCount = $scope.cupboard.height.shelves.min;
				shelveHeight = 0;
				shelveCount = $scope.shelvesCount;
				if ($scope.shelvesCount > 2) {
					// shelveHeight = Math.floor((currentHeight.value / ($scope.shelvesCount - 1)) / distanceBetweenHoles) * distanceBetweenHoles;
					// }// else {
					// shelveHeight = Math.ceil((currentHeight.value / (shelveCount - 1)) / 25) * 25;
					shelveHeight = Math.floor(((currentHeight.value / ($scope.shelvesCount - 0)) + 30 + 35) / distanceBetweenHoles) * distanceBetweenHoles;
				}
				if (shelveHeight < 145) {
					shelveHeight = 145;
				}
				if ((shelveCount * shelveHeight) >= currentHeight.value) {
					shelveCount--;
				}
				$scope.shelvesCount = shelveCount;
				$scope.shelveHeight = shelveHeight;
				// console.warn($scope.shelveHeight);
			}

			if ($scope.isVisualizating === false) {

				visualizationInit();

				if ($scope.isRendered === false) {

					render();
				}
			}

			// ***********************************************************************************************
			if (angular.isObject(currentDeep)) {

				//  Берем контейнеры, которые подходят по глубине
				filterResult = $filter("filter")($scope.boxes, {
					deep: currentDeep.value
				}, function (actual, expected) {

					/**
					 * Результат выполнения функции
					 * @type {boolean}
					 */
					let result: boolean = false;

					if ((actual === expected - 50) || (actual === expected)) {

						result = true;
					}

					return result;
				});

				$scope.boxResult = $filter("orderBy")(filterResult, ["-deep", "+sort"]);
				// console.log($scope.boxResult);

			}

			$scope.isCalculating = false;
		}

//  ************************************************************************************************************

	};

	/**
	 * Обработчик клика по ящику
	 * @param {BoxObjectInterface} item Объект коробки
	 * @returns {void}
	 * eslint-disable func-names
	 */
	$scope.BoxClick = function boxClicker(item: BoxObjectInterface): void {

		$scope.selectedBox = item;
		$scope.boxPrice = $scope.boxCount * $scope.shelvesCount * item.price;
		$scope.totalPrice += $scope.boxPrice;
		this.Calculation();
	};

	$scope.ChangeShelves = function ChangeShelves() {
		$scope.shelvesCount = $scope.cupboard.shelves;
		this.Calculation();
	};

	/**
	 * Процедура обработки изменения глубины
	 */
	$scope.ChangeDeep = function deepChanger(): void {

		if ($scope.cupboard.deep !== $scope.oldDeep) {

			$scope.selectedBox = undefined;
			$scope.shelvesCount = undefined;

			this.Calculation();
		}
	};

	/**
	 * Процедура обработки изменения ширины стелажа
	 */
	$scope.ChangeWidth = function weightChanger(): void {

		$scope.deeps = $scope.cupboard.width.deeps;
		$scope.cupboard.deep = $scope.deeps[0];
		if ($scope.cupboard.width !== $scope.oldWeight) {
			this.Calculation();
		}
	};

	/**
	 * Процедура обработки изменения высоты стелажа
	 */
	$scope.ChangeHeight = function heightChanger(): void {

			let n;
			let shelvesArray;
			let shelves = [];

			console.log($scope.cupboard.height);
			angular.forEach($scope.heights, function (value, key) {

				if (value.value === $scope.cupboard.height) {

					this.push(value.shelves);
				}

			}, shelves);

			shelvesArray = [];

			for (n = $scope.cupboard.height.shelves.min; n <= $scope.cupboard.height.shelves.max; n++) {

				shelvesArray.push({value: n, title: n});
			}

			$scope.shelves = shelvesArray;
			$scope.cupboard.shelve = $scope.shelves[0];

			if ($scope.cupboard.height !== $scope.oldHeight) {
				this.Calculation();
			}
		};
});
