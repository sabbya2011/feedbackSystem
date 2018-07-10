module.exports = {
    googleClientID:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:process.env.MONGO_URI,
    cookieSessionMaxAge:30*24*60*60,
    cookieSessionKey:process.env.COOKIE_KEY,
    stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretkey:process.env.STRIPE_SECRET_KEY,
    sendGridKey:process.env.SEND_GRID_KEY,
    redirectDomain:process.env.REDIRECT_DOMAIN
};