"use client";

import {CheckboxFilter, Input} from "@/shared/components";
import {CheckboxFilterProps} from "./checkbox-filter";
import {useState} from "react";

type Item = CheckboxFilterProps;

interface GroupCheckboxFilterProps {
    title?: string
    items: Item[]
    limit?: number;
}

export function GroupCheckboxFilter({title, items, limit = 5} : GroupCheckboxFilterProps) {
    const [showAll, setShowAll] = useState(false);
    const list = showAll
        ? items.filter((item) => item.text.toLowerCase())
        : (items).slice(0, limit);

    return (
        <div className="group-filter">
            {title && <h3 className="group-filter__title">{title}</h3>}
            {showAll && (
                <div>
                    <Input
                        className="group-filter__show-all__input"
                        placeholder="Введите цвет"
                    />
                </div>
            )}
            <div className="group-filter__checkbox-list">
                {list.map((item, index) => (
                    <CheckboxFilter
                        key={index}
                        text={item.text}
                        value={item.value}
                    />
                ))}
            </div>
            {items.length > limit && (
                <div>
                    <button onClick={() => setShowAll(!showAll)} className="group-filter__show-all">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    )
}
