var Color = THREE.Color;
var BufferGeometry = THREE.BufferGeometry;
let camera, scene, renderer;
let geometry, material;
var BoxSeries;
(function (BoxSeries) {
    BoxSeries[BoxSeries["sk"] = 0] = "sk";
    BoxSeries[BoxSeries["ls"] = 1] = "ls";
})(BoxSeries || (BoxSeries = {}));
var BoxColor;
(function (BoxColor) {
    BoxColor[BoxColor["blue"] = 0] = "blue";
    BoxColor[BoxColor["red"] = 1] = "red";
    BoxColor[BoxColor["yellow"] = 2] = "yellow";
})(BoxColor || (BoxColor = {}));
let light;
calculatorApplication.controller("calculatorController", function ($scope, $filter) {
    const unitFixation = 1 / 1000;
    const distanceBetweenHoles = 25;
    const holderPerforationRadius = 4;
    const shelveHeight = 25;
    const displayHeight = 400;
    const boxesArray = [
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
        },
        {
            id: "12.332.65",
            title: "Контейнер sk 3209",
            price: 140.0,
            width: 234,
            height: 90,
            deep: 300,
            sort: 1,
            image: "http://www.agropak.net/published/publicdata/AGROPAK/attachments/SC/products_pictures/3209hj.jpg",
            url: "http://www.agropak.net/hgfhgf/kontejner-sk-3209/",
            color: 0,
            series: 0
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
            color: 0,
            series: 0
        },
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
        },
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
        },
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
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
            color: 0,
            series: 0
        },
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
            color: 0,
            series: 1
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
            color: 0,
            series: 1
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
            color: 0,
            series: 1
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
            color: 0,
            series: 1
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
            color: 0,
            series: 1
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
            color: 0,
            series: 1
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
            color: 0,
            series: 1
        }
    ];
    const shelvesHeights = [
        { value: 500, title: 500, selected: true, price: 115.0, shelves: { min: 3, max: 5 } },
        { value: 1000, title: 1000, selected: false, price: 188.0, shelves: { min: 3, max: 11 } },
        { value: 1200, title: 1200, selected: false, price: 220.0, shelves: { min: 3, max: 13 } },
        { value: 1500, title: 1500, selected: false, price: 268.0, shelves: { min: 3, max: 13 } },
        { value: 1800, title: 1800, selected: false, price: 308.0, shelves: { min: 3, max: 13 } },
        { value: 2000, title: 2000, selected: false, price: 336.0, shelves: { min: 3, max: 13 } },
        { value: 2200, title: 2200, selected: false, price: 370.0, shelves: { min: 3, max: 13 } },
        { value: 2300, title: 2300, selected: false, price: 390.0, shelves: { min: 3, max: 13 } },
        { value: 2500, title: 2500, selected: false, price: 420.0, shelves: { min: 3, max: 13 } }
    ];
    const selvesWidths = [
        {
            value: 700,
            title: 700,
            deeps: [
                { value: 300, title: 300, price: 303.0 },
                { value: 400, title: 400, price: 366.0 },
                { value: 500, title: 500, price: 432.0 },
                { value: 600, title: 600, price: 518.0 },
                { value: 700, title: 700, price: 700.0 },
                { value: 800, title: 800, price: 766.0 }
            ]
        },
        {
            value: 1000,
            title: 1000,
            deeps: [
                { value: 300, title: 300, price: 383.0 },
                { value: 400, title: 400, price: 481.0 },
                { value: 500, title: 500, price: 554.0 },
                { value: 600, title: 600, price: 649.0 },
                { value: 700, title: 700, price: 808.0 },
                { value: 800, title: 800, price: 914.0 }
            ]
        },
        {
            value: 1200,
            title: 1200,
            deeps: [
                { value: 300, title: 300, price: 533.0 },
                { value: 400, title: 400, price: 630.0 },
                { value: 500, title: 500, price: 773.0 },
                { value: 600, title: 600, price: 887.0 }
            ]
        },
        {
            value: 1500,
            title: 1500,
            deeps: [
                { value: 300, title: 300, price: 702.0 },
                { value: 400, title: 400, price: 852.0 },
                { value: 500, title: 500, price: 1004.0 },
                { value: 600, title: 600, price: 1237.0 }
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
    $scope.isVisualizating = false;
    $scope.isCalculating = false;
    $scope.isRendered = false;
    $scope.oldHeight = 0;
    $scope.oldWidth = 0;
    $scope.oldDeep = 0;
    function visualizationInit() {
        let secondCylinderBSP;
        let firstCylinderBSP;
        let additionalCutSubtractor;
        let additionalCutMesh;
        let additionalCut;
        let boxObject;
        let boxYPosition;
        let boxGeometry;
        let boxSubGeometrySubstractor;
        let boxSupGeometrySubstractor;
        let boxSubGeometryMesh;
        let boxSubGeometry;
        let boxSupGeometryMesh;
        let boxSupGeometry;
        let boxPlacementPadding;
        let boxPlacementMarguin;
        let boxPlaceWidth;
        let boxMaterial;
        let glassMaterial;
        let shelvesCounter, holdersCounter, boxCounter;
        let selectedObject;
        let shelveYPosition;
        let shelveGeometry, shelveObject;
        let perforatedHolder;
        let cylinderBSP;
        let cylinderGeometry;
        let perforationCounter;
        let subtractCylinderGeometry;
        let material;
        let holderShape;
        let extrudeSettings;
        let holderGeometry;
        let holder = [];
        $scope.isVisualizating = true;
        if ($scope.cupboard.width && $scope.cupboard.width.value) {
            material = new THREE.MeshStandardMaterial({
                color: 0x777777,
                wireframe: false,
                reflectivity: true,
                transparent: false,
                metalness: false
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
                amount: $scope.cupboard.height.value * unitFixation,
                bevelEnabled: false,
            };
            holderGeometry = new THREE.ExtrudeGeometry(holderShape, extrudeSettings);
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
            if ($scope.cupboard.height.value <= 500) {
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
                    delete firstCylinderBSP;
                    delete secondCylinderBSP;
                }
            }
            for (holdersCounter = 1; holdersCounter <= 4; holdersCounter++) {
                holder[holdersCounter] = perforatedHolder.toMesh(material);
                holder[holdersCounter].geometry.computeVertexNormals();
                holder[holdersCounter].name = "shelveHolder" + holdersCounter;
                holder[holdersCounter].castShadow = true;
                holder[holdersCounter].receiveShadow = true;
                holder[holdersCounter].rotation.x = THREE.Math.degToRad(-90);
            }
            delete perforatedHolder;
            holder[2].position.set(($scope.cupboard.width.value + 2) * unitFixation, 0, 0);
            holder[2].rotation.z = THREE.Math.degToRad(90);
            holder[3].position.set(($scope.cupboard.width.value + 2) * unitFixation, 0, ($scope.cupboard.deep.value * -1 - 2) * unitFixation);
            holder[3].rotation.z = THREE.Math.degToRad(180);
            holder[4].position.set(0, 0, ($scope.cupboard.deep.value * -1 - 2) * unitFixation);
            holder[4].rotation.z = THREE.Math.degToRad(270);
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
                boxPlaceWidth = (($scope.cupboard.width.value - 29 * 2) / ($scope.boxCount));
                boxPlacementPadding = ((boxPlaceWidth - $scope.selectedBox.width) / 2);
                boxPlacementMarguin = (($scope.selectedBox.width / 2) + 30);
                console.log("Ширина посадочного места: " + boxPlaceWidth);
                shelveGeometry = new THREE.BoxGeometry($scope.cupboard.width.value * unitFixation, shelveHeight * unitFixation, $scope.cupboard.deep.value * unitFixation);
                boxMaterial = new THREE.MeshStandardMaterial({
                    color: 0x1111ff,
                    wireframe: false,
                    transparent: false,
                    opacity: 1
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
                boxGeometry = boxSupGeometrySubstractor.subtract(boxSubGeometrySubstractor);
                let boxGeometryGroup = new THREE.Group();
                if ($scope.selectedBox.series === 0) {
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
                    boxGeometryGroup.add(boxGeometry.toMesh(boxMaterial));
                    boxGeometryGroup.add(glassPanelMech);
                }
                else {
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
                for (shelvesCounter = 0; shelvesCounter <= $scope.shelvesCount; shelvesCounter++) {
                    shelveYPosition = ($scope.cupboard.height.value - (shelvesCounter * $scope.shelveHeight) - (shelveHeight / 2));
                    shelveObject = new THREE.Mesh(shelveGeometry, material);
                    shelveObject.name = "shelve" + shelvesCounter;
                    shelveObject.castShadow = true;
                    shelveObject.receiveShadow = true;
                    shelveObject.position.set(($scope.cupboard.width.value * 0.5 + 1) * unitFixation, shelveYPosition * unitFixation, ($scope.cupboard.deep.value * -0.5 - 1) * unitFixation);
                    scene.add(shelveObject);
                    if (shelvesCounter > 0) {
                        let localBoxGeometry = [];
                        for (boxCounter = 0; boxCounter < $scope.boxCount; boxCounter++) {
                            localBoxGeometry[boxCounter] = boxGeometryGroup.clone();
                            $scope.boxCounter++;
                            boxYPosition = (shelveYPosition + (shelveHeight / 2) + ($scope.selectedBox.height / 2));
                            localBoxGeometry[boxCounter].name = "box" + $scope.boxCounter;
                            localBoxGeometry[boxCounter].position.set((boxCounter * boxPlaceWidth + boxPlacementPadding + boxPlacementMarguin) * unitFixation, boxYPosition * unitFixation, (($scope.selectedBox.deep / -2) - 1) * unitFixation);
                            console.log(localBoxGeometry[boxCounter].position);
                            scene.add(localBoxGeometry[boxCounter]);
                        }
                    }
                }
            }
            camera.position.y = $scope.cupboard.height.value * unitFixation;
            $scope.cameraRadius = Math.sqrt(Math.pow($scope.cupboard.height.value, 2) + Math.pow($scope.cupboard.width.value, 2)) * unitFixation;
            camera.position.x = ($scope.cameraRadius * Math.cos($scope.angle) * 2) * unitFixation;
            camera.position.z = ($scope.cameraRadius * Math.sin($scope.angle) * 2) * unitFixation;
            camera.lookAt(new THREE.Vector3(($scope.cupboard.width.value * 0.5) * unitFixation, ($scope.cupboard.height.value * 0.5) * unitFixation, ($scope.cupboard.deep.value * -0.5) * unitFixation));
        }
        $scope.isVisualizating = false;
    }
    function render() {
        const radius = $scope.cameraRadius * 2;
        let centerScene;
        if ($scope.cupboard.width && $scope.cupboard.width.value) {
            renderer.render(scene, camera);
            camera.position.x = radius * Math.cos($scope.angle) + ($scope.cupboard.width.value * 0.5) * unitFixation;
            camera.position.z = radius * Math.sin($scope.angle) + ($scope.cupboard.deep.value * -0.5) * unitFixation;
            $scope.angle += 0.002;
            centerScene = new THREE.Vector3(($scope.cupboard.width.value * 0.5) * unitFixation, ($scope.cupboard.height.value * 0.5) * unitFixation, ($scope.cupboard.deep.value * -0.5) * unitFixation);
            camera.lookAt(centerScene);
            requestAnimationFrame(render);
            $scope.isRendered = true;
        }
    }
    function init() {
        const proportion = 4 / 3.8;
        const width = document.getElementById("visualization").offsetWidth;
        const height = (width / proportion);
        let hemiLight;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, proportion, 1, 5000);
        camera.isPerspectiveCamera = false;
        scene.add(new THREE.AmbientLight(0xffffff));
        hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
        hemiLight.intensity = 3.4;
        scene.add(hemiLight);
        light = new THREE.PointLight(0xffffff, 1, 100);
        light.castShadow = false;
        light.shadowMapWidth = 2048;
        light.shadowMapHeight = 2048;
        light.power = 180;
        scene.add(light);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, (width / proportion));
        renderer.shadowMap.enabled = true;
        renderer.toneMappingExposure = Math.pow(1.15, 5.0);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.physicallyCorrectLights = true;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
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
        var boxArray;
        let shelveCount;
        let priceShelve;
        let priceHeight;
        let filterResult;
        let shelveHeight;
        let boxCount;
        let shelveArray;
        let n;
        let shelve;
        let box;
        let placementWidth;
        let offset;
        let newBox;
        const currentHeight = $scope.cupboard.height;
        const currentWidth = $scope.cupboard.width;
        const currentDeep = $scope.cupboard.deep;
        let currentQuantity = 0;
        const drawingAreaHeight = $scope.drawHeight - $scope.drawHeight * 0.05;
        const scale = drawingAreaHeight / currentHeight.value;
        if ($scope.isCalculating === false) {
            $scope.oldHeight = currentHeight;
            $scope.oldWidth = currentWidth;
            $scope.oldDeep = currentDeep;
            $scope.isCalculating = true;
            if (angular.isObject($scope.selectedBox)) {
                shelveCount = Math.floor(currentHeight.value / ($scope.selectedBox.height + 30 + 35));
                if ((shelveCount + 1) < currentHeight.shelves.min) {
                    shelveCount = currentHeight.shelves.min;
                }
                if ((shelveCount + 1) > currentHeight.shelves.max) {
                    shelveCount = currentHeight.shelves.max;
                }
                shelveHeight = 0;
                if (shelveCount > 2) {
                    shelveHeight = Math.floor((currentHeight.value / shelveCount) / distanceBetweenHoles) * distanceBetweenHoles;
                }
                else {
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
            }
            if ($scope.isVisualizating === false) {
                visualizationInit();
                if ($scope.isRendered === false) {
                    render();
                }
            }
            if (angular.isObject(currentDeep)) {
                filterResult = $filter("filter")($scope.boxes, {
                    deep: currentDeep.value
                }, function (actual, expected) {
                    let result = false;
                    if ((actual === expected - 50) || (actual === expected)) {
                        result = true;
                    }
                    return result;
                });
                $scope.boxResult = $filter("orderBy")(filterResult, ["-deep", "+sort"]);
                console.log($scope.boxResult);
            }
            $scope.isCalculating = false;
        }
    };
    $scope.BoxClick = function boxClicker(item) {
        $scope.selectedBox = item;
        $scope.boxPrice = $scope.boxCount * $scope.shelvesCount * item.price;
        $scope.totalPrice += $scope.boxPrice;
        this.Calculation();
    };
    $scope.ChangeDeep = function deepChanger() {
        if ($scope.cupboard.deep !== $scope.oldDeep) {
            this.Calculation();
        }
    };
    $scope.ChangeWidth = function weightChanger() {
        $scope.deeps = $scope.cupboard.width.deeps;
        $scope.cupboard.deep = $scope.deeps[0];
        if ($scope.cupboard.width !== $scope.oldWeight) {
            this.Calculation();
        }
    };
    $scope.ChangeHeight = function heightChanger() {
        let n;
        let shelvesArray = [];
        let shelves = [];
        angular.forEach($scope.heights, function (value) {
            if (value.value === $scope.cupboard.height) {
                this.push(value.shelves);
            }
        }, shelves);
        for (n = $scope.cupboard.height.shelves.min; n <= $scope.cupboard.height.shelves.max; n++) {
            shelvesArray.push({ value: n, title: n });
        }
        $scope.shelves = shelvesArray;
        $scope.cupboard.shelve = $scope.shelves[0];
        if ($scope.cupboard.height !== $scope.oldHeight) {
            this.Calculation();
        }
    };
});
//# sourceMappingURL=index.js.map