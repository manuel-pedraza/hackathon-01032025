"use client";
import Link from "next/link";
import { createJob, editJob } from "../../../controllers/jobOffersController";
import { useActionState } from "react";
import jobStatus from "../../../enums/jobStatus";
import jobWorkType from "../../../enums/jobWorkTypes";
import jobTypes from "../../../enums/jobTypes";

const aJobStatus = Object.values(jobStatus);
const aJobWorkType = Object.values(jobWorkType);
const aJobTypes = Object.values(jobTypes);

export default function JobForm(props) {

    console.log(

        "JOB", props.job
    );
    let actualAction = null;
    
    if (props.action === "edit") {
        actualAction = editJob;
    } else if (props.action === "create") {
        actualAction = createJob;
    }

    const [formState, formAction] = useActionState(actualAction, {});
    console.log(formState);
    
    if (formState.success)
        redirect("/");

    return (
        <div >
            {/* // TODO: Validation indicators */}
            <form action={formAction}>
                <div>
                    <label>Job Offer:</label>
                    <input name="name" type="text" defaultValue={props.job?.name} placeholder="Job Offer" />
                    <label>Company</label>
                    <input name="company" type="text" defaultValue={props.job?.company} placeholder="Company" />
                </div>
                
                
                <div>
                    <label>Status</label>
                    <select name="status" defaultValue={props.job?.status}>
                        {aJobStatus.map(s => <option key={`status-${s}`} value={s}>{s}</option>)}
                    </select>

                    <label>Type</label>
                    <select name="work" defaultValue={props.job?.workType}>
                        {aJobWorkType.map(s => <option key={`work-${s}`} value={s}>{s}</option>)}
                    </select>

                    <label>Work Type</label>
                    <select name="type" defaultValue={props.job?.jobType}>
                        {aJobTypes.map(s => <option key={`type-${s}`} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label>Next Interview Date</label>
                    <input name="interview" type="datetime-local" defaultValue={props.job?.nextInterviewDate} placeholder="" />
                </div>
                <div>
                    <label>Description</label>
                    <input name="description" type="text-area" defaultValue={props.job?.description} placeholder="" />
                </div>
                <input type="hidden" name="jobId" defaultValue={props.job?._id}/>
                <button>
                    {
                        props.action === "edit" ?
                            "Edit" :
                            props.action === "create" ?
                                "Create" :
                                ""
                    }
                </button>
            </form>
        </div>
    );
}