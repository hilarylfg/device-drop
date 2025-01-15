import {cn} from "@/shared/lib/utils";
import React from "react";
import {Button, GroupCheckboxFilter} from "@/shared/components";
import {RangeSlider} from "@/shared/components/ui/range-slider";

export function Filters() {
    return (
        <div className="filters-wrapper">
            <div className={cn('filters-block')}>
                <h2 className="filters-block__titile">Фильтрация</h2>
                <GroupCheckboxFilter items={[
                    {text: "Есть в наличии", value: "available"},
                    {text: "Есть скидка", value: "sale"},
                ]}/>
                <div className="group-filter">
                    <h3 className="group-filter__title">Цена</h3>
                    <RangeSlider className="group-filter__slider" min={10} max={1000} step={10}/>
                </div>
                <GroupCheckboxFilter title="Цвет" items={[
                    {text: "Белый", value: "color-white"},
                    {text: "Черный", value: "color-black"},
                    {text: "Серый", value: "color-gray"},
                    {text: "Красный", value: "color-red"},
                    {text: "Коричневый", value: "color-brown"},
                    {text: "Синий", value: "color-blue"},
                ]}/>
            </div>
            <Button>Применить</Button>
        </div>
    )
}
