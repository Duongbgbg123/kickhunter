import { Input, Select, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getSignupSuccess } from 'redux/feature/auth/actions';
import { setToast } from 'utils/extraFunctions';
import {
  isSignupFormEmpty,
  validateEmail,
  validatePassword,
} from 'utils/formValidator';
import { AuthBtn } from './AuthBtn';

export const SignUpForm = ({ onClose }: any) => {
  const initState = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
  };
  const router = useRouter();

  const [form, setForm] = useState(initState);
  const toast = useToast();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = ({ target: { name, value } }: any) => {
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const isEmpty = isSignupFormEmpty(form);
    if (!isEmpty.status) {
      return setToast(toast, isEmpty.message as string, 'error');
    }

    const isEmail = validateEmail(form.email);
    if (!isEmail.status) {
      return setToast(toast, isEmail.message as string, 'error');
    }

    const isPassword = validatePassword(form.password, form.confirmPassword);
    if (!isPassword.status) {
      return setToast(
        toast,
        'Password must contain these things:',
        'error',
        3000,
        isPassword.message
      );
    }

    dispatch(getSignupSuccess(form, toast, onClose, router) as any);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <VStack
          w={['95%', '95%', '85%', '85%', '85%', '85%']}
          mx={'auto'}
          gap={'7px'}
        >
          <Input
            name="username"
            onChange={handleInputChange}
            type={'text'}
            placeholder="Username"
          />
          <Input
            name="email"
            onChange={handleInputChange}
            type={'email'}
            placeholder="Email address"
          />
          <Input
            name="phoneNumber"
            onChange={handleInputChange}
            type={'number'}
            placeholder="Phone Number"
          />

          <Input
            name="password"
            onChange={handleInputChange}
            type={'password'}
            placeholder="Password"
          />

          <Input
            name="confirmPassword"
            onChange={handleInputChange}
            type={'password'}
            placeholder="Confirm Password"
          />

          <AuthBtn value={'JOIN US'} />
        </VStack>
      </form>
    </>
  );
};

// export default SignupForm
