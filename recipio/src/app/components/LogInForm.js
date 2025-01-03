"use client";
import Link from "next/link";
import { logIn } from "../../actions/profileController";
import { useActionState } from "react";


export default function LogInForm() {
    const [formState, formAction] = useActionState(logIn, {});

    if (formState.success)
            redirect("/");

    return (
        <div >
            {/* // TODO: Validation indicators */}
            <form action={formAction}>
                <div>
                    <label>Name</label>
                    <input name="username" type="text" placeholder="Username" />
                </div>

                <div>
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password" />
                </div>
                <div>
                    <Link href="/sign-in">Register an account</Link>
                </div>
                <button>Log in</button>
            </form>
        </div>
    );
}