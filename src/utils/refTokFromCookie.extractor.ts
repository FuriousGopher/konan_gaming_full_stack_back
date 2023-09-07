
// Extracts the refreshToken from the request's cookies, if available
export const refTokFromCookieExtractor = function (req) {
  let token = null;
  if (req && req.headers.cookie) {
    // Split cookies and find the refreshToken.
    token = req.headers.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('refreshToken='))
      .split('=')[1];
  }
  return token;
};
