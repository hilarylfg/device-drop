"use client";

import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/stores/category";
import {Container, Popover, PopoverContent, PopoverTrigger} from "@/shared/components";
import {ArrowUpDown} from "lucide-react";
import {Category} from "@prisma/client";
import {useEffect} from "react";
import {scroller} from "react-scroll";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface TopBarProps {
    items: Category[]
}

export function TopBar({items} : TopBarProps) {
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
        <div className="bar__shadow">
            <Container className="top-bar">
                <div className="categories__list">
                    {items.map(({ name, link }, index) => (
                        <a
                            key={index}
                            className={cn({active: activeId === index}, 'categories__list__item')}
                            onClick={() =>
                            {
                                setActiveId(index)
                                handleClick(link)
                        }}
                        >
                            {name}
                        </a>
                    ))}
                </div>
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
