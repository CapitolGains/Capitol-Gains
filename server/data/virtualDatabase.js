const { MongoClient } = require('mongodb');
const _ = import('lodash');

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
    // determine request type

    // sample/depreciated data request using hardcoded json
    if (dataSlug.requestType == "uniqueCongress") {
        return getPoliticians();
    } else if (dataSlug.requestType == "congressById") {
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
    CORE DATA REQUESTS: requests that go directly to specific databases/API calls
*/

// DESCRIPTION: takes a mongodb call
// PROTOTYPE:
async function getMongoRequest(dataSlug) {
}

// DESCRIPTION: takes an API call to ProPublica API
// PROTOTYPE:
async function getProPublicaRequest(dataSlug) {
}

// DESCRIPTION: takes an API call to Polygon.io
// PROTOTYPE:
async function getPolygon(dataSlug) {
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