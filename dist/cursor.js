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
exports.paginateWithCursor = void 0;
const helpers_1 = require("./helpers");
const paginateWithCursor = (model, query, { after, before, getCursor, parseCursor, limit, }) => __awaiter(void 0, void 0, void 0, function* () {
    let results;
    let hasPreviousPage = false;
    let hasNextPage = false;
    if (typeof before === "string") {
        const cursor = parseCursor(before);
        let nextResult;
        [results, nextResult] = yield Promise.all([
            model.findMany(Object.assign(Object.assign({}, query), { cursor, skip: 1, take: -limit - 1 })),
            model.findMany(Object.assign(Object.assign(Object.assign({}, query), helpers_1.resetSelection), { cursor, take: 1 })),
        ]);
        if (results.length > limit) {
            hasPreviousPage = Boolean(results.shift());
        }
        hasNextPage = Boolean(nextResult.length);
    }
    else if (typeof after === "string") {
        const cursor = parseCursor(after);
        let previousResult;
        [results, previousResult] = yield Promise.all([
            model.findMany(Object.assign(Object.assign({}, query), { cursor, skip: 1, take: limit + 1 })),
            model.findMany(Object.assign(Object.assign(Object.assign({}, query), helpers_1.resetSelection), { cursor, take: -1 })),
        ]);
        hasPreviousPage = Boolean(previousResult.length);
        if (results.length > limit) {
            hasNextPage = Boolean(results.pop());
        }
    }
    else {
        results = yield model.findMany(Object.assign(Object.assign({}, query), { take: limit + 1 }));
        hasPreviousPage = false;
        if (results.length > limit) {
            hasNextPage = Boolean(results.pop());
        }
    }
    const startCursor = results.length ? getCursor(results[0]) : null;
    const endCursor = results.length
        ? getCursor(results[results.length - 1])
        : null;
    return [
        results,
        {
            hasNextPage,
            hasPreviousPage,
            startCursor,
            endCursor,
        },
    ];
});
exports.paginateWithCursor = paginateWithCursor;
