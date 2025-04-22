/**
 * public middleware which is going to be safe and we can rediret to /dashboard page if needed
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
]


/**
 * authentication page routes 
 * @type {string[]}
 */

export const authenticatedRoutes = [
    "/signin", "/signup"
]


/**
 * redirect url
 * @type {string}
 */


export const REDIRECT_URL = "/dashboard"