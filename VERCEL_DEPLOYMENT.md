# ✅ دليل النشر على Vercel - AgriServ Carousel Designer

## 🎯 الخطوات السريعة

### الخطوة 1: التحضير المحلي

```bash
# 1. تأكد من تثبيت جميع الحزم
npm install

# 2. أنشئ ملف .env محلي للتطوير
cp .env.example .env

# 3. أضف مفتاح API في ملف .env
# GEMINI_API_KEY=your_actual_api_key_here

# 4. اختبر البناء محليًا
npm run build
```

### الخطوة 2: الرفع على GitHub

```bash
# 1. تهيئة Git (إذا لم يكن مُهيأ)
git init

# 2. إضافة جميع الملفات
git add .

# 3. إنشاء أول commit
git commit -m "Initial commit - AgriServ Carousel Designer"

# 4. إنشاء فرع main
git branch -M main

# 5. ربط المستودع البعيد (استبدل YOUR_USERNAME و YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 6. الرفع على GitHub
git push -u origin main
```

### الخطوة 3: النشر على Vercel

#### الطريقة A: من خلال الموقع (الأسهل)

1. **سجّل الدخول** إلى [Vercel](https://vercel.com)
2. **انقر** على "Add New Project"
3. **اختر** مستودع GitHub الذي رفعته
4. **انقر** على "Import"
5. **أضف متغير البيئة**:
   - Name: `GEMINI_API_KEY`
   - Value: `your-gemini-api-key-here`
6. **انقر** على "Deploy"
7. **انتظر** حتى يكتمل النشر (دقيقتين تقريبًا)

#### الطريقة B: من خلال CLI

```bash
# 1. تثبيت Vercel CLI عالميًا
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. النشر (يتبع التعليمات)
vercel

# 4. إضافة متغير البيئة
vercel env add GEMINI_API_KEY

# 5. إعادة النشر لتطبيق المتغيرات
vercel --prod
```

### الخطوة 4: التحقق من النشر

بعد اكتمال النشر:
- ستحصل على رابط مثل: `https://your-project.vercel.app`
- افتح الرابط في المتصفح
- اختبر تطبيقك

## 🔧 إعدادات مهمة بعد النشر

### إضافة متغيرات البيئة

```bash
# عرض جميع المتغيرات
vercel env ls

# إضافة متغير جديد
vercel env add GEMINI_API_KEY

# سحب المتغيرات محليًا
vercel env pull
```

### إعادة النشر عند التحديث

```bash
# دفع التغييرات على GitHub
git add .
git commit -m "Your update message"
git push origin main

# Vercel سيقوم بالنشر تلقائيًا!
```

## 📊 بنية المشروع

```
agriserv-carousel-designer/
├── index.html          # نقطة الدخول
├── styles.css          # ملف CSS المنفصل
├── App.tsx             # المكون الرئيسي
├── index.tsx           # نقطة دخول React
├── vite.config.ts      # إعدادات Vite
├── vercel.json         # إعدادات Vercel
├── package.json        # التبعيات والـ scripts
├── .env.example        # مثال لمتغيرات البيئة
├── components/         # مكونات React
│   └── SlideCanvas.tsx
├── services/           # خدمات API
│   └── geminiService.ts
├── constants.ts        # الثوابت
├── types.ts            # تعريفات TypeScript
└── dist/               # ملفات البناء (يتم إنشاؤها تلقائيًا)
```

## 🎨 مميزات المشروع

✅ **CSS منفصل** - ملف `styles.css` يحتوي على جميع التنسيقات
✅ **أسماء صديقة** - كلاسات CSS بأسماء واضحة ومنظمة
✅ **جاهز لـ Vercel** - إعدادات مسبقة في `vercel.json`
✅ **بناء محسّن** - Vite مع code splitting
✅ **TypeScript** - كتابة ثابتة للأمان
✅ **متجاوب** - يعمل على جميع الأجهزة

## 🐛 حل المشاكل الشائعة

### البناء يفشل على Vercel

```bash
# اختبر البناء محليًا أولاً
npm run build

# تأكد من أن node_modules غير مرفوعة
# تحقق من ملف .gitignore
```

### متغير البيئة لا يعمل

1. تأكد من إضافة `GEMINI_API_KEY` في إعدادات Vercel
2. أعد النشر بعد إضافة المتغير
3. تحقق من أن الاسم مطابق تمامًا

### التطبيق لا يعمل بعد النشر

```bash
# اختبر النسخة الإنتاجية محليًا
npm run preview

# تحقق من console في المتصفح
# تحقق من Network tab للأخطاء
```

## 📞 الدعم

- [توثيق Vercel](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

**تم الإنشاء بنجاح!** 🎉

المشروع الآن جاهز للرفع على Vercel بكل سهولة.
