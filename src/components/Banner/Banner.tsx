import { Carousel } from '@mantine/carousel';
import { Box, Image, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import banner from '@assets/images/banner.png';
import { useRef } from 'react';

const Banner = () => {
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  return (
    <div style={{ position: 'relative' }}>
      <Box
        sx={{
          background:
            'linear-gradient(180deg, rgba(0, 114, 184, 0) 0%, rgba(0, 114, 184, 0.8) 92.19%, #0072B8 100%)',
          position: 'absolute',
          top: 108,
          left: 0,
          width: '100%',
          height: 972,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 112,
          color: '#ffffff',
          '@media (max-width: 1024px)': {
            height: 772,
          },
          '@media (max-width: 600px)': {
            alignItems: 'flex-start',
            height: 724,
          },
        }}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Text
          sx={{
            fontWeight: 700,
            fontSize: 96,
            '@media (max-width: 1024px)': {
              fontSize: 76,
            },
            '@media (max-width: 600px)': {
              fontSize: 40,
              marginLeft: 16,
              lineHeight: '49px',
            },
          }}
        >
          Đây là nơi để Tagline
        </Text>
        <Text
          sx={{
            fontWeight: 400,
            fontSize: 64,
            '@media (max-width: 1024px)': {
              fontSize: 44,
            },
            '@media (max-width: 600px)': {
              fontSize: 20,
              marginLeft: 16,
            },
          }}
        >
          Một câu gì đó dài dài để vào chỗ này
        </Text>
      </Box>
      <Carousel
        sx={{
          maxWidth: '100%',
          '@media (max-width: 1024px)': {
            height: '880px !important',
          },
          '@media (max-width: 600px)': {
            height: '830px !important',
            '.ecmec-Carousel-indicators': {
              left: 16,
              justifyContent: 'flex-start',
            },
          },
        }}
        styles={{
          indicator: {
            width: 6,
            height: 6,
            opacity: 1,
            zIndex: 100,
            marginBottom: 74,

            '&[data-active]': {
              background: '#EDE51C',
            },
          },
        }}
        mx="auto"
        loop
        withControls={false}
        withIndicators
        height={1080}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide>
          <Image src={banner} width="auto" height={1080} alt="Random unsplash image" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={banner} width="auto" height={1080} alt="Random unsplash image" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={banner} width="auto" height={1080} alt="Random unsplash image" />
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default Banner;
