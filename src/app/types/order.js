// @flow

export type Genre = {
    id: string,
    name: string,
};

export type Template = {
    authorAlign: string,
    authorEffect: string,
    authorFontFamily: string,
    authorVerticalAlign: string,
    color: string,
    createdAt: string,
    fileId: string,
    filter: string,
    format: string,
    genre: Genre,
    id: string,
    image: string,
    overlay: string,
    separator: string,
    system: boolean,
    textAlign: string,
    textEffect: string,
    textFontFamily: string,
    textVerticalAlign: string,
    updatedAt: string,
    crop: number,
    originalImage: string,
    originalFileId: string,
};

export type PackSize = {
    id: string,
    size: number,
    price: number,
    discount: number,
};
