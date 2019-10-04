import './App.css';
import SignInImage from '../images/google_sign_in.png';

const React = require('react');

class SignInPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <input
                    type="image"
                    src={SignInImage}
                    alt="Sign in with Google"
                ></input>
                <a href="http://localhost:8080/auth/google">Sign in</a>
            </React.Fragment>
        );
    }
}

export default SignInPage;
