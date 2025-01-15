'use client';

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/shared/lib/utils';

type SliderProps = {
    className?: string;
    min: number;
    max: number;
    step: number;
    formatLabel?: (value: number) => string;
    value?: number[] | readonly number[];
    onValueChange?: (values: number[]) => void;
};

export const RangeSlider = React.forwardRef(
    (
        { className, min, max, step, formatLabel, value, onValueChange, ...props }: SliderProps,
        ref,
    ) => {
        const initialValue = Array.isArray(value) ? value : [min, max];
        const [localValues, setLocalValues] = React.useState(initialValue);

        React.useEffect(() => {
            setLocalValues(Array.isArray(value) ? value : [min, max]);
        }, [min, max, value]);

        const handleValueChange = (newValues: number[]) => {
            setLocalValues(newValues);
            if (onValueChange) {
                onValueChange(newValues);
            }
        };

        return (
            <SliderPrimitive.Root
                ref={ref as React.RefObject<HTMLDivElement>}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn("range-slider-ui", className)}
                {...props}
            >
                <SliderPrimitive.Track className="range-slider-ui-track">
                    <SliderPrimitive.Range className="range-slider-ui-range" />
                </SliderPrimitive.Track>
                {localValues.map((value, index) => (
                    <React.Fragment key={index}>
                        <div
                            className="range-slider-ui-value"
                            style={{
                                left: `calc(${((value - min) / (max - min)) * 93}% + 0px)`,
                            }}
                        >
                            <span>{formatLabel ? formatLabel(value) : value}</span>
                        </div>
                        <SliderPrimitive.Thumb className="range-slider-ui-thumb" />
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
        );
    },
);

RangeSlider.displayName = SliderPrimitive.Root.displayName;