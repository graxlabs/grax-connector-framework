
var g = require('./index.js');
g.connect(process.env.GRAX_URL,process.env.GRAX_TOKEN);

//TestHealth();
//TestObjectList();
//console.log(g.SnapShotDefinition);
//TestgetSearch();
//TestdownloadSearch();
//TestgetSavedSnapshots();
//g.SnapShotDefinition.numberofsnapshots = 1;
//TestgetSnapshotData();
TestgetSnapshotDataAs2DArray();

async function TestHealth(){
    var health = await g.getHealth();
    console.log("Health Returned: " + health);
}

async function TestObjectList(){
    var list = await g.getObjectsList();
    console.log("Object List Returned: " + list.length);
}

async function TestgetSnapshotData(){
    g.SnapShotDefinition.numberofsnapshots = 1;
    g.SnapShotDefinition.fields += ",Description";
    let searchdata = await g.getSnapshotData(g.SnapShotDefinition);
    console.log(searchdata);
}

async function TestgetSnapshotDataAs2DArray(){
    g.SnapShotDefinition.numberofsnapshots = 1;
    g.SnapShotDefinition.fields += ",Description";
    let searchdata = await g.getSnapshotDataAs2DArray(g.SnapShotDefinition);
    console.log(searchdata);
}

async function TestgetSearch(){
    let searchStatus = await g.getSearch('kHfSSaGqqziOtUVqY72emC');
    console.log('Search Records Found: ' + searchStatus.recordsFound);
    console.log('Search Status: ' + searchStatus.status);
}

async function TestdownloadSearch(){
    var downloadData = await g.downloadSearch('ebMzupkrVppfdteNxb6WCb',g.SnapShotDefinition.fields + ",Description");
    await new Promise(resolve => setTimeout(resolve, 5000));
    var rawcsv = g.searchdata.get('ebMzupkrVppfdteNxb6WCb');
    var parsedcsv = g.parseCsv(rawcsv);
    console.log("Parsed CSV: " + parsedcsv.length);
}

function TestgetSavedSnapshots(){
    console.log(g.getSavedSnapshots());
}
