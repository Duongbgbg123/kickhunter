import { GridItem, Image } from '@chakra-ui/react';

export const BigGridBox = ({ source }: any) => {
  return (
    <GridItem
      colSpan={2}
      cursor={'pointer'}
      h={['200px', '200px', '400px', '500px', '600px']}
      borderRadius={'15px'}
      overflow={'hidden'}
    >
      <Image w={'100%'} className="imgAnimation" mt={'-47%'} src={source} />
    </GridItem>
  );
};

export const SmallGridBox = ({ source }: any) => {
  return (
    <GridItem
      cursor={'pointer'}
      borderRadius={'15px'}
      h={['100px', '100px', '200px', '250px', '300px']}
      overflow={'hidden'}
    >
      <Image w={'100%'} className="imgAnimation" mt={'-45%'} src={source} />
    </GridItem>
  );
};

export const ClothGridBox = ({ source }: any) => {
  return (
    <GridItem cursor={'pointer'} borderRadius={'15px'} overflow={'hidden'}>
      <Image className="imgAnimation" src={source} />
    </GridItem>
  );
};
