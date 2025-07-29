 mapboxgl.accessToken = 'pk.eyJ1IjoiYmFvaGFubmd1eWVuIiwiYSI6ImNtOXd6dmw2ODB3ejEya3NlYzE0dmYxbncifQ.m3GGPlpqZngR-GpQS6TvDA';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/baohannguyen/cmb5ici4700m801qxcboad39i',
            zoom: 19,
            center: [9.186419467032465, 48.78219038609993],
            pitch: 60,
            antialias: true
        });

        const incident = {
            id: 'incident-0',
            color: '#ff9d37',
            coordinates: [9.186341750042487, 48.78202756466163],
            hoverText: `
            <strong>Aktuelle Störungen</strong>
            <table>
                <tr><th>Abfahrt</th><th>Ziel</th><th>Plan</th><th>Aktuell</th></tr>
                <tr><td>Stuttgart</td><td>Vaihingen</td><td>15:30</td><td>Verspätet</td></tr>
                <tr><td>Stuttgart</td><td>Göppingen</td><td>16:30</td><td>Verspätet</td></tr>
            </table>
            <br>
            <strong style="color: green;">Mögliche Umleitungen</strong>
            <table>
                <tr><th>Alternativroute</th><th>Fahrzeit</th><th>Status</th></tr>
                <tr><td>Stuttgart – Feuersee – Vaihingen</td><td>25 Min</td><td>Fährt</td></tr>
                <tr><td>Stuttgart – Rohr – Vaihingen</td><td>30 Min</td><td>Fährt</td></tr>
            </table>
            `,
            clickText: `<strong>Achtung: Hindernis erkannt!</strong><img src="cow.png" style="max-width:50%; height:auto; margin-top:10px; margin-bottom:2px; border-radius:6px; display:block; margin-left:auto; margin-right:auto;">
            <p>15:02 Uhr - Eine Kuh blockiert aktuell die Strecke von Stuttgart nach Vaihingen (Bahn 104)</p>`
        };

        const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false
        });

        let popupVisible = false;

        function showScenario() {
            // add first marker
            map.addSource(incident.id, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {
                            hoverText: incident.hoverText,
                            clickText: incident.clickText
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: incident.coordinates
                        }
                    }]
                }
            });

            map.addLayer({
                id: incident.id,
                type: 'circle',
                source: incident.id,
                paint: {
                    'circle-color': incident.color,
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

            map.on('mouseenter', incident.id, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                const hoverPopupEl = document.getElementById('hover-popup');
                hoverPopupEl.innerHTML = e.features[0].properties.hoverText;
                hoverPopupEl.style.display = 'block';
            });


            map.on('mouseleave', incident.id, () => {
                map.getCanvas().style.cursor = '';
                const hoverPopupEl = document.getElementById('hover-popup');
                hoverPopupEl.style.display = 'none';
            });

            // show popup
            popup.setLngLat(incident.coordinates)
                .setHTML(incident.clickText)
                .addTo(map);
            popupVisible = true;


            document.getElementById("popup-toggle-btn").style.display = "block";

            // red line after 3 seconds
            setTimeout(() => {
                map.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': [
                                [
                                    9.184883025182955,
                                    48.78211296389762
                                ],
                                [
                                    9.185333976131261,
                                    48.781902761728105
                                ],
                                [
                                    9.185676348808528,
                                    48.781729205543144
                                ],
                                [
                                    9.185922009643747,
                                    48.78168619543845
                                ],
                                [
                                    9.186157321089865,
                                    48.78175850957976
                                ],
                                [
                                    9.186282698498843,
                                    48.78184599486326
                                ],
                                [
                                    9.186316696199185,
                                    48.78198398276504
                                ],
                                [
                                    9.186454450080163,
                                    48.78224378466021
                                ],
                                [
                                    9.18654995375499,
                                    48.78238900648219
                                ],
                                [
                                    9.186730721673626,
                                    48.78250870461997
                                ],
                                [
                                    9.186996894909214,
                                    48.78262125705038
                                ],
                                [
                                    9.18714776930176,
                                    48.782718987974164
                                ],
                                [
                                    9.18795034579989,
                                    48.78344770905372
                                ],
                                [
                                    9.18799694059831,
                                    48.78351274062712
                                ],
                                [
                                    9.188321016004295,
                                    48.78402986344267
                                ]
                            ]
                        }
                    }
                });

                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#e50000',
                        'line-width': 10
                    }
                });
                map.addSource('route-1', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': [
                                [
                                    9.186283489802179,
                                    48.78184652059022
                                ],
                                [
                                    9.18629156838199,
                                    48.78162063024212
                                ],
                                [
                                    9.18629522091922,
                                    48.78138979926422
                                ]
                            ]
                        }
                    }
                });

                map.addLayer({
                    'id': 'route-1',
                    'type': 'line',
                    'source': 'route-1',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#e50000',
                        'line-width': 10
                    }
                });
            }, 4000);

            // 3d model after 6 seconds
            setTimeout(() => {

                map.addLayer(customLayer);

            }, 8000)

            // green line after 9 seconds
            setTimeout(() => {
                map.addSource('route-2', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': [
                                [
                                    9.18897779881587,
                                    48.78460982334883
                                ],
                                [
                                    9.188598702755371,
                                    48.784010009942136
                                ],
                                [
                                    9.188384831194185,
                                    48.78369774712681
                                ],
                                [
                                    9.188152297805118,
                                    48.78340466905141
                                ],
                                [
                                    9.187668987271934,
                                    48.78264298448576
                                ],
                                [
                                    9.187561490910014,
                                    48.782501395486946
                                ],
                                [
                                    9.18721939208882,
                                    48.78213122594852
                                ],
                                [
                                    9.186959472368187,
                                    48.78188903838725
                                ],
                                [
                                    9.186436236956894,
                                    48.781052451542166
                                ],
                                [
                                    9.186179709410254,
                                    48.78062547033821
                                ],
                                [
                                    9.1855560049828,
                                    48.779623778590235
                                ]
                            ]
                        }
                    }
                });

                map.addLayer({
                    'id': 'route-2',
                    'type': 'line',
                    'source': 'route-2',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#5CE65C',
                        'line-width': 10
                    }
                });
            }, 12000);
            document.getElementById("trigger-btn").style.display = "none";

        }

        // popup toggle function
        function togglePopup() {
            if (popupVisible) {
                popup.remove();
                popupVisible = false;
            } else {
                popup.setLngLat(incident.coordinates)
                    .setHTML(incident.clickText)
                    .addTo(map);
                popupVisible = true;
            }
        }

        document.getElementById("trigger-btn").addEventListener("click", showScenario);
        document.getElementById("popup-toggle-btn").addEventListener("click", togglePopup);

        // 3d model data
        const modelOrigin = [9.186881174016799, 48.78257211344504];
        const modelAltitude = 0;
        const modelRotate = [Math.PI / 2, -0.8, 0];

        const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude);
        const modelTransform = {
            translateX: modelAsMercatorCoordinate.x,
            translateY: modelAsMercatorCoordinate.y,
            translateZ: modelAsMercatorCoordinate.z,
            rotateX: modelRotate[0],
            rotateY: modelRotate[1],
            rotateZ: modelRotate[2],
            scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 3
        };

        const THREE = window.THREE;

        const customLayer = {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function (map, gl) {
                this.camera = new THREE.Camera();
                this.scene = new THREE.Scene();

                // lights
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
                this.scene.add(ambientLight);

                const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
                directionalLight1.position.set(100, 100, 200).normalize();
                this.scene.add(directionalLight1);

                const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
                directionalLight2.position.set(-100, -50, 50).normalize();
                this.scene.add(directionalLight2);

                const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
                hemiLight.position.set(0, 200, 0);
                this.scene.add(hemiLight);

                // load 3D-Model
                const loader = new THREE.GLTFLoader();
                loader.load('./models/ICE.gltf', (gltf) => {
                    this.scene.add(gltf.scene);
                });

                this.map = map;
                this.renderer = new THREE.WebGLRenderer({
                    canvas: map.getCanvas(),
                    context: gl,
                    antialias: true
                });
                this.renderer.autoClear = false;
            },
            render: function (gl, matrix) {
                const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
                const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
                const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

                const m = new THREE.Matrix4().fromArray(matrix);
                const l = new THREE.Matrix4().makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ
                ).scale(new THREE.Vector3(
                    modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                )).multiply(rotationX).multiply(rotationY).multiply(rotationZ);

                this.camera.projectionMatrix = m.multiply(l);
                this.renderer.resetState();
                this.renderer.render(this.scene, this.camera);
                this.map.triggerRepaint();
            }

        };