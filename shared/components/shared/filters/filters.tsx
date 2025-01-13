import {cn} from "@/shared/lib/utils";
import {CheckboxFilter} from "@/shared/components";
import React from "react";

export function Filters() {
    return (
        <div className={cn('filters__block')}>
            <CheckboxFilter value={'das'} text={'гаджимурад'}/>
            <CheckboxFilter value={'das'} text={'балван'}/>
            <CheckboxFilter value={'das'} text={'полный'}/>

        </div>
    )
}
