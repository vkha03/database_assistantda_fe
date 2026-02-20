let _accessToken = null; // Biến này lưu token bên ngoài React

export const getLocalAccessToken = () => {
  return _accessToken;
};

export const setLocalAccessToken = (token) => {
  _accessToken = token;
};
