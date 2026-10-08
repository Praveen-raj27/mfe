import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to MFE Application</h1>

      <p>Select an application:</p>

      <Link to="/products">
        <button>Products</button>
      </Link>

    </div>
  );
}