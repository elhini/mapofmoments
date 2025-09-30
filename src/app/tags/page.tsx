'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Spinner } from '@heroui/spinner';

import { useGetAllTagsQuery } from '@/hooks/useTagsApi';
import { DeleteButton } from '@/app/tags/components/DeleteButton';
import { ShareButton } from '@/app/tags/components/ShareButton';

export default function TagsPage() {
    const { data: tags = [], isLoading } = useGetAllTagsQuery();

    return (
        <div className="max-w-2xl">
            <h2 className="text-foreground mb-3 text-xl">Тэги</h2>

            <Table aria-label="Тэги" className="min-w-[150px]">
                <TableHeader>
                    <TableColumn>Тэг</TableColumn>
                    <TableColumn>Кол-во</TableColumn>
                    <TableColumn>Действия</TableColumn>
                </TableHeader>
                <TableBody isLoading={isLoading} loadingContent={<Spinner label="Загрузка..." />}>
                    {tags.map((tag) => (
                        <TableRow key={tag.id}>
                            <TableCell>{tag.name}</TableCell>
                            <TableCell>{tag.momentsCount}</TableCell>
                            <TableCell>
                                {tag.publicId ? <ShareButton publicId={tag.publicId} /> : null}
                                {!tag.momentsCount ? <DeleteButton tagId={tag.id} /> : null}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
