const React = require('react');
import PropTypes from 'prop-types';

class SignInButton extends React.Component {
    static propTypes = {
        toggleSignInPage: PropTypes.func,
        authenticated: PropTypes.bool,
    };

    render() {
        const { authenticated } = this.props;
        return (
            <div>
                {authenticated ? (
                    <a href="http://localhost:8080/auth/logout">Logout</a>
                ) : (
                    <a href="http://localhost:8080/auth/google">Login</a>
                )}
            </div>
        );
    }
}

export default SignInButton;
