import "./LoginForm.css";

const LoginForm = () => {
    return (
        <form className="login-form">
            <h2 className="login-title">Iniciar sesión</h2>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Ingresá tu email" />
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Ingresá tu contraseña"
                />
            </div>

            <button type="submit" className="login-button">
                Entrar
            </button>
        </form>
    );
};

export default LoginForm;
