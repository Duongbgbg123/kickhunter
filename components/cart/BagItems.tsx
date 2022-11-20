import { Box, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ItemBox } from './ItemBox';

export const BagItems = () => {
  const cartProducts = useSelector(
    (state: any) => state.cartReducer.cartProducts
  );

  return (
    <>
      <Box>
        <Text mb={'20px'} fontSize={'20px'} fontWeight={600}>
          Bag
        </Text>

        {cartProducts.map((item: any, index: any) => (
          <ItemBox key={index} {...item} index={index} data={item} />
        ))}
      </Box>
    </>
  );
};
