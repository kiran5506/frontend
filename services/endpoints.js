export const baseURL = process.env.BASE_API_URL || 'http://localhost:5004/api/';

export default {
    GENERATETOKEN: {
        create: '/generate-token',
    },
    SLIDERS: {
        create: '/sliders',
        edit: '/sliders/{id}',
        list: '/slider/list',
        findById: '/sliders/{id}',
        delete: '/sliders/{id}'
    },
    VENDOR: {
        register: '/vendorauth/register',
        login: '/vendorauth/login'
    }
}