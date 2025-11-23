import CreatableSelect from 'react-select/creatable';
import type { OnChangeValue } from 'react-select';

import { useGetAllTagsQuery } from '@/hooks/useTagsApi';
import type { Tag } from '@/types/tag';

type Value = {
    name: string;
    value?: Tag[];
};
type Props = {
    value?: Tag[];
    onChange: ({ name, value }: Value) => void;
};
type Option = { label: string; value: string; __isNew__?: boolean };
type Options = OnChangeValue<Option, true>;

const createOptions = (tags: Tag[]): Options => {
    return tags.map((t) => ({ label: t.name, value: t.id }));
};
const createTags = (options: Options) => {
    return options.map((o) => ({ name: o.label, id: o.__isNew__ ? '' : o.value }));
};

export const TagsField = ({ value = [], onChange }: Props) => {
    const { data: existingTags = [] } = useGetAllTagsQuery();
    const handleChange = (options: Options) => {
        return onChange({ name: 'tags', value: createTags(options) });
    };

    return (
        <CreatableSelect
            name="tags"
            placeholder="Тэги"
            isMulti
            options={createOptions(existingTags)}
            value={createOptions(value)}
            onChange={handleChange}
            className="w-full text-left text-sm"
            classNames={{ valueContainer: () => 'p-[2px]!', menuList: () => 'z-1' }}
        />
    );
};
