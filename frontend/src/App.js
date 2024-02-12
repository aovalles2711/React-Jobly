import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Navigation from "./routes/Navigation";
import Routes from "./routes/Routes";
import LoadingSpinner from "./general/LoadingSpinner.css";
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import jwt from "jsonwebtoken";


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly App 
 * 
 * - infoLoaded: has user data been retrieved from API? (manages spinner for "loading...")
 * 
 * - currentUser: user obj from API. This becomes the   canonical way to tell if someone is logged in. This is passed around via context throughout the app.
 * 
 * - token: for logged-in users, this is their authentication JWT. It is required to be set for most API calls. This is initially read from localStorage and synced to there via the useLocalStorage hook.
 * 
 * App -> Routes
 */

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [applicationIds, setApplicationIds] = useState(new Set ([]));
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    // Load user info from API. Until a user is logged in and they have a token, this should not run. It only needs to re-run when a user logs out, so the value of the token is a dependency for this effect.

    useEffect(function loadUserInfo() {
        async function getCurrentUser() {
            if (token) {
                try {
                    let { username } = jwt.decode(token);
                    // place token on API class so it can be used to call API.
                    JoblyApi.token = token;
                    let currentUser = await JoblyApi.getCurrentUser(username);
                    setCurrentUser(currentUser);
                    
                    setApplicationIds(new Set(currentUser.applications));
                } catch (err) {
                    console.error("App loadUserInfo: problem loading", err);
                    setCurrentUser(null);
                }
            }
            setInfoLoaded(true);
        }

        // set infoLoaded to false while async getCurrentUser runs; once the data is fetched, this will be set back to false to control the spinner.

        setInfoLoaded(false);
        getCurrentUser();
    }, [token]);

    /** Site-wide logout */
    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    /** Site-wide signup
     * Automatically logs them in (set token) upon signup.
     */

    async function signup(signupData) {
        try {
            let token = await JoblyApi.signup(signupData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.error("signup failed", errors);
            return { success: false, errors };
        }
    }

    /** Site-wide login */
    async function login(loginData) {
        try {
            let token = await JoblyApi.login(loginData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.error("login failed", errors);
            return { success: false, errors };
        }
    }

    /** Verify if job has been applied to */
    function hasAppliedToJob(id) {
        return applicationIds.has(id);
    }

    /** Apply to a job: make API call and update set of Application IDs */
    function applyToJob(id) {
        if (hasAppliedToJob(id)) return;
        JoblyApi.applyToJob(currentUser.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
    }

    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
                <div className='App'>
                    <Navigation logout={logout} />
                    <Routes login={login} signup={signup} />
                </div>
                </UserContext.Provider>
        </BrowserRouter>
    );
}


export default App;
