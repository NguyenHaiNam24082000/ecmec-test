import { MantineProvider, createEmotionCache } from '@mantine/core';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en_US', 'vi_VN'],
    fallbackLng: 'en_US',
    detection: {
      order: [
        'localStorage',
        'htmlTag',
        'path',
        'subdomain',
        'cookie',
        'querystring',
        'navigator',
        'sessionStorage',
      ],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    },
  });

const emotionCache = createEmotionCache({ key: 'ecmec' });

function AppProvider() {
  return (
    <MantineProvider emotionCache={emotionCache} withCSSVariables withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  );
}

export default AppProvider;
