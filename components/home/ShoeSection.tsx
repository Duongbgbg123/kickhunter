import { Box, Grid } from '@chakra-ui/react';
import { BigGridBox, SmallGridBox } from './GridBox';
import { HomeDescText, HomeText } from './HomeText';

export const ShoeSection = ({ name, category, image, description }: any) => {
  return (
    <Box
      m={'60px auto 60px'}
      w={['94%', '94%', '94%', '94%', '80%']}
      textAlign={'center'}
    >
      <HomeText>{name}</HomeText>
      <HomeDescText>{description}</HomeDescText>

      <Grid
        onClick={() => {}}
        gap={['10px', '10px', '10px', '10px', '20px']}
        templateColumns={'repeat(2, 1fr)'}
      >
        <BigGridBox source={image[0]} />
        <SmallGridBox source={image[1]} />
        <SmallGridBox source={image[2]} />
      </Grid>
    </Box>
  );
};
