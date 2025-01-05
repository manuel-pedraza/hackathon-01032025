import JobForm from "../../../components/forms/JobForm";
import { getJobById } from "../../../../controllers/jobOffersController";
import { getUserFromCookie } from "../../../../utils/cookie";
import { redirect } from "next/navigation";

async function getJobOffer(id) {

    if(!id)
        return {};

    const job = await getJobById(id);
    return job;

}

export default async function Job(props) {
    
    const { id } = await props.params;
    const jobData = await getJobOffer(id);
    const user = await getUserFromCookie();

    if(user.userId != jobData.user)
        return redirect("/");

    return (
        <div >
            <JobForm job={jobData} action={"edit"} />
        </div>
    );
}
