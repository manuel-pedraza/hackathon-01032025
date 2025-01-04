import { useRouter } from "next/router";

export default function Job() {
    const router = useRouter();
    
    return (
        <div >
            This is job: {router.query.job}
        </div>
    );
}
