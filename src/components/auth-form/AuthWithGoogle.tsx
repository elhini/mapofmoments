'use client';

import React from 'react';

import './auth-with-google.css';

export const AuthWithGoogle = () => (
    <>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta
            name="google-signin-client_id"
            content="866807611590-uurgiioausauk1t3lftf04cvjo6ed4pe.apps.googleusercontent.com"
        />
        <div className="g-signin2 mt-4 w-full" data-onsuccess="onSignIn"></div>
    </>
);
