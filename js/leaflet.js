// Ajout de la position de notre carte sur notre page (GetMap)
const map = L.map('map').setView([-11.668, 27.482], 15);

// Fond de carte OSM et ESRI
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', 
    {foo: 'bar', 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


// Ajout de nos couches sous forme des services WMS (GetCapabilities) depuis Geoserver
const CBDIlots = L.Geoserver.wfs("http://localhost:8080/geoserver/Lushi_CBD/wfs", {
    layers: "Lushi_CBD:IlotsCBDgjson",
    style: {
        color: "black",
        fillOpacity: "0",
        opacity: "1",
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Nom de l'etablissement : " + feature.properties.Etablissem + '<br>' + '<br>' + "Type d'etablissement : " + feature.properties.Type
        );
    }
}).addTo(map);

const CBDLimits = L.Geoserver.wfs("http://localhost:8080/geoserver/Lushi_CBD/wfs", {
    layers: "Lushi_CBD:CBDLUSHIgjson",
    style: {
        color: "black",
        fillOpacity: "0",
        opacity: "3",
    }
}).addTo(map);


// // Creation d'un groupe (Layer control)
const baseMap = L.control.layers({
    'OpenStreetMap':osm,
    'Esri Satellite':Esri_WorldImagery,
    },{
    'Limites du CBD':CBDLimits,
    'Ilots du CBD': CBDIlots
}).addTo(map);


// Ajout de la de mesure lineaire
L.control.polylineMeasure().addTo(map);

// Ajout de l'onglet de recherche
L.Control.geocoder({}).addTo(map);

// Ajout de l'echelle sur la carte
L.control.scale().addTo(map);

// // Ajout de la mesure par polygone
L.control.measurePolygon().addTo(map);

// Ajout de la position de la souris sur la carte
L.control.mousePosition().addTo(map);