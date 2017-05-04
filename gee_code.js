var dem = ee.Image("WWF/HydroSHEDS/15CONDEM"),
    flow = ee.Image("WWF/HydroSHEDS/15ACC"),
    demz = ee.Image("USGS/SRTMGL1_003");
    //9cell square trans
var trans1 = dem.translate(-450, -450);
var trans2 = dem.translate(-450, 0);
var trans3 = dem.translate(-450, 450);
var trans4 = dem.translate(0, -450);
var trans5 = dem.translate(0, 450);
var trans6 = dem.translate(450, -450);
var trans7 = dem.translate(450, 0);
var trans8 = dem.translate(450, 450);

//additions for 5x5
var transb1 = dem.translate(-900, -900);
var transb2 = dem.translate(-900, -450);
var transb3 = dem.translate(-900, 0);
var transb4 = dem.translate(-900, 450);
var transb5 = dem.translate(-900, 900);

var transb6 = dem.translate(-450, -900);
var transb7 = dem.translate(-450, 900);

var transb8 = dem.translate(0, -900);
var transb9 = dem.translate(0, 900);

var transb10 = dem.translate(450, -900);
var transb11 = dem.translate(450, 900)

var transb12 = dem.translate(900, -900);
var transb13 = dem.translate(900, -450);
var transb14 = dem.translate(900, 0);
var transb15 = dem.translate(900, 450);
var transb16 = dem.translate(900, 900);

//add bands to 9 cell square
var addbands1= dem.addBands(trans1);
var addbands2= addbands1.addBands(trans2);
var addbands3= addbands2.addBands(trans3);
var addbands4= addbands3.addBands(trans4);
var addbands5= addbands4.addBands(trans5);
var addbands6= addbands5.addBands(trans6);
var addbands7= addbands6.addBands(trans7);
var addbands8= addbands7.addBands(trans8);


var red = addbands8.reduce(ee.Reducer.min());

//bands to 5x5
var addbandsb1= addbands8.addBands(transb1);
var addbandsb2= addbandsb1.addBands(transb2);
var addbandsb3= addbandsb2.addBands(transb3);
var addbandsb4= addbandsb3.addBands(transb4);
var addbandsb5= addbandsb4.addBands(transb5);
var addbandsb6= addbandsb5.addBands(transb6);
var addbandsb7= addbandsb6.addBands(transb7);
var addbandsb8= addbandsb7.addBands(transb8);
var addbandsb9= addbandsb8.addBands(transb9);
var addbandsb10= addbandsb9.addBands(transb10);
var addbandsb11= addbandsb10.addBands(transb11);
var addbandsb12= addbandsb11.addBands(transb12);
var addbandsb13= addbandsb12.addBands(transb13);
var addbandsb14= addbandsb13.addBands(transb14);
var addbandsb15= addbandsb14.addBands(transb15);
var addbandsb16= addbandsb15.addBands(transb16);

var red_5x5 = addbandsb16.reduce(ee.Reducer.min());

// more stuffz
var diff = dem.subtract(red);

var masked = flow.gte(250);

var maskedflow = flow.updateMask(masked);
var maskeddiff = diff.updateMask(masked);

//5x5 stuff
var diff2=red.subtract(red_5x5);
var maskeddiff2 = diff2.updateMask(masked);

//models
//var model = maskeddiff.multiply(maskeddiff);
//var model2 = model.multiply(maskeddiff);
//var model3 = model2.multiply(maskedflow);
//var model4 = model3.multiply(maskedflow);

//models 5x5
var model = maskeddiff2.multiply(maskeddiff2);
var model2 = model.multiply(maskeddiff2);
var model3 = model2.multiply(maskedflow);

//Map.addLayer(flow);
//Map.addLayer(maskedflow, {min: 250, max: 500000});
//Map.addLayer(maskeddiff2, {min: 0, max: 50});
Map.addLayer(model3, {min: 100000, max: 50000000, palette: ['00fFFF', 'ff0000']});
//Map.addLayer(addbands8, {min: 0, max: 500});
//Map.addLayer(red, {min: 0, max: 500});
