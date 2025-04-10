import NextAuth, { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from "@prisma/client";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5295';

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
                authToken: { label: 'Auth Token', type: 'text', optional: true },
            },
            async authorize(credentials) {
                if (credentials?.authToken) {
                    try {
                        const response = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ authToken: credentials.authToken }),
                        });
                        if (!response.ok) {
                            console.error('Token verification failed:', await response.text());
                            return null;
                        }
                        const userData = await response.json();
                        return {
                            id: userData.id.toString(),
                            email: userData.email,
                            name: userData.firstName,
                            role: userData.role,
                        };
                    } catch (err) {
                        console.error('Error verifying auth token:', err);
                        return null;
                    }
                }

                if (credentials?.email && credentials?.password) {
                    try {
                        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        });
                        if (!response.ok) {
                            console.error('Login failed:', await response.text());
                            return null;
                        }
                        const userData = await response.json();
                        return {
                            id: userData.id.toString(),
                            email: userData.email,
                            name: userData.firstName,
                            role: userData.role,
                        };
                    } catch (err) {
                        console.error('Error during login:', err);
                        return null;
                    }
                }

                return null;
            },
        }),
    ],
    secret: JWT_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google' || account?.provider === 'github') {
                try {
                    const response = await fetch(`${BACKEND_URL}/api/auth/oauth`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            provider: account.provider,
                            providerId: account.providerAccountId,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }),
                    });
                    if (!response.ok) {
                        console.error('Failed to sync user with backend:', await response.text());
                        return false;
                    }
                    return true;
                } catch (error) {
                    console.error('Error during OAuth signIn:', error);
                    return false;
                }
            }
            return true;
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