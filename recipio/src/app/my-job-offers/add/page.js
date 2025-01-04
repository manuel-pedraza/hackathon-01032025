import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../../../utils/cookie';
import CreateJob from '../../components/forms/JobForm';

export default async function createJob() {

    const user = await getUserFromCookie();
    
    if (!user)
        redirect("/");

    return (
        <div >
            <CreateJob action="create" />
        </div>
    );
}
