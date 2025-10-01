export type Tag = {
    id: string;
    name: string;
    momentsCount?: number;
    publicId?: string;
};

export type PublicTag = {
    // TODO: add name
    public_id: string;
};
