import { PageNumberPaginationMeta, PageNumberPaginationOptions, PrismaModel, PrismaQuery } from "./types";
export declare const paginateWithPages: (model: PrismaModel, query: PrismaQuery, { page, limit, includePageCount }: Required<PageNumberPaginationOptions>) => Promise<[unknown, PageNumberPaginationMeta<boolean>]>;
