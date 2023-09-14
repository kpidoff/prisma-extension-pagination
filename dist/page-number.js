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
exports.paginateWithPages = void 0;
const helpers_1 = require("./helpers");
const paginateWithPages = (model, query, { page = 1, limit = Number.MAX_SAFE_INTEGER, includePageCount }) => __awaiter(void 0, void 0, void 0, function* () {
    const previousPage = page > 1 ? page - 1 : null;
    let results;
    let nextPage;
    let pageCount = null;
    let totalCount = null;
    if (includePageCount) {
        [results, totalCount] = yield Promise.all([
            model.findMany(Object.assign(Object.assign({}, query), {
                skip: (page - 1) * limit,
                take: limit,
            })),
            model.count(Object.assign(Object.assign(Object.assign({}, query), helpers_1.resetSelection), helpers_1.resetOrdering)),
        ]);
        pageCount = Math.ceil(totalCount / limit);
        nextPage = page < pageCount ? page + 1 : null;
    }
    else {
        results = yield model.findMany(Object.assign(Object.assign({}, query), {
            skip: (page - 1) * limit,
            take: limit + 1,
        }));
        nextPage = results.length > limit ? page + 1 : null;
        if (nextPage) {
            results.pop();
        }
    }
    return [
        results,
        Object.assign({
            isFirstPage: previousPage === null,
            isLastPage: nextPage === null,
            currentPage: page,
            previousPage,
            nextPage,
        }, (includePageCount === true
            ? {
                pageCount,
                totalCount,
            }
            : {})),
    ];
});
exports.paginateWithPages = paginateWithPages;
