
var g = require('./index.js');
g.connect(process.env.GRAX_URL,process.env.GRAX_TOKEN);

TestHealth();
TestObjectList();
TestObjectFieldList("Opportunity");
//console.log(g.SnapShotDefinition);
//TestgetSearch();                  // Change the searchID sample below
//TestdownloadSearch();             // Change the searchID sample below
//TestgetSavedSnapshots();
//g.SnapShotDefinition.numberofsnapshots = 1;
//TestgetSnapshotData();
//TestgetSnapshotDataAs2DArray();

// This gets the health of GRAX
async function TestHealth(){
    var health = await g.getHealth();
    console.log("Health Returned: " + health);
}

// This gets a object list from GRAX
async function TestObjectList(){
    var list = await g.getObjectsList();
    console.log("Object List Returned: " + list.length);
}

// This gets a object list from GRAX
async function TestObjectFieldList(objectName){
    var list = await g.getObjectFields(objectName);
    console.log(list);
}

// This gets a CSV snapshot
async function TestgetSnapshotData(){
    g.SnapShotDefinition.numberofsnapshots = 1;
    g.SnapShotDefinition.fields += ",Description";
    let searchdata = await g.getSnapshotData(g.SnapShotDefinition);
    console.log(searchdata);
}

// This gets a 2D array snapshot
async function TestgetSnapshotDataAs2DArray(){
    g.SnapShotDefinition.numberofsnapshots = 1;
    g.SnapShotDefinition.fields += ",Description";
    let searchdata = await g.getSnapshotDataAs2DArray(g.SnapShotDefinition);
    console.log(searchdata);
}

// This retrieves a single search
async function TestgetSearch(){
    let searchStatus = await g.getSearch('kHfSSaGqqziOtUVqY72emC');
    console.log('Search Records Found: ' + searchStatus.recordsFound);
    console.log('Search Status: ' + searchStatus.status);
}

// This downloads a single search
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
