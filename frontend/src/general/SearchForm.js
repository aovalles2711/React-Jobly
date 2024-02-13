import React, { useState } from "react";
import "./SearchForm.css"

function SearchForm({ searchForm }) {
    const [searchTerm, setSearchTerm] = useState("");

    /* Tell parent to filter */
    function handleSubmit(evt) {
        evt.preventDefault();
        searchForm(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    /* Update form field */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter search term"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}


export default SearchForm;