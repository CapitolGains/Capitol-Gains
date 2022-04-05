import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPoliticians } from "../data/politicians";

// page with the list of politicians

export default function Politicians() {
  // REPLACE WITH MONGODB CALL
  // get all politicians data object
  let politicians = getPoliticians();

  // React function to handle data requests
  useEffect(() => {
    // function to call API and get unique politician list
    async function getPoliticiansUnique() {
      // build data slug for API request
      const dataSlugMongoTest = {
        requestType: "uniqueCongress",
        requestData: {
        }
      }

      // build options for API request
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataSlugMongoTest)
      }

      // fetch request to server API
      console.log("Sending api request...");
      console.log(dataSlugMongoTest);
      // const response = await fetch('http://localhost:5000/apiTEST', options);
      // console.log(response.message);
    }

    // call async function to get data
    getPoliticiansUnique();
  });

  // generate a link for every politician on data object
  return (
    <div>
      <nav>
        {politicians.map((politician) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/politician/${politician.id}`}
            key={politician.id}
          >
            {politician.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}