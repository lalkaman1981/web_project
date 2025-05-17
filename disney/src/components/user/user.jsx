import Header from "../global_components/header.jsx"

function Profile() {
    const location = useLocation();
    const { email = "", password = "" } = location.state || {};

    const handleLink = (link) => {
        navigate(link, {
            state: { email, password }
        });
    };

    return (
        <div>
            <Header password={password} email={email} />
            <div>
                <button>

                </button>
                <div>
                    Log out
                </div>
                <div>
                    Delete account
                </div>
                <div>
                    About us
                </div>
            </div>

        </div>
    );
}

export default Profile;