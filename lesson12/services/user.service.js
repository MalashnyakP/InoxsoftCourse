const { USER_ROLE, USER_STATES } = require('../configs');
const { User } = require('../models');

module.exports = {
    userSearchQuery: async (query) => {
        const {
            perPage = 20, page = 1, sortBy = 'createdAt', orderBy = 'asc', ...filters
        } = query;

        const searchQuery = {};
        const skip = perPage * (page - 1);
        const sortOrder = orderBy === 'asc' ? 1 : -1;

        const keys = Object.keys(filters);

        keys.forEach((key) => {
            switch (key) {
                case 'role':
                    const roles = filters.role.split(';');
                    const filterRoles = [];
                    roles.forEach((role) => {
                        if (Object.values(USER_ROLE).includes(role)) {
                            filterRoles.push(role);
                        }
                    });

                    if (filterRoles.length) {
                        searchQuery.role = { $in: filterRoles };
                    }
                    break;

                case 'state':
                    const states = filters.state.split(';');
                    const filterState = [];
                    states.forEach((state) => {
                        if (Object.values(USER_STATES).includes(state)) {
                            filterState.push(state);
                        }
                    });

                    if (filterState.length) {
                        searchQuery.state = { $in: filterState };
                    }
                    break;

                case 'name':
                    searchQuery.name = { $regex: `^${filters.name}`, $options: 'i' };
                    break;

                default:
                    searchQuery[key] = filters[key];
                    break;
            }
        });

        const users = await User.find(searchQuery).limit(+perPage).skip(skip).sort({ [sortBy]: sortOrder })
            .select('-password');

        const countDocuments = await User.countDocuments(searchQuery);

        return {
            data: users,
            perPage,
            page,
            countDocuments,
            maxPages: Math.ceil(countDocuments / perPage)
        };
    }
};
