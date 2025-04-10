"use client";

import {Suspense} from 'react';
import {TruckLoader, VerifyHandler} from "@/shared/components";

export default function VerifyPage() {
    return (
        <main className="verify-page">
            <Suspense fallback={<TruckLoader title="Везем проверять ваш код подтверждения..." />}>
                <VerifyHandler />
            </Suspense>
        </main>
    );
}