# AgriServ Carousel Designer - منصة تصميم الكاروسيل

منصة احترافية لتصميم شرائح الكاروسيل بأسلوب كانفا، مع دعم الذكاء الاصطناعي.

## 🚀 النشر على Vercel

### الطريقة 1: الربط المباشر (موصى به)

1. ارفع المشروع على GitHub
2. اذهب إلى [vercel.com](https://vercel.com)
3. اضغط **Add New Project**
4. اختر مستودع GitHub الخاص بك
5. في إعدادات البناء، أضف متغير البيئة:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** مفتاح API الخاص بك من Google Gemini
6. اضغط **Deploy**

### الطريقة 2: استخدام Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# إعداد متغيرات البيئة
vercel env add GEMINI_API_KEY
```

### الطريقة 3: زر النشر المباشر

انسخ الرابط التالي واستبدل `YOUR_GITHUB_REPO` باسم مستودعك:

```
https://vercel.com/new/clone?repository-url=https://github.com/YOUR_GITHUB_REPO/your-repo-name&env=GEMINI_API_KEY
```

## 📋 متغيرات البيئة المطلوبة

| المتغير | الوصف | مطلوب |
|---------|-------|------|
| `GEMINI_API_KEY` | مفتاح API من Google Gemini للذكاء الاصطناعي | نعم |

## 🛠️ التطوير المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل خادم التطوير
npm run dev

# بناء المشروع
npm run build

# معاينة النسخة الإنتاجية
npm run preview
```

## 📦 التقنيات المستخدمة

- **React 19** - واجهة المستخدم
- **Vite** - أداة البناء
- **TypeScript** - الكتابة الثابتة
- **Tailwind CSS** - التنسيق
- **Google Gemini AI** - توليد المحتوى
- **html-to-image** - تصدير التصاميم

## 📝 ملاحظات مهمة

- تأكد من إضافة `GEMINI_API_KEY` في إعدادات Vercel بعد النشر
- المشروع يدعم إعادة التوجيه (SPA routing) عبر `vercel.json`
- جميع ملفات البناء تنتج في مجلد `dist`

## 🔗 روابط مفيدة

- [توثيق Vercel](https://vercel.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Vite Documentation](https://vitejs.dev/)
