import { useParams } from "react-router-dom";
import { getPolitician } from "../data/politicians";

export default function Politician() {
  let params = useParams();

  // REPLACE WITH MONGODB CALL
  let politician = getPolitician(parseInt(params.politicianId, 10));

  return (
    <div>
      <h2>{politician.name}</h2>
      <p>State: {politician.state}</p>
    </div>
  );
}