import { getServerSession } from 'next-auth';
import { authConfig } from '@/shared/constants';

export const getUserSession = async () => {
    const session = await getServerSession(authConfig);

    return session?.user ?? null;
};