import NextAuth, { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from "bcryptjs";
import { UserRole } from "@prisma/client";
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

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
                    id: profile.id.toString(),
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
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                authToken: { label: 'Auth Token', type: 'text', optional: true }, // Добавляем authToken как опциональный
            },
            async authorize(credentials) {
                if (credentials?.authToken) {
                    try {
                        const decoded = verify(credentials.authToken, JWT_SECRET);
                        if (typeof decoded !== 'object' || !decoded.id) {
                            console.error('Invalid auth token structure');
                            return null;
                        }
                        const user = await prisma.user.findUnique({
                            where: { id: Number(decoded.id) },
                        });
                        if (!user || !user.verified) {
                            console.error('User not found or not verified');
                            return null;
                        }
                        return {
                            id: decoded.id,
                            email: decoded.email,
                            name: decoded.firstName,
                            role: decoded.role,
                        };
                    } catch (err) {
                        console.error('Invalid auth token in authorize', err);
                        return null;
                    }
                }

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const findUser = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });

                if (!findUser || !findUser.verified) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, findUser.password);
                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: findUser.id.toString(),
                    email: findUser.email,
                    name: findUser.firstName,
                    role: findUser.role,
                };
            },
        }),
    ],
    secret: JWT_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'credentials' && typeof account.authToken === 'string') {
                return true;
            }

            try {
                if (account?.provider === 'credentials') {
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email },
                        ],
                    },
                });

                if (findUser) {
                    await prisma.user.update({
                        where: { id: findUser.id },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });
                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        firstName: user.name || 'User #' + user.id,
                        password: hashSync(user.id.toString(), 10),
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    },
                });
                return true;
            } catch (error) {
                console.error('Error [SIGNIN]', error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id.toString();
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                };
            }
            return session;
        },
    },
};

export default NextAuth(authConfig);