import { setToast } from '../../../utils/extraFunctions';
import { getCartTotal } from '../../../utils/getCartTotal';
import { handleCartDuplicate } from '../../../utils/handleCartDuplicate';
import { getItem, setItem } from '../../../utils/localStorage';
import {
  getItemSession,
  removeItemSession,
  setItemSession,
} from '../../../utils/sessionStorage';
import {
  ADD_TO_CART_SUCCESS,
  APPLY_COUPON_SUCCESS,
  REMOVE_COUPON_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_CART_DETAILS,
} from './actionTypes';

export const addToCartSuccess = (payload: any) => {
  return { type: ADD_TO_CART_SUCCESS, payload };
};

export const removeFromCart = (payload: any) => {
  return { type: REMOVE_FROM_CART, payload };
};

export const applyCouponSuccess = (payload: any) => {
  return { type: APPLY_COUPON_SUCCESS, payload };
};

export const removeCouponSuccess = (payload: any) => {
  return { type: REMOVE_COUPON_SUCCESS, payload };
};

export const updateCartDetails = () => {
  return { type: UPDATE_CART_DETAILS };
};

export const addToCartRequest =
  (data: any, toast: any, operation = 'add') =>
  (dispatch: any) => {
    let cartData = getItem('cartProducts') || [];
    cartData = handleCartDuplicate(cartData, data, operation);
    setItem('cartProducts', cartData);
    const discountPercent = getItemSession('discountPercent');
    const orderSummary = getCartTotal(cartData, discountPercent);
    setItem('orderSummary', orderSummary);
    dispatch(addToCartSuccess({ cartData, orderSummary }));

    if (operation === 'add') {
      setToast(toast, 'Item added to the cart', 'success');
    } else if (operation === 'reduce') {
      setToast(toast, 'Item quantity reduced', 'success');
    }
  };

export const removeFromCartRequest =
  (index: any, toast: any) => (dispatch: any) => {
    const cartData = getItem('cartProducts');
    cartData.splice(index, 1);
    setItem('cartProducts', cartData);
    const discountPercent = getItemSession('discountPercent');
    const orderSummary = getCartTotal(cartData, discountPercent);
    orderSummary.subTotal === 0 && removeItemSession('discountPercent');
    setItem('orderSummary', orderSummary);
    dispatch(removeFromCart({ index, orderSummary }));
    setToast(toast, 'Item removed from the cart', 'success');
  };

export const applyCouponRequest =
  (discountPercent: any, toast: any) => (dispatch: any) => {
    const cartData = getItem('cartProducts');
    setItemSession('discountPercent', discountPercent);
    const orderSummary = getCartTotal(cartData, discountPercent);
    setItem('orderSummary', orderSummary);
    dispatch(applyCouponSuccess(orderSummary));
    setToast(
      toast,
      'Coupon Applied Successfully',
      'success',
      2000,
      `You got ${discountPercent}% discount`
    );
  };

export const removeCouponRequest = (toast: any) => (dispatch: any) => {
  const cartData = getItem('cartProducts');
  removeItemSession('discountPercent');
  const orderSummary = getCartTotal(cartData, 0);
  setItem('orderSummary', orderSummary);
  dispatch(removeCouponSuccess(orderSummary));
  setToast(toast, 'Coupon Removed Successfully', 'success');
};
