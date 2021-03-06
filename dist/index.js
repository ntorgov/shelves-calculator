var Color = THREE.Color;
var BufferGeometry = THREE.BufferGeometry;
var camera, scene, renderer;
var geometry, material;
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
var light;
calculatorApplication.controller("calculatorController", function ($scope, $filter, $http) {
    var unitFixation = 1 / 1000;
    var distanceBetweenHoles = 25;
    var holderPerforationRadius = 4;
    var shelveHeight = 25;
    var displayHeight = 400;
    var boxesArray;
    var shelvesHeights = [
        { value: 500, title: 500, selected: true, price: 115.0, shelves: { min: 3, max: 5 } },
        {
            value: 1000,
            title: 1000,
            selected: false,
            price: 188.0,
            shelves: { min: 3, max: 11 }
        },
        {
            value: 1200,
            title: 1200,
            selected: false,
            price: 220.0,
            shelves: { min: 3, max: 13 }
        },
        {
            value: 1500,
            title: 1500,
            selected: false,
            price: 268.0,
            shelves: { min: 3, max: 13 }
        },
        {
            value: 1800,
            title: 1800,
            selected: false,
            price: 308.0,
            shelves: { min: 3, max: 13 }
        },
        {
            value: 2000,
            title: 2000,
            selected: false,
            price: 336.0,
            shelves: { min: 3, max: 13 }
        },
        {
            value: 2200,
            title: 2200,
            selected: false,
            price: 370.0,
            shelves: { min: 3, max: 13 }
        },
        {
            value: 2300,
            title: 2300,
            selected: false,
            price: 390.0,
            shelves: { min: 3, max: 13 }
        },
        {
            value: 2500,
            title: 2500,
            selected: false,
            price: 420.0,
            shelves: { min: 3, max: 13 }
        }
    ];
    var selvesWidths = [
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
    $scope.buttonLock = false;
    $scope.isVisualizating = false;
    $scope.isCalculating = false;
    $scope.isRendered = false;
    $scope.oldHeight = 0;
    $scope.oldWidth = 0;
    $scope.oldDeep = 0;
    $scope.isReady = false;
    function visualizationInit() {
        var boxGeometryGroup;
        var localBoxGeometry;
        var secondCylinderBSP;
        var firstCylinderBSP;
        var additionalCutSubtractor;
        var additionalCutMesh;
        var additionalCut;
        var boxObject;
        var boxYPosition;
        var boxGeometry;
        var boxSubGeometrySubstractor;
        var boxSupGeometrySubstractor;
        var boxSubGeometryMesh;
        var boxSubGeometry;
        var boxSupGeometryMesh;
        var boxSupGeometry;
        var boxPlacementPadding;
        var boxPlacementMarguin;
        var boxPlaceWidth;
        var boxMaterial;
        var glassMaterial;
        var shelvesCounter, holdersCounter, boxCounter;
        var selectedObject;
        var shelveYPosition;
        var shelveGeometry, shelveObject;
        var perforatedHolder;
        var cylinderGeometry;
        var perforationCounter;
        var subtractCylinderGeometry;
        var material;
        var holderShape;
        var extrudeSettings;
        var holderGeometry;
        var holder = [];
        $scope.isVisualizating = true;
        if ($scope.cupboard.width && $scope.cupboard.width.value) {
            material = new THREE.MeshStandardMaterial({
                color: 0x777777,
                wireframe: false
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
                    firstCylinderBSP = undefined;
                    secondCylinderBSP = undefined;
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
            perforatedHolder = undefined;
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
            $scope.shelvesCountOld = $scope.shelvesCount;
            if ($scope.shelvesCount) {
                $scope.boxCounter = 0;
                shelveGeometry = new THREE.BoxGeometry($scope.cupboard.width.value * unitFixation, shelveHeight * unitFixation, $scope.cupboard.deep.value * unitFixation);
                if ($scope.boxCount && $scope.selectedBox) {
                    boxPlaceWidth = (($scope.cupboard.width.value - 29 * 2) / ($scope.boxCount));
                    boxPlacementPadding = ((boxPlaceWidth - $scope.selectedBox.width) / 2);
                    boxPlacementMarguin = (($scope.selectedBox.width / 2) + 30);
                    console.log("Ширина посадочного места: " + boxPlaceWidth);
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
                    boxGeometry = boxSupGeometrySubstractor.subtract(boxSubGeometrySubstractor);
                    boxGeometryGroup = new THREE.Group();
                    if ($scope.selectedBox.series === 0) {
                        console.log("Box SK");
                        additionalCut = new THREE.BoxGeometry($scope.selectedBox.width * 0.70 * unitFixation, $scope.selectedBox.height * 0.66 * unitFixation, $scope.selectedBox.deep * 0.30 * unitFixation);
                        additionalCutMesh = new THREE.Mesh(additionalCut, boxMaterial);
                        additionalCutMesh.position.z = ($scope.selectedBox.deep / 2) * unitFixation;
                        additionalCutMesh.position.y = (($scope.selectedBox.height / 2) - ($scope.selectedBox.height * 0.66) / 2) * unitFixation;
                        additionalCutSubtractor = new ThreeBSP(additionalCutMesh);
                        boxGeometry = boxGeometry.subtract(additionalCutSubtractor);
                        var glassPanel = new THREE.BoxGeometry($scope.selectedBox.width * 0.70 * unitFixation, $scope.selectedBox.height * 0.66 * unitFixation, unitFixation);
                        var glassPanelMech = new THREE.Mesh(glassPanel, glassMaterial);
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
                }
                console.log($scope.shelvesCount);
                for (shelvesCounter = 0; shelvesCounter < $scope.shelvesCount; shelvesCounter++) {
                    shelveYPosition = ($scope.cupboard.height.value - (shelvesCounter * $scope.shelveHeight) - (shelveHeight / 2));
                    shelveObject = new THREE.Mesh(shelveGeometry, material);
                    shelveObject.name = "shelve" + shelvesCounter;
                    shelveObject.castShadow = true;
                    shelveObject.receiveShadow = true;
                    shelveObject.position.set(($scope.cupboard.width.value * 0.5 + 1) * unitFixation, shelveYPosition * unitFixation, ($scope.cupboard.deep.value * -0.5 - 1) * unitFixation);
                    scene.add(shelveObject);
                    if ($scope.boxCount && $scope.selectedBox) {
                        if (shelvesCounter > 0) {
                            localBoxGeometry = [];
                            for (boxCounter = 0; boxCounter < $scope.boxCount; boxCounter++) {
                                localBoxGeometry[boxCounter] = boxGeometryGroup.clone();
                                $scope.boxCounter++;
                                boxYPosition = (shelveYPosition + (shelveHeight / 2) + ($scope.selectedBox.height / 2));
                                localBoxGeometry[boxCounter].name = "box" + $scope.boxCounter;
                                localBoxGeometry[boxCounter].position.set((boxCounter * boxPlaceWidth + boxPlacementPadding + boxPlacementMarguin) * unitFixation, boxYPosition * unitFixation, (($scope.selectedBox.deep / -2) - 1) * unitFixation);
                                scene.add(localBoxGeometry[boxCounter]);
                            }
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
        var radius = $scope.cameraRadius * 2;
        var centerScene;
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
    function init() {
        var proportion = 3 / 4;
        var visualizationWidth = document.getElementById("visualization").offsetWidth * 0.5;
        var hemiLight;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, proportion, 1, 5000);
        camera.isPerspectiveCamera = false;
        scene.add(new THREE.AmbientLight(0xffffff));
        hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
        hemiLight.intensity = 3.4;
        scene.add(hemiLight);
        light = new THREE.PointLight(0xffffff, 1, 100);
        light.castShadow = false;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        light.power = 180;
        scene.add(light);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(visualizationWidth, (visualizationWidth / proportion));
        renderer.shadowMap.enabled = true;
        renderer.toneMappingExposure = Math.pow(1.15, 5.0);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.physicallyCorrectLights = true;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        document.getElementById("visualization").appendChild(renderer.domElement);
    }
    $scope.init = function () {
        var visualizationObject = document.getElementById("visualization");
        if (visualizationObject) {
            $http.get("http://www.agropak.net/local/ajax/products.php", {}).then(function (data) {
                boxesArray = data.data;
                $scope.boxes = boxesArray;
                $scope.isReady = true;
                init();
                $scope.ChangeHeight();
            }, function () {
                console.log("Data error");
            });
        }
    };
    $scope.init();
    $scope.Calculation = function Calculation() {
        var shelveCount;
        var filterResult;
        var heightBetweenShelves = 0;
        var boxCount;
        var currentHeight = $scope.cupboard.height;
        var currentWidth = $scope.cupboard.width;
        var currentDeep = $scope.cupboard.deep;
        if ($scope.isCalculating === false && $scope.isReady === true) {
            $scope.oldHeight = currentHeight;
            $scope.oldWidth = currentWidth;
            $scope.oldDeep = currentDeep;
            $scope.isCalculating = true;
            if ($scope.selectedBox) {
                shelveCount = Math.floor(currentHeight.value / ($scope.selectedBox.height + 30 + 35)) + 1;
                if ((shelveCount) < currentHeight.shelves.min) {
                    shelveCount = currentHeight.shelves.min;
                }
                if ((shelveCount) > currentHeight.shelves.max) {
                    shelveCount = currentHeight.shelves.max;
                }
                heightBetweenShelves = Math.floor(($scope.selectedBox.height + 30 + 35) / distanceBetweenHoles) * distanceBetweenHoles;
                if (heightBetweenShelves < 145) {
                    heightBetweenShelves = 145;
                }
                if ((shelveCount * heightBetweenShelves) >= currentHeight.value) {
                    while (((shelveCount - 1) * heightBetweenShelves) >= currentHeight.value) {
                        console.info("Полок: " + shelveCount + "; высота: " + heightBetweenShelves);
                        shelveCount--;
                        console.info("Полок: " + shelveCount + "; высота: " + heightBetweenShelves);
                    }
                }
                boxCount = Math.floor((currentWidth.value - 60) / $scope.selectedBox.width);
                $scope.shelvesCount = shelveCount;
                $scope.boxCount = boxCount;
                $scope.cupboard.shelves = $scope.shelvesCount;
            }
            else {
                shelveCount = $scope.shelvesCount - 1;
                heightBetweenShelves = Math.floor(((currentHeight.value / shelveCount) + 30 + 35) / distanceBetweenHoles) * distanceBetweenHoles;
                while ((heightBetweenShelves * shelveCount) >= currentHeight.value) {
                    heightBetweenShelves -= distanceBetweenHoles;
                }
            }
            $scope.shelveHeight = heightBetweenShelves;
            if ($scope.isVisualizating === false) {
                visualizationInit();
                if ($scope.isRendered === false) {
                    render();
                }
            }
            if (typeof (currentDeep) === "object") {
                filterResult = $filter("filter")($scope.boxes, {
                    deep: currentDeep.value
                }, function (actual, expected) {
                    var result = false;
                    if ((actual === expected - 50) || (actual === expected)) {
                        result = true;
                    }
                    return result;
                });
                $scope.boxResult = $filter("orderBy")(filterResult, ["-deep", "+sort"]);
                console.log($scope.boxes);
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
    $scope.ChangeShelves = function ChangeShelves() {
        $scope.shelvesCount = $scope.cupboard.shelves;
        $scope.selectedBox = undefined;
        this.Calculation();
    };
    $scope.ChangeDeep = function deepChanger() {
        if ($scope.cupboard.deep !== $scope.oldDeep) {
            $scope.selectedBox = undefined;
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
        if ($scope.cupboard.height !== $scope.oldHeight) {
            if ($scope.isReady === true) {
                this.Calculation();
            }
        }
    };
    $scope.SendOrder = function sendOrder() {
        var data = {
            height: $scope.cupboard.height.value,
            width: $scope.cupboard.width.value,
            deep: $scope.cupboard.deep.value,
            box: $scope.selectedBox,
            boxQty: $scope.boxCount,
            shelveQty: $scope.shelvesCount
        };
        $scope.buttonLock = true;
        console.info(data);
        $http.post("service.php", {
            data: data,
            user: $scope.userContact,
            test: "ok"
        }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).then(function () {
            console.info(data);
        }, function () {
            console.error("Error");
        });
        $scope.buttonLock = false;
    };
});
