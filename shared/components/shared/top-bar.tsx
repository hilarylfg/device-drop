"use client";

import {CategoryNavbar, Container, Logo, Popover, PopoverContent, PopoverTrigger} from "@/shared/components";
import {ArrowUpDown} from "lucide-react";
import {Suspense, useEffect, useRef, useState} from "react";
import {Api} from "@/shared/services/api-client";
import {CategoriesWithAllRelations} from "@/@types/prisma";

export function TopBar() {
    const [categories, setCategories] = useState<CategoriesWithAllRelations[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await Api.categories.getCategories();
                setCategories(response);
            } catch (e) {
                console.error("Error: ", e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    const headerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 180);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={headerRef} className={`bar__shadow ${isSticky ? 'sticky' : ''}`}>
            <Container className="top-bar">
                <Logo className="logo"/>
                <Suspense>
                    <CategoryNavbar className={isSticky ? 'sticky' : ''} items={categories}/>
                </Suspense>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="sort__button">
                            <ArrowUpDown size={20}/>
                            <b>Сортировка:</b>
                            <b className="accent__text">&nbsp;популярное</b>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <ul className="sort__list">
                            <li className="sort__list__item">
                                Сначала популярное
                            </li>
                            <li className="sort__list__item">
                                Сначала недорогие
                            </li>
                            <li className="sort__list__item">
                                Сначала дорогие
                            </li>
                            <li className="sort__list__item">
                                С лучшей оценкой
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </Container>
        </div>
    );
}
