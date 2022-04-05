import { useParams } from "react-router-dom";
import { getPolitician } from "../data/politicians";

// individual politician page

export default function Politician() {
  // get the routing/path params, data from URL
  let params = useParams();

  // REPLACE WITH MONGODB CALL
  // get the json object with the unique politician data based on politicianId
  let politician = getPolitician(parseInt(params.politicianId, 10));

  return (
    <div>
      <h2>{politician.name}</h2>
      <p>State: {politician.state}</p>
    </div>
  );
}