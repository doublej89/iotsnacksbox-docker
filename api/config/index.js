"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
  env: process.env.NODE_ENV || "production",
  secret: {
    saltRound: 10,
    jwt:
      process.env.JWT_SECRET ||
      "fdgfdd4af32d746a5sd7fa3s5dfads3232d4gdfhgfhasfdtgreydas654d5asd7a5",
  },
  AccessToken: {
    secret:
      process.env.ACCESS_TOKEN_SECRET ||
      "kldlfajkdf77ds57ff4g65fd65htg57476746dg4fd4hgs",
    age: 30 * 60,
  },
  refreshToken: {
    secret:
      process.env.REFRESH_TOKEN_SECRET ||
      "gsdfgs65765d7fa65d7f6as57fas6d5g7sdf65g7f6d5h78gtfjhf65asd6576f",
    age: 7 * 24 * 60 * 60,
  },
  varifyEmal: {
    secret:
      process.env.VARIRY_EMAIL_TOKEN_SECRET ||
      "dgdfshfghjgsdfsa6576dsfdsfadsfad7fa65hjghjfghjfgfas6d5hjfdhygftr545g7f6d5h78gtfjhf65asd6576f",
    age: 24 * 60 * 60,
  },
  passeordReset: {
    secret:
      process.env.VARIRY_EMAIL_TOKEN_SECRET ||
      "5354frgsdf8978hf8797gfhfgdfsa6576dsghfgfadsfad7fa65h5635fhgfghjfgfas6d5hjfdhygftr545g7f6d565asd6576f",
    age: 60 * 60,
  },
  facebook: {
    apiUrl: "https://graph.facebook.com/v7.0/me?fields=",
    userDatafields: ["id", "first_name", "last_name", "email", "picture"],
    clientID: "352652462786335",
    clientSecret: "b64be72b13b2476ae7cf32ca6f9fac3e",
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
  },
  google: {
    apiUrl: "https://www.googleapis.com/userinfo/v2/me",
    clientID:
      "502596011364-sjknof9ljs54hhl4rer5tc70m8800n69.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4200",
  },
  linkedin: {
    apiUrl: "",
    clientId: "8625913ip6ez65",
    clientSecret: "6NkOHalkJWPBP6Qm",
  },
  twitter: {
    apiUrl: "https://api.twitter.com/1.1/users/show.json",
    consumerKey: "your-consumer-key-here",
    consumerSecret: "your-client-secret-here",
    callbackURL: "http://localhost:3000/auth/twitter/callback",
    accessToken: "841792187566239744-OyD8vkpavoE9RAFxpQlNyPLttTphe5Q",
    accessTokenSecret: "JfgEWC2zs73Szbcw8wHTmaL5uYtxoVTX5dcZeTuaLE4Xa",
    apiKey: "t55jbE5ZhcMcGnAL9JFQU0rtU",
    apiSecretKey: "V79LfEaGqjO5W443MsQx6qbwlfm2dWmeVwQ6Q29mbvSitHBEj3",
  },
  github: {
    apiUrl: "https://api.github.com/",
    clientID: "08a183cfde3b1e48f16e",
    clientSecret: "b8ae11cae6d736469087e6eef2902ceb4088e21a",
  },
  line: {
    apiUrl: "https://api.line.me/v2/profile",
  },
  mailer: {
    driver: "ses", // ses, log
    ses: {
      accessKeyId: "AKIAXY6E7AWV5IQ4A3IW",
      secretAccessKey: "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",
      region: "us-east-1",
    },
    senderEmail: "noreply@iotsnacksbox.io",
    senderName: "IOTSNACKBOX",
    reaplyTo: "noreply@iotsnacksbox.io",
    adminEmail: "jawadjahangir89@gmail.com",
  },
  redis: {
    host: "0.0.0.0",
    port: 6379,
    password: "",
    cacheDB: 1,
    queueDB: 2,
  },
};
//# sourceMappingURL=index.js.map
