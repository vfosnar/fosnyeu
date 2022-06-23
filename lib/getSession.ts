import nextSession from 'next-session';

/**
 * Get session from request.
 */
export const getSession = nextSession({
    cookie: {
        maxAge: 30 * 24 * 60 * 60
    }
});
