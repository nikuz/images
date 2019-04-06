// @flow

import type { User } from './profile';

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


export type Order = {
    copyright: string,
    copyrightAlign: string,
    createdAt: string,
    crop: number,
    format: string,
    genre: Genre,
    id: string,
    logo: string,
    logoAlign: string,
    logoFileId: string,
    packsize: PackSize,
    status: string,
    templates: string,
    updatedAt: string,
    user: User,
};
