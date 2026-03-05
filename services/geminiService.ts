
import { GoogleGenAI, Type } from "@google/genai";
import { SlideContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSlideContent(prompt: string): Promise<Partial<SlideContent>> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `قم بإنشاء محتوى لشريحة عرض (كاروسيل) بناءً على الوصف التالي: ${prompt}. 
    يجب أن يكون المحتوى باللغة العربية الفصحى وبأسلوب احترافي جداً.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topTitle: { type: Type.STRING },
          headerTitle: { type: Type.STRING },
          headerSubtitle: { type: Type.STRING },
          section1Title: { type: Type.STRING },
          section1Items: { type: Type.ARRAY, items: { type: Type.STRING } },
          section2Title: { type: Type.STRING },
          section2Items: { type: Type.ARRAY, items: { type: Type.STRING } },
          deadlineTitle: { type: Type.STRING },
          deadlineDate: { type: Type.STRING },
        },
        required: ["topTitle", "headerTitle", "headerSubtitle", "section1Title", "section1Items", "section2Title", "section2Items"],
      },
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return {};
  }
}
