"use client";

import { useActionState } from "react";
import { register } from "../../../controllers/profileController";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
    const [formState, formAction] = useActionState(register, {});

    if (formState.success)
        redirect("/");

    return (
        <div className="form-container">
            {/* // TODO: Validation indicators */}
            <form action={formAction} className="form">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.4rem" }}>
                    <h1 style={{ textAlign: "center" }}>Sign-up</h1>
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "0.4rem" }}>
                    <label>Name</label>
                    {
                        formState.errors?.username && (
                            <p className="error">{formState.errors?.username}</p>
                        )
                    }
                    <input name="username" type="text" placeholder="Username" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", marginBottom: "0.4rem" }}>
                    <label>Password</label>
                    {
                        formState.errors?.password && (
                            <p className="error">{formState.errors?.password}</p>
                        )
                    }
                    <input name="password" type="password" placeholder="Password" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "0.4rem" }}>
                    <p style={{ fontSize: "small" }}>You already have an account?</p>
                    <Link className="cstm-link" href="/login">Login</Link>
                </div>
                <button>Create account</button>
            </form>
        </div>
    );
}