import CreatableSelect from 'react-select/creatable';
import type { OnChangeValue } from 'react-select';

import { useGetAllTagsQuery } from '@/hooks/useTagsApi';

type Value = {
    name: string;
    value?: string[];
};
type Props = {
    value?: string[];
    onChange: ({ name, value }: Value) => void;
};
type Option = { label: string; value: string };
type Options = OnChangeValue<Option, true>;

const createOptions = (tags: string[]): Options => {
    return tags.map((tag) => ({ label: tag, value: tag }));
};
const extractValues = (options: Options) => {
    return options.map((o) => o.value);
};

export const TagsField = ({ value = [], onChange }: Props) => {
    const { data: existingTags = [] } = useGetAllTagsQuery();
    const handleChange = (options: Options) => {
        return onChange({ name: 'tags', value: extractValues(options) });
    };

    return (
        <CreatableSelect
            placeholder="Тэги"
            isMulti
            options={createOptions(existingTags)}
            value={createOptions(value)}
            onChange={handleChange}
            className="z-11 w-full text-left"
        />
    );
};
