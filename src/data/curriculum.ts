import { LessonUnit, Question, Badge, AvatarOption, StreakMilestone } from '../types';

export const LESSON_UNITS: LessonUnit[] = [
  {
    id: 'math',
    subject: 'math',
    title: 'الرياضيات المطورة',
    icon: 'Calculator',
    description: 'الأعداد الصحيحة، الكسور والعمليات، التناسب والنسب المئوية، محيط ومساحة الدائرة، وحل المسائل الوزارية',
    gradeLevel: 'المنهج العراقي - السادس الابتدائي',
    totalStages: 10,
    color: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    badgeName: 'عبقري الرياضيات',
    badgeIcon: 'Award'
  },
  {
    id: 'arabic',
    subject: 'arabic',
    title: 'قواعد اللغة العربية',
    icon: 'BookOpen',
    description: 'النكرة والمعرفة، كان وإن وأخواتها، الفاعل ونائب الفاعل، المفاعيل (المطلق وفيه)، وإعراب الفعل المضارع',
    gradeLevel: 'المنهج العراقي - السادس الابتدائي',
    totalStages: 10,
    color: 'from-emerald-500 to-teal-700',
    accentColor: '#10b981',
    badgeName: 'فصيح اللسان',
    badgeIcon: 'Feather'
  },
  {
    id: 'english',
    subject: 'english',
    title: 'English for Iraq (6th Primary)',
    icon: 'Globe',
    description: 'Jobs & Workplaces, Materials, Online Safety, Solar System, Cooking Verbs, and Grammar Mastery',
    gradeLevel: 'Iraq Curriculum - 6th Primary',
    totalStages: 10,
    color: 'from-blue-500 to-indigo-700',
    accentColor: '#3b82f6',
    badgeName: 'English Champion',
    badgeIcon: 'Sparkles'
  }
];

export const AVATARS: AvatarOption[] = [
  {
    id: 'falcon',
    name: 'صقر المعرفة',
    nameEn: 'Smart Falcon',
    emoji: '🦅',
    description: 'سريع البديهة ولديه نظرة ثاقبة في حل المسائل الصعبة',
    bgGradient: 'from-amber-400 to-orange-500',
    minLevel: 1
  },
  {
    id: 'knight',
    name: 'فارس الحكمة',
    nameEn: 'Brave Knight',
    emoji: '🛡️',
    description: 'شجاع لا يستسلم ويتعلم من كل خطأ ليصبح أقوى',
    bgGradient: 'from-blue-500 to-indigo-600',
    minLevel: 1
  },
  {
    id: 'explorer',
    name: 'مكتشف الفضاء',
    nameEn: 'Astro Explorer',
    emoji: '🚀',
    description: 'شغوف بالعلوم واللغات ويحب السفر بين المجرات',
    bgGradient: 'from-purple-500 to-pink-600',
    minLevel: 2
  },
  {
    id: 'scientist',
    name: 'المخترع العبقري',
    nameEn: 'Genius Inventor',
    emoji: '🔬',
    description: 'يحلل القواعد ويبتكر طرقاً مبتكرة للوصول للإجابة الصحيحة',
    bgGradient: 'from-emerald-400 to-teal-600',
    minLevel: 3
  },
  {
    id: 'wizard',
    name: 'حكيم الأرقام',
    nameEn: 'Math Wizard',
    emoji: '🧙‍♂️',
    description: 'يتحكم في طاقة الأرقام والحروف ويفكك أصعب الألغاز',
    bgGradient: 'from-violet-600 to-fuchsia-600',
    minLevel: 5
  }
];

export const BADGES: Badge[] = [
  {
    id: 'first_step',
    title: 'الخطوة الأولى',
    titleEn: 'First Step',
    description: 'أكملت أول تحدٍ تعليمي بنجاح!',
    icon: 'Footprints',
    category: 'general',
    unlocked: true
  },
  {
    id: 'math_master',
    title: 'أسد الرياضيات',
    titleEn: 'Math Master',
    description: 'حققت 5 نجوم في مادة الرياضيات',
    icon: 'Calculator',
    category: 'math',
    requiredStars: 5,
    unlocked: false
  },
  {
    id: 'arabic_scholar',
    title: 'فارس الضاد',
    titleEn: 'Arabic Scholar',
    description: 'أتقنت قواعد الإعراب والهمزات في اللغة العربية',
    icon: 'BookOpen',
    category: 'arabic',
    requiredStars: 5,
    unlocked: false
  },
  {
    id: 'english_star',
    title: 'نجم الإنجليزية',
    titleEn: 'English Superstar',
    description: 'تفوقت في تحديات القواعد والمفردات الإنجليزية',
    icon: 'Sparkles',
    category: 'english',
    requiredStars: 5,
    unlocked: false
  },
  {
    id: 'speed_demon',
    title: 'صاروخ الحساب الذهني',
    titleEn: 'Speed Racer',
    description: 'حققت أكثر من 150 نقطة في لعبة سباق الرياضيات',
    icon: 'Zap',
    category: 'math',
    unlocked: false
  },
  {
    id: 'spelling_bee',
    title: 'بطل التهجئة',
    titleEn: 'Spelling Bee King',
    description: 'هجأت 10 كلمات إنجليزية بشكل صحيح دون خطأ',
    icon: 'Volume2',
    category: 'english',
    unlocked: false
  },
  {
    id: 'streak_3',
    title: 'شعلة الإصرار (3 أيام)',
    titleEn: '3-Day Fire',
    description: 'درست ومارست التمارين لمدة 3 أيام متتالية دون انقطاع!',
    icon: 'Flame',
    category: 'general',
    unlocked: false
  },
  {
    id: 'streak_7',
    title: 'تاج الأسبوع الذهبي (7 أيام) 👑',
    titleEn: '7-Day Golden Crown',
    description: 'أكملت أسبوعاً كاملاً من التعلم المتواصل وحققت إنجاز الـ 7 أيام الأسطوري!',
    icon: 'Crown',
    category: 'general',
    unlocked: false
  },
  {
    id: 'streak_14',
    title: 'فارس المثابرة (14 يوماً)',
    titleEn: '14-Day Perseverance',
    description: 'استمريت في المذاكرة لأسبوعين كاملين بنجاح وهمة عالية.',
    icon: 'Shield',
    category: 'general',
    unlocked: false
  },
  {
    id: 'streak_30',
    title: 'أسطورة البكالوريا (30 يوماً)',
    titleEn: '30-Day Legend',
    description: 'حافظت على شعلة التعلم لشهر كامل، وصرت جاهزاً للاختبارات الوزارية بتفوق!',
    icon: 'Award',
    category: 'general',
    unlocked: false
  }
];

export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    dayCount: 3,
    badgeId: 'streak_3',
    badgeTitle: 'شعلة الإصرار',
    rewardCoins: 40,
    rewardXp: 60,
    icon: 'Flame',
    description: '3 أيام متتالية من التعلم وحل الأسئلة'
  },
  {
    dayCount: 7,
    badgeId: 'streak_7',
    badgeTitle: 'تاج الأسبوع الذهبي (7 أيام) 👑',
    rewardCoins: 100,
    rewardXp: 200,
    icon: 'Crown',
    description: 'إنجاز 7 أيام متتالية - وسام أسبوع العباقرة الذهبي والمكافأة الكبرى!'
  },
  {
    dayCount: 14,
    badgeId: 'streak_14',
    badgeTitle: 'فارس المثابرة',
    rewardCoins: 150,
    rewardXp: 300,
    icon: 'Shield',
    description: '14 يوماً من الحضور والتعلم اليومي'
  },
  {
    dayCount: 30,
    badgeId: 'streak_30',
    badgeTitle: 'أسطورة البكالوريا',
    rewardCoins: 300,
    rewardXp: 600,
    icon: 'Award',
    description: '30 يوماً متواصلاً من الاستعداد والتفوق'
  }
];

// Rich, curriculum-aligned 6th grade questions for Math, Arabic, and English
export const QUESTIONS_BANK: Question[] = [
  // ===================== MATH (الرياضيات) =====================
  // Level 1: الكسور الاعتيادية
  {
    id: 'm_1_1',
    subject: 'math',
    topic: 'fractions_add',
    topicTitleAr: 'جمع وطرح الكسور الاعتيادية',
    level: 1,
    question: 'ما هو ناتج جمع الكسرين: 2/5 + 1/5 ؟',
    options: ['3/5', '3/10', '2/10', '1/5'],
    correctAnswer: '3/5',
    explanation: 'عند جمع كسور لها نفس المقام، نجمع البسطين ونبقي المقام كما هو: 2 + 1 = 3 والمقام 5، إذن الناتج 3/5.',
    hint: 'المقامات موحدة (5)، اجمع البسط مع البسط فقط!',
    points: 15
  },
  {
    id: 'm_1_2',
    subject: 'math',
    topic: 'fractions_simplify',
    topicTitleAr: 'تبسيط الكسور',
    level: 1,
    question: 'ما هي أبسط صورة للكسر 6/9 ؟',
    options: ['2/3', '3/4', '1/3', '6/3'],
    correctAnswer: '2/3',
    explanation: 'نقسم كلاً من البسط والمقام على العامل المشترك الأكبر (3): 6 ÷ 3 = 2 و 9 ÷ 3 = 3، فيكون 2/3.',
    hint: 'اقسم البسط والمقام على الرقم 3.',
    points: 15
  },
  {
    id: 'm_1_3',
    subject: 'math',
    topic: 'fractions_diff_denom',
    topicTitleAr: 'جمع كسور مختلفة المقامات',
    level: 1,
    question: 'ما هو ناتج: 1/2 + 1/4 ؟',
    options: ['3/4', '2/6', '2/4', '1/8'],
    correctAnswer: '3/4',
    explanation: 'نوحد المقامات بجعل 1/2 = 2/4، ثم نجمع: 2/4 + 1/4 = 3/4.',
    hint: 'حوّل النصف (1/2) إلى ربعين (2/4) ثم اجمع مع 1/4.',
    points: 20
  },

  // Level 2: ضرب وقسمة الكسور
  {
    id: 'm_2_1',
    subject: 'math',
    topic: 'fractions_multiply',
    topicTitleAr: 'ضرب الكسور',
    level: 2,
    question: 'ما هو ناتج ضرب: (2/3) × (3/4) في أبسط صورة؟',
    options: ['1/2', '6/12', '5/7', '2/4'],
    correctAnswer: '1/2',
    explanation: 'نضرب البسط في البسط (2×3=6) والمقام في المقام (3×4=12)، الناتج 6/12 ونبسطه بقسمة الطرفين على 6 ليصبح 1/2.',
    hint: 'يمكنك اختصار 3 مع 3 أولاً!',
    points: 20
  },
  {
    id: 'm_2_2',
    subject: 'math',
    topic: 'fractions_divide',
    topicTitleAr: 'قسمة الكسور',
    level: 2,
    question: 'ما هو ناتج: (3/4) ÷ (1/2) ؟',
    options: ['3/2 (1 و نصف)', '3/8', '2/3', '4/6'],
    correctAnswer: '3/2 (1 و نصف)',
    explanation: 'لقسمة الكسور نحول القسمة لضرب ونقلب الكسر الثاني (المعكوس الضربي): 3/4 × 2/1 = 6/4 = 3/2.',
    hint: 'ثبّت الكسر الأول، غيّر القسمة لضرب، واقلب الكسر الثاني!',
    points: 20
  },

  // Level 3: النسبة والتناسب والنسبة المئوية
  {
    id: 'm_3_1',
    subject: 'math',
    topic: 'ratio',
    topicTitleAr: 'النسبة والتناسب',
    level: 3,
    question: 'في فصل يوجد 15 ولداً و 10 بنات. ما نسبة عدد الأولاد إلى عدد البنات في أبسط صورة؟',
    options: ['3 : 2', '2 : 3', '3 : 5', '15 : 10'],
    correctAnswer: '3 : 2',
    explanation: 'نسبة الأولاد إلى البنات = 15 ÷ 10. بقسمة الطرفين على 5 تصبح 3 إلى 2 (3 : 2).',
    hint: 'اقسم كلاً من 15 و 10 على 5.',
    points: 20
  },
  {
    id: 'm_3_2',
    subject: 'math',
    topic: 'percentage',
    topicTitleAr: 'النسبة المئوية',
    level: 3,
    question: 'ما هي قيمة 25% من العدد 80؟',
    options: ['20', '25', '40', '15'],
    correctAnswer: '20',
    explanation: '25% تمثل الربع (1/4). ربع العدد 80 هو: 80 ÷ 4 = 20.',
    hint: '25% تعني الربع (1/4)، اضرب 80 × 0.25 أو اقسم 80 على 4.',
    points: 20
  },

  // Level 4: الأعداد الصحيحة وخط الأعداد
  {
    id: 'm_4_1',
    subject: 'math',
    topic: 'integers_compare',
    topicTitleAr: 'مقارنة الأعداد الصحيحة',
    level: 4,
    question: 'أي من الأعداد التالية هو الأكبر قيمة؟',
    options: ['-2', '-10', '-1', '0'],
    correctAnswer: '0',
    explanation: 'على خط الأعداد، كلما اتجهنا يميناً كبر العدد. الصفر أكبر من أي عدد سالب (0 > -1 > -2 > -10).',
    hint: 'العدد الأقرب لليمين على خط الأعداد هو الأكبر، والصفر أكبر من السوالب!',
    points: 20
  },
  {
    id: 'm_4_2',
    subject: 'math',
    topic: 'integers_add',
    topicTitleAr: 'جمع وطرح الأعداد السالبة',
    level: 4,
    question: 'ما هو ناتج: (-5) + (+8) ؟',
    options: ['+3', '-3', '-13', '+13'],
    correctAnswer: '+3',
    explanation: 'إشارتان مختلفتان: نطرح العددين (8 - 5 = 3) ونأخذ إشارة العدد الأكبر بالقيمة المطلقة (+8)، فالناتج +3.',
    hint: 'معك 8 وتدين بـ 5، كم يتبقى معك؟',
    points: 20
  },

  // Level 5: المعادلات البسيطة والمتغيرات
  {
    id: 'm_5_1',
    subject: 'math',
    topic: 'equations',
    topicTitleAr: 'حل المعادلات الخطية',
    level: 5,
    question: 'إذا كان: س + 7 = 15، فما قيمة (س)؟',
    options: ['8', '22', '7', '9'],
    correctAnswer: '8',
    explanation: 'نطرح 7 من طرفي المعادلة: س = 15 - 7 = 8.',
    hint: 'ما الرقم الذي إذا أضفت له 7 يصبح 15؟',
    points: 20
  },
  {
    id: 'm_5_2',
    subject: 'math',
    topic: 'equations_mult',
    topicTitleAr: 'معادلات الضرب',
    level: 5,
    question: 'إذا كان: 4 ص = 28، فما قيمة (ص)؟',
    options: ['7', '6', '8', '24'],
    correctAnswer: '7',
    explanation: 'نقسم طرفي المعادلة على 4: ص = 28 ÷ 4 = 7.',
    hint: '28 مقسومة على 4 تساوي كم؟',
    points: 20
  },

  // Level 6: الهندسة والمساحات
  {
    id: 'm_6_1',
    subject: 'math',
    topic: 'geometry_triangle',
    topicTitleAr: 'مساحة المثلث',
    level: 6,
    question: 'مثلث طول قاعدته 10 سم وارتفاعه 6 سم. ما هي مساحته؟',
    options: ['30 سم²', '60 سم²', '16 سم²', '20 سم²'],
    correctAnswer: '30 سم²',
    explanation: 'قانون مساحة المثلث = نصف القاعدة × الارتفاع = 0.5 × 10 × 6 = 30 سم².',
    hint: 'مساحة المثلث = (القاعدة × الارتفاع) ÷ 2',
    points: 25
  },
  {
    id: 'm_6_2',
    subject: 'math',
    topic: 'geometry_circle',
    topicTitleAr: 'محيط ومساحة الدائرة',
    level: 6,
    question: 'ما هو قانون محيط الدائرة؟ (نق = نصف القطر، ط / π = 3.14)',
    options: ['2 × ط × نق', 'ط × نق²', 'ط + نق', '2 × ط + نق'],
    correctAnswer: '2 × ط × نق',
    explanation: 'محيط الدائرة = 2 × ط × نق (أو القطر × ط)، بينما المساحة = ط × نق².',
    hint: 'المحيط يقاس بالطول الخارجي ورمزه 2πr.',
    points: 25
  },

  // Level 7: الحجوم والمجسمات
  {
    id: 'm_7_1',
    subject: 'math',
    topic: 'volume_cube',
    topicTitleAr: 'حجم المكعب',
    level: 7,
    question: 'مكعب طول حرفه (ضلعه) 4 سم. ما هو حجمه؟',
    options: ['64 سم³', '16 سم³', '48 سم³', '12 سم³'],
    correctAnswer: '64 سم³',
    explanation: 'حجم المكعب = طول الضلع × طول الضلع × طول الضلع = 4 × 4 × 4 = 64 سم³.',
    hint: 'اضرب 4 في نفسها 3 مرات: 4 × 4 × 4',
    points: 25
  },

  // Level 8: الإحصاء والبيانات
  {
    id: 'm_8_1',
    subject: 'math',
    topic: 'statistics_mean',
    topicTitleAr: 'المتوسط الحسابي والوسيط',
    level: 8,
    question: 'ما هو المتوسط الحسابي للأعداد التالية: 4، 6، 8، 10، 12؟',
    options: ['8', '6', '10', '40'],
    correctAnswer: '8',
    explanation: 'المتوسط الحسابي = مجموع القيم ÷ عددها = (4+6+8+10+12) ÷ 5 = 40 ÷ 5 = 8.',
    hint: 'اجمع الأعداد الخمسة معاً ثم اقسم الناتج على 5.',
    points: 25
  },

  // ===================== ARABIC (اللغة العربية) =====================
  // Level 1: كان وأخواتها
  {
    id: 'a_1_1',
    subject: 'arabic',
    topic: 'kana_sisters',
    topicTitleAr: 'كان وأخواتها وعملها النحوي',
    level: 1,
    question: 'ما هو عمل "كان وأخواتها" عند دخولها على الجملة الاسمية؟',
    options: [
      'ترفع المبتدأ ويسمى اسمها، وتنصب الخبر ويسمى خبرها',
      'تنصب المبتدأ وترفع الخبر',
      'ترفع المبتدأ والخبر معاً',
      'تجزم المبتدأ والخبر'
    ],
    correctAnswer: 'ترفع المبتدأ ويسمى اسمها، وتنصب الخبر ويسمى خبرها',
    explanation: 'كان وأخواتها أفعال ناسخة تدخل على الجملة الاسمية فترفع المبتدأ (اسمها) وتنصب الخبر (خبرها)، مثل: (كانَ الجوُّ جميلًا).',
    hint: 'تذكر: كان ترفع الأول وتنصب الثاني.',
    points: 15
  },
  {
    id: 'a_1_2',
    subject: 'arabic',
    topic: 'kana_example',
    topicTitleAr: 'تطبيق إعرابي على كان',
    level: 1,
    question: 'أكمل الجملة بالشكل الصحيح: "صارَ الجوُّ .........."',
    options: ['باردًا', 'باردٌ', 'باردٍ', 'باردُ'],
    correctAnswer: 'باردًا',
    explanation: 'خبر صار منصوب وعلامة نصبه الفتحة الظاهرة على آخره (باردًا).',
    hint: 'خبر صار يكون منصوباً بتنوين الفتح.',
    points: 15
  },

  // Level 2: إن وأخواتها
  {
    id: 'a_2_1',
    subject: 'arabic',
    topic: 'inna_sisters',
    topicTitleAr: 'إن وأخواتها والحروف الناسخة',
    level: 2,
    question: 'ما هو عمل "إنَّ وأخواتها" في الجملة الاسمية؟',
    options: [
      'تنصب المبتدأ وترفع الخبر',
      'ترفع المبتدأ وتنصب الخبر',
      'تجر المبتدأ والخبر',
      'تنصب الاثنين معاً'
    ],
    correctAnswer: 'تنصب المبتدأ وترفع الخبر',
    explanation: 'إنَّ وأخواتها حروف ناسخة تنصب المبتدأ ويسمى اسمها، وترفع الخبر ويسمى خبرها، مثل: (إنَّ العلمَ نورٌ).',
    hint: 'عكس كان تماماً! إنَّ تنصب الاسم وترفع الخبر.',
    points: 20
  },
  {
    id: 'a_2_2',
    subject: 'arabic',
    topic: 'inna_example',
    topicTitleAr: 'ضبط اسم وخبر إن',
    level: 2,
    question: 'اختر الضبط الصحيح للجملة: "إنَّ .......... مجتهدٌ"',
    options: ['الطالبَ', 'الطالبُ', 'الطالبِ', 'الطالبْ'],
    correctAnswer: 'الطالبَ',
    explanation: 'اسم إنَّ منصوب بالفتحة (الطالبَ).',
    hint: 'اسم إنّ يأتي منصوباً بالفتحة.',
    points: 20
  },

  // Level 3: الفاعل ونائب الفاعل
  {
    id: 'a_3_1',
    subject: 'arabic',
    topic: 'passive_subject',
    topicTitleAr: 'الفعل المبني للمجهول ونائب الفاعل',
    level: 3,
    question: 'في جملة "كُتِبَ الدَّرْسُ"، ما إعراب كلمة "الدَّرْسُ"؟',
    options: ['نائب فاعل مرفوع', 'فاعل مرفوع', 'مفعول به منصوب', 'خبر مرفوع'],
    correctAnswer: 'نائب فاعل مرفوع',
    explanation: 'الفعل (كُتِبَ) مبني للمجهول، ولذلك الاسم بعده (الدرسُ) يعرب نائب فاعل مرفوع بالضمة.',
    hint: 'الفعل مبني للمجهول (أوله مضموم ومكسور ما قبل آخره)، ما الذي يأتي بعده؟',
    points: 20
  },

  // Level 4: الأفعال الخمسة
  {
    id: 'a_4_1',
    subject: 'arabic',
    topic: 'five_verbs',
    topicTitleAr: 'إعراب الأفعال الخمسة',
    level: 4,
    question: 'بماذا تُرفع الأفعال الخمسة وبماذا تُنصب وتُجزم؟',
    options: [
      'تُرفع بثبوت النون، وتُنصب وتُجزم بحذف النون',
      'تُرفع بالضمة وتُنصب بالفتحة',
      'تُرفع بالواو وتُنصب بالألف',
      'تُرفع بحذف النون وتُنصب بثبوتها'
    ],
    correctAnswer: 'تُرفع بثبوت النون، وتُنصب وتُجزم بحذف النون',
    explanation: 'الأفعال الخمسة كل فعل مضارع اتصلت به ألف الاثنين أو واو الجماعة أو ياء المخاطبة. علامة رفعها ثبوت النون (يعملون)، ونصبها وجزمها حذف النون (لم يعملوا / لن يعملوا).',
    hint: 'الأولاد يلعبون (ثبوت النون)، لم يلعبوا (حذف النون).',
    points: 25
  },

  // Level 5: الأسماء الخمسة
  {
    id: 'a_5_1',
    subject: 'arabic',
    topic: 'five_nouns',
    topicTitleAr: 'علامات إعراب الأسماء الخمسة',
    level: 5,
    question: 'ما هي علامات إعراب الأسماء الخمسة (أبو، أخو، حمو، فو، ذو)؟',
    options: [
      'تُرفع بالواو، وتُنصب بالألف، وتُجر بالياء',
      'تُرفع بالألف وتُنصب بالياء',
      'تُرفع بالضمة وتُنصب بالكسرة',
      'تُرفع بالواو وتُنصب بالياء وتجر بالألف'
    ],
    correctAnswer: 'تُرفع بالواو، وتُنصب بالألف، وتُجر بالياء',
    explanation: 'الأسماء الخمسة تعرب بالحروف: الواو رفعاً (جاء أبوك)، الألف نصباً (رأيت أباك)، والياء جراً (سلّمت على أبيك).',
    hint: 'تذكر الترتيب: واو (رفع)، ألف (نصب)، ياء (جر) = (واي).',
    points: 25
  },

  // Level 6: الإملاء والهمزات
  {
    id: 'a_6_1',
    subject: 'arabic',
    topic: 'hamza_rules',
    topicTitleAr: 'همزتا الوصل والقطع',
    level: 6,
    question: 'أي الكلمات التالية تبدأ بـ "همزة قطع" صحيحة؟',
    options: ['أحمد', 'استماع', 'ابن', 'القلم'],
    correctAnswer: 'أحمد',
    explanation: 'همزة القطع تُرسم وتنطق (أ / إ)، مثل اسم "أحمد"، بينما (استماع، ابن، القلم) همزات وصل.',
    hint: 'ضع قبل الكلمة حرف الواو (وأحمد)، إذا نطقت الهمزة فهي قطع وتكتب برأس العين.',
    points: 20
  },
  {
    id: 'a_6_2',
    subject: 'arabic',
    topic: 'middle_hamza',
    topicTitleAr: 'الهمزة المتوسطة على نبرة',
    level: 6,
    question: 'لماذا كُتبت الهمزة على نبرة (ياء) في كلمة: "سُئِلَ"؟',
    options: [
      'لأن الهمزة مكسورة، والكسرة أقوى الحركات',
      'لأن الهمزة مضمومة',
      'لأن الحرف قبلها ساكن',
      'لأنها مفتوحة'
    ],
    correctAnswer: 'لأن الهمزة مكسورة، والكسرة أقوى الحركات',
    explanation: 'أقوى الحركات هي الكسرة وتناسبها النبرة (ئ)، ثم الضمة (ؤ)، ثم الفتحة (أ). وبما أن الهمزة في "سُئِل" مكسورة، كُتبت على نبرة.',
    hint: 'الكسرة هي أقوى الحركات دائماً وتفوز بالياء/النبرة!',
    points: 25
  },

  // ===================== ENGLISH (اللغة الإنجليزية) =====================
  // Level 1: Present Simple Tense
  {
    id: 'e_1_1',
    subject: 'english',
    topic: 'present_simple',
    topicTitleAr: 'المضارع البسيط (Present Simple)',
    level: 1,
    question: 'Choose the correct verb: "He .......... to school every morning."',
    questionEn: 'Choose the correct verb: "He .......... to school every morning."',
    options: ['goes', 'go', 'going', 'is go'],
    correctAnswer: 'goes',
    explanation: 'With singular subjects (He, She, It) in the Present Simple, we add -s or -es to the base verb (go -> goes).',
    hint: 'مع He و She و It نضيف s أو es للفعل في المضارع البسيط.',
    points: 15
  },
  {
    id: 'e_1_2',
    subject: 'english',
    topic: 'pronouns',
    topicTitleAr: 'الضمائر وأفعال Be',
    level: 1,
    question: 'Complete the sentence: "They .......... playing football in the park."',
    questionEn: 'Complete the sentence: "They .......... playing football in the park."',
    options: ['are', 'is', 'am', 'be'],
    correctAnswer: 'are',
    explanation: 'We use "are" with plural pronouns like "They", "We", and "You".',
    hint: 'مع الجمع (They) نستخدم are.',
    points: 15
  },

  // Level 2: Past Simple Tense
  {
    id: 'e_2_1',
    subject: 'english',
    topic: 'past_simple',
    topicTitleAr: 'الماضي البسيط والأفعال الشاذة',
    level: 2,
    question: 'What is the past form of the verb "write"? (Yesterday, I .......... a letter.)',
    questionEn: 'What is the past form of the verb "write"? (Yesterday, I .......... a letter.)',
    options: ['wrote', 'writed', 'written', 'writing'],
    correctAnswer: 'wrote',
    explanation: '"Write" is an irregular verb. Its past simple form is "wrote" (write -> wrote -> written).',
    hint: 'فعل غير منتظم (شاذ): write تصبح wrote.',
    points: 20
  },
  {
    id: 'e_2_2',
    subject: 'english',
    topic: 'past_negative',
    topicTitleAr: 'النفي في الماضي البسيط',
    level: 2,
    question: 'Choose the correct negative sentence: "We .......... pizza yesterday."',
    questionEn: 'Choose the correct negative sentence: "We .......... pizza yesterday."',
    options: ["didn't eat", "didn't ate", "not ate", "doesn't eat"],
    correctAnswer: "didn't eat",
    explanation: 'In the past simple negative, we use "didn\'t" + base verb (infinitive): didn\'t eat.',
    hint: 'بعد didn\'t يعود الفعل لأصله المجرد (eat).',
    points: 20
  },

  // Level 3: Comparatives & Superlatives
  {
    id: 'e_3_1',
    subject: 'english',
    topic: 'comparatives',
    topicTitleAr: 'المقارنة بين صفتين (Comparatives)',
    level: 3,
    question: 'An elephant is .......... than a mouse.',
    questionEn: 'An elephant is .......... than a mouse.',
    options: ['bigger', 'big', 'biggest', 'more big'],
    correctAnswer: 'bigger',
    explanation: 'When comparing two things with a short adjective, we double the consonant and add -er + than (big -> bigger than).',
    hint: 'للمقارنة بين اثنين نضع الصفة + er + than.',
    points: 20
  },
  {
    id: 'e_3_2',
    subject: 'english',
    topic: 'superlatives',
    topicTitleAr: 'صيغة التفضيل العليا (Superlatives)',
    level: 3,
    question: 'The Cheetah is the .......... animal on land.',
    questionEn: 'The Cheetah is the .......... animal on land.',
    options: ['fastest', 'faster', 'most fast', 'fast'],
    correctAnswer: 'fastest',
    explanation: 'For superlative with short adjectives, we use "the" + adjective + "-est" (the fastest).',
    hint: 'عند التفضيل بين الكل مع كلمة the نضع est لنهاية الصفة.',
    points: 20
  },

  // Level 4: Prepositions of Place & Time
  {
    id: 'e_4_1',
    subject: 'english',
    topic: 'prepositions_time',
    topicTitleAr: 'حروف الجر للوقت (at, on, in)',
    level: 4,
    question: 'I usually wake up .......... 7:00 AM.',
    questionEn: 'I usually wake up .......... 7:00 AM.',
    options: ['at', 'in', 'on', 'by'],
    correctAnswer: 'at',
    explanation: 'We use "at" with specific clock times (at 7:00 AM, at noon, at night).',
    hint: 'مع الساعات والأوقات المحددة نستخدم at.',
    points: 20
  },

  // Level 5: Vocabulary & Spelling Lab
  {
    id: 'e_5_1',
    subject: 'english',
    topic: 'vocabulary_science',
    topicTitleAr: 'مفردات العلوم والبيئة',
    level: 5,
    question: 'Which word means "a person who travels into outer space"?',
    questionEn: 'Which word means "a person who travels into outer space"?',
    options: ['Astronaut', 'Doctor', 'Engineer', 'Pilot'],
    correctAnswer: 'Astronaut',
    explanation: 'An Astronaut (رائد فضاء) is a person trained to travel in a spacecraft.',
    hint: 'رائد الفضاء بالإنجليزية: Astro-naut.',
    points: 25
  },
  {
    id: 'e_5_2',
    subject: 'english',
    topic: 'spelling_bee',
    topicTitleAr: 'التهجئة الصحيحة للكلمات',
    level: 5,
    question: 'Choose the correctly spelled word:',
    questionEn: 'Choose the correctly spelled word:',
    options: ['Environment', 'Enviroment', 'Envieroment', 'Environmant'],
    correctAnswer: 'Environment',
    explanation: 'The correct spelling is E-N-V-I-R-O-N-M-E-N-T (بيئة). Note the "n" before "ment".',
    hint: 'تحتوي على حرف n قبل مقطع ment (Environ-ment).',
    points: 25
  }
];

// Mini-game special datasets
export const SPEED_MATH_BANK = [
  { q: '12 × 8 = ?', answer: 96, options: [96, 88, 108, 94] },
  { q: '150 ÷ 5 = ?', answer: 30, options: [30, 25, 35, 20] },
  { q: '(-7) + 15 = ?', answer: 8, options: [8, -8, 22, -22] },
  { q: '3/4 + 1/4 = ?', answer: 1, options: [1, 2, 0.5, 0.75] },
  { q: '7 × 9 = ?', answer: 63, options: [63, 56, 72, 64] },
  { q: '50% من 120 = ?', answer: 60, options: [60, 50, 70, 40] },
  { q: 'مساحة مربع ضلعه 6 سم = ?', answer: 36, options: [36, 24, 12, 48] },
  { q: '(-4) × (-5) = ?', answer: 20, options: [20, -20, 9, -9] },
  { q: 'س + 12 = 30 -> س = ?', answer: 18, options: [18, 42, 16, 20] },
  { q: '2.5 + 3.5 = ?', answer: 6, options: [6, 5.5, 7, 6.5] }
];

export const ARABIC_CATCHER_ITEMS = [
  { word: 'أَكَلَ', type: 'قطع', reason: 'فعل ماض ثلاثي مبدوء بهمزة قطع' },
  { word: 'اِسْتَخْرَجَ', type: 'وصل', reason: 'فعل ماض سداسي همزته همزة وصل' },
  { word: 'إِحْسَان', type: 'قطع', reason: 'مصدر لفعل رباعي همزته قطع' },
  { word: 'اِبْن', type: 'وصل', reason: 'من الأسماء العشرة السماعية بهمزة وصل' },
  { word: 'أُمّ', type: 'قطع', reason: 'اسم همزته همزة قطع' },
  { word: 'اَلْمَدْرَسَة', type: 'وصل', reason: 'همزة (أل) التعريف هي همزة وصل دائماً' },
  { word: 'أَسَد', type: 'قطع', reason: 'اسم مبدوء بهمزة قطع' },
  { word: 'اِقْرَأْ', type: 'وصل', reason: 'أمر الفعل الثلاثي همزته وصل' }
];

export const ENGLISH_SPELLING_ITEMS = [
  { word: 'KNOWLEDGE', arabic: 'معرفة / علم', hint: 'Starts with silent K' },
  { word: 'BEAUTIFUL', arabic: 'جميل / رائعة', hint: 'Notice the vowel group: E-A-U' },
  { word: 'EXPERIMENT', arabic: 'تجربة علمية', hint: 'In the science lab' },
  { word: 'FRIENDSHIP', arabic: 'صداقة', hint: 'Friend + ship' },
  { word: 'CHALLENGE', arabic: 'تحدٍ واختبار', hint: 'Double L' },
  { word: 'VOCABULARY', arabic: 'مفردات لغوية', hint: 'Words you learn' },
  { word: 'ASTRONAUT', arabic: 'رائد فضاء', hint: 'Space traveler' },
  { word: 'ENVIRONMENT', arabic: 'البيئة والطبيعة', hint: 'Our planet earth' }
];

export interface ArabicRootItem {
  id: string;
  root: string; // e.g. "ك-ت-ب"
  rootTitle: string;
  meaning: string;
  targetPattern: string; // e.g. "اسم الفاعل (فاعل)"
  targetWord: string; // e.g. "كاتِب"
  scrambledLetters: string[];
  explanation: string;
}

export const ARABIC_ROOT_ITEMS: ArabicRootItem[] = [
  {
    id: 'root_1',
    root: 'ك - ت - ب',
    rootTitle: 'جذر (ك-ت-ب)',
    meaning: 'يدل على الجمع والخط وتدوين المعرفة',
    targetPattern: 'اسم الفاعل (فَاعِل)',
    targetWord: 'كَاتِب',
    scrambledLetters: ['ك', 'ـا', 'تِ', 'ـب', 'مَـ', 'و', 'يُـ'],
    explanation: 'يُصاغ اسم الفاعل من الفعل الثلاثي (كَتَبَ) على وزن (فَاعِل) فيصبح: كَاتِب.'
  },
  {
    id: 'root_2',
    root: 'ع - ل - م',
    rootTitle: 'جذر (ع-ل-م)',
    meaning: 'يدل على المعرفة وإدراك الشيء بحقيقته',
    targetPattern: 'اسم المكان (مَفْعَل)',
    targetWord: 'مَعْلَم',
    scrambledLetters: ['مَـ', 'عْـ', 'لَـ', 'ـم', 'ـا', 'يُـ', 'تِ'],
    explanation: 'يُصاغ اسم المكان من (عَلِمَ) على وزن (مَفْعَل) للدلالة على المكان البارز: مَعْلَم.'
  },
  {
    id: 'root_3',
    root: 'ص - ن - ع',
    rootTitle: 'جذر (ص-ن-ع)',
    meaning: 'يدل على الإتقان والعمل والإنتاج',
    targetPattern: 'اسم المفعول (مَفْعُول)',
    targetWord: 'مَصْنُوع',
    scrambledLetters: ['مَـ', 'صْـ', 'نُـ', 'و', 'ع', 'تِ', 'ـا'],
    explanation: 'يُصاغ اسم المفعول من الفعل الثلاثي (صَنَعَ) على وزن (مَفْعُول): مَصْنُوع.'
  },
  {
    id: 'root_4',
    root: 'د - ر - س',
    rootTitle: 'جذر (د-ر-س)',
    meaning: 'يدل على الملازمة والتعلم والحفظ',
    targetPattern: 'اسم المكان (مَفْعَلَة)',
    targetWord: 'مَدْرَسَة',
    scrambledLetters: ['مَـ', 'دْ', 'رَ', 'سَـ', 'ـة', 'و', 'يُـ'],
    explanation: 'يُصاغ اسم المكان للمؤسسة التعليمية بزيادة تاء التأنيث: مَدْرَسَة.'
  },
  {
    id: 'root_5',
    root: 'س - م - ع',
    rootTitle: 'جذر (س-م-ع)',
    meaning: 'يدل على إدراك الأصوات وفهمها',
    targetPattern: 'صيغة المبالغة (فَعِيل)',
    targetWord: 'سَمِيع',
    scrambledLetters: ['سَـ', 'مِـ', 'يـ', 'ـع', 'مَـ', 'ـا', 'تِ'],
    explanation: 'صيغة المبالغة للدلالة على كثرة السمع وقوته على وزن فَعِيل: سَمِيع.'
  }
];

export interface ArabicMatchPair {
  id: string;
  wordA: string;
  wordB: string;
  relation: 'ترادف (نفس المعنى)' | 'تضاد (عكس المعنى)';
}

export const ARABIC_MATCH_PAIRS: ArabicMatchPair[] = [
  { id: 'p1', wordA: 'بَاسِل', wordB: 'شُجَاع', relation: 'ترادف (نفس المعنى)' },
  { id: 'p2', wordA: 'ضِيَاء', wordB: 'نُور', relation: 'ترادف (نفس المعنى)' },
  { id: 'p3', wordA: 'إِقْدَام', wordB: 'إِحْجَام', relation: 'تضاد (عكس المعنى)' },
  { id: 'p4', wordA: 'سَخَاء', wordB: 'بُخْل', relation: 'تضاد (عكس المعنى)' },
  { id: 'p5', wordA: 'غِبْطَة', wordB: 'سُرُور', relation: 'ترادف (نفس المعنى)' },
  { id: 'p6', wordA: 'ارْتِقَاء', wordB: 'انْحِدَار', relation: 'تضاد (عكس المعنى)' }
];

export interface EnglishSentenceItem {
  id: string;
  ruleTitle: string;
  arabicMeaning: string;
  correctWords: string[];
  scrambledWords: string[];
  explanation: string;
}

export const ENGLISH_SENTENCE_ITEMS: EnglishSentenceItem[] = [
  {
    id: 's1',
    ruleTitle: 'Present Continuous (المضارع المستمر)',
    arabicMeaning: 'الطلاب يقرؤون كتباً شيقة في المكتبة الآن.',
    correctWords: ['The', 'students', 'are', 'reading', 'interesting', 'books', 'now.'],
    scrambledWords: ['reading', 'The', 'books', 'now.', 'are', 'students', 'interesting'],
    explanation: 'Subject (The students) + are + verb-ing (reading) + object (interesting books) + time word (now).'
  },
  {
    id: 's2',
    ruleTitle: 'Past Simple with Irregular Verb (الماضي البسيط)',
    arabicMeaning: 'زرنا المتحف الوطني الرائع الأسبوع الماضي.',
    correctWords: ['We', 'visited', 'the', 'wonderful', 'national', 'museum', 'last', 'week.'],
    scrambledWords: ['national', 'We', 'week.', 'visited', 'museum', 'the', 'last', 'wonderful'],
    explanation: 'Subject (We) + past verb (visited) + the wonderful national museum + time expression (last week).'
  },
  {
    id: 's3',
    ruleTitle: 'Comparative Adjectives (صيغة المقارنة)',
    arabicMeaning: 'كوكب المشتري أكبر بكثير من كوكب الأرض.',
    correctWords: ['Jupiter', 'is', 'much', 'bigger', 'than', 'Earth.'],
    scrambledWords: ['Earth.', 'is', 'than', 'bigger', 'Jupiter', 'much'],
    explanation: 'Noun 1 (Jupiter) + is + comparative adjective (bigger) + than + Noun 2 (Earth).'
  },
  {
    id: 's4',
    ruleTitle: 'Modals for Advice: Should (النصيحة)',
    arabicMeaning: 'يجب عليك تناول طعام صحي وممارسة الرياضة.',
    correctWords: ['You', 'should', 'eat', 'healthy', 'food', 'every', 'day.'],
    scrambledWords: ['healthy', 'should', 'every', 'You', 'eat', 'day.', 'food'],
    explanation: 'Subject (You) + modal (should) + base verb (eat) + healthy food every day.'
  },
  {
    id: 's5',
    ruleTitle: 'First Conditional (الشرط الأول للمستقبل)',
    arabicMeaning: 'إذا درست بجد واجتهاد، ستنجح في الاختبار بسهولة.',
    correctWords: ['If', 'you', 'study', 'hard,', 'you', 'will', 'pass', 'easily.'],
    scrambledWords: ['pass', 'If', 'will', 'you', 'study', 'easily.', 'you', 'hard,'],
    explanation: 'If + Present Simple (you study hard), + Future with will (you will pass easily).'
  }
];

export interface EnglishVocabPair {
  id: string;
  wordEn: string;
  wordAr: string;
  emoji: string;
  category: string;
}

export const ENGLISH_VOCAB_PAIRS: EnglishVocabPair[] = [
  { id: 'v1', wordEn: 'Solar System', wordAr: 'المجموعة الشمسية', emoji: '🪐', category: 'Science' },
  { id: 'v2', wordEn: 'Electricity', wordAr: 'الطاقة الكهربائية', emoji: '⚡', category: 'Science' },
  { id: 'v3', wordEn: 'Magnificent', wordAr: 'رائع وفخم جداً', emoji: '🏰', category: 'Adjectives' },
  { id: 'v4', wordEn: 'Courageous', wordAr: 'شجاع وباسل', emoji: '🦁', category: 'Adjectives' },
  { id: 'v5', wordEn: 'Destination', wordAr: 'الوجهة / المحطة الأخيرة', emoji: '🎯', category: 'Travel' },
  { id: 'v6', wordEn: 'Invention', wordAr: 'اختراع وابتكار جديد', emoji: '💡', category: 'Technology' }
];

export interface MathLogicPuzzle {
  id: string;
  title: string;
  type: 'balance' | 'pattern' | 'geometry_logic' | 'fraction_logic';
  questionAr: string;
  visualEquation?: string;
  visualGraphic?: {
    leftSide: string;
    rightSide: string;
    clue: string;
  };
  options: (string | number)[];
  answer: string | number;
  explanationAr: string;
  hint: string;
}

export const MATH_LOGIC_PUZZLES: MathLogicPuzzle[] = [
  {
    id: 'mlp_1',
    title: 'لغز ميزان المعادلات والرموز',
    type: 'balance',
    questionAr: 'في ميزان متوازن: (تفاحتان + تفاحة = 180 غرام)، و(تفاحة + موزة = 150 غرام). ما هو وزن الموزة الواحدة؟',
    visualGraphic: {
      leftSide: '🍎 + 🍎 + 🍎 = 180g',
      rightSide: '🍎 + 🍌 = 150g',
      clue: 'احسب وزن التفاحة أولاً!'
    },
    options: ['60g', '90g', '80g', '100g'],
    answer: '90g',
    explanationAr: '3 تفاحات = 180 غرام، إذن التفاحة الواحدة = 180 ÷ 3 = 60 غرام. من المعادلة الثانية: 60 + موزة = 150، إذن الموزة = 150 - 60 = 90 غرام.',
    hint: 'اقسم 180 على 3 لمعرفة التفاحة، ثم اطرح الناتج من 150.'
  },
  {
    id: 'mlp_2',
    title: 'لغز المتتاليات الهندسية والأنماط',
    type: 'pattern',
    questionAr: 'اكتشف الرقم المفقود في هذا النمط الذكي: 3 ، 7 ، 15 ، 31 ، ( ؟ )',
    options: [63, 62, 59, 64],
    answer: 63,
    explanationAr: 'النمط هو: (العدد × 2) + 1. إذن: (3 × 2 + 1 = 7)، (7 × 2 + 1 = 15)، (15 × 2 + 1 = 31)، (31 × 2 + 1 = 63).',
    hint: 'كل عدد هو ضعف العدد السابق له مضافاً إليه 1.'
  },
  {
    id: 'mlp_3',
    title: 'لغز مساحات المستطيل الذكي',
    type: 'geometry_logic',
    questionAr: 'مستطيل محيطه 28 سم، وإذا كان طوله يزيد عن عرضه بمقدار 4 سم. فما هي مساحة هذا المستطيل؟',
    options: ['45 سم²', '48 سم²', '40 سم²', '52 سم²'],
    answer: '45 سم²',
    explanationAr: 'نصف المحيط (الطول + العرض) = 28 ÷ 2 = 14 سم. العرض = (14 - 4) ÷ 2 = 5 سم. الطول = 5 + 4 = 9 سم. المساحة = الطول × العرض = 9 × 5 = 45 سم².',
    hint: 'مجموع الطول والعرض = 14. والفرق بينهما 4. ما هما العددان؟'
  },
  {
    id: 'mlp_4',
    title: 'لغز كعكة الكسور المتكافئة',
    type: 'fraction_logic',
    questionAr: 'أكل أحمد 2/5 من الكعكة، وأكلت أخته سارة 3/10 منها. كم بقي من الكعكة للأب؟',
    options: ['3/10', '4/10', '1/5', '1/2'],
    answer: '3/10',
    explanationAr: 'نوحد المقامات: 2/5 = 4/10. مجموع ما أكله أحمد وسارة = 4/10 + 3/10 = 7/10. المتبقي للأب = 1 - 7/10 = 3/10 من الكعكة.',
    hint: 'حول 2/5 إلى كسر مقامه 10 بضرب البسط والمقام في 2.'
  }
];
