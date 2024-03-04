const token = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; accessToken=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const HandleSetCookie = (name, value, options = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);

  options.expires = expirationDate.toUTCString();

  for (const option in options) {
    cookieString += `; ${option}=${options[option]}`;
  }

  document.cookie = cookieString;
};

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const ERRORS = {
  INTERNAL_SERVER_ERROR: 'Internal server error, please try again',
  FORGOT_PASSWORD_SUCCESS: 'Check Your Gmail !',
  RESET_PASSWORD_SUCCESS: 'Password reset successfully.',
};

const USERS_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

const TAGS = [
  {
    id: 1,
    label: 'Featured',
    value: 'featured',
  },
  {
    id: 2,
    label: 'Popular',
    value: 'popular',
  },
  {
    id: 3,
    label: 'Special',
    value: 'special',
  },
];

export {
  ERRORS,
  HandleSetCookie,
  TAGS,
  USERS_ROLE,
  getCharacterValidationError,
  token,
};
