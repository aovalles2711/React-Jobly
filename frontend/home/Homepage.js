import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

function Homepage() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <p className="main">"Welcome to Jobly!</p>
                {currentUser 
                    ? <h2> 
                        Welcome Back!, {currentUser.firstName || currentUser.username}!</h2>
                        : (
                            <p> <Link className="bt btn-primary font-weight-bold mr-3" to="/login">
                                Log In
                            </Link>
                            <Link className="btn btn-primary font-weight-bold" to="/signup">
                                Sign Up</Link>
                            </p>
                        )}
            </div>
        </div>
    );
}


export default Homepage;
