import { Input, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getLoginSuccess,
  showResetPage,
} from '../../redux/feature/auth/actions';
import { setToast } from '../../utils/extraFunctions';
import { isLoginFormEmpty } from '../../utils/formValidator';
import { AuthBtn } from './AuthBtn';
import Router from 'next/router';

export const LoginForm = ({ onClose }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  //   const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleInputChange = ({ target: { name, value } }: any) => {
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const isEmpty = isLoginFormEmpty(form);
    if (!isEmpty.status) {
      return setToast(toast, isEmpty.message as string, 'error');
    }
    dispatch(getLoginSuccess(form, toast, Router, onClose) as any);
  };

  const displayReset = () => {
    // dispatch(showResetPage());
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <VStack
          w={['95%', '95%', '85%', '85%', '85%', '85%']}
          mx={'auto'}
          gap={'8px'}
        >
          <Input
            onChange={handleInputChange}
            name="email"
            type={'email'}
            placeholder="Email address"
          />

          <Input
            onChange={handleInputChange}
            name="password"
            type={'password'}
            placeholder="Password"
          />

          <Text
            onClick={displayReset}
            _hover={{ textDecoration: 'underline' }}
            w={'100%'}
            color={'#b0a8af'}
            textAlign={'right'}
            my={'10px'}
            cursor={'pointer'}
          >
            Forgot your password?
          </Text>

          <AuthBtn value={'LOGIN'} />
        </VStack>
      </form>
    </>
  );
};

// export default LoginForm;
