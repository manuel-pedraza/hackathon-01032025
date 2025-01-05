"use client";
import Link from "next/link";
import { createJob, editJob } from "../../../controllers/jobOffersController";
import { useActionState, useState } from "react";
import jobStatus from "../../../enums/jobStatus";
import jobWorkType from "../../../enums/jobWorkTypes";
import jobTypes from "../../../enums/jobTypes";

const aJobStatus = Object.values(jobStatus);
const aJobWorkType = Object.values(jobWorkType);
const aJobTypes = Object.values(jobTypes);

export default function JobForm(props) {

    let actualAction = null;

    if (props.action === "edit") {
        actualAction = editJob;
    } else if (props.action === "create") {
        actualAction = createJob;
    }

    function getClassNameByStatus(status) {

        switch (status) {
            case jobStatus.ON_GOING:
                return "on-going";
            case jobStatus.ACCEPTED:
                return "accepted";
            case jobStatus.REFUSED:
                return "refused";
            default:
                return "#444";
        }
    }

    const [statusClass, setStatusClass] = useState(getClassNameByStatus(props.job?.status));

    const [items, setItems] = useState(props.job?.requirements ? props.job.requirements : []);

    const [formState, formAction] = useActionState(actualAction, {});

    if (formState.success)
        redirect("/");

    return (
        <div className="form-container">
            {/* // TODO: Validation indicators */}
            <form action={formAction} className="form">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.4rem" }}>
                    <h1 style={{ textAlign: "center" }}>{`${props.action == "edit" ? "Edit" : props.action == "create" ? "Create" : ""} Job Offer`}</h1>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: "0.5rem" }}>
                        <label>Job Offer</label>
                        <input name="name" type="text" defaultValue={props.job?.name} placeholder="Job Offer" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "0.5rem" }}>
                        <label>Company</label>
                        <input name="company" type="text" defaultValue={props.job?.company} placeholder="Company" />
                    </div>
                </div>


                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Status</label>
                        <select className={`${statusClass}`} onChange={(e) => {
                            setStatusClass(getClassNameByStatus(e.target.value))
                        }} name="status" defaultValue={props.job?.status}>
                            {aJobStatus.map(s => <option key={`status-${s}`} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Type</label>
                        <select name="work" defaultValue={props.job?.workType}>
                            {aJobWorkType.map(s => <option key={`work-${s}`} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Work Type</label>
                        <select name="type" defaultValue={props.job?.jobType}>
                            {aJobTypes.map(s => <option key={`type-${s}`} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: "0.5rem" }}>
                        <label>Next Interview Date</label>
                        <input name="interview" type="datetime-local" defaultValue={props.job?.nextInterviewDate} placeholder="" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "0.5rem" }}>
                        <label>Description</label>
                        <input name="description" type="text-area" defaultValue={props.job?.description} placeholder="" />
                    </div>
                </div>

                <div style={{padding: "0.5rem"}}>
                    {/* // add requirement */}
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label>Requirements</label>
                        <input id="#input-requirement" style={{ margin: "0rem 0.4rem" }} type="text" placeholder="Add requirement" 
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter'){
                                    e.preventDefault(); 
                                    if(e.target.value.trim() != ""){
                                        setItems(items.concat([e.target.value]));
                                        e.target.value = "";
                                    }
                                }
                            }} />
                        <button className="add-requirement" onClick={(e) => {
                            e.preventDefault(); 
                            const input = document.getElementById("#input-requirement");
                            console.log(items);
                            
                            if (input.value.trim() != "") {
                                setItems(items?.concat([input.value]));
                                input.value = "";
                            }
                        }}>
                            Add
                        </button>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflowY: "hidden", minHeight: "3.4rem", maxWidth: "400px" }}>
                        {items?.length > 0 ?
                            items.map((r, index) =>
                                <p key={`requirement-${index}`} className="job-card-span-small edit" style={{ margin: "0.1rem", backgroundColor: "#329ea8" }}
                                    onClick={(e) => {
                                        let arrTmp = [...items];
                                        let index = arrTmp.indexOf(r);
                                        
                                        arrTmp.splice(index, 1);
                                        setItems(arrTmp);

                                    }}
                                >
                                    {r}
                                </p>
                            )
                            :
                            <p key={`requirement-none`} className="job-card-span-small" style={{ margin: "0.1rem", backgroundColor: "#329ea8" }}>
                                No requirements
                            </p>
                        }
                    </div>
                </div>

                <input type="hidden" name="requirements" value={JSON.stringify(items)}></input>
                <input type="hidden" name="jobId" defaultValue={props.job?._id} />
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