import React, { useContext, useState } from 'react';
import "./JobCard.css";
import UserContext from "../auth/UserContext";

/** Display information about a specific job. */

function JobCard({ id, title, salary, equity, companyName }) {
    const { hasApplied, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    React.useEffect(function updateAppliedStatus() {
        setApplied(hasApplied(id));
    }, [id, hasApplied]);

    /* Apply for job */
    async function handleApply(evt) {
        if (hasApplied(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="JobCard card"> {applied}
            <div className='card-body'>
                <h6 className='card-title'>{title}</h6>
                <p>{companyName}</p>
                {salary && <div>Salary: {formatSalary(salary)}</div>}
                {equity !== undefined && <div>Equity: {equity}</div>}
                <button className='btn btn-danger font-weight-bold text-uppercase float-right'
                onClick={handleApply}
                disabled={applied}
                >
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    );
}


/** Render salary in integers */

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i]);
        if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
}


export default JobCard;
