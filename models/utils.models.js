exports.isMalformedBody = (key, body) => {
  const bodyKeys = Object.keys(body);
  if (typeof key !== "number" || bodyKeys.length > 1) {
    return Promise.reject({
      status: 400,
      msg: `Bad request: malformed body`,
    });
  }
};
