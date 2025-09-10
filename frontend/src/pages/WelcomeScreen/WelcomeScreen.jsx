// src/pages/WelcomeScreen.jsx
import { useNavigate } from "react-router-dom";
import { WELCOMESCREEN_TEXTS } from "../../constants/Messages";
import "./WelcomeScreen.css";
import aureoLogo from '../../assets/aureo-logo.png';

function WelcomeScreen() {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            
            <img src={aureoLogo} alt="AUREO logo" className="welcome-logo" />

            <h1 className="welcome-title">
                {WELCOMESCREEN_TEXTS.title || "Bienvenidos a AUREO"}
            </h1>
            <h2 className="welcome-subtitle">Tu app de finanzas personales</h2>

            <div className="welcome-buttons">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/register")}
                >
                    Registrarse
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/login")}
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}

export default WelcomeScreen;
