import Job from '../../classes/Job'
import React from 'react'

export default function JobCard({job}) {

    return (
        <div className="job-card"
            style={{
                display: 'flex',
                minHeight: '200px',
                minWidth: '340px',
                flexDirection: 'column',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                margin: '12px'
            }}
        >

            <div className="job-card-header">
                <h3>{job.name}</h3>
                <p>{job.company}</p>   
            </div>

            <div className="job-card-body">
                <p>{job.description}</p>
                <p>{job.technologies}</p>
                <p>{job.jobType}</p>
                <p>{job.workType}</p>
                <p>{job.nextInterviewDate}</p>
                <p>{job.status}</p>
            </div>


        </div>
    )
}

