import React from 'react';
import { Link } from 'react-router-dom';
import "./CompanyCard.css"

function CompanyCard(company) {
    const { handle, name, logoUrl, description } = company.company;

    return (
        <Link classname="CompanyCard card" to={`/companies/${handle}`}>
            <div className='card-body'>
                <h6 className='card-title'>
                    {name}
                    {logoUrl && <img src={logoUrl}
                                alt={name}
                                className='float-right ml-5' />}
                </h6>
                <p>{description}</p>
            </div>
        </Link>
    );
}


export default CompanyCard;
