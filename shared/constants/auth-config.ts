import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { UserRole } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
import {compare} from "bcrypt";

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole,
                };
            },
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const values = {
                    email: credentials.email,
                };

                const findUser = await prisma.user.findFirst({
                    where: values,
                });

                if (!findUser) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, findUser.password);

                if (!isPasswordValid) {
                    return null;
                }

                if (!findUser.verified) {
                    return null;
                }

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = { ...token, ...user, id: user.id.toString() };
            }
            return token;
        },
        async session({ session }) {
            return session;
        },
    },
};