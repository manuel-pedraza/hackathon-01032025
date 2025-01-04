import Image from "next/image";
import JobCard from "../components/JobCard";
import AddJobButton from "../components/AddJobButton";

let jobs = [];

for (let index = 0; index < 10; index++) {
    jobs.push({
        id: index,
        name: "Job Name",
        company: "Company",
        description: "Description",
        technologies: "Technologies",
        jobType: "Job Type",
        workType: "Work Type",
        nextInterviewDate: "Next Interview Date",
        status: "Status",
    });
}

export default async function myJobOffers() {

    return (
        <div className="my-job-offers-container"
            style={{display: "flex", alignItems: "center", height: "90vh", flexDirection: "column"}}
        >
            <div className="my-job-offers-header" style={{margin: "16px", display: "flex", alignItems: "center"}}>
                <h1 style={{display: "inline-block"}}>My Job Offers</h1>
                <AddJobButton />
               
            </div>
            <div className="job-cards-container" 
                style={{
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center", 
                    maxHeight: "75vh",
                    flexWrap: "wrap",
                    justifyContent: "center", 
                    overflowY: "auto"
                }}
            >
                {jobs.map((job, index) => <JobCard key={`job-${index}`} job={job} />)}
            </div>
        </div>
    );
}
