import {cn} from "@/shared/lib/utils";
import React from "react";
import {GroupCheckboxFilter} from "@/shared/components";

export function Filters() {
    return (
        <div className={cn('filters-block')}>
            <h2 className="filters-block__titile">Фильтрация</h2>
            <GroupCheckboxFilter items={[
                {text: "Есть в наличии", value: "available"},
                {text: "Есть скидка", value: "sale"},
            ]}/>
            <GroupCheckboxFilter title="Цвет" items={[
                {text: "Белый", value: "color-white"},
                {text: "Черный", value: "color-black"},
                {text: "Серый", value: "color-gray"},
            ]}/>
        </div>
    )
}
