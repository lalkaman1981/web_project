function ErrorComp(error) {
    return (
        <div>
            <p>Error occured. go back to<Link to="/">Home</Link>.</p>
            <p><em>{error}</em></p>
        </div>
    );
}

export default ErrorComp;