import PropTypes from 'prop-types';
const React = require('react');

class SignInButton extends React.Component {
    static propTypes = {
        handleNotAuthenticated: PropTypes.func,
        authenticated: PropTypes.bool,
    };

    render() {
        const { authenticated } = this.props;
        return (
            <div>
                {authenticated ? (
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={this.handleLogoutClick}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={this.handleSignInClick}
                    >
                        Login
                    </button>
                )}
            </div>
        );
    }

    handleSignInClick = () => {
        window.open(
            `${process.env.REACT_APP_SERVER_BASE_URL}/auth/google`,
            '_self'
        );
    };

    handleLogoutClick = () => {
        window.open(
            `${process.env.REACT_APP_SERVER_BASE_URL}/auth/logout`,
            '_self'
        );
        this.props.handleNotAuthenticated();
    };
}

export default SignInButton;
