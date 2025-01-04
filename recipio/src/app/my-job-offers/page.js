import Image from "next/image";
import JobCard from "../components/JobCard";
import AddJobButton from "../components/AddJobButton";
import { getJobOffers } from "../../controllers/jobOffersController";
import jobTypes from "../../enums/jobTypes";
import jobStatus from "../../enums/jobStatus";
import jobWorkType from "../../enums/jobWorkTypes";
import { getUserFromCookie } from "../../utils/cookie";



export default async function myJobOffers() {

    const user = await getUserFromCookie();
    let jobs = [];

    if (!user) {
        redirect("/");
    }else {
        jobs = await getJobOffers();
        console.log("PJOBS", jobs);
        
    }

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
                {jobs.length > 0 ? jobs.map((job, index) => <JobCard key={`job-${index}`} job={job} />) : <></>}
            </div>
        </div>
    );
}
