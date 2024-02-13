import React, { useState, useEffect } from "react";
import SearchForm from "../general/SearchForm";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../general/LoadingSpinner";

/** List of jobs */

function JobList() {
    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        search();
    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if(!jobs) return <LoadingSpinner />;

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {jobs.length
                ? <JobCardList jobs={jobs} />
            : <p className="Reply">Sorry, your search returned no results.</p>
            }
        </div>
    )
}


export default JobList;