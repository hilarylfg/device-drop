import {Checkbox} from "@/shared/components";
import {ReactNode} from "react";

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
                               } : CheckboxFilterProps) {
    return (
        <div className="checkbox-filter">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="checkbox-filter__checkbox"
                id={`checkbox-${String(name)}-${String(value)}`}
            />
            <label
                htmlFor={`checkbox-${String(name)}-${String(value)}`}
                className="checkbox-filter__label">
                {text}
            </label>
            {endAdornment}
        </div>
    );
}
