"use client";

import { register } from "../../actions/profileController";
import { useFormState, useFormStatus } from "react-dom";
import { useActionState } from "react";

export default function RegisterForm() {
    const [formState, formAction] = useActionState(register, {});
    console.log(formState);

    return (
        <div >
            <form action={formAction}>
                <div>
                    <label>Name</label>
                    <input name="username" type="text" placeholder="Username" />
                </div>

                <div>
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password" />
                </div>
                <button>Create Account</button>
            </form>
        </div>
    );
}