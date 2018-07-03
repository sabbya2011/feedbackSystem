module.exports = {
    googleClientID:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:process.env.MONGO_URI,
    cookieSessionMaxAge:30*24*60*60,
    cookieSessionKey:process.env.COOKIE_KEY
};