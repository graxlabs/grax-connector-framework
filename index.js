
// "use strict";
var axios = require("axios").default;
var jszip = require("jszip");
var csvparser = require('papaparse');

var { backupsHealthGet, searchCreate, searchGet, searchDownload, objectsList } = require("grax_api");

Object.defineProperty(exports, "__esModule", { value: true });
exports.backupsHealthGet = exports.parseCsv = exports.downloadSearch = exports.getSearch = exports.searchdata = exports.searches = exports.getObjectsList = exports.getSnapshotData = exports.SnapShotDefinition = exports.getSavedSnapshots = exports.DateFields = exports.Frequency = void 0;

exports.DateFields = [
  'rangeLatestModifiedAt',
  'createdAt',
  'modifiedAt',
  'latestModifiedAt',
  'allModifiedAt',
  'deletedAt',
  'purgedAt'
];

exports.Frequency = [
  'monthly',
  'daily',
  'single'
];

var searches = [];
exports.searches = searches;

var searchdata = new Map();
exports.searchdata = searchdata;

exports.SnapShotDefinition = {
  objectname: 'Opportunity',
  fields: 'Id,AccountId,CloseDate,Amount,StageName,Type,CreatedDate,LastModifiedDate',
  datefield: 'rangeLatestModifiedAt',
  numberofsnapshots: 12,
  startdate: getPreviousMonths(12),
  enddate: getPreviousMonths(0),
  // searchstart: getPreviousMonths(12),
  searchstart: '1/1/' + new Date(getPreviousMonths(12)).getFullYear().toString(),
  snapshotfrequncy: 'monthly',
  includesystemfields: false,
  filter: {
    mode: "and",
    fields: [
      {
        field: "StageName",
        filterType: "eq",
        not: true,
        value: "Closed Lost",
      },
      {
        field: "StageName",
        filterType: "eq",
        not: true,
        value: "Closed Won",
      },
    ],
  }
};

var connect = function(graxurl, graxtoken) {
  axios.defaults.baseURL = graxurl;
  axios.interceptors.request.clear();
  var currentConfig = axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${graxtoken}`;
    return config;
  });
};
exports.connect = connect;

var getHealth = async function() {
  try {
      var ishealthy = false;
      let opts = {
        maxBehind: 56, // Number | Maximum time behind before the backups are considered unhealthy, in seconds.
      };
      var healthData = await backupsHealthGet(opts).catch((err) => {
        console.log(err);
        return false;
      });
      if (healthData != null) {
        if (healthData.data!=null){
          if (healthData.data.status == "ok") 
              ishealthy = true;
        }
      }
      return ishealthy;
  } catch(err) {
    console.log("getHealth EXCEPTION");
    console.log(err);
    return false;
  }
}
exports.getHealth = getHealth;

var getObjectsList = async function(){
  return await retrieveObjectList(null);
}
exports.getObjectsList = getObjectsList;

async function retrieveObjectList(currentPageToken) {
  var vals = await objectsList({ maxItems: 2000, pageToken: currentPageToken })
    .then(async (res) => {
      if (res.data.nextPageToken != null) {
        //console.log("Loading Next Page: " + res.data.nextPageToken);
        var objs = await retrieveObjectList(res.data.nextPageToken);
        var objectList = res.data.objects.concat(objs);
        return objectList;
      } else {
        return res.data.objects;
      }
    })
    .catch((err) => registerException(err));  
  return vals;
}

// ------------------------------------------------------------------------------------------------------
//                                          Snapshot Logic                             
// ------------------------------------------------------------------------------------------------------
var getSnapshotData = async function (snapshotDef) {
  console.log('Running Snapshot ' + snapshotDef.objectname);
  await runSnapShot(
    snapshotDef.objectname,
    snapshotDef.datefield,
    snapshotDef.snapshotfrequncy,
    snapshotDef.startdate,
    snapshotDef.numberofsnapshots,
    JSON.stringify(snapshotDef.filter),
    "true",
    snapshotDef.searchstart
  );
  await new Promise(resolve => setTimeout(resolve, 500));
  // Header Column is + 1 (probably remove that later)
  for (var i=1; i < searches.length; i++) {
    console.log('Starting Download (' + i + '): ' + searches[i][5]);
    await downloadSearch(searches[i][5],snapshotDef.fields);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  await new Promise(resolve => setTimeout(resolve, 500));
  var snapshotData=""
  var firstRow = "";
  for (var i=1; i < searches.length; i++) {
    var searchId = searches[i][5];
    while (searchdata.get(searchId)=="DOWNLOADING"){
      console.log("Search Not Complete (waiting): " + searchId);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log("Search Complete: " + searchId);
    var str = searchdata.get(searchId);
    snapshotData += addColumnToCSV(str,"Snapshot Date",searches[i][0],true);
    firstRow = str.substring(0,str.indexOf('\n'));
    // snapshotData+=str.substring(str.indexOf('\n') + 1);
  }
  var returnvalue = firstRow + ",Snapshot Date\n" + snapshotData;
  if (snapshotDef.includesystemfields == false || snapshotDef.includesystemfields.toString().toLowerCase() == "false" || snapshotDef.includesystemfields==null){
    returnvalue = removeGraxSytemFields(returnvalue);
  }
  return returnvalue;
}
exports.getSnapshotData = getSnapshotData;

function addColumnToCSV(csvString, columnName, columnData,removefirstrow) {
  console.log("Adding " + columnName + "=" + columnData);
  var parsedcsv = parseCsv(csvString);
  var columnIndex = parsedcsv[0] ? parsedcsv[0].length : 0;
  for (let row of parsedcsv) {
    row.splice(columnIndex, 0, columnData);
  }
  parsedcsv[0][columnIndex] = columnName;
  if (removefirstrow==true){
    parsedcsv.shift();
  }
  return parsedcsv.join('\n') + '\n';
}

function removeGraxSytemFields(csvString) {
  // Split the CSV into lines
  const lines = csvString.split('\n');

  if (lines.length === 0) return '';

  // Identify the header line and split it into columns
  const headers = lines[0].split(',');

  // Find indexes of columns whose headers contain 'grax'
  const columnIndexesToRemove = headers.reduce((indexes, header, index) => {
      if (header.toLowerCase().includes('grax.')) {
          indexes.push(index);
      }
      return indexes;
  }, []);

  // Filter out the columns in each line
  const filteredLines = lines.map(line => {
      const cols = line.split(',');
      const filteredCols = cols.filter((col, index) => !columnIndexesToRemove.includes(index));
      return filteredCols.join(',');
  });

  // Join the filtered lines back into a single CSV string
  return filteredLines.join('\n');
}

// Runs the snapshot which executes X searches and logs them in the GRAX_RECEIPTS tab
async function runSnapShot(
  objectName,
  dateField,
  snapshotfrequency,
  segmentStart,
  numberofSegments,
  filter,
  isCumulative,
  searchStartDate
) {
  searches = [["Snapshot Key", "Start Search", "End Search", "Snapshot Number", "Status", "SearchId"]];
  var startDate = new Date(segmentStart);
  segmentStart = new Date(segmentStart);
  var endDate = null;
  var firstDayOfSearch = null;
  for (var i = 0; i < numberofSegments; i++) {
    if (isCumulative.toString().toLowerCase() == "true") {
      firstDayOfSearch = new Date(searchStartDate);
    } else {
      firstDayOfSearch = new Date(segmentStart.getFullYear(), startDate.getMonth() + i);
    }
    endDate = GetSearchEndDate(snapshotfrequency,segmentStart, i);
    var segmentKey = GetSegmentKey(endDate);
    if (isEndDateValid(snapshotfrequency,endDate)) {
      var row = [segmentKey.toString(), firstDayOfSearch.toString(), endDate.toString(), i.toString(), "Running"];
      searches.push(row);
      await doSearch(
        i,
        objectName,
        dateField,
        firstDayOfSearch.toISOString(),
        endDate.toISOString(),
        filter
      );
    } else {
      console.log("Skipping Search: " + endDate + " segmentKey: " + segmentKey);
    }
  }
  return searches;
}

async function doSearch(index, objectName, timeField, startDate, endDate, filter) {
  let searchopts = {
    object: objectName.toString(),
    timeField: timeField.toString(), // 'createdAt', 'modifiedAt', 'latestModifiedAt', 'rangeLatestModifiedAt', 'allModifiedAt', 'deletedAt' or 'purgedAt'. Defaults to 'createdAt'.
    timeFieldMax: endDate.toString(),
    timeFieldMin: startDate.toString()
  };

  if (searchopts.timeField != "deletedAt" && searchopts.timeField != "purgedAt") {
    searchopts.status = "live";
  }
  if (filter != null && filter != "") {
    searchopts.filters = await JSON.parse(filter);
  }
  try {
    searchCreate(searchopts)
      .then((res) => {
        searches[index+1][4] = "Completed";
        searches[index+1][5] = res.data.id;
        return res.data.id;
      })
      .catch((err) => registerException(err));
  } catch (ex) {
    registerException(ex);
  }
}
// ------------------------------------------------------------------------------------------------------
//                                  
// ------------------------------------------------------------------------------------------------------

// Waits and gets the results of a search
var getSearch = async function (searchId) {
  return await searchGet(searchId)
    .then(async (res) => {
      return res.data;
    })
    .catch((err) => registerException(err));
}
exports.getSearch = getSearch;

// ------------------------------------------------------------------------------------------------------
//                                  
// ------------------------------------------------------------------------------------------------------
// Downloads and unzips the search results
var downloadSearch = async function (searchId, fields) {
  let searchOptions = {
    fields: fields
  };
  let downloadoptions = { 
    responseType: 'arraybuffer'
  };
  searchdata.set(searchId,"DOWNLOADING");
  var search = await getSearch(searchId);
  if (search.status != "success"){
    await new Promise(resolve => setTimeout(resolve, 2000));
    downloadSearch(searchId,fields);
  } else {
    searchDownload(searchId, searchOptions, downloadoptions)
      .then(async (res) => {
        try {
          var zip = new jszip();
          zip
            .loadAsync(res.data)
            .then(function (filedata) {
              filedata.forEach(async function (relativepath, zipfile) {
                if (zipfile.name != ".readme") {
                  zipfile.async("string").then(async function (unzipped) {
                    searchdata.set(searchId,unzipped);
                    console.log("Downloaded: " + searchId);
                  });
                }
              });
            })
            .catch((error) => {
              registerException(error);
            });
        } catch (exception) {
          registerException(exception);
        }
      })
      .catch((err) => registerException(err));
  }
}
exports.downloadSearch = downloadSearch;
// ------------------------------------------------------------------------------------------------------
//                                  
// ------------------------------------------------------------------------------------------------------

function registerException(ex) {
  console.log("EXCEPTION!");
  console.log(ex);
  globalThis.isException = true;
  globalThis.graxexception = ex;
}

var parseCsv = function parseCsv(csvdata){
  var parsedcsv = csvparser.parse(csvdata,{delimiter:",",quoteChar:'"',escapeChar:'"',skipEmptyLines: true});
  var validrows = [];
  for (const value of parsedcsv.data) {
    if (value.length > 0) {
      if (value.length>1 || value[0]!="")
        validrows.push(value);
    }
  }
  return validrows
}
exports.parseCsv = parseCsv;

// Internal Date Functions Not Exports
function getCurrentDate(){
  const now = new Date();
  console.log(now);
  return now.getMonth().toString().padStart(2, "0") + "/" + now.getDay().toString().padStart(2, "0") + "/" + now.getFullYear();
}

function getLastDayOfCurrentMonth() {
  // Get the current date
  const now = new Date();
  // Get the current year and month
  const year = now.getFullYear();
  const month = now.getMonth();
  // Create a date object pointing to the first day of the next month
  const nextMonth = new Date(year, month + 1, 1);
  // Subtract one day to get the last day of the current month
  const lastDay = new Date(nextMonth - 1);
  // Format the date as MM/DD/YYYY
  const formattedDate =
    (lastDay.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    lastDay.getDate().toString().padStart(2, "0") +
    "/" +
    lastDay.getFullYear();
  return formattedDate;
}

function getPreviousMonths(numberofsnapshots) {
  const today = new Date();
  var firstDayPreviousMonth = getFirstDayOfXMonthsAgo(numberofsnapshots);
  const mm = String(firstDayPreviousMonth.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JS
  const dd = String(firstDayPreviousMonth.getDate()).padStart(2, "0");
  const yyyy = firstDayPreviousMonth.getFullYear();
  var retVal = mm + "/" + dd + "/" + yyyy;
  return retVal;
}

function getFirstDayOfXMonthsAgo(months) {
  const today = new Date(); // get the current date
  const xMonthsAgo = new Date(today); // create a new date object based on today
  xMonthsAgo.setMonth(today.getMonth() - months); // subtract 3 months from the current date
  xMonthsAgo.setDate(1); // set the date to the first of the month
  return xMonthsAgo;
}

function GetSearchEndDate(snapshotfrequency, SnapshotStartDate, increment) {
  if (snapshotfrequency == "daily") {
    const nextDayDate = new Date(SnapshotStartDate);
    nextDayDate.setDate(nextDayDate.getDate() + increment);
    return nextDayDate;
  } else {
    var endMonthDate = getLastDayOfMonth(
      new Date(SnapshotStartDate.getFullYear(), SnapshotStartDate.getMonth() + increment)
    );
    return endMonthDate;
  }
}

function isEndDateValid(snapshotfrequency,endDate) {
  if (snapshotfrequency == "daily") {
    return Date.now() >= endDate;
  } else {
    return getLastDayOfMonth(Date.now()) >= getLastDayOfMonth(endDate);
  }
}

function getLastDayOfMonth(date) {
  var currentDate = new Date(date);
  var lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  return lastDayOfMonth;
}

function GetSegmentKey(endDate) {
  const mm = String(endDate.getMonth() + 1).padStart(2, "0");
  const dd = String(endDate.getDate()).padStart(2, "0");
  const yyyy = endDate.getFullYear();
  return mm + "/" + dd + "/" + yyyy;
}

var getSavedSnapshots = function () {
  var snapshots = [
    {
      name: "Opportunity Snapshot",
      objectname: "Opportunity",
      fields: "Id,AccountId,CloseDate,Amount,StageName,Type,CreatedDate,LastModifiedDate",
      duration: "monthly",
      numberofsnapshots: 12,
      datefield: "rangeLatestModifiedAt",
      tabname: "Opportunity_Data",
      systemfields: false,
      graxdescription: "12 Month Opportunity Snapshot Report.<BR/> Filtering OUT \"Closed Lost\" AND \"Closed Won\" Opportunities",
      graxfilter: {
        mode: "and",
        fields: [
          {
            field: "StageName",
            filterType: "eq",
            not: true,
            value: "Closed Lost",
          },
          {
            field: "StageName",
            filterType: "eq",
            not: true,
            value: "Closed Won",
          },
        ],
      },
    },
    {
      name: "Case Snapshot",
      objectname: "Case",
      fields: "Id,AccountId,Status,Type",
      duration: "monthly",
      numberofsnapshots: 12,
      datefield: "rangeLatestModifiedAt",
      graxfilter: null,
      systemfields: false,
      tabname: "Case_Data",
      graxdescription: ""
    },
    {
      name: "Lead Snapshot",
      objectname: "Lead",
      fields: "Id,Status,Type,Company,ConvertedDate,IsConverted",
      duration: "monthly",
      numberofsnapshots: 12,
      datefield: "rangeLatestModifiedAt",
      graxfilter: null,
      systemfields: false,
      tabname: "Lead_Data",
      graxdescription: ""
    },
  ];
  return snapshots;
}
exports.getSavedSnapshots = getSavedSnapshots;
