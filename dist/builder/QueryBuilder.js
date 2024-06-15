"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(queryModel, query) {
        this.query = query;
        this.queryModel = queryModel;
    }
    search(searchFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            const searchQuery = {
                $or: searchFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            };
            this.queryModel = this.queryModel.find(searchQuery);
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFileds = [
            'searchTerm',
            'sort',
            'limit',
            'page',
            'fields',
        ];
        excludeFileds.forEach((el) => delete queryObj[el]);
        this.queryModel = this.queryModel.find(queryObj);
        return this;
    }
    sort() {
        var _a;
        const sortItem = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || '-createdAt';
        this.queryModel = this.queryModel.sort(sortItem);
        return this;
    }
    fields() {
        var _a;
        const fields = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) || '-__v';
        const selectFields = fields.replace(',', ' ');
        this.queryModel = this.queryModel.select(selectFields);
        return this;
    }
    pagination() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.queryModel = this.queryModel.skip(skip).limit(limit);
        return this;
    }
}
exports.default = QueryBuilder;
