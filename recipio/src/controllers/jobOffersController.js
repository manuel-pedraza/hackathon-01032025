"use server";

import { getUserFromCookie } from "../utils/cookie";
import { redirect } from "next/navigation";
import { AddJob, GetJobOfferById, GetJobOffersByUser, UpdateJobById } from "../services/job";
import { ObjectId } from "mongodb";
import Job from "../classes/Job";

async function validateJobOffer(form, user) {
    const errors = {};

    const job = new Job({
        name: form.get("name"),
        company: form.get("company"),
        description: form.get("description"),
        requirements: [],
        nextInterviewDate: form.get("interview"),
        status: form.get("status"),
        workType: form.get("work"),
        jobType: form.get("type"),
    });

    job.sanitize();
    job.user = ObjectId.createFromHexString(user);

    if (job.name.length == "") errors.name = "Job Offer name must not be empty";
    if (job.company.length == "") errors.company = "Job Offer company must not be empty";
    
    if (!job.validStatus()) errors.status = "Job Offer status is invalid";
    if (!job.validJobType()) errors.type = "Job Offer type is invalid";
    if (!job.validWorkType()) errors.workType = "Job Offer work type is invalid";


    return {errors, job};
}

export const createJob = async (prevState, formData) => {

    const user = await getUserFromCookie();

    if(!user)
        return redirect("/");

    const result = await validateJobOffer(formData, user.userId);

    if(result.errors.name || result.errors.company || result.errors.status || result.errors.type || result.errors.workType)
        return { errors: result.errors };

    const job = await AddJob(result.job);
    return redirect("/my-job-offers");

};

export const getJobOffers = async () => { 

    const user = await getUserFromCookie();

    if(!user)
        return redirect("/");

    const userJobs = await GetJobOffersByUser(ObjectId.createFromHexString(user.userId));

    let jobs = [];

    for (let index = 0; index < userJobs.length; index++) {
        const job = userJobs[index];
        let jobToAdd = new Job(job);
        jobToAdd._id = job._id;
        jobs.push(jobToAdd);
    }

    return jobs;
}

export const editJob = async (prevState, formData) => {

    const user = await getUserFromCookie();

    if (!user)
        return redirect("/");

    const result = await validateJobOffer(formData, user.userId);
    //console.log("EDITING", formData, result.job);
    

    if (result.errors.name || result.errors.company || result.errors.status || result.errors.type || result.errors.workType)
        return { errors: result.errors };
    
    let jobId = formData.get("jobId");
    if(typeof jobId !== "string") jobId = "";

    const jobToEdit = await GetJobOfferById(ObjectId.createFromHexString(jobId));
    if(jobToEdit.user != user.userId)
        return redirect("/");

    const resJobNormalized = {
        name: result.job.name,
        company: result.job.company,
        nextInterviewDate: result.job.nextInterviewDate,
        description: result.job.description,
        requirements: result.job.requirements,
        jobType: result.job.jobType,
        workType: result.job.workType,
        status: result.job.status,
    };

    const job = await UpdateJobById(ObjectId.createFromHexString(jobId), resJobNormalized);

    return redirect("/my-job-offers");

};

export const getJobById = async (id) => {
    const user = await getUserFromCookie();

    if(!user)
        return redirect("/");

    const job = await GetJobOfferById(ObjectId.createFromHexString(id));
    
    let jobTmp = new Job(job);
    jobTmp._id = job._id;
    jobTmp.user = job.user;
    
    return JSON.parse(JSON.stringify(jobTmp));

 }
