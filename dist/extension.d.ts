import { Prisma } from "@prisma/client";
import { PageNumberPaginationOptions, PageNumberPaginationMeta, CursorPaginationOptions, CursorPaginationMeta, GetCursorFunction, ParseCursorFunction } from "./types";
type Paginator<O extends PaginatorOptions> = <T, A>(this: T, args?: Prisma.Exact<A, Omit<Prisma.Args<T, "findMany">, "cursor" | "take" | "skip">>) => {
    withPages: O["pages"] extends {
        limit: number;
    } ? <TOptions extends Omit<P, "limit">, P extends PageNumberPaginationOptions>(options?: TOptions & {
        limit?: P["limit"];
    }) => Promise<[
        Prisma.Result<T, A, "findMany">,
        PageNumberPaginationMeta<TOptions extends {
            includePageCount: boolean;
        } ? TOptions["includePageCount"] : O["pages"] extends {
            includePageCount: boolean;
        } ? O["pages"]["includePageCount"] : false>
    ]> : <TOptions extends PageNumberPaginationOptions, P extends PageNumberPaginationOptions>(options: TOptions & {
        limit: P["limit"];
    }) => Promise<[
        Prisma.Result<T, A, "findMany">,
        PageNumberPaginationMeta<TOptions extends {
            includePageCount: boolean;
        } ? TOptions["includePageCount"] : O["pages"] extends {
            includePageCount: boolean;
        } ? O["pages"]["includePageCount"] : false>
    ]>;
    withCursor: O["cursor"] extends {
        limit: number;
    } ? <TOptions extends Omit<P, "limit">, P extends CursorPaginationOptions<Prisma.Result<T, A, "findMany">[number], NonNullable<Prisma.Args<T, "findMany">["cursor"]>>>(options?: TOptions & {
        limit?: P["limit"];
    }) => Promise<[Prisma.Result<T, A, "findMany">, CursorPaginationMeta]> : <TOptions extends Omit<P, "limit">, P extends CursorPaginationOptions<Prisma.Result<T, A, "findMany">[number], NonNullable<Prisma.Args<T, "findMany">["cursor"]>>>(options: TOptions & {
        limit: P["limit"];
    }) => Promise<[Prisma.Result<T, A, "findMany">, CursorPaginationMeta]>;
};
type PaginatorOptions = {
    pages?: {
        limit?: number;
        includePageCount?: boolean;
    };
    cursor?: {
        limit?: number;
        getCursor?: GetCursorFunction<any>;
        parseCursor?: ParseCursorFunction<any>;
    };
};
export declare const createPaginator: <O extends PaginatorOptions>(globalOptions?: O | undefined) => Paginator<O>;
export declare const paginate: Paginator<PaginatorOptions>;
export declare const extension: <O extends PaginatorOptions>(options?: O | undefined) => (client: any) => {
    $extends: {
        extArgs: import("@prisma/client/runtime/library").InternalArgs<unknown, {
            $allModels: {
                paginate: Paginator<O>;
            };
        }, {}, unknown>;
    };
};
export {};
