export const baseURL = process.env.BASE_API_URL || 'http://localhost:5004/api/';

export default {
    GENERATETOKEN: {
        create: '/generate-token',
    },
    SLIDERS: {
        create: '/slider/create',
        edit: '/slider/edit/{id}',
        list: '/slider/list',
        findById: '/slider/findById/{id}',
        delete: '/slider/delete/{id}'
    },
    SERVICES: {
        create: '/service/create',
        edit: '/service/edit/{id}',
        list: '/service/list',
        findById: '/service/findById/{id}',
        delete: '/service/delete/{id}'
    },
    SKILLS: {
        create: '/skill/create',
        edit: '/skill/edit/{id}',
        list: '/skill/list',
        findById: '/skill/findById/{id}',
        delete: '/skill/delete/{id}'
    },
    TUTORIALS: {
        create: '/tutorial/create',
        edit: '/tutorial/edit/{id}',
        list: '/tutorial/list',
        findById: '/tutorial/findById/{id}',
        delete: '/tutorial/delete/{id}'
    },
    LEADPACKAGE: {
        create: '/leadpackage/create',
        edit: '/leadpackage/edit/{id}',
        list: '/leadpackage/list',
        findById: '/leadpackage/findById/{id}',
        delete: '/leadpackage/delete/{id}'
    },
    LANGUAGES: {
        create: '/language/create',
        edit: '/language/edit/{id}',
        list: '/language/list',
        findById: '/language/findById/{id}',
        delete: '/language/delete/{id}'
    },
    CITIES: {
        create: '/city/create',
        edit: '/city/edit/{id}',
        list: '/city/list',
        findById: '/city/findById/{id}',
        delete: '/city/delete/{id}'
    },
    CATEGORIES: {
        create: '/category/create',
        edit: '/category/edit/{id}',
        list: '/category/list',
        findById: '/category/findById/{id}',
        delete: '/category/delete/{id}'
    },
    EVENTS: {
        create: '/event/create',
        edit: '/event/edit/{id}',
        list: '/event/list',
        findById: '/event/findById/{id}',
        delete: '/event/delete/{id}'
    },
    VENDOR: {
        register: '/vendorauth/register',
        login: '/vendorauth/login'
    },
    ADMIN: {
        login: '/admin/login',
        updateSettings: '/admin/siteSettings/{id}',
        getSettings: '/admin/getSiteSettings/{id}'
    }
}