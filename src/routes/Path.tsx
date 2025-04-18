export const path = {
    NOT_FOUND: '/not-found',
    HOME: '',
    PHAT:'phat',
    ROOM:'room',
    POST: {
       INDEX: 'post',
       CREATE: 'post/create',
       MANAGER: 'post/manager',
       VIEW: 'post/view',
       DETAIL: 'post',
    },
    COURSE: {
       DEFAULT: 'course',
       MY_COURSE: 'course/my-register',
       PAYMENT_NOTIFICATION: 'course/register/payment-notification',
       SUMMARY: 'course/summary',
       LEARNING: 'course/learning',
    },
    ROAD_MAP: {
       INDEX: 'road-map',
    },
    AUTH: {
       LOGIN: 'login',
       REGISTER: 'register',
       VERIFY_ACCOUNT: 'verify-account',
       RESET_PASSWORD: 'reset-password',
    },
    ADMIN: {
       MANAGER_COURSE_CATEGORY: 'admin/course/category',
       DASHBOARD: 'admin/dashboard',
       ROOM: 'admin/room',
       COURSE: 'admin/course',
       SENSOR: 'admin/sensor',
       DETAIL_ROOM: 'admin/roomDetail',
       POST: 'admin/post',
       ADD_POST: 'admin/post/add',
       USER: 'admin/user',
       SETTING: 'admin/setting'
    },
 
    USER_ADMIN_MANAGER: {},
 
    /// student path
    USER: {
       PROFILE: 'user/profile',
       MANAGER_POST: 'user/post',
       SETTING: 'user/setting',
    },
 } as const;
 