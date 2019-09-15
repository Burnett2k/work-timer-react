import './App.css';
import SignInImage from '../images/google_sign_in.png';

const React = require('react');

class SignInPage extends React.Component {
    render() {
        return (
            <input
                type="image"
                src={SignInImage}
                alt="Sign in with Google"
            ></input>
        );
    }
}

export default SignInPage;
