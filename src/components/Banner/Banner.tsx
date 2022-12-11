import { getBanner } from '@apis/bannerApi';
import banner from '@assets/images/banner.png';
import configs from '@constants/configs';
import { bannerType } from '@constants/types';
import { Carousel } from '@mantine/carousel';
import { Box, Image, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';

const Banner = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [bannerObj, setBannerObj] = useState<bannerType>({
    tagLineVn: 'Đây là nơi để Tagline',
    tagLineEn: 'This is the place to Tagline',
    descriptionVn: 'Một câu gì đó dài dài để vào chỗ này',
    descriptionEn: 'A long sentence to enter this place',
    images: [
      {
        imageId: 1,
        url: banner,
      },
      {
        imageId: 2,
        url: banner,
      },
      {
        imageId: 3,
        url: banner,
      },
      {
        imageId: 4,
        url: banner,
      },
      {
        imageId: 5,
        url: banner,
      },
    ],
  });

  useEffect(() => {
    getBanner().then((res: any) => {
      const obj = res.data;
      if (obj?.id) {
        setBannerObj(obj);
      }
    });
  }, []);

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
          {i18next.language === 'vi_VN' ? bannerObj.tagLineVn : bannerObj.tagLineEn}
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
          {i18next.language === 'vi_VN' ? bannerObj.descriptionVn : bannerObj.descriptionEn}
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
        {bannerObj.images.map((image) => (
          <Carousel.Slide key={image?.imageId}>
            <Image
              withPlaceholder
              src={configs.BASE_IMAGE_URL + image?.url}
              width="auto"
              height={1080}
              alt="Random unsplash image"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
