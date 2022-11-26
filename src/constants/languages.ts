export enum Languages {
  ENGLISH_STUPEFIED = 'en_US',
  VIETNAMESE = 'vi_VN',
}

export interface LanguageEntry {
  name: string;
  code: string;
  label: string;
  value: string;
  rtl?: boolean;
}

const languages: { [key in Languages]: LanguageEntry } = {
  en_US: {
    name: 'English',
    code: 'en_US',
    label: 'English',
    value: 'English',
    rtl: false,
  },
  vi_VN: {
    name: 'Tiếng Việt',
    code: 'vi_VN',
    label: 'Viet Nam',
    value: 'Viet Nam',
    rtl: false,
  },
};

export default languages;
