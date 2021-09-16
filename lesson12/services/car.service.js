const { Car } = require('../models');

module.exports = {
    carSearchQuery: async (query) => {
        const searchQuery = {};

        const {
            perPage = 20, page = 1, sortBy = 'createdAt', orderBy = 'asc', ...filters
        } = query;

        const sortOrder = orderBy === 'asc' ? 1 : -1;

        const skipPages = perPage * (page - 1);

        const keys = Object.keys(filters);

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    searchQuery.price = { ...searchQuery.price, $gte: Number(query[key]) };
                    break;

                case 'priceLte':
                    searchQuery.price = { ...searchQuery.price, $lte: Number(query[key]) };
                    break;

                case 'yearGte':
                    searchQuery.year = { ...searchQuery.year, $gte: Number(query[key]) };
                    break;

                case 'yearLte':
                    searchQuery.year = { ...searchQuery.year, $lte: Number(query[key]) };
                    break;

                default:
                    searchQuery[key] = query[key];
            }
        });

        const cars = await Car.find(searchQuery).limit(+perPage).skip(skipPages).sort({ [sortBy]: sortOrder });

        const countDocuments = await Car.countDocuments(searchQuery);

        return {
            data: cars,
            perPage,
            page,
            countDocuments,
            maxPages: Math.ceil(countDocuments / perPage)
        };
    }
};
