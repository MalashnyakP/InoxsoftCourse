module.exports = {
    buildCarSearchFilter: (query) => {
        const filter = {};

        const keys = Object.keys(query);

        keys.forEach((key) => {
            switch (key) {
                case 'priceGt':
                    filter.price = { ...filter.price, $gt: Number(query[key]) };
                    break;
                case 'priceLt':
                    filter.price = { ...filter.price, $lt: Number(query[key]) };
                    break;
                case 'yearGt':
                    filter.year = { ...filter.year, $gt: Number(query[key]) };
                    break;
                case 'yearLt':
                    filter.year = { ...filter.year, $lt: Number(query[key]) };
                    break;
                default:
                    filter[key] = query[key];
            }
        });

        return filter;
    }
};
