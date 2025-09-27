import { useEffect, useState } from 'react';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Chip } from '@heroui/chip';
import { useGetAllTagsQuery } from '@/hooks/useTagsApi';

type Value = {
    name: string;
    value?: string[];
};
type Props = {
    value?: string[];
    onChange: ({ name, value }: Value) => void;
};

export const TagsField = ({ value = [], onChange }: Props) => {
    const { data: existingTags = [] } = useGetAllTagsQuery();
    const [options, setOptions] = useState(existingTags);
    const [selected, setSelected] = useState<string[]>(value);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => (existingTags.length ? setOptions(existingTags) : undefined), [existingTags]);

    useEffect(() => onChange({ name: 'tags', value: selected }), [onChange, selected]);

    const handleAdd = (value: string) => {
        if (!options.includes(value)) {
            setOptions((prev) => [...prev, value]);
        }
        if (!selected.includes(value)) {
            setSelected((prev) => [...prev, value]);
        }
        setInputValue('');
    };

    const handleRemove = (value: string) => {
        setSelected((prev) => prev.filter((v) => v !== value));
    };

    return (
        <div className="flex w-full flex-col gap-1">
            <Autocomplete
                label="Тэги"
                allowsCustomValue
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSelectionChange={(key) => {
                    if (key) handleAdd(key.toString());
                }}
                inputProps={{
                    onKeyUp: (e) => {
                        if (e.key === 'Enter') {
                            handleAdd(inputValue.trim());
                        }
                    },
                }}
            >
                {options.map((option) => (
                    <AutocompleteItem key={option} className="text-foreground text-left">
                        {option}
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            <div className="flex flex-wrap gap-1">
                {selected.map((item) => (
                    <Chip
                        key={item}
                        variant="flat"
                        color="primary"
                        onClose={() => handleRemove(item)}
                    >
                        {item}
                    </Chip>
                ))}
            </div>
        </div>
    );
};
