import { redirect } from "next/navigation";
import { getUserFromCookie } from "../../utils/cookie";
import RegisterForm from "../components/RegisterForm";

export default async function SignIn() {

    const user = await getUserFromCookie();

    if (user)
        redirect("/");

    return (
        <div >
            <RegisterForm />
        </div>
    );
}
