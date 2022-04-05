import { Outlet, Link } from 'react-router-dom';

// just a temporary navbar for now
export default function App() {
  return (
    <div>
      <Link to="/home">home</Link> |{" "}
      <Link to="/politicians">politicians</Link> |{" "}
      <Link to="/about">about</Link>
      <Outlet />
    </div>
  );
}