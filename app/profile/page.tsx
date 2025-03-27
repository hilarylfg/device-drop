import { ProfileForm } from "@/shared/components";
import { redirect } from "next/navigation";
import {getUserSession} from "@/shared/lib";

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        return redirect('/');
    }

    return <ProfileForm/>;
}