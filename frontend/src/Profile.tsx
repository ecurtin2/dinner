import React, { useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { loginUser } from "./Api";

const responseGoogle = (response: any) => {
// (response: GoogleLoginResponse | GoogleLoginResponseOffline) but i couldnt figure out dispatch
   loginUser(response.googleId, response.accessToken, response.tokenId);
}

export function LoginPage(onSuccess: any, onFailure: any) {
    return (
    <div>
        <h1 className="text-2xl pb-4 pt-8">Login</h1>
        <GoogleLogin
            clientId="1010505830381-o68hji1deqpeh75nap2bb81o9vctbii2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>
    )
}


function ProfilePage() {
    return <h1 className="text-2xl pb-4 pt-8">Profile</h1>;
}

export function LoginOrProfilePage() {
    const [loggedIn, setLogged] = useState(false);
    let loginCallback = (response: any): void => {responseGoogle(response); setLogged(true)};

    if (loggedIn) {
        return ProfilePage();
    } else {
        return LoginPage(loginCallback, loginCallback);
    }
}