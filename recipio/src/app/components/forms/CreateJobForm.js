"use client";
import Link from "next/link";
import { createJob } from "../../../controllers/jobOffersController";
import { useActionState } from "react";
import jobStatus from "../../../enums/jobStatus";
import jobWorkType from "../../../enums/jobWorkTypes";
import jobTypes from "../../../enums/jobTypes";

const aJobStatus = Object.values(jobStatus);
const aJobWorkType = Object.values(jobWorkType);
const aJobTypes = Object.values(jobTypes);

export default function CreateJobForm() {
    const [formState, formAction] = useActionState(createJob, {});

    if (formState.success)
        redirect("/");

    return (
        <div >
            {/* // TODO: Validation indicators */}
            <form action={formAction}>
                <div>
                    <label>Job Offer:</label>
                    <input name="name" type="text" placeholder="Job Offer" />
                    <label>Company</label>
                    <input name="company" type="text" placeholder="Company" />
                </div>

                <div>
                    <label>Status</label>
                    <select name="status" id="cars">
                        {aJobStatus.map(s => <option key={`status-${s}`} value={s}>{s}</option>)}
                    </select>

                    <label>Type</label>
                    <select name="work" id="cars">
                        {aJobWorkType.map(s => <option key={`work-${s}`} value={s}>{s}</option>)}
                    </select>

                    <label>Work Type</label>
                    <select name="type" id="cars">
                        {aJobTypes.map(s => <option key={`type-${s}`} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label>Next Interview Date</label>
                    <input name="interview" type="datetime-local" placeholder="" />
                </div>
                <div>
                    <label>Description</label>
                    <input name="description" type="text-area" placeholder="" />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}