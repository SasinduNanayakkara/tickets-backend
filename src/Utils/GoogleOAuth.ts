import passport from "passport";
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { generateAccessToken } from "../Controllers/Auth.controller";
import { generateAccessTokenService } from "../Services/Auth.service";
import { ACCESS_TOKEN_TYPE } from "./Constants";

passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || "302775610241-ievu5h4vhq3pre7il36hl50tal4ukege.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
        callbackURL: `http://localhost:5000/api/v1/auth/google/callback`,
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile:any, done) {
        console.log(done);
        
        const token = await generateAccessTokenService(profile?.email, ["client"], ACCESS_TOKEN_TYPE);
        return done(null, {profile, token});  
    }
));

passport.serializeUser(function(user: any, done) {
    done(null, user);
});

passport.deserializeUser(function(user: any, done) {
    done(null, user);
});

console.log("Google OAuth initialized successfully");
