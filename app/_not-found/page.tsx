'use client';

import { Button } from '@/shared/components';
import Link from 'next/link';
import {PackageX} from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="not-found__page">
            <PackageX size={150}/>
            <h1>404 - Страница не найдена</h1>
            <p>Извините, но эта страница не существует.</p>
            <Link href="/public">
                <Button>Вернуться на главную</Button>
            </Link>
        </div>
    );
}
