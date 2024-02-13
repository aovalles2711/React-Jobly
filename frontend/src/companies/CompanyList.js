import React, { useState, useEffect } from 'react';
import SearchForm from '../general/SearchForm.js';
import JoblyApi from '../api.js';
import CompanyCard from './CompanyCard.js';
import LoadingSpinner from '../general/LoadingSpinner.js';

/** Show page with list of companies */

function CompanyList() {
    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        SearchForm();
    }, []);

    /** Page reloads once search from is submitted */
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingSpinner />;

    return (
        <div className='CompanyList col-md-8 offset-md-2'>
            <SearchForm searchFor={search} />
            {companies.length ? (
                <div className='CompanyList-list'>
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            logoUrl={c.logoUrl}
                        />
                    ))}
                </div>
            ) : (
                <p className="Reply">Sorry, your search returned no results.</p>
            )}
        </div>
    );
}


export default CompanyList;