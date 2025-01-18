export type Task = {
    id: string,
    title?: string,
    source_lang: string,
    target_lang: string,
    document: Document
};

export type Document = {
    id: string,
    title: string,
    segments: Segment[]
};

export type Segment = {
    id: string,
    index: number,
    source: string,
    lang: string,
    translations: Translation[]
};

export type Translation = {
    id: string,
    target: string,
    lang: string
};
