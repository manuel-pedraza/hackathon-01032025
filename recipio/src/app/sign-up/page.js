import { redirect } from "next/navigation";
import { getUserFromCookie } from "../../utils/cookie";
import RegisterForm from "../components/forms/RegisterForm";

export default async function SignUp() {

    const user = await getUserFromCookie();

    if (user)
        redirect("/");

    return (
        <div >
            <RegisterForm />
        </div>
    );
}
