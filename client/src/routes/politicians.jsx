import { Link } from "react-router-dom";
import { getPoliticians } from "../data/politicians";

// page with the list of politicians

export default function Politicians() {
  // REPLACE WITH MONGODB CALL
  // get all politicians data object
  let politicians = getPoliticians();

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