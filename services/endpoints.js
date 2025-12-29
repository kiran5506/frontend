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
    VENDOR: {
        register: '/vendorauth/register',
        login: '/vendorauth/login'
    },
    ADMIN: {
        login: '/admin/login',
        updateSettings: '/admin/siteSettings/{id}',
        getSettings: '/admin/getSiteSettings/{id}'
    },
    SERVICES: {
        create: '/service/create',
        edit: '/service/edit/{id}',
        list: '/service/list',
        findById: '/service/findById/{id}',
        delete: '/service/delete/{id}'
    }


}