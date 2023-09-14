import { CursorPaginationMeta } from ".";
import { CursorPaginationOptions, PrismaModel, PrismaQuery } from "./types";
interface PaginateWithCursorOptions<R, C> extends CursorPaginationOptions<R, C> {
    getCursor: NonNullable<CursorPaginationOptions<R, C>["getCursor"]>;
    parseCursor: NonNullable<CursorPaginationOptions<R, C>["parseCursor"]>;
}
export declare const paginateWithCursor: <R, C>(model: PrismaModel, query: PrismaQuery, { after, before, getCursor, parseCursor, limit, }: PaginateWithCursorOptions<R, C>) => Promise<[unknown, CursorPaginationMeta]>;
export {};
