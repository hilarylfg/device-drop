import {Search} from "lucide-react";
import {Input} from "@/shared/components";

export function SearchInput() {
    return (
        <div className="search-input">
            <Search className="search-input__icon"/>
            <Input
                className="search-input__input"
                type="text"
                placeholder="Найти девайсы..."
            />
        </div>
    )
}
