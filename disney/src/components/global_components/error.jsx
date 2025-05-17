function ErrorComp(error) {
    return (
        <div>
            <p>Error occured. go back to<Link to="/registration">Registration</Link>.</p>
            <p><em>{error}</em></p>
        </div>
    );
}

export default ErrorComp;