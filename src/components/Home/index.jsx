import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import links from 'data/links';
import Cookies from 'js-cookie';
import firebase from "firebase";
import { useHistory } from 'react-router';
const SignIn = () => {

    const history = useHistory();

    let [isLogin, setIsLogin] = useState(0);
    let [loginData, setLoginData] = useState();
    let [error, setError] = useState();
    const onChangeData = (fieldType, e) => {
        e.persist();
        setLoginData(userData => ({ ...userData, [fieldType]: e.target.value }));
    }


    const confirmLogin = (e) => {
        e.preventDefault();
        setError('');
        if (isLogin === 1) {
            firebase.auth().createUserWithEmailAndPassword(loginData.email, loginData.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // ...
                    Cookies.set('email', userCredential.user.uid);
                    history.push("/dashboard");
                })
                .catch((error) => {
                    setError(error.message)
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
        }
        else {
            firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    Cookies.set('email', userCredential.user.uid);
                    history.push("/dashboard");
                })
                .catch((error) => {
                    setError(error.message)
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center signin-outer">
            <div className="card ml-md-4">
                <div className="card-header bg-dark">
                    {isLogin === 0 ?
                        <h3>Sign In</h3> :
                        <h3>Sign Up</h3>
                    }
                </div>
                <h6 className="text-danger text-center mx-auto font-weight-bold mt-2">{error}</h6>
                <div className="card-body mt-2">
                    <form onSubmit={(e) => confirmLogin(e)}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark"><FontAwesomeIcon size="1x" className="cursor-pointer ml-2 mr-2 text-white" icon={faUser} /></span>
                            </div>
                            <input type="text" onChange={e => onChangeData("email", e)} className="form-control" placeholder="Email" />

                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark"><FontAwesomeIcon size="1x" className="cursor-pointer ml-2 mr-2 text-white" icon={faKey} /></span>
                            </div>
                            <input type="password" onChange={e => onChangeData("password", e)} className="form-control" placeholder="Password" />
                        </div>
                        {isLogin === 0 ?
                            <div className="row align-items-center ml-2 remember">
                                Do Not Have a Account? <strong onClick={() => setIsLogin(1)} className="text-white font-weight-bold cursor-pointer btn btn-white">Sign Up</strong>
                            </div> :
                            <div className="row align-items-center ml-2 remember">
                                Already Have An Account? <strong onClick={() => setIsLogin(0)} className="text-white  font-weight-bold cursor-pointer btn">Sign In</strong>
                            </div>

                        }

                        <div className="form-group mt-4">
                            {isLogin === 0 ?
                                <input type="submit" className="btn float-right login_btn bg-dark text-white" value="Sign In" /> :
                                <input type="submit" className="btn float-right login_btn bg-dark text-white" value="Sign Up" />
                            }
                        </div>
                    </form>
                </div>
                <div className="card-footer">

                </div>
            </div>
        </div>
    )
};

export default SignIn;