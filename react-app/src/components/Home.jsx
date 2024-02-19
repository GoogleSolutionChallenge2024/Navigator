import React from 'react';
import GoogleLoginButton from './GoogleLoginBtn';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Navigator!</h1>
      <div id="g_id_onload" data-client_id="194913910245-tgqsbvjnh7nvaksfaabank3j4fq4fj15.apps.googleusercontent.com"
        data-login_uri="http://localhost:5173/survey" data-auto_prompt="false">
      </div>
      <div class="g_id_signin" data-type="standard" data size="large"
        data-theme="filled_black" data-text="continue_with" data-shape="pill" data-logo_alignment="left">
      </div>
      <GoogleLoginButton/>
    </div>
  );
};

export default Home;
