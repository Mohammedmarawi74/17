
import { SlideContent } from './types';

export const COLORS = {
  primary: '#0f172a',
  secondary: '#0ea5e9',
  bgLight: '#ffffff',
  textDark: '#0f172a',
};

export const THEMES = [
  { name: 'كحلي المستثمر', primary: '#0f172a', secondary: '#0ea5e9', bg: '#ffffff', text: '#0f172a' },
  { name: 'الأحمر الصيني', primary: '#dc2626', secondary: '#facc15', bg: '#fffcf2', text: '#1a1a1a' },
  { name: 'سيان الابتكار', primary: '#0891b2', secondary: '#111827', bg: '#f0fdff', text: '#0e7490' },
  { name: 'فوشيا التحليل', primary: '#db2777', secondary: '#6366f1', bg: '#fff1f2', text: '#1e1b4b' },
  { name: 'لايم النمو', primary: '#65a30d', secondary: '#0284c7', bg: '#f7fee7', text: '#1a2e05' },
  { name: 'برتقالي الحركة', primary: '#f97316', secondary: '#ea580c', bg: '#fff7ed', text: '#431407' },
  { name: 'بنفسجي العمق', primary: '#7c3aed', secondary: '#3b82f6', bg: '#f5f3ff', text: '#1e1b4b' },
  { name: 'الوضع الداكن', primary: '#2dd4bf', secondary: '#f43f5e', bg: '#0f172a', text: '#f1f5f9' },
];

export const DEFAULT_SLIDE: SlideContent = {
  id: '1',
  topTitle: 'برنامج التدريب التعاوني',
  headerTitle: 'تعلن الشركة الوطنية للخدمات الزراعية',
  headerSubtitle: 'عن برنامج التدريب التعاوني لخريجي الجامعات للعام 2025',
  section1Title: 'التخصصات المطلوبة',
  section1Items: ['الطب البيطري', 'الهندسة الزراعية'],
  section2Title: 'شروط الانضمام للبرنامج',
  section2Items: [
    'أن يكون المتقدم سعودي الجنسية',
    'أن لا يقل المعدل التراكمي عن (3.75 من 5)',
    'اجتياز المقابلة الشخصية والتقييمات',
    'أن يكون التدريب متطلباً للتخرج'
  ],
  qrCodeText: 'سجل الآن',
  deadlineTitle: 'آخر موعد للتسجيل',
  deadlineDate: '30 أبريل 2025 م',
  footerPhone: '920020300',
  footerWebsite: 'agriserv.sa',
  footerBrand: 'الشركة الوطنية للخدمات الزراعية',
  primaryColor: THEMES[0].primary,
  secondaryColor: THEMES[0].secondary,
  backgroundColor: THEMES[0].bg,
  textColor: THEMES[0].text,
};
