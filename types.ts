
export interface SlideContent {
  id: string;
  topTitle: string;
  headerTitle: string;
  headerSubtitle: string;
  section1Title: string;
  section1Items: string[];
  section2Title: string;
  section2Items: string[];
  qrCodeText: string;
  deadlineTitle: string;
  deadlineDate: string;
  footerPhone: string;
  footerWebsite: string;
  footerBrand: string;
  logoUrl?: string;
  logoOption?: 1 | 2 | 3 | 4 | null;
  customCss?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  qrCodeUrl?: string;
}

export interface AppState {
  slides: SlideContent[];
  activeSlideId: string;
  isGenerating: boolean;
  activeTab: 'ai' | 'text' | 'design' | 'customize';
}
