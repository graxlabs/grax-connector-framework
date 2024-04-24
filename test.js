
var g = require('./index.js');
g.connect(process.env.GRAX_URL,process.env.GRAX_TOKEN);

TestHealth();
TestObjectList();
console.log(g.SnapShotDefinition);
// TestgetSnapshotData();

async function TestHealth(){
    var health = await g.getHealth();
    console.log("Health Returned: " + health);
}

async function TestObjectList(){
    var list = await g.getObjectsList();
    console.log("Object List Returned: " + list.length);
}

async function TestgetSnapshotData(){
    let searches = await g.getSnapshotData(g.SnapShotDefinition);
    console.log("Returned Searches: " + searches.length);
    
}


/*
Search: kHfSSaGqqziOtUVqY72emC
Search: BOzEnQDcoqDhe7abbAemMN
Search: OworezcfPsZeeIBtXv5URk
Search: FhAguMUFuvjelvrcNrYMSB
Search: Hlsf9BGBCUqjipVmxPFvTH
Search: sVTEPHhKkWfffNTM6OI8tA
Search: qxF2WSImj3jbdAjTn5PxVA
Search: PMJiJ0PeuKvnxZfDfDDmfU
Search: ZUL271zynZQAGS11g11GiD
Search: ALeb56UfVAZFFNdjnKkWqL
Search: ru5XhQbGrC3716rek9LuPF
Search: eLBaiISHUNyEv4c2iNkM8H
*/