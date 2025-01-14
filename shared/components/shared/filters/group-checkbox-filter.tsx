import {CheckboxFilter} from "@/shared/components";
import {CheckboxFilterProps} from "./checkbox-filter";

type Item = CheckboxFilterProps;

interface GroupCheckboxFilterProps {
    title?: string
    items?: Item[]
}

export function GroupCheckboxFilter({title, items} : GroupCheckboxFilterProps) {
    return (
        <div className="group-filter">
            {title && <h3 className="group-filter__title">{title}</h3>}
            <div className="group-filter__checkbox-list">
                {items?.map((item, index) => (
                    <CheckboxFilter
                        key={index}
                        text={item.text}
                        value={item.value}
                    />
                ))}
            </div>
        </div>
    )
}
