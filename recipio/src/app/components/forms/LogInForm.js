"use client";
import Link from "next/link";
import { logIn } from "../../../controllers/profileController";
import { useActionState } from "react";


export default function LogInForm() {
    const [formState, formAction] = useActionState(logIn, {});

    console.log(formState);
    

    if (formState.success)
            redirect("/");

    return (
        <div className="form-container">
            <form action={formAction} className="form">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "0.4rem" }}>
                    <h1 style={{textAlign: "center"}}>Login</h1>
                    {
                        formState?.message && (
                            <p className="error">{formState?.message}</p>
                        )
                    }
                </div>
                <div style={{display: "flex", flexDirection: "column", marginBottom: "0.4rem"}}>
                    <label>Name</label>
                    
                    <input name="username" type="text" placeholder="Username" />
                </div>

                <div style={{display: "flex", flexDirection: "column", marginBottom: "0.4rem"}}>
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "0.4rem" }}>
                    <p style={{fontSize: "small"}}>You don't have an account?</p>
                    <Link className="cstm-link" href="/sign-up">Create an account</Link>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}