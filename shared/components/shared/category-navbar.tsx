"use client";

import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/stores/category";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {scroller} from "react-scroll";
import {Category} from "@prisma/client";

interface CategoryNavbarProps {
    items: Category[];
}


export function CategoryNavbar({items}: CategoryNavbarProps) {
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
            offset: -100,
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
        <div className="categories__list">
            {items.map(({name, link}, index) => (
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