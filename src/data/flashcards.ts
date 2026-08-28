import { Flashcard } from '../types';

export const GRADE_6_FLASHCARDS: Flashcard[] = [
  // Arabic Flashcards
  {
    id: 'ar-1',
    subject: 'arabic',
    topic: 'النحو',
    title: 'الأفعال الخمسة',
    front: 'ما هي الأفعال الخمسة وكيف تُعرب؟',
    back: 'هي كل فعل مضارع اتصلت به (ألف الاثنين، واو الجماعة، أو ياء المخاطبة).',
    example: 'تُرفع بثبوت النون (يكتبون)، وتُنصب وتُجزم بحذف النون (لن يكتبوا / لم يكتبوا).',
    tag: 'نحو وإعراب',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'ar-2',
    subject: 'arabic',
    topic: 'النحو',
    title: 'الأسماء الخمسة',
    front: 'ما هي الأسماء الخمسة وما علامات إعرابها؟',
    back: 'هي: (أبو، أخو، حمو، فو، ذو بمعنى صاحب).',
    example: 'تُرفع بالواو (جاءَ أبوك)، تُنصب بالألف (رأيتُ أباك)، وتُجر بالياء (مررتُ بأبيك).',
    tag: 'قواعد الإعراب',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'ar-3',
    subject: 'arabic',
    topic: 'الصرف',
    title: 'اسم الفاعل واسم المفعول',
    front: 'كيف يُصاغ اسم الفاعل واسم المفعول من الفعل الثلاثي؟',
    back: 'اسم الفاعل على وزن (فاعِل) مثل: كَتَبَ -> كاتِب. اسم المفعول على وزن (مَفْعُول) مثل: كَتَبَ -> مَكْتُوب.',
    example: 'صانِع (فاعل يدل على من قام بالفعل)، مَصْنُوع (مفعول يدل على من وقع عليه الفعل).',
    tag: 'علم الصرف والمشتقات',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'ar-4',
    subject: 'arabic',
    topic: 'الإملاء',
    title: 'الفرق بين همزة الوصل والقطع',
    front: 'كيف نميز سريعاً بين همزة الوصل وهمزة القطع؟',
    back: 'ضع قبل الكلمة حرف الواو (و) أو الفاء (ف) وانطقها.',
    example: 'إذا اختفت الهمزة في النطق فهي وصل (واستمع)، وإذا ثبتت ونُطقت فهي قطع (وأكرم).',
    tag: 'قواعد الإملاء',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'ar-5',
    subject: 'arabic',
    topic: 'النحو',
    title: 'جمع التكسير وجمع المؤنث والمذكر السالم',
    front: 'ما الفروق الأساسية في علامات إعراب الجموع؟',
    back: 'جمع المذكر السالم (يرفع بالواو وينصب ويجر بالياء)، جمع المؤنث السالم (يرفع بالضمة وينصب ويجر بالكسرة)، جمع التكسير (يعرب بالحركات الأصلية).',
    example: 'المعلمونَ مخلصونَ / شكرتُ المعلماتِ / قرأتُ الكتبَ المفيدة.',
    tag: 'أنواع الجموع',
    color: 'from-emerald-600 to-teal-700'
  },

  // Math Flashcards
  {
    id: 'math-1',
    subject: 'math',
    topic: 'الهندسة',
    title: 'مساحة ومحيط الدائرة',
    front: 'ما هي قوانين مساحة الدائرة ومحيطها؟',
    back: 'المساحة = ط × نق² (π × r²)\nالمحيط = 2 × ط × نق = ط × طول القطر (2 × π × r)',
    example: 'لدائرة نصف قطرها 7 سم: المساحة = 22/7 × 7 × 7 = 154 سم².',
    tag: 'قوانين الهندسة',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'math-2',
    subject: 'math',
    topic: 'الهندسة والقياس',
    title: 'حجم متوازي المستطيلات والمكعب',
    front: 'كيف نحسب حجم المكعب ومتوازي المستطيلات؟',
    back: 'حجم المكعب = طول الحرف × نفسه × نفسه (L³)\nحجم متوازي المستطيلات = الطول × العرض × الارتفاع = مساحة القاعدة × الارتفاع',
    example: 'مكعب طول حرفه 5 سم يكون حجمه: 5 × 5 × 5 = 125 سم³.',
    tag: 'المجسمات والحجوم',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'math-3',
    subject: 'math',
    topic: 'النسبة والتناسب',
    title: 'خواص النسبة والتناسب',
    front: 'ما هي النسبة وكيف تحل مسائل النسبة المئوية؟',
    back: 'النسبة هي مقارنة بين كميتين من نفس النوع والوحدة. التناسب هو تساوي نسبتين.',
    example: 'إذا كان أ/ب = ج/د، فإن حاصل ضرب الطرفين = حاصل ضرب الوسطين (أ × د = ب × ج).',
    tag: 'النسبة والتناسب',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'math-4',
    subject: 'math',
    topic: 'الأعداد والعمليات',
    title: 'ضرب وقسمة الكسور العادية والعشرية',
    front: 'ما هي القاعدة الذهبية لقسمة الكسور؟',
    back: 'نحول القسمة إلى ضرب ونقلب الكسر الثاني (المقسوم عليه) إلى معكوسه الضربي.',
    example: '3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8 = 1 و 7/8.',
    tag: 'الكسور والحساب',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'math-5',
    subject: 'math',
    topic: 'الإحصاء',
    title: 'الوسط الحسابي والوسيط والمنوال والمدى',
    front: 'كيف تميز بين المفاهيم الإحصائية الأساسية؟',
    back: '• الوسط الحسابي: مجموع القيم ÷ عددها.\n• الوسيط: القيمة في المنتصف بعد الترتيب.\n• المنوال: القيمة الأكثر تكراراً.\n• المدى: أكبر قيمة - أصغر قيمة.',
    example: 'للقيم (2, 4, 4, 6, 9): الوسط = 5، الوسيط = 4، المنوال = 4، المدى = 7.',
    tag: 'الإحصاء والاحتمالات',
    color: 'from-amber-600 to-orange-700'
  },

  // English Flashcards
  {
    id: 'en-1',
    subject: 'english',
    topic: 'Grammar',
    title: 'Present Simple vs. Present Continuous',
    front: 'When do we use Present Simple vs. Present Continuous?',
    back: '• Present Simple: Habits, facts, daily routines (I play, He plays).\n• Present Continuous: Actions happening right now (am/is/are + verb-ing).',
    example: '"He usually plays tennis on Friday, but today he is swimming."',
    tag: 'Tenses & Rules',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'en-2',
    subject: 'english',
    topic: 'Grammar',
    title: 'Comparative and Superlative Adjectives',
    front: 'How do we form Comparative and Superlative for short & long adjectives?',
    back: '• Short adjectives: tall -> taller than -> the tallest.\n• Long adjectives: beautiful -> more beautiful than -> the most beautiful.',
    example: '"Cheetah is faster than lion, but it is the fastest land animal."',
    tag: 'Comparison Rules',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'en-3',
    subject: 'english',
    topic: 'Grammar',
    title: 'Past Simple & Irregular Verbs',
    front: 'What are common irregular past verbs in Grade 6?',
    back: 'go -> went, see -> saw, buy -> bought, have -> had, write -> wrote, eat -> ate, make -> made.',
    example: '"Yesterday, I went to the library and bought two interesting science books."',
    tag: 'Verb Forms',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'en-4',
    subject: 'english',
    topic: 'Vocabulary',
    title: 'Connectors & Conjunctions',
    front: 'How to use: although, because, so, but, and?',
    back: '• Because: expresses reason.\n• So: expresses result.\n• Although / But: express contrast.\n• And: joins similar ideas.',
    example: '"Although it was raining, the children played outside because they love rain."',
    tag: 'Linking Words',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'en-5',
    subject: 'english',
    topic: 'Grammar',
    title: 'Modal Verbs (Must, Should, Can, May)',
    front: 'What do modal verbs express and what comes after them?',
    back: 'Always followed by the base infinitive verb (without to or -ing).\n• Must: strong obligation / necessity.\n• Should: advice / recommendation.\n• Can: ability / permission.',
    example: '"You must study hard and you should sleep early before the exam."',
    tag: 'Modals & Usage',
    color: 'from-blue-600 to-cyan-700'
  }
];
