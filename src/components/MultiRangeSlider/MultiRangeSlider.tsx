import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';
import classnames from "classnames";
import "./MultiRangeSlider.css";

interface MultiRangeSliderProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
}

export const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, onChange }: MultiRangeSliderProps) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);
            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);
            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange(minVal, maxVal);
    }, [minVal, maxVal, onChange]);

    return (
        <div className="multi-range-slider-wrapper">
            <div className="price-display-container">
                <div className="price-box">
                    <div className="price-label">EUR</div>
                    <div className="price-value">{minVal}</div>
                </div>
                <div className="price-box">
                    <div className="price-value">{maxVal}</div>
                    <div className="price-label">EUR</div>
                </div>
            </div>

            <div className="container">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = Math.min(+event.target.value, maxVal - 1);
                        setMinVal(value);
                        event.target.value = value.toString();
                    }}
                    className={classnames("thumb thumb--zindex-3", {
                        "thumb--zindex-5": minVal > max - 100
                    })}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = Math.max(+event.target.value, minVal + 1);
                        setMaxVal(value);
                        event.target.value = value.toString();
                    }}
                    className="thumb thumb--zindex-4"
                />
                <div className="slider">
                    <div className="slider__track"></div>
                    <div ref={range} className="slider__range"></div>
                </div>
            </div>
        </div>
    );
}