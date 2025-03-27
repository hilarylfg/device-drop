"use client";

import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/stores";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {scroller} from "react-scroll";
import {Category} from "@prisma/client";
import {Skeleton} from "@/shared/components";

interface CategoryNavbarProps {
    className?: string
    items: Category[];
    isLoading: boolean;
}


export function CategoryNavbar({items, className, isLoading}: CategoryNavbarProps) {
    const activeId = useCategoryStore((state) => state.activeId);
    const setActiveId = useCategoryStore((state) => state.setActiveId);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const section = searchParams.get("section");
        if (section) {
            scroller.scrollTo(section, {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
                offset: -100,
            });
        }
    }, [searchParams]);

    const handleScroll = (section: string) => {
        scroller.scrollTo(section, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: -105,
        });
    };

    const handleClick = (link: string) => {
        if (pathname !== "/") {
            router.push(`/?section=${link}`);
        } else {
            handleScroll(link);
        }
    };

    return (
        <div className={cn("categories__list", className)}>
            {isLoading ? <CategoryNavbarSkeleton/> : items.map(({name, link}, index) => (
                <a
                    key={index}
                    className={cn({active: activeId === index}, 'categories__list__item')}
                    onClick={() => {
                        setActiveId(index)
                        handleClick(link)
                    }}
                >
                    {name}
                </a>
            ))}
        </div>
    )
}

export function CategoryNavbarSkeleton() {
    return (
        Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} className="categories__list__item--skeleton"/>
        ))
    )
}