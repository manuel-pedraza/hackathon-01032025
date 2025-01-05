import jobStatus from "../enums/jobStatus";
import jobTypes from "../enums/jobTypes";
import jobWorkType from "../enums/jobWorkTypes";

export default class Job{


    baseJob(){
        new Job({
            name: "",
            company: "",
            description: "",
            requirements: [],
            nextInterviewDate: "",
            jobType: jobTypes.FULL_TIME,
            workType: jobWorkType.REMOTE,
            status: jobStatus.ON_GOING,
        });
    }

    constructor({
        name = "",
        company = "",
        description = "",
        requirements = [],
        nextInterviewDate = "",
        jobType = jobTypes.FULL_TIME,
        workType = jobWorkType.REMOTE,
        status = jobStatus.ACCEPTED,
        
    }){
        this._id = null;
        this.user = null;
        this.name = name;
        this.company = company;
        this.nextInterviewDate = nextInterviewDate;
        this.description = description;
        this.requirements = requirements;
        this.jobType = jobType;
        this.workType = workType;
        this.status = status;
    }

    sanitize(){

        if(typeof this.name != "string") this.name = "";
        if(typeof this.company != "string") this.company = "";
        if(typeof this.description != "string") this.description = "";
        if(typeof this.nextInterviewDate != "string") this.nextInterviewDate = "";
        if(typeof this.jobType != "string") this.jobType = "";
        if(typeof this.workType != "string") this.workType = "";
        if(typeof this.status != "string") this.status = "";


        this.name = this.name.trim();
        this.company = this.company.trim();
        this.description = this.description.trim();
        this.nextInterviewDate = this.nextInterviewDate.trim();
        this.jobType = this.jobType.trim();
        this.workType = this.workType.trim();
        this.status = this.status.trim();
    }

    validStatus(){
        return Object.values(jobStatus).includes(this.status);
    }

    validWorkType(){
        return Object.values(jobWorkType).includes(this.workType);
    }

    validJobType(){
        return Object.values(jobTypes).includes(this.jobType);
    }

}