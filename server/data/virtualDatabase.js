const { MongoClient } = require('mongodb');
const _ = import('lodash');
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

// public functions
module.exports = {
    // DESCRIPTION: main public function that gets sent a data request and returns a json variable
    // PROTOTYPE: sent a json w/ type of request and any data needed to make request
    getData: async function (dataSlug) {
        const data = await getDataVirtualDatabase(dataSlug);
        return data;
    }
}

// private functions

/*
    dataSlug JSON prototype:
    {
        requestType: "",
        requestData: {
        }
    }

    RequestTypes:
        Virtual Data Requests: requests that are combinatorial calls or built data object calls
            requestType:
            requestData:

        Core Data Requests: requests that go directly to specific databases/API calls
            requestType: mongo
            requestData:

            requestType: propublica
            requestData:

            requestType: polygon
            requestData:
*/

/*
    MAIN DATA REQUESTS: highest level virtual database call
*/


// DESCRIPTION: determines request type and routes appropriately, there should be no data processing in this function
// PROTOTYPE: input dataSlug, return data object
async function getDataVirtualDatabase(dataSlug) {
    // if statements to determine request type
    if (dataSlug.requestType == "uniqueCongress") { // this request will return a list of uniqueCongress members containing first and last names
        return await uniqueCongress();
    } else if (dataSlug.requestType == "politicianById") {
        return getPolitician(dataSlug.requestData.id);
    } else if (dataSlug.requestType == "testMongo") {
        return await getSenatorByLast(dataSlug.requestData.congressLastName);
    } else if (dataSlug.requestType == "testRequest") {
        return {
            test: "response1"
        }
    }
}

/*
    VIRTUAL DATA REQUESTS: requests that are combinatorial calls or built data object calls
*/

/*
DESCRIPTION:
Async function, uniqueCongress, that returns an array of JSON objects which contains unique list of ids and mappings of unique senators 
and represenatives names. This function will make a call to the core mongoDB request function which will return the senate and house stock
watcher collections data in the mongoDB. The collections data is the "all_transactions" JSON file from the senate/house stock watcher API.
The collections data will then be givien to another function to extract the neccessary data that is wanted. Once having the unique names from
both collections, the names will be put into a single array of JSONs and will be sorted by the politician's first names. Afterwards, the names
will be id'ed and mapped into another array of JSONs which is returned for our request.
An example JSON object in the array is provided below:
    {
        id: "id_number",
        mapping: {
            firstNameStockWatcher: "politician_firstname",
            lastNameStockWatcher: "politician_lastname"
        }
    }
*/
async function uniqueCongress() {
    const uri = "mongodb://localhost:27017";  // initialize uri with local mongoDB; this uri value will be replaced and initialized to our online mongoDB
    const client = new MongoClient(uri);  // initialize the client using the uri

    try {
        console.log("Connecting...");
        await client.connect();  // connect to the mongoDB cluster

        mongoRequest = await getMongoRequest(client);  // accessing the client, returns the senate and house stock watcher collections
        senateCollection = mongoRequest[0];
        houseColleciton = mongoRequest[1];

        var uniqueSenateNames = await getSenateStockWatcher(senateCollection);  // accessing the collection, returns a unique list of senator names
        var uniqueHouseNames = await getHouseStockWatcher(houseColleciton);  // accessing the collection, returns a unique list of represenative names

        var uniqueCongressNames = [];  // empty array that will contain JSON objects containing just the unique first and last names
        uniqueSenateNames.forEach(senatorName => {  // pushes each unique senator name into the array for all congress member names
            uniqueCongressNames.push(senatorName);
        })

        uniqueHouseNames.forEach(represenativeName => {  // pushes each unique represenative name into the array for all congress member names
            uniqueCongressNames.push(represenativeName);
        })

        uniqueCongressNames = uniqueCongressNames.sort(function (object1, object2) {  // sort the congress member names array by first names
            return object1.firstNameStockWatcher.localeCompare(object2.firstNameStockWatcher);
        });

        var uniqueCongress = [];  // empty array that will contain JSON objects containing unique ids and mapping to the unique names
        var id_count = 0;  // id count is initialized to 0, will be use to id the politicians in a forEach loop
        uniqueCongressNames.forEach(uniqueName => {  // creating our desired array of JSON objects of ids and mapping to unique first and last names
            var jsonData = {}
            id = id_count;
            mapping = uniqueName;

            jsonData = {id, mapping};
            uniqueCongress.push(jsonData);
            id_count++;
        })
    } catch (e) {
        console.error(e);  // will console log an error message if an error occurs
    } finally {
        await client.close();  // closes connection to mongoDB cluster
    }

    return uniqueCongress;
}

/*
    SUB CALLS FOR uniqueCongress REQUEST
*/

/*
DESCRIPTION:
Async function, getSenateStockWatcher, returns an array of JSON objects that will contain a unique list of senate member names.
This function accesses the senate stock watcher collection which contains the senate stock watcher "all_transactions" JSON file and then
uses the distinct method on "senator" to get the distinct names. The names are then split up using split function and everything before
the last index will be the labeled as the first name while the last index will be labeled as the last name. After going through each 
unique senator, the uniqueSenate list will be returned.
*/
async function getSenateStockWatcher(senateCollection) {
    var uniqueSenateNames = [];
    var uniqueSenateFullNames = await senateCollection.distinct("senator");  // grabs all unique senator names

    uniqueSenateFullNames.forEach(senatorName => {
        var jsonData = {};
        var firstName = "firstNameStockWatcher";
        var lastName = "lastNameStockWatcher";
        nameArr = senatorName.split(" ");  // split up the full senator name so that the name can be separated into first and last names

        if (nameArr.length == 2) {  // if the full senator name only contains 2 names
            jsonData[firstName] = nameArr[0];  // this index will be the first name
            jsonData[lastName] = nameArr[1];  // this index will be the last name
            uniqueSenateNames.push(jsonData);
        } else if (nameArr.length == 3) {  // if the full senator name contains 3 names
            jsonData[firstName] = nameArr[0] + " " + nameArr[1];
            jsonData[lastName] = nameArr[2];
            uniqueSenateNames.push(jsonData);
        } else if (nameArr.length == 4) {  // if the full senator name contains 4 names
            jsonData[firstName] = nameArr[0] + " " + nameArr[1] + " " + nameArr[2];
            jsonData[lastName] = nameArr[3];
            uniqueSenateNames.push(jsonData);
        } else if (nameArr.length == 5) {  // if the full senator name contains 5 names
            jsonData[firstName] = nameArr[0] + " " + nameArr[1] + " " + nameArr[2] + " " + nameArr[3];
            jsonData[lastName] = nameArr[4];
            uniqueSenateNames.push(jsonData);
        }
    })

    return uniqueSenateNames;
}

/*
DESCRIPTION:
Async function, getHouseStockWatcher, returns an array of JSON objects that will contain a unique list of house member names.
This function accesses the house stock watcher collection which contains the senate stock watcher "all_transactions" JSON file 
and then uses the distinct method on "representative" to get the distinct names. The names are then split up using split function 
and everything before the last index and after the first index will be the labeled as the first name while the last index will be 
labeled as the last name. The first index is skipped because the first index contains the politician's prefix name. After going through 
each unique represenative, the uniqueSenate list will be returned.
*/
async function getHouseStockWatcher(houseCollection) {
    var uniqueHouseNames = [];
    var uniqueHouseFullNames = await houseCollection.distinct("representative");  // grabs all unique representative names

    uniqueHouseFullNames.forEach(represenativeName => {
        var jsonData = {};
        var firstName = "firstNameStockWatcher";
        var lastName = "lastNameStockWatcher";
        nameArr = represenativeName.split(" ");    // split up the full representative name so that the name can be separated into first and last names

        /*
        NOTE: 
        This if statement section differs from the senate version and starts at name lengths of 3 due to having prefix names included.
        nameArr[0] is not used because we do not want to include the politician's prefix into the first name.
        */
        if (nameArr.length == 3) {  // if the full represenative name only contains 3 names
            jsonData[firstName] = nameArr[1];  // this index will be the first name
            jsonData[lastName] = nameArr[2];  // this index will be the last name
            uniqueHouseNames.push(jsonData);
        } else if (nameArr.length == 4) {  // if the full represenative name only contains 4 names
            jsonData[firstName] = nameArr[1] + " " + nameArr[2];
            jsonData[lastName] = nameArr[3];
            uniqueHouseNames.push(jsonData);
        } else if (nameArr.length == 5) {  // if the full represenative name only contains 5 names
            jsonData[firstName] = nameArr[1] + " " + nameArr[2] + " " + nameArr[3];
            jsonData[lastName] = nameArr[4];
            uniqueHouseNames.push(jsonData);
        }
    })

    return uniqueHouseNames;
}

/*
    CORE DATA REQUESTS: requests that will be used constantly to retrieve data from the APIs
*/

/*
DESCRIPTION:
Async function, getMongoRequest, is a core request and returns the collections data in our mongoDB server.
Collections in an array variable.
*/
async function getMongoRequest(client) {
    var mongoRequest = [];
    var senateCollection = await client.db("congressStockWatcher").collection("senateStockWatcher");  // gets senate stock watcher collection data
    var houseCollection = await client.db("congressStockWatcher").collection("houseStockWatcher");  // gets house stock watcher collection data
    mongoRequest.push(senateCollection);
    mongoRequest.push(houseCollection);

    return mongoRequest;  // collection data is returned in an array
}

// DESCRIPTION: takes an API call to ProPublica API and returns a json object containing politician's bio
// PROTOTYPE:


// NOTE: IGNORE PROPUBLICA REQUEST FUNCTIONS FOR NOW. THEY ARE STILL A WORK IN PROGRESS.
/*
async function getProPublicaRequest() {
    var congressMemberData = [];

    // when server starts, grab HouseMemberData and put it into the global variable
    getHouseMemberData().then(data => {
        console.log('Server-side: Grabbing HouseMemberData through ProPublica API call and putting it into a global variable.');
        houseMemberData = data;
        congressMemberData.append(houseMemberData);
        //console.log(congressMemberData);
    })

    // when server starts, grab SenateMemberData and put it into the global variable
    getSenateMemberData().then(data => {
        console.log('Server-side: Grabbing SenateMemberData through ProPublica API call and putting it into a global variable.');
        senateMemberData = data;
        congressMemberData.append(senateMemberData);
        //console.log(congressMemberData);
    })

    console.log("HELLO");
    console.log(congressMemberData);
}
*/

// NOTE TO SELF: MAYBE GET FULL LIST HOUSEMEMBERDATA AND SENATEMEMBERDATA IN THIS REQUEST, THEN MOVE THE TASKS TO THE VIRTUAL DATA REQUESTS LIKE POLITICIAN BIO
/*
async function getProPublicaRequest() {
    if (HouseMemberData && SenateMemberData) {
        var first_name = "Mitch";
        var last_name = "McConnell";

        if (first_name && last_name) {
            console.log("Server-side: Using the provided name to search through the member's list and returning the member's id, if possible.");
            member_id = return_id_both_names(HouseMemberData, SenateMemberData, first_name, last_name);
            
            if (member_id != -1) {
                console.log('Server-side: The name is valid so a member_id exists.')
                console.log('Server-side: Grabbing politician data using member_id through an API call.')
                const PoliticianBio = await getPoliticianBio(member_id);
                //console.log(test_data);

                let test_data = {
                    id: PoliticianBio.id,
                    politician_bio: {
                        FirstName: PoliticianBio.first_name,
                        MiddleName: PoliticianBio.middle_name,
                        LastName: PoliticianBio.last_name,
                        Chamber: PoliticianBio.roles[0].chamber,
                        Party: PoliticianBio.roles[0].party,
                        State: PoliticianBio.roles[0].state,
                        Committees: PoliticianBio.roles[0].committees,
                        Subcommittees: PoliticianBio.roles[0].subcommittees
                    }
                };
                return test_data;
            } else {
                console.log('Server-side: The name is invalid so a member_id does not exist.')
                console.log('Server-side: Sending a failure response back to the client-side\n')
                response.json({
                    status: 'failure',
                });
            }
        } else {
            console.log('Server-side: The name is invalid so a member_id does not exist.')
            console.log('Server-side: Sending a failure response back to the client-side\n')
            response.json({
                status: 'failure',
            });
        }
    }
}
*/

/*
    SUB CALLS FOR PROPUBLICA REQUEST
*/
// async function to fetch house member data from ProPublica
async function getHouseMemberData() {
    const propublica_house_url = "https://api.propublica.org/congress/v1/117/house/members.json";
    const response = await fetch(propublica_house_url, {
        method: "GET",  // gets data
        headers: {
            "X-API-Key": "jADs7ONXmGA9IGnzMDXTA8AH8Fb4WKBYKCuOk0dw"
        }
    })
    const data = await response.json();
    var HouseMemberData = data.results[0].members;

    return HouseMemberData;
}

// async function to fetch senate member data from ProPublica
async function getSenateMemberData() {
    const propublica_senate_url = "https://api.propublica.org/congress/v1/117/senate/members.json";
    const response = await fetch(propublica_senate_url, {
        method: "GET",
        headers: {
            "X-API-Key": "jADs7ONXmGA9IGnzMDXTA8AH8Fb4WKBYKCuOk0dw"
        }
    })
    const data = await response.json();
    var SenateMemberData = data.results[0].members;

    return SenateMemberData;
}

/*
Function that will get the politician's id number in ProPublica by looping through the HouseMemberData
and SenateMemberData and checking if any names match with the provided name from the client.
*/
function return_id_both_names(HouseMemberData, SenateMemberData, first_name, last_name) {
    var member_id;
    for (i=0; i < HouseMemberData.length; i++) {
        if (HouseMemberData[i].first_name == first_name && HouseMemberData[i].last_name == last_name) {
            member_id = HouseMemberData[i].id;

            return member_id;
        }
    }

    for (i=0; i < SenateMemberData.length; i++) {
        if (SenateMemberData[i].first_name == first_name && SenateMemberData[i].last_name == last_name) {
            member_id = SenateMemberData[i].id;

            return member_id;
        }
    }
    
    console.log("Server-side: No match. The inputted name does not exist in the current congress.");
    return -1;
}

/*
Async function that takes the politician's member_id and make another call to the politician's specific json in ProPublica so that
it could return the politician's bio information.
*/
async function getPoliticianBio(member_id) {
    const propublica_politician_bio_url = "https://api.propublica.org/congress/v1/members/" + member_id + ".json";
    const response = await fetch(propublica_politician_bio_url, {
        method: "GET",
        headers: {
            "X-API-Key": "jADs7ONXmGA9IGnzMDXTA8AH8Fb4WKBYKCuOk0dw"
        }
    })
    const data = await response.json();
    PoliticianBio = data.results[0];

    return PoliticianBio;
}

// DESCRIPTION: takes an API call to Polygon.io
// PROTOTYPE:
async function getPolygon() {
}

// DESCRIPTION: function that connects to MongoDB database & returns a client object
// VARS: returns client- a MongoDB connection instance
// IMPORTANT: When storing client in a var, use this format- const client = await connectToDB();
// Caller must use async() => {client.close();}; after they are done with client object to close connection 
async function connectToDB(){
    const dbURI = process.env.DB_CON_STRING;
    const client = new MongoClient(dbURI);

    try{
        await client.connect();
        return client;
    } catch(e) {
        console.log(e);
    }
}

// DESCRIPTION: Pushes data into desired collection in MongoDB, if collection exists then data will be added to it,
// if collection does not exist it will be created and then added to it
// VARS: client- MongoDB connection instance from connectToDB() function | data- JSON object (if array of JSON then 
// loop through array outside of function and pass each object) | dbName- name of database | collectionName- desired name of collection
async function pushToDB(client, data, dbName, collectionName){
    const db = client.db(dbName);
    const collectionArray = await client.db(dbName).listCollections({}, { nameOnly: true }).toArray()

    if(JSON.stringify(collectionArray).includes(collectionName)){
        db.collection(collectionName).insertOne(data, ((err, result) => {
            console.log(err);
        }));
    }else{
        db.createCollection(collectionName);
        db.collection(collectionName).insertOne(data, ((err, result) => {
            console.log(err);
        }));
    }
}
/*
    DEPRECIATED CALLS: phase these out, however good call structure for interim
*/

async function getSenatorByLast(senator) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        console.log("Connecting...");
        await client.connect();
        const data = await findOneListingByName(client, senator);
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("member_sorted").collection("stockwatcher").findOne({ last_name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        // console.log(result);
        return result;
    } else {
        console.log(`No listings found with the name of ${nameOfListing}`);
    }
}

let politicians = [
    {
        name: "Bernie Sanders",
        state: "VT",
        congressType: "Senator",
        party: "D",
        id: 1,
    },
    {
        name: "Mitch McConnell",
        state: "KY",
        congressType: "Senator",
        party: "R",
        id: 2,
    },
    {
        name: "Abraham Lincoln",
        state: "DC",
        congressType: "Representative",
        party: "N",
        id: 3,
    },
];

// return array of json objects of all politiicans
function getPoliticians() {
    return politicians;
}

// return a specific politician id
function getPolitician(id) {
    return politicians.find(
        (politician) => politician.id === id
    );
}

/*
(async() => {
    let variable = await getProPublicaRequest();
    console.log(variable);
})()
*/
