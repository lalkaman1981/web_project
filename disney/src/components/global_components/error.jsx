import { Link } from 'react-router-dom';

export function ErrorComp({ error }) {
    return (
        <div style={{ padding: '1rem', textAlign: 'center', color: "white"}}>
            <p>Error occurred. Go back to <Link to="/login">Login</Link>.</p>
            <p><em>{error}</em></p>
        </div>
    );
}

export default ErrorComp;