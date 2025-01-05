import Job from '../../classes/Job'
import React from 'react'
import jobStatus from '../../enums/jobStatus';
import Link from 'next/link';

export default function JobCard({ job }) {

    function getColorByStatus(status) {
        switch (status) {
            case jobStatus.ON_GOING:
                return "#f0ad4e";
            case jobStatus.ACCEPTED:
                return "#5cb85c";
            case jobStatus.REFUSED:
                return "#d9534f";
            default:
                return "#444";
        }
    }

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{job.name}</h2>
                    <h4 className="job-card-span" style={{ backgroundColor: getColorByStatus(job.status) }}>{job.status}</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <p>{job.company}</p>
                        <h6>{`Interview Date: ${job.nextInterviewDate === "" ? "None" : job.nextInterviewDate}`}</h6>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "column" }}>
                        <p className="job-card-span-small">{job.workType}</p>
                        <p className="job-card-span-small">{job.jobType}</p>
                    </div>
                </div>
            </div>
            <div className="job-card-body" style={{ fontSize: "0.9em" }}>
                <p className='job-card-description'>{job.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflowY: "hidden", maxHeight: "3.4rem", minHeight: "3.4rem" }}>
                    {job.requirements?.length > 0 ? 
                    job.requirements.map((r, index) =>
                        <p key={`requirement-${index}`} className="job-card-span-small" style={{ margin: "0.1rem", paddingTop: "0.15rem", backgroundColor: "#329ea8" }}>
                            {r}
                        </p>
                    )
                        :
                        <p key={`requirement-none`} className="job-card-span-small" style={{ margin: "0.1rem", paddingTop: "0.15rem", backgroundColor: "#329ea8" }}>
                            No requirements
                        </p>
                    }
                </div>
            </div>
            <div display="flex" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Link href={`/my-job-offers/edit/${job._id}`} className="btn-job-card edit">Edit</Link>
                <Link href={`/my-job-offers/${job._id}`} className="btn-job-card remove">Remove</Link>
            </div>


        </div>
    )
}

