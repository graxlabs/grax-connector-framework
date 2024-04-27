
var g = require('./index.js');
g.connect(process.env.GRAX_URL,process.env.GRAX_TOKEN);

TestHealth();
TestObjectList();
console.log(g.SnapShotDefinition);

TestgetSearch();
TestdownloadSearch();

TestgetSavedSnapshots();

g.SnapShotDefinition.numberofsnapshots = 1;
TestgetSnapshotData();

async function TestHealth(){
    var health = await g.getHealth();
    console.log("Health Returned: " + health);
}

async function TestObjectList(){
    var list = await g.getObjectsList();
    console.log("Object List Returned: " + list.length);
}

async function TestgetSnapshotData(){
    let searchdata = await g.getSnapshotData(g.SnapShotDefinition);
    console.log(searchdata);
}

async function TestgetSearch(){
    let searchStatus = await g.getSearch('kHfSSaGqqziOtUVqY72emC');
    console.log('Search Records Found: ' + searchStatus.recordsFound);
    console.log('Search Status: ' + searchStatus.status);
}

async function TestdownloadSearch(){
    var downloadData = await g.downloadSearch('kHfSSaGqqziOtUVqY72emC',g.SnapShotDefinition.fields);
    console.log(g.searchdata.get('kHfSSaGqqziOtUVqY72emC'));
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(g.searchdata.get('kHfSSaGqqziOtUVqY72emC'));
}

function TestgetSavedSnapshots(){
    console.log(g.getSavedSnapshots());
}
