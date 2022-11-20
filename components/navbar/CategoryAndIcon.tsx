import { Center, Icon, Text, useColorMode } from '@chakra-ui/react';

import Link from 'next/link';

export const Category = ({ text, link, handlePath, name }: any) => {
  const { colorMode } = useColorMode();
  return (
    <Center
      h={'60px'}
      cursor={'pointer'}
      paddingX={'15px'}
      _hover={{
        borderBottom: `2px solid ${colorMode === 'light' ? 'black' : 'white'}`,
      }}
    >
      <Link onClick={handlePath} href={link}>
        {text}
      </Link>
    </Center>
  );
};

export const NavIcon = ({ iconName }: any) => {
  return <Icon as={iconName} w={'28px'} h={'28px'} mr={'10px'} />;
};

export const DrawerCategory = ({ text, link, handlePath }: any) => {
  return (
    <Text fontSize={'20px'} fontWeight={500}>
      <Link onClick={handlePath} href={link}>
        {text}
      </Link>
    </Text>
  );
};
