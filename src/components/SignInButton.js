const React = require('react');
import PropTypes from 'prop-types';

class SignInButton extends React.Component {
    static propTypes = { toggleSignInPage: PropTypes.func };

    render() {
        return (
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.props.toggleSignInPage}
            >
                <i
                    className="fa fa-user-circle d-block d-md-none"
                    aria-hidden="true"
                />
                <span className="d-none d-md-block d-lg-block d-xl-block">
                    Sign In
                </span>
            </button>
        );
    }
}

export default SignInButton;
