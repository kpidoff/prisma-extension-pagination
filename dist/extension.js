"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extension = exports.paginate = exports.createPaginator = void 0;
const client_1 = require("@prisma/client");
const page_number_1 = require("./page-number");
const cursor_1 = require("./cursor");
const createPaginator = (globalOptions) => function paginate(args) {
    return {
        withPages: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const { page, limit, includePageCount } = Object.assign(Object.assign({ page: 1, includePageCount: false }, globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.pages), options);
            if (typeof page !== "number" ||
                page < 1 ||
                page > Number.MAX_SAFE_INTEGER) {
                throw new Error("Invalid page value");
            }
            if (typeof limit !== "number") {
                throw new Error("Missing limit value");
            }
            if (limit < 1 || limit > Number.MAX_SAFE_INTEGER) {
                throw new Error("Invalid limit value");
            }
            const query = (args !== null && args !== void 0 ? args : {});
            return (0, page_number_1.paginateWithPages)(this, query, {
                limit,
                page,
                includePageCount,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            });
        }),
        withCursor: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const { limit, after, before, getCursor, parseCursor } = Object.assign(Object.assign({ 
                // @ts-expect-error actual fields of the model are not known
                getCursor({ id }) {
                    if (typeof id !== "number") {
                        throw new Error("Unable to serialize cursor");
                    }
                    return id.toString();
                },
                parseCursor(cursor) {
                    const id = parseInt(cursor, 10);
                    if (Number.isNaN(id)) {
                        throw new Error("Unable to parse cursor");
                    }
                    return {
                        id,
                    };
                } }, globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.cursor), options);
            if (typeof limit !== "number") {
                throw new Error("Missing limit value");
            }
            if (limit < 1 || limit > Number.MAX_SAFE_INTEGER) {
                throw new Error("Invalid limit value");
            }
            if (typeof after === "string" && typeof before === "string") {
                throw new Error("Invalid cursor. Options after and before cannot be provided at the same time");
            }
            const query = (args !== null && args !== void 0 ? args : {});
            return (0, cursor_1.paginateWithCursor)(this, query, {
                limit,
                after,
                before,
                getCursor,
                parseCursor,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            });
        }),
    };
};
exports.createPaginator = createPaginator;
exports.paginate = (0, exports.createPaginator)();
const extension = (options) => {
    const paginate = (0, exports.createPaginator)(options);
    return client_1.Prisma.defineExtension({
        name: "pagination",
        model: {
            $allModels: {
                paginate,
            },
        },
    });
};
exports.extension = extension;
