'use client';

import {ChangeEvent, useState} from "react";
import {CheckboxFilter, CheckboxFilterProps} from "./checkbox-filter";
import {Input, Skeleton} from "@/shared/components";

type Item = CheckboxFilterProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
    name?: string;
}

export function GroupCheckboxFilter({
                                        title,
                                        items,
                                        defaultItems,
                                        limit = 5,
                                        searchInputPlaceholder = 'Поиск...',
                                        loading,
                                        onClickCheckbox,
                                        selected,
                                        name,
                                    }: Props) {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className="group-filter">
                <p className="group-filter__title">{title}</p>
                {...Array(limit)
                    .fill(0)
                    .map((_, index) =>
                        <Skeleton key={index} className="group-filter__checkbox-list--skeleton"/>)}
            </div>
        );
    }

    const filteredItems = items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
    );

    const list = showAll
        ? filteredItems
        : (defaultItems || items).slice(0, limit);

    return (
        <div className="group-filter">
            <h3 className="group-filter__title">{title}</h3>
            {showAll && (
                <Input
                    onChange={onChangeSearchInput}
                    value={searchValue}
                    placeholder={searchInputPlaceholder}
                    className="group-filter__show-all__input"
                />
            )}
            <div className="group-filter__checkbox-list">
                {list.map((item) => (
                    <CheckboxFilter
                        key={item.value}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                        hex={item.hex}
                    />
                ))}
            </div>
            {items.length > limit && (
                <button onClick={() => setShowAll(!showAll)} className="group-filter__show-all">
                    {showAll ? 'Скрыть' : '+ Показать все'}
                </button>
            )}
        </div>
    )
}