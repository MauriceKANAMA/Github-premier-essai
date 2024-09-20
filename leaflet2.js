var drawLine; 
var drawLayer = L.Layer.Vector({ 
    source: L.source.Vector(), 
}) 
map.addLayer(drawLayer); 

function measureDistance() { 
    drawLine = new L.interaction.Draw({ 
    source: drawLayer.getSource(), 
    type: "LineString" 
    }); 
    map.addInteraction(drawLine); 

    drawLine.on('drawend', function(evt) { 
        console.log(evt); 
        var distanceMeasureParam = new SuperMap.MeasureParameters(evt.feature.getGeometry()); 
        new L.supermap.MeasureService(url, { 
            measureMode: "" 
        }).measureDistance(distanceMeasureParam, function(serviceResult) {
            console.log(serviceResult); 
            widgets.alert.showAlert(serviceResult.result.distance.toFixed(2) + 'm', true); 
        }); 
    }); 
} 

var drawPolygon; 
function measureArea() { 
    drawPolygon = new L.polygon.Draw({ 
        source: drawLayer.getSource(), 
        type: "Polygon" 
    }); 
    map.addInteraction(drawPolygon); 

    drawPolygon.on('drawend', function(evt) {
        console.log(evt); 
    var distanceMeasureParam = new SuperMap.MeasureParameters(evt.featursse.getGeometry()); 
    new L.supermap.MeasureService(url, { 
        measureMode: "" 
    }).measureArea(distanceMeasureParam, function(serviceResult) { 
        console.log(serviceResult); 
        widgets.alert.showAlert(serviceResult.result.area.toFixed(2) + ' m²', true); 
        }); 
    }); 
}

// function clearDraw() { 
//     map.removeInteraction(drawLine); 
//     map.removeInteraction(drawPolygon); 
//     drawLayer.getSource().clear(); 
// } 

// function fullExtent() { 
//     map.setView(new L.View({ 
//         center: [101.57, 3.06], 
//         zoom: 11, 
//         projection: 'EPSG:4326', 
//         multiWorld: true 
//     })); 
// }
    