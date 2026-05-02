export const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.bsfye.com/api/';

const endpoints = {
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
        search: '/service/search',
        findById: '/service/findById/{id}',
        findByIdWithProfiles: '/service/findByIdWithProfiles/{id}',
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
    PAYMENT: {
        createOrder: '/payment/create-order',
        verify: '/payment/verify',
        transactions: '/payment/transactions/{vendorId}',
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
        search: '/city/search',
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
        delete: '/event/delete/{id}',
        findByServiceId: '/event/service/{service_id}'
    },
    TESTIMONIALS: {
        create: '/testimonial/create',
        edit: '/testimonial/edit/{id}',
        list: '/testimonial/list',
        findById: '/testimonial/findById/{id}',
        delete: '/testimonial/delete/{id}'
    },
    VENDOR: {
        register: '/vendorauth/register',
        login: '/vendorauth/login',
        verifyOtp: '/vendorauth/verify-otp',
        updateProfileCompletion: '/vendorauth/update-profile-completion',
        generateOtp: '/vendorauth/generate-otp',
        forgotPassword: '/vendorauth/forgot-password',
        resetPassword: '/vendorauth/reset-password',
        list: '/vendor/list',
        listWithStatus: '/vendor/list-with-status',
        findById: '/vendor/view/{id}',
        edit: '/vendor/edit/{id}',
        updatePassword: '/vendor/update-password/{id}',
        delete: '/vendor/delete/{id}',
        approveReject: '/vendor/approve-reject/{id}'
    },
    ADMIN: {
        login: '/admin/login',
        updateSettings: '/admin/siteSettings/{id}',
        getSettings: '/admin/getSiteSettings/{id}',
        dashboardCounts: '/admin/dashboard-counts',
        profile: '/admin/profile',
        changePassword: '/admin/change-password'
    },
    AUTH: {
        authLogin: '/auth/login',
        register: '/auth/register',
        verifyOtp: '/auth/verifyOtp',
    },
    USERS: {
        findById: '/user/findById/{id}',
        list: '/user/list',
        edit: '/user/edit/{id}',
        delete: '/user/delete/{id}'
    },
    EMPLOYEES: {
        create: '/employee/create',
        edit: '/employee/edit/{id}',
        list: '/employee/list',
        findById: '/employee/find/{id}',
        delete: '/employee/delete/{id}'
    },
    INQUIRIES: {
        create: '/inquiry/create',
        list: '/inquiry/list',
        findById: '/inquiry/findById/{id}',
        byStatus: '/inquiry/byStatus/{status}',
        update: '/inquiry/update/{id}',
        updateStatus: '/inquiry/updateStatus/{id}',
        delete: '/inquiry/delete/{id}',
        verifyOtp: '/inquiry/verifyOtp'
    },
    CUSTOMER: {
        create: '/customer/create',
        list: '/customer/list',
        findById: '/customer/view/{id}',
        edit: '/customer/edit/{id}',
        delete: '/customer/delete/{id}',
        toggleStatus: '/customer/toggle-status/{id}',
        listByType: '/customer/list-by-type/{type}'
    },
    CUSTOMER_AUTH: {
        register: '/customerauth/register',
        login: '/customerauth/login',
        verifyOtp: '/customerauth/verify-otp',
        resendOtp: '/customerauth/resend-otp',
        forgotPassword: '/customerauth/forgot-password',
        verifyForgotPasswordOtp: '/customerauth/verify-forgot-password-otp',
        resetPassword: '/customerauth/reset-password',
        changePassword: '/customerauth/change-password'
    },
    CONTACT_SUPPORT: {
        create: '/contact-support/create',
        list: '/contact-support/list',
        findById: '/contact-support/findById/{id}',
        updateStatus: '/contact-support/update-status/{id}',
        delete: '/contact-support/delete/{id}'
    },
    LEAD_ASSIGNMENTS: {
        listByVendor: '/lead-assignments/vendor/{vendorId}',
        markViewed: '/lead-assignments/view',
        updateStatus: '/lead-assignments/{id}/status',
        requestReplacement: '/lead-assignments/replace-request',
        reviewReplacement: '/lead-assignments/replace-request/{id}/review',
        adminList: '/lead-assignments/admin/leads',
        adminDetails: '/lead-assignments/admin/leads/{inquiryId}',
        replacementRequests: '/lead-assignments/admin/replacements',
        replacementDetails: '/lead-assignments/admin/replacements/{id}'
    },
    BUSINESS_PROFILE: {
        create: '/business-profile/create',
        edit: '/business-profile/edit/{id}',
        list: '/business-profile/list',
        findById: '/business-profile/findById/{id}',
        detailsById: '/business-profile/details/{id}',
        findByVendorId: '/business-profile/findByVendorId/{vendor_id}',
        delete: '/business-profile/delete/{id}',
        deleteCoverImage: '/business-profile/delete-cover-image/{id}'
    },
    BUSINESS_PORTFOLIO: {
        create: '/business-portfolio/create',
        listByVendor: '/business-portfolio/vendor/{vendor_id}',
        deleteMedia: '/business-portfolio/delete-media/{id}'
    },
    BUSINESS_PACKAGES: {
        create: '/business-packages/create',
        edit: '/business-packages/edit/{id}',
        list: '/business-packages/list',
        listByVendor: '/business-packages/vendor/{vendor_id}',
        findById: '/business-packages/findById/{id}',
        delete: '/business-packages/delete/{id}'
    },
    FEEDBACK: {
        create: '/feedback/create',
        list: '/feedback/list',
        findById: '/feedback/findById/{id}',
        edit: '/feedback/edit/{id}',
        delete: '/feedback/delete/{id}',
        findByVendorId: '/feedback/vendor/{vendorId}',
        findByUserId: '/feedback/user/{userId}'
    },
    SUGGESTIONS: {
        create: '/suggestions/create',
        list: '/suggestions/list',
        findById: '/suggestions/findById/{id}',
        edit: '/suggestions/edit/{id}',
        delete: '/suggestions/delete/{id}'
    },
    VIDEOS: {
        create: '/video/create',
        edit: '/video/edit/{id}',
        list: '/video/list',
        findById: '/video/findById/{id}',
        delete: '/video/delete/{id}'
    },
    REVIEW: {
        create: '/review/create',
        list: '/review/list',
        findById: '/review/findById/{id}',
        edit: '/review/edit/{id}',
        delete: '/review/delete/{id}',
        findByVendorId: '/review/vendor/{vendor_id}',
        findByCustomerId: '/review/customer/{customer_id}'
    },
    FREELANCERS: {
        create: '/freelancers',
        list: '/freelancers/list',
        findById: '/freelancers/{id}'
    },
    STATS: {
        counts: '/stats/counts'
    },
    WISHLIST: {
        toggle: '/wishlist/toggle',
        list: '/wishlist/list',
        ids: '/wishlist/ids'
    }
}

export default endpoints;