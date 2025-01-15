import {Checkbox} from "@/shared/components";
import {ReactNode} from "react";
import {cn} from "@/shared/lib/utils";

export interface CheckboxFilterProps {
    text: string;
    value: string;
    endAdornment?: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export function CheckboxFilter({
                                   text,
                                   value,
                                   endAdornment,
                                   onCheckedChange,
                                   checked,
                                   name,
                               }: CheckboxFilterProps) {
    return (
        <div className="checkbox-filter">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="checkbox-filter__checkbox"
                id={`checkbox-${String(name)}-${String(value)}`}
            />
            {
                value.startsWith('color') &&
                (
                    <div className={cn("checkbox-filter__color", value.endsWith('white') ? 'checkbox-filter__color__white' : '')} style={{backgroundColor: value.slice(value.indexOf('-') + 1)}}></div>
                )
            }
            <label
                htmlFor={`checkbox-${String(name)}-${String(value)}`}
                className="checkbox-filter__label">
                {text}
            </label>
            {endAdornment}
        </div>
    );
}
