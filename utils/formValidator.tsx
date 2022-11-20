export const isSignupFormEmpty = ({
  // firstName,
  username,
  // lastName,
  email,
  password,
  phoneNumber,
}: // dateOfBirth,
// gender,
any) => {
  if (!username || !email || !password || !phoneNumber) {
    return { status: false, message: 'Please fill all the details' };
  } else {
    return { status: true };
  }
};

export const isLoginFormEmpty = ({ email, password }: any) => {
  if (!email || !password) {
    return { status: false, message: 'Please fill all the details' };
  }
  return { status: true };
};

export const validateEmail = (email: any) => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return { status: false, message: 'Please provide a valid email id' };
  }
  return { status: true };
};

export const validatePassword = (password: any, confirmPassword: any) => {
  const errors = [];
  if (password != confirmPassword) {
    errors.push('Password Confirm incorrect');
  }
  if (password.length < 6) {
    errors.push('at least 6 characters');
  }
  if (password.length > 16) {
    errors.push('not more than 16 characters');
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push('at least one lower case');
  }
  if (password.search(/[A-Z]/i) < 0) {
    errors.push('at least one upper case');
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push('at least one number');
  }
  if (password.search(/[!@#$%^&*]/) < 0) {
    errors.push('at least one special character(! @ # $ % ^ & *)');
  }

  if (errors.length > 0) {
    return { status: false, message: errors.join(', ') };
  }
  return { status: true };
};

export const isCheckoutFormEmpty = (obj: any) => {
  const {
    firstName,
    lastName,
    addressLine1,
    locality,
    pinCode,
    state,
    country,
    email,
    mobile,
  } = obj;

  if (
    !firstName ||
    !lastName ||
    !addressLine1 ||
    !locality ||
    !pinCode ||
    !state ||
    !country ||
    !email ||
    !mobile
  ) {
    return { status: false, message: 'Please fill the mandatory details' };
  }
  return { status: true };
};

export const validatePinCode = (num: any) => {
  if (num.length !== 6) {
    return { status: false, message: 'Please provide 6 digit valid pincode' };
  }
  return { status: true };
};

export const validateMobile = (num: any) => {
  if (num.length !== 10) {
    return {
      status: false,
      message: 'Please provide 10 digit valid mobile number',
    };
  }
  return { status: true };
};
