import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Link to="/home">home</Link> |{" "}
      <Link to="/politicians">politicians</Link> |{" "}
      <Link to="/politician">politician</Link> |{" "}
      <Link to="/about">about</Link> |{" "}
      <Outlet />
    </div>
  );
}