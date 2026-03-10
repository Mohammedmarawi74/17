
import { SlideContent } from "../types";

export async function generateSlideContent(prompt: string): Promise<Partial<SlideContent>> {
  // Simulate network delay to maintain the "AI feel"
  await new Promise(resolve => setTimeout(resolve, 2000));

  // A more dynamic mock response that reflects the user's input
  const mainTopic = prompt.split(' ').slice(0, 3).join(' ') || "الموضوع المحدد";
  
  return {
    topTitle: "توليد تلقائي احترافي",
    headerTitle: prompt.length > 50 ? prompt.substring(0, 50) + "..." : prompt,
    headerSubtitle: `دراسة تحليلية حول ${mainTopic}`,
    section1Title: "النقاط الرئيسية",
    section1Items: [
      `تحليل متكامل لـ ${mainTopic}`,
      "استراتيجيات التنفيذ الفعال",
      "قياس مؤشرات الأداء الرئيسية"
    ],
    section2Title: "الخطوات القادمة",
    section2Items: [
      "مراجعة المسودة النهائية",
      "تنسيق الموارد اللازمة",
      "إطلاق المرحلة التجريبية"
    ],
    deadlineTitle: "تاريخ الإنجاز",
    deadlineDate: "خلال 30 يوم"
  };
}
