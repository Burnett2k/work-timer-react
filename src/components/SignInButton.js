const React = require('react');
import PropTypes from 'prop-types';

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
                        href="http://localhost:8080/auth/logout"
                        onClick={this.handleLogoutClick}
                    >
                        Logout
                    </button>
                ) : (
                    <button onClick={this.handleSignInClick}>Login</button>
                )}
            </div>
        );
    }

    handleSignInClick = () => {
        window.open('http://localhost:8080/auth/google', '_self');
    };

    handleLogoutClick = () => {
        window.open('http://localhost:8080/auth/logout', '_self');
        this.props.handleNotAuthenticated();
    };
}

export default SignInButton;
