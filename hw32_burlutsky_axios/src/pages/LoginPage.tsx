import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("johnd");
    const [password, setPassword] = useState("m38rmF$");
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(username, password);
            if (!remember) localStorage.removeItem("token");
            navigate("/products");
        } catch {
            setError("Login failed. Check username/password.");
        } finally {
            setLoading(false);
        }
    };

    const onCancel = () => {
        setUsername("");
        setPassword("");
        navigate("/login");
    };

    return (
        <>
            <h2 style={{margin: "16px"}}>Login Form</h2>

            <form onSubmit={onSubmit} className="form-card">
                <div className="imgcontainer">
                    <img src="/images/img_avatar2.png" alt="Avatar" className="avatar"/>
                </div>

                <div className="container">
                    <label htmlFor="username"><b>Username</b></label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <label htmlFor="password"><b>Password</b></label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="bottom-row">
                        <div className="remember">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <span className="psw">
              Forgot <a href="#">password?</a>
            </span>
                    </div>

                    ...
                    {error && (
                        <div style={{color: "crimson", marginTop: 10}}>{error}</div>
                    )}

                    <div style={{fontSize: 12, opacity: 0.7, marginTop: 12}}>
                        Demo creds: <b>johnd / m38rmF$</b> или <b>mor_2314 / 83r5^_</b>
                    </div>
                    ...

                </div>

                <div className="container">
                    <button type="button" className="cancelbtn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}
