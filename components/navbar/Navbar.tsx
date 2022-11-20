import { Box, Center, Flex, Spacer, useColorMode } from '@chakra-ui/react';
import { Logout } from '../../components/auth/Logout';
import { Auth } from '../../components/auth/Auth';

import { RiHeartLine, RiShoppingBagLine } from 'react-icons/ri';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DarkModeBtn } from './DarkModeBtn';
import { Category, NavIcon } from '../../components/navbar/CategoryAndIcon';
import { SideDrawer } from '../../components/navbar/SideDrawer';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import { images } from '../../assets/images';
export const Navbar = () => {
  const { colorMode } = useColorMode();
  const token = useSelector(
    (state: any) => state.authReducer.token,
    shallowEqual
  );
  //   const handlePath = ({ target: { name } }) => {
  //     dispatch(setNavbarPath(name));
  //     setItemSession('path', name);
  //   };
  useEffect(() => {}, [token]);

  return (
    <>
      <Box h={'36px'} bg={colorMode === 'light' ? 'white' : ''}>
        <Center
          h={'36px'}
          justifyContent={'right'}
          mr={'40px'}
          fontSize={'16px'}
          cursor={'pointer'}
        >
          {token ? <Logout /> : <Auth />}
          <DarkModeBtn />
        </Center>
      </Box>

      <Flex h={'60px'} flexDirection={'row'} px={'20px'}>
        <Box w={'80px'}>
          <Link href={'/'}>
            <Image src={images.logo} alt="logo" />
          </Link>
        </Box>

        <Spacer />

        <Box display={['none', 'none', 'flex', 'flex', 'flex']}>
          <Category name={'/'} text={'Home'} link={'/'} />
          <Category name={'adidas'} text={'Adidas'} link={'/adidas'} />
          <Category name={'nike'} text={'Nike'} link={'/nike'} />
          <Category name={'rebox'} text={'Rebox'} link={'/rebox'} />
          <Category name={'jordan'} text={'Jordan'} link={'/jordan'} />
        </Box>

        <Spacer />

        <Center mr={'10px'}>
          <Link href={'/favourite'}>
            <NavIcon iconName={RiHeartLine} />
          </Link>
        </Center>

        <Center mr={'10px'}>
          <Link href={'/cart'}>
            <NavIcon iconName={RiShoppingBagLine} />
          </Link>
        </Center>

        <Box display={['flex', 'flex', 'none', 'none', 'none']}>
          <Center mr={'10px'}>
            <SideDrawer />
          </Center>
        </Box>
      </Flex>

      <Box h={['10px', '20px', '30px', '40px', '40px']}></Box>
    </>
  );
};
