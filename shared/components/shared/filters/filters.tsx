'use client';

import {cn} from "@/shared/lib/utils";
import React from "react";
import {GroupCheckboxFilter, Input, RangeSlider} from "@/shared/components";
import {useBrands, useColors, useFilters, useQueryFilters} from "@/shared/hooks";

export function Filters() {
    const { colors, loading: colorsLoading } = useColors();
    const { brands, loading: brandsLoading } = useBrands();

    const filters = useFilters();
    useQueryFilters(filters);

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    };

    const brandItems = brands.map((item) => ({ value: String(item.id), text: item.name }));
    const colorItems = colors.map((item) => ({
        value: String(item.id),
        hex: item.hex,
        text: item.nameRu,
    }));

    return (
        <div className="filters-wrapper">
            <div className={cn('filters-block')}>
                <h2 className="filters-block__title">Фильтрация</h2>
                <GroupCheckboxFilter
                    title="Скидка"
                    name="discount"
                    selected={filters.discount}
                    onClickCheckbox={filters.setDiscount}
                    items={[
                    {text: "Есть cкидка", value: "true"},
                ]}/>
                <div className="group-filter">
                    <p className="group-filter__title">Цена от и до:</p>
                    <div className="price-filter__inputs">
                        <Input
                            placeholder="0"
                            min={0}
                            max={100000}
                            value={String(filters.prices.priceFrom || '')}
                            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                        />
                        <Input
                            min={100}
                            max={100000}
                            placeholder="100000"
                            value={String(filters.prices.priceTo || '')}
                            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                        />
                    </div>
                    <RangeSlider
                        min={0}
                        max={100000}
                        step={1000}
                        value={[
                            filters.prices.priceFrom || 0,
                            filters.prices.priceTo || 100000
                        ]}
                        onValueChange={updatePrices}
                        className="group-filter__slider"
                    />
                </div>
                <GroupCheckboxFilter
                    title="Цвет"
                    name="colors"
                    limit={6}
                    items={colorItems}
                    loading={colorsLoading}
                    onClickCheckbox={filters.setColors}
                    selected={filters.colors}
                    searchInputPlaceholder="Введите цвет"
                />
                <GroupCheckboxFilter
                    title="Бренд"
                    name="brands"
                    limit={6}
                    items={brandItems}
                    loading={brandsLoading}
                    onClickCheckbox={filters.setBrands}
                    selected={filters.brands}
                    searchInputPlaceholder="Введите бренд"
                />
            </div>
        </div>
    )
}
