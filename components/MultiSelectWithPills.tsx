import React, { useMemo, useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

export type OptionType = { value: string | number; label: string };

export interface MultiSelectWithPillsProps {
    id: string;
    label: string;
    options: OptionType[];
    placeholder?: string;
    isMulti?: boolean;
    value?: OptionType[] | OptionType | null;
    onChange?: (value: OptionType[] | OptionType | null) => void;
}

const MultiSelectWithPills: React.FC<MultiSelectWithPillsProps> = ({
    id,
    label,
    options,
    placeholder,
    isMulti = true,
    value,
    onChange,
}) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<OptionType[] | OptionType | null>(
        isMulti ? [] : null
    );

    const selected = useMemo(() => (isControlled ? value : internalValue), [isControlled, value, internalValue]);

    const updateValue = (nextValue: OptionType[] | OptionType | null) => {
        if (!isControlled) {
            setInternalValue(nextValue);
        }
        onChange?.(nextValue);
    };

    const handleChange = (
        newValue: MultiValue<OptionType> | SingleValue<OptionType>
    ) => {
        if (isMulti) {
            updateValue((newValue as OptionType[]) || []);
            return;
        }
        updateValue((newValue as OptionType) || null);
    };
    return (
        <div>
            <label htmlFor={id} className="form-label">{label}</label>
            <Select<OptionType, boolean>
                id={id}
                isMulti={isMulti}
                options={options}
                value={selected as any}
                onChange={handleChange}
                placeholder={placeholder}
                styles={{
                    control: (base) => ({
                        ...base,
                        borderRadius: 4,
                        background: '#ededed',
                        border: 'none',
                        minHeight: 46,
                        fontSize: 16,
                        fontWeight: 500,
                        boxShadow: 'none',
                        paddingLeft: 20,
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: 0,
                    }),
                    multiValue: (base) => ({
                        ...base,
                        display: 'none', // Hide default react-select pills
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: '#222',
                        fontWeight: 500,
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        color: '#222',
                    }),
                }}
            />
            {/* Pills below the dropdown */}
            {isMulti && Array.isArray(selected) && (
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selected.map((option) => (
                        <div
                            key={option.value}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#d1d1d1',
                                borderRadius: 8,
                                padding: '1px 8px',
                                fontWeight: 500,
                                fontSize: 16,
                            }}
                        >
                            {option.label}
                            <span
                                style={{
                                    marginLeft: 8,
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    color: '#888',
                                }}
                                onClick={() =>
                                    updateValue(selected.filter((s) => s.value !== option.value))
                                }
                            >
                                ×
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectWithPills;
