import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "/Users/anthonyovalles/Documents/Programming/react-jobly/frontend/src/general/Alert.js";

function SignupForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastname: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    /** handle form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    /** Update form fields */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
                <div className="card">
                    <div className="card=body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                /> 
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                /> 
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                /> 
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }

                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                                onSubmit={handleSubmit}
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignupForm;