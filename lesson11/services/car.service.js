const { Car } = require('../models');

module.exports = {
    carSearchQuery: async (query) => {
        const filter = {};

        const {
            perPage = 20, page = 1, sortBy = 'createdAt', orderBy = 'asc', ...filters
        } = query;

        const sortOrder = orderBy === 'asc' ? 1 : -1;

        const skipPages = perPage * (page - 1);

        const keys = Object.keys(filters);

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filter.price = { ...filter.price, $gte: Number(query[key]) };
                    break;
                case 'priceLte':
                    filter.price = { ...filter.price, $lte: Number(query[key]) };
                    break;
                case 'yearGte':
                    filter.year = { ...filter.year, $gte: Number(query[key]) };
                    break;
                case 'yearLte':
                    filter.year = { ...filter.year, $lte: Number(query[key]) };
                    break;
                default:
                    filter[key] = query[key];
            }
        });

        const cars = await Car.find(filter).limit(+perPage).skip(skipPages).sort({ [sortBy]: sortOrder });

        const countDocuments = await Car.countDocuments(filter);

        return {
            data: cars,
            perPage,
            page,
            maxPages: Math.ceil(countDocuments / perPage)
        };
    }
};
