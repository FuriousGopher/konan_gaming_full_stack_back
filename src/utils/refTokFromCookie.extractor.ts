export const refTokFromCookieExtractor = function (req) {
  let token = null;
  if (req && req.headers.cookie) {
    token = req.headers.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('refreshToken='))
      .split('=')[1];
  }
  return token;
};
