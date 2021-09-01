import React from "react";
import './App.scss';

function AppLogin() {
    return <div id="app-login">
        <a id="app-login-button" href="https://discord.com/api/oauth2/authorize?client_id=775882249597616158&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20guilds">Login with Discord</a>
    </div>;
}

function AppLoading() {

    return <div id="app-loading">
        Loading...
    </div>
}

export { AppLogin, AppLoading };
