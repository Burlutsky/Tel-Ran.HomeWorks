import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
    const { token, logout } = useAuth();

    return (
        <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
            {!token ? (
                <Link to="/login">Login</Link>
            ) : (
                <>
                    <Link to="/products">Show Products</Link>
                    <button onClick={logout} style={{ marginLeft: "auto" }}>Logout</button>
                </>
            )}
        </nav>
    );
}
