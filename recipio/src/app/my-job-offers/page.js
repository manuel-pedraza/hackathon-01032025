import Image from "next/image";
import JobCard from "../components/JobCard";
import AddJobButton from "../components/AddJobButton";
import jobTypes from "../../enums/jobTypes";
import jobStatus from "../../enums/jobStatus";
import jobWorkType from "../../enums/jobWorkTypes";

let jobs = [];

for (let index = 0; index < 10; index++) {
    jobs.push({
        id: index,
        name: "Job Name " + index,
        company: "Generic Long Company Name",
        description: "Very VeryVeryVeryVeryVeryVeryVery Very Very Very Very Very  Very Very Very Very Very Very Very Very Very Very Very Very Very long description",
        requirements: ["Technologies", "C++", "Java", "Python", "React", "NodeJS", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git", "Jenkins", "CI/CD", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 
        nextInterviewDate: "01 Jan 2024 13:00",
        jobType: jobTypes.FULL_TIME,
        workType: jobWorkType.REMOTE,
        status: jobStatus.ACCEPTED,
    });
}

export default async function myJobOffers() {

    return (
        <div className="my-job-offers-container"
            style={{display: "flex", alignItems: "center", height: "90vh", flexDirection: "column"}}
        >
            <div className="my-job-offers-header" style={{margin: "16px", display: "flex", alignItems: "center"}}>
                <h1 style={{display: "inline-block"}}>My Job Offers</h1>
                <AddJobButton linkTo={"/my-job-offers/add/"} />
               
            </div>
            <div className="job-cards-container" 
                style={{
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center", 
                    maxHeight: "85vh",
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
