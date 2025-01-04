import jobTypes from "../enums/jobTypes";
import jobWorkType from "../enums/jobWorkTypes";

export default class Job{


    baseJob(){
        new Job({
            id: 0,
            name: "",
            company: "",
            description: "",
            technologies: "",
            jobType: jobTypes.FULL_TIME,
            workType: jobWorkType.REMOTE,
            nextInterviewDate: "",
            status: JobStatus.PENDING,
        });
    }

    constructor({
        id = 0,
        name = "",
        company = "",
        description = "",
        technologies = "",
        jobType = JobTypes.FULL_TIME,
        workType = JobWorkType.REMOTE,
        nextInterviewDate = "",
        status = JobStatus.PENDING,

    }){
        this.id = id;
        this.name = name;
        this.company = company;
        this.nextInterviewDate = nextInterviewDate;
        this.description = description;
        this.technologies = technologies;
        this.jobType = jobType;
        this.workType = workType;
        this.status = status;
    }

}