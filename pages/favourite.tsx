import { Box, Center, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavouriteItemBox } from '../components/favourite/FavouriteItemBox';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { getFavouriteRequest } from '../redux/feature/favourite/action';
import { getItem, setItem } from '../utils/localStorage';
const Favourite = () => {
  const dispatch = useDispatch();
  const data = getItem('user');
  // const token = useSelector((state: any) => state.authReducer.token);
  const { isLoading, isError, favourite } = useSelector(
    (state: any) => state.favouriteReducer
  );

  const handleGetRequest = (uid: any) => {
    dispatch(getFavouriteRequest(uid) as any);
  };

  useEffect(() => {
    handleGetRequest(data?.uid);
  }, [data?.uid]);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Box maxW={'1450px'} mx={'auto'} my={'20px'} p={'15px'}>
        <Text fontSize={'20px'} fontWeight={500}>
          Favourites
        </Text>

        {!favourite.length ? (
          <Box>
            <Center h={'30vh'}>
              <Text fontSize={'20px'}>
                Your favourite items will be displayed here.
              </Text>
            </Center>
          </Box>
        ) : (
          <Box
            display={'grid'}
            gap={['20px', '20px', '20px', '40px', '40px']}
            mt={'40px'}
            gridTemplateColumns={[
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(3, 1fr)',
            ]}
          >
            {favourite.map((item: any, index: any) => (
              <FavouriteItemBox
                key={item._id}
                index={index}
                {...item}
                data={item}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};
export default Favourite;
