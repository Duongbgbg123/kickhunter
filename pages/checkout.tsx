import {
  isCheckoutFormEmpty,
  validateEmail,
  validateMobile,
  validatePinCode,
} from '../utils/formValidator';
import { CheckoutOrderSummary } from '../components/checkout/CheckoutOrderSummary';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { Box, useToast } from '@chakra-ui/react';
import { setToast } from '../utils/extraFunctions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { initPayment } from "../payment/razorpay";
import { useState } from 'react';
import { updateCartDetails } from '../redux/feature/cart/actions';
import { useRouter } from 'next/router';

const Checkout = () => {
  const { orderSummary, cartProducts } = useSelector(
    (state: any) => state.cartReducer,
    shallowEqual
  );
  const token = useSelector((state: any) => state.authReducer.token);

  const initState = {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    locality: '',
    pinCode: '',
    state: '',
    country: '',
    email: '',
    mobile: '',
  };

  const [form, setForm] = useState(initState);
  const toast = useToast();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();

  const handleInputChange = ({ target: { name, value } }: any) => {
    setForm({ ...form, [name]: value });
  };

  const handleFormValidation = (form: any) => {
    const isEmpty = isCheckoutFormEmpty(form);
    if (!isEmpty.status) {
      setToast(toast, isEmpty.message as string, 'error');
      return isEmpty.status;
    }
    const isEmail = validateEmail(form.email);
    if (!isEmail.status) {
      setToast(toast, isEmail.message as string, 'error');
      return isEmail.status;
    }
    const isPinCode = validatePinCode(form.pinCode);
    if (!isPinCode.status) {
      setToast(toast, isPinCode.message as string, 'error');
      return isPinCode.status;
    }
    const isMobile = validateMobile(form.mobile);
    if (!isMobile.status) {
      setToast(toast, isMobile.message as string, 'error');
      return isMobile.status;
    }
    return true;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (!handleFormValidation(form)) return;

    router.push('/payment');
    //To get order id
    // const { data } = await axios.post('/api/payment/order', { amount: orderSummary.total });

    //Passing order id to razorpay function

    // initPayment(form, data, orderSummary, cartProducts, token, toast, dispatch, navigate);
  };

  return (
    <>
      <Box
        p={'20px'}
        my={'30px'}
        mx={'auto'}
        maxW={'1200px'}
        display={'grid'}
        gap={['40px', '40px', '40px', '10%', '10%']}
        gridTemplateColumns={['100%', '100%', '100%', '55% 35%', '60% 30%']}
      >
        <CheckoutForm onChange={handleInputChange} />

        <CheckoutOrderSummary
          onClick={handleFormSubmit}
          orderSummary={orderSummary}
        />
      </Box>
    </>
  );
};

export default Checkout;