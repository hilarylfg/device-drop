"use client";

import {Search} from "lucide-react";
import {Input} from "@/shared/components";
import {useClickAway, useDebounce} from 'react-use';
import {Api} from "@/shared/services/api-client";
import {useRef, useState} from "react";
import Link from "next/link";
import {cn} from "@/shared/lib/utils";
import {ProductWithRelations} from "@/@types/prisma";

interface SearchInputProps {
    className?: string
}

export function SearchInput(className: SearchInputProps) {
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
                console.log(response);
                setProducts(
                    response.map((product) => ({
                        ...product,
                        variants: (product as ProductWithRelations).variants,
                    }))
                );
            } catch (error) {
                console.log(error);
            }
        },
        150,
        [searchQuery],
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    };

    return (
        <>
            {focused && <div className="fixed-overlay"/>}

            <div ref={ref} className={cn('search-input', className)}>
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
                            'search-input__list',
                            {focused}
                        )}>
                        {products.map((product) => (
                            <Link
                                onClick={onClickItem}
                                key={product.id}
                                className="search-input__list__item"
                                href={`/product/${product.id}`}>
                                <div className={"search-input__list__item__content"}>
                                    <div className={"search-input__list__item__content__image"}>
                                        <img className="" src={`/products/${product.variants?.[0]?.imageUrl}`} alt={product.name}/>
                                    </div>
                                    <span>{product.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
