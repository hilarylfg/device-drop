import { NextRequest, NextResponse } from 'next/server';
import { verifyCodeLogic } from '@/app/actions';
import {signIn} from "next-auth/react";

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code');
        const result = await verifyCodeLogic(code || '');

        if (result.success) {
            await signIn('credentials', {
                authToken: result.authToken,
                redirect: false,
            });
            return NextResponse.redirect(new URL('/?verified', req.url));
        }
    } catch (error) {
        console.log('[VERIFY_GET] Server error', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Ошибка верификации'
        }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();
        const result = await verifyCodeLogic(code);

        if (result.success) {
            return NextResponse.json({
                success: true,
                authToken: result.authToken,
            });
        }
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Неверный код'
        }, { status: 400 });
    }
}