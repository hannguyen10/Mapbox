

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFvaGFubmd1eWVuIiwiYSI6ImNtOXd6dmw2ODB3ejEya3NlYzE0dmYxbncifQ.m3GGPlpqZngR-GpQS6TvDA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/baohannguyen/cmb5ici4700m801qxcboad39i',
    zoom: 16,
    center: [9.262674807614673, 48.79873918881131],
    pitch: 60,
    antialias: true
});

const incident = {
    id: 'incident-0',
    color: '#ff9d37',
    coordinates: [9.262674807614673, 48.79873918881131],
    hoverText: `
           <div class="tooltip-container">
    <strong class="section-title">Aktuelle Störungen</strong>

    <div class="disruption-section">
        <div><strong>Stuttgart – Waiblingen</strong></div>
        <div class="planned-time">Geplant: 15:30</div>
        <div class="progress-bar-bg">
            <div class="progress-bar progress-high" style="width: 80%;"></div>
        </div>
        <div class="disruption-level high">Verspätung: Hoch</div>
    </div>

    <div class="disruption-section">
        <div><strong>Stuttgart – Esslingen</strong></div>
        <div class="planned-time">Geplant: 16:30</div>
        <div class="progress-bar-bg">
            <div class="progress-bar progress-medium" style="width: 60%;"></div>
        </div>
        <div class="disruption-level medium">Verspätung: Mittel</div>
    </div>

    <strong class="section-title-green">Mögliche Umleitungen</strong>

    <div class="routes">
        <div class="route-item">
            <div class="route-title">Route: Feuersee</div>
            <div>Stuttgart → Untertürkheim → Waiblingen</div>
            <div class="route-info">Fahrzeit: 25 Min – <span class="status">Fährt</span></div>
        </div>
        <div class="route-item">
            <div class="route-title">Route: Rohr</div>
            <div>Stuttgart → Bad Cannstatt → Waiblingen</div>
            <div class="route-info">Fahrzeit: 30 Min – <span class="status">Fährt</span></div>
        </div>
    </div>
</div>


            `
    ,
    clickText: `<strong>Achtung: Störung erkannt!</strong><img src="images/train.png" style="max-width:50%; height:auto; margin-top:10px; margin-bottom:2px; border-radius:6px; display:block; margin-left:auto; margin-right:auto;">
            <p>15:02 Uhr - Zugstörung an der Strecke von Stuttgart nach Waiblingen</p>`
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
                            9.181460449868382,
                            48.77900303009966
                        ],
                        [
                            9.184604585565069,
                            48.77849349896414
                        ],
                        [
                            9.190026508716471,
                            48.787697048774135
                        ],
                        [
                            9.21143126748683,
                            48.800131564440875
                        ],
                        [
                            9.221548617482341,
                            48.78997738410047
                        ],
                        [
                            9.230561869158237,
                            48.78561299570612
                        ],
                        [
                            9.24395984633668,
                            48.79122114352538
                        ],
                        [
                            9.250831802044047,
                            48.79341773607118
                        ],
                        [
                            9.257530488103185,
                            48.79765818555265
                        ],
                        [
                            9.262380823899449,
                            48.79877071288439
                        ],
                        [
                            9.26758266783915,
                            48.79877460126838
                        ],
                        [
                            9.269691775744576,
                            48.813346830979725
                        ],
                        [
                            9.288621070352349,
                            48.81676295665903
                        ],
                        [
                            9.293138992130451,
                            48.81956516869289
                        ],
                        [
                            9.289524466666506,
                            48.82602951503358
                        ],
                        [
                            9.289234877173044,
                            48.83326265172818
                        ],
                        [
                            9.29180225412216,
                            48.83573330037021
                        ],
                        [
                            9.29413127593267,
                            48.83664905225049
                        ],
                        [
                            9.303621237884926,
                            48.835398496951115
                        ],
                        [
                            9.311761215753393,
                            48.83505793788291
                        ],
                        [
                            9.313728031955435,
                            48.83628787815343
                        ],
                        [
                            9.31784367475342,
                            48.834283782659895
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
                'line-width': 3
            }
        });
    }, 4000);

    // 3d model after 6 seconds
    setTimeout(() => {

        map.addLayer(customLayer);

    }, 8000)

    // orange line after 9 seconds
    setTimeout(() => {
        map.addSource('route-2', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [
                            9.232302335778343,
                            48.78451006851742
                        ],
                        [
                            9.246099081587715,
                            48.77739557559701
                        ],
                        [
                            9.248820868036944,
                            48.77947988123563
                        ],
                        [
                            9.251790114317828,
                            48.778754699625495
                        ],
                        [
                            9.255178788891783,
                            48.78237777312793
                        ],
                        [
                            9.252942874298412,
                            48.785960506321175
                        ],
                        [
                            9.25831340832832,
                            48.78844472393405
                        ],
                        [
                            9.262695574534177,
                            48.79517474669609
                        ],
                        [
                            9.268045832144878,
                            48.798893503117796
                        ],
                        [
                            9.284925704452235,
                            48.80170773597911
                        ],
                        [
                            9.289962549170383,
                            48.804586645848985
                        ],
                        [
                            9.291629033732505,
                            48.81192499859611
                        ],
                        [
                            9.295891993924755,
                            48.81441661663686
                        ],
                        [
                            9.299915070593272,
                            48.815423106600605
                        ],
                        [
                            9.307921652091068,
                            48.81524809743337
                        ],
                        [
                            9.32006441146251,
                            48.81762165074318
                        ],
                        [
                            9.326589667472689,
                            48.81799128349729
                        ],
                        [
                            9.330038680802403,
                            48.82023651372211
                        ],
                        [
                            9.332933907214056,
                            48.82248598568819
                        ],
                        [
                            9.333186981352384,
                            48.824699973901176
                        ],
                        [
                            9.324966407055314,
                            48.82717663964837
                        ],
                        [
                            9.316945653943861,
                            48.831278309863535
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
                'line-color': '#FF6D2D',
                'line-width': 3
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
const modelOrigin = [9.247491585898445, 48.79205266818798];
const modelAltitude = 0;
const modelRotate = [Math.PI / 2, -4.2, 0];

const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude);
const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 55
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
        directionalLight.position.set(0, 300, 0); // hoch & seitlich wie Sonne
        this.scene.add(directionalLight);

        const hemiLight = new THREE.HemisphereLight(0xffffee, 0x080820, 0.5);
        this.scene.add(hemiLight);
        
        // load 3D-Model
        const loader = new THREE.GLTFLoader();
        loader.load('./models/ICE.gltf', (gltf) => {
            this.scene.add(gltf.scene);
        },
            undefined,
            (error) => {
                console.error('Fehler beim Laden des 3D-Modells:', error);

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
        if (!this.renderer || !this.camera || !this.scene) {
            return;
        }

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
        this.renderer.resetState(); // ✅ safe jetzt
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }


};