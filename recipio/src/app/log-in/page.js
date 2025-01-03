import { redirect } from "next/dist/server/api-utils";
import { getUserFromCookie } from "../../utils/cookie";
import LogInForm from "../components/LogInForm";


export default async function logIn() {
    const user = await getUserFromCookie();

    if(user)
        redirect("/");
    
    return (
        <div >
            <LogInForm />
        </div>
    );
}
