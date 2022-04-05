import { Link } from "react-router-dom";
import { getPoliticians } from "../data/politicians";

export default function Politicians() {
  // replace this call with the mongodb call
  let politicians = getPoliticians();

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