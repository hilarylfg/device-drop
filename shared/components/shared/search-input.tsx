"use client";

import {Search} from "lucide-react";
import {Input} from "@/shared/components";
import { useClickAway, useDebounce } from 'react-use';
import {Api} from "@/shared/services/api-client";
import {useRef, useState} from "react";
import Link from "next/link";
import {cn} from "@/shared/lib/utils";
import {ProductWithRelations} from "@/@types/prisma";

export function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const [products, setProducts] = useState<ProductWithRelations[]>([]);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        async () => {
            try {
                const response = await Api.products.search(searchQuery);
                setProducts(response.map((product) => ({ ...product, variants: [] })));
            } catch (error) {
                console.log(error);
            }
        },
        250,
        [searchQuery],
    );

    products.map((product) => console.log(product));

    return (
        <div className="search-input">
            <Search className="search-input__icon"/>
            <Input
                className="search-input__input"
                type="text"
                placeholder="Найти девайсы..."
                onFocus={() => setFocused(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {products.length > 0 && (
                <div
                    className={cn(
                        'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12',
                    )}>
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                            href={`/product/${product.id}`}>
                            <img className="rounded-sm h-8 w-8" src={product.variants?.[0]?.imageUrl} alt={product.name} />
                            <span>{product.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
