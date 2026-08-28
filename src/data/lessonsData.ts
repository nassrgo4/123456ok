import { TextbookLesson } from '../types';

export const TEXTBOOK_LESSONS: TextbookLesson[] = [
  // ==========================================
  // 📐 كتاب الرياضيات - الصف السادس الابتدائي
  // ==========================================
  {
    id: 'math_1',
    subject: 'math',
    level: 1,
    unitNumber: 1,
    unitTitle: 'الوحدة الأولى: العمليات على الكسور الاعتيادية والعشرية',
    lessonNumber: 1,
    lessonTitle: 'جمع وطرح الكسور الاعتيادية وتوحيد المقامات',
    bookPageRange: 'ص 6 - ص 15',
    estimatedMinutes: 8,
    objective: 'فهم مفهوم الكسر، توحيد المقامات باستخدام المضاعف المشترك الأصغر (م.م.أ)، والتبسيط لأبسط صورة.',
    summaryPoints: [
      'الكسر يتكون من بسط (في الأعلى) ومقام (في الأسفل يعبر عن الكل).',
      'إذا كانت المقامات متساوية (متشابهة): نجمع أو نطرح البسوط مباشرة ونبقي المقام كما هو دون تغيير.',
      'إذا كانت المقامات مختلفة: يجب توحيد المقامات أولاً بإيجاد (م.م.أ) للمقامات، ثم ضرب البسط والمقام في نفس العدد.',
      'التبسيط: بعد إيجاد الناتج، نقسم البسط والمقام على العامل المشترك الأكبر (ع.م.أ) للوصول لأبسط صورة.'
    ],
    workedExamples: [
      {
        problem: 'احسب ناتج: 2/7 + 3/7',
        solution: 'المقامات موحدة (7)، نجمع البسطين: 2 + 3 = 5، إذن الناتج = 5/7.',
        note: 'سهلة ومباشرة لأن المقامات متطابقة.'
      },
      {
        problem: 'احسب ناتج: 1/2 + 1/4 في أبسط صورة',
        solution: 'المقامات مختلفة (2 و 4). المضاعف المشترك هو 4. نحول 1/2 بضرب البسط والمقام في 2 فيصبح 2/4. ثم نجمع: 2/4 + 1/4 = 3/4.',
        note: 'تذكر: لا تجمع المقامات أبداً!'
      }
    ],
    goldenTip: 'قاعدة ذهبية: عند جمع أو طرح الكسور، اجمع البسوط فقط واحتفظ بالمقام الموحد، ولا تجمع المقامات أبداً!',
    keyFormulasOrRules: [
      'أ/ج + ب/ج = (أ + ب) / ج',
      'توحيد المقامات: ضرب حدي الكسر في معامل التكافؤ.'
    ]
  },
  {
    id: 'math_2',
    subject: 'math',
    level: 2,
    unitNumber: 1,
    unitTitle: 'الوحدة الأولى: العمليات على الكسور الاعتيادية والعشرية',
    lessonNumber: 2,
    lessonTitle: 'ضرب وقسمة الكسور الاعتيادية والمعكوس الضربي',
    bookPageRange: 'ص 16 - ص 26',
    estimatedMinutes: 8,
    objective: 'إتقان ضرب الكسور (بسط × بسط ومقام × مقام)، وقسمة الكسور بتحويلها إلى ضرب في المعكوس الضربي.',
    summaryPoints: [
      'ضرب الكسور: نضرب البسط في البسط، والمقام في المقام مباشرة (لا نحتاج لتوحيد مقامات!).',
      'يمكن الاختصار والتبسيط قبل إجراء الضرب لتسهيل الحسابات.',
      'المعكوس الضربي (المقلوب): هو تبديل البسط والمقام (معكوس 3/4 هو 4/3، ومعكوس 5 هو 1/5). حاصل ضرب أي عدد في مقلوبه = 1.',
      'قسمة الكسور: نطبق قاعدة (ثبّت الكسر الأول - غيّر علامة القسمة إلى ضرب - اقلب الكسر الثاني).'
    ],
    workedExamples: [
      {
        problem: 'احسب: (2/3) × (3/5)',
        solution: 'نختصر 3 من البسط مع 3 من المقام، فيتبقى: 2/5 مباشرة.',
        note: 'الاختصار قبل الضرب يوفر وقت التبسيط.'
      },
      {
        problem: 'احسب: (3/4) ÷ (1/2)',
        solution: 'نثبت 3/4، نغير ÷ إلى ×، نقلب 1/2 إلى 2/1 -> 3/4 × 2/1 = 6/4 = 3/2 (1 ونصف).',
        note: 'تذكر شعار: ثبّت، غيّر، واقلب!'
      }
    ],
    goldenTip: 'قاعدة سريعة للقسمة: "ثبّت الأول، اقلب العَلامة لضرب، وشَقلب الكسر الثاني!"',
    keyFormulasOrRules: [
      '(أ/ب) × (ج/د) = (أ × ج) / (ب × د)',
      '(أ/ب) ÷ (ج/د) = (أ/ب) × (د/ج)'
    ]
  },
  {
    id: 'math_3',
    subject: 'math',
    level: 3,
    unitNumber: 2,
    unitTitle: 'الوحدة الثانية: النسبة والتناسب وتطبيقاتها',
    lessonNumber: 3,
    lessonTitle: 'مفهوم النسبة وخواصها والمعدل',
    bookPageRange: 'ص 28 - ص 39',
    estimatedMinutes: 10,
    objective: 'فهم النسبة كمقارنة بين كميتين من نفس النوع والوحدة، وتبسيطها وحساب المعدل.',
    summaryPoints: [
      'النسبة: هي مقارنة بين كميتين أو مقدارين من نفس النوع ولهما نفس وحدات القياس، وتكتب (أ : ب) أو (أ / ب).',
      'الحد الأول يسمى (مقدم النسبة)، والحد الثاني يسمى (تالي النسبة).',
      'النسبة ليس لها وحدة تمييز عند كتابتها (مثل 3 : 2).',
      'المعدل: هو نسبة بين كميتين من نوعين مختلفين، مثل (كم/ساعة) أو (جنيه/كيلوجرام).'
    ],
    workedExamples: [
      {
        problem: 'في حديقة 12 شجرة تفاح و 18 شجرة برتقال. اكتب نسبة شجر التفاح إلى البرتقال في أبسط صورة.',
        solution: 'النسبة = 12 : 18. بقسمة الحدين على العامل المشترك الأكبر (6) -> 12÷6 : 18÷6 = 2 : 3.',
        note: 'دائماً اكتب النسبة بأصغر أعداد صحيحة ممكنة.'
      },
      {
        problem: 'سيارة تقطع 240 كم في 3 ساعات. احسب معدل سرعة السيارة.',
        solution: 'المعدل = المسافة ÷ الزمن = 240 ÷ 3 = 80 كم / ساعة.',
        note: 'المعدل يحتوي على وحدة مركبة (كم/ساعة).'
      }
    ],
    goldenTip: 'النسبة لا تتغير قيمتها إذا ضربت أو قسمت حديها في نفس العدد غير الصفر.',
    keyFormulasOrRules: [
      'النسبة = المقدار الأول ÷ المقدار الثاني',
      'المعدل = الكمية الأولى ÷ الكمية الثانية (مع كتابة الوحدة)'
    ]
  },
  {
    id: 'math_4',
    subject: 'math',
    level: 4,
    unitNumber: 2,
    unitTitle: 'الوحدة الثانية: النسبة والتناسب وتطبيقاتها',
    lessonNumber: 4,
    lessonTitle: 'التناسب وحساب المائة والخصومات',
    bookPageRange: 'ص 40 - ص 54',
    estimatedMinutes: 10,
    objective: 'التعرف على التناسب كحاصل تساوي نسبتين، واستخدام خاصية ضرب الطرفين والوسطين وحساب النسب المئوية.',
    summaryPoints: [
      'التناسب: هو تساوي نسبتين أو أكثر: أ/ب = ج/د.',
      'خاصية التناسب الأساسية: حاصل ضرب الطرفين = حاصل ضرب الوسطين (أ × د = ب × ج).',
      'النسبة المئوية (%): هي نسبة حدها الثاني يساوي 100.',
      'لحساب قيمة نسبة مئوية من عدد: نضرب العدد في (النسبة ÷ 100).'
    ],
    workedExamples: [
      {
        problem: 'أوجد قيمة س في التناسب: 2 / 5 = س / 20',
        solution: 'حاصل ضرب الطرفين = الوسطين: س = (2 × 20) ÷ 5 = 40 ÷ 5 = 8.',
        note: 'طريقة المقص السريعة.'
      },
      {
        problem: 'قميص سعره 200 جنيه، عليه خصم 20%. ما هو المبلغ المخصوم وسعر الشراء؟',
        solution: 'قيمة الخصم = 200 × (20 / 100) = 40 جنيهاً. سعر الشراء بعد الخصم = 200 - 40 = 160 جنيهاً.',
        note: 'تطبيقات عملية في الحياة اليومية.'
      }
    ],
    goldenTip: 'قاعدة المقص: لإيجاد المجهول في التناسب، اضرب الرقمين المتقابلين واقسم على الرقم الثالث المقابل للمجهول!',
    keyFormulasOrRules: [
      'أ × د = ب × ج (الطرفان = الوسطان)',
      'قيمة النسبة = الإجمالي × (النسبة المئوية / 100)'
    ]
  },
  {
    id: 'math_5',
    subject: 'math',
    level: 5,
    unitNumber: 3,
    unitTitle: 'الوحدة الثالثة: مجموعة الأعداد الصحيحة (ص)',
    lessonNumber: 5,
    lessonTitle: 'الأعداد الصحيحة الموجبة والسالبة والقيمة المطلقة',
    bookPageRange: 'ص 56 - ص 70',
    estimatedMinutes: 9,
    objective: 'التعرف على مجموعة الأعداد الصحيحة الموجبة والسالبة والصفر، والمقارنة والقيمة المطلقة.',
    summaryPoints: [
      'الأعداد الموجبة (+): تقع يمين الصفر على خط الأعداد وتدل على المكسب أو الارتفاع فوق سطح البحر.',
      'الأعداد السالبة (-): تقع يسار الصفر وتدل على الخسارة أو الهبوط تحت الصفر.',
      'الصفر (0): ليس موجباً وليس سالباً، وهو يفصل بينهما.',
      'القيمة المطلقة |س|: هي المسافة بين العدد والصفر على خط الأعداد، وهي دائماً موجبة أو صفر (مثال: |-7| = 7).'
    ],
    workedExamples: [
      {
        problem: 'قارن باستخدام (> أو < أو =): -8 ... -3',
        solution: '-8 < -3 (لأن على خط الأعداد، العدد الذي يقع جهة اليمين يكون هو الأكبر، و -3 أقرب للصفر من -8).',
        note: 'في الأعداد السالبة: كلما صغر الرقم بدون إشارة، كبُرت قيمته!'
      },
      {
        problem: 'احسب: |-15| + |5|',
        solution: '|-15| = 15 ، و |5| = 5 -> 15 + 5 = 20.',
        note: 'القيمة المطلقة تمحو الإشارة السالبة دائماً.'
      }
    ],
    goldenTip: 'تذكر: في السالب، الرقم الصغير هو البطل الأكبر (-1 أكبر من -100).',
    keyFormulasOrRules: [
      'ص = ص+ ∪ {0} ∪ ص-',
      '|-س| = س (القيمة المطلقة لا تكون سالبة أبداً)'
    ]
  },
  {
    id: 'math_6',
    subject: 'math',
    level: 6,
    unitNumber: 3,
    unitTitle: 'الوحدة الثالثة: مجموعة الأعداد الصحيحة (ص)',
    lessonNumber: 6,
    lessonTitle: 'المعادلات والمتباينات الخطية من الدرجة الأولى',
    bookPageRange: 'ص 71 - ص 84',
    estimatedMinutes: 9,
    objective: 'حل المعادلات من الدرجة الأولى في مجهول واحد باستخدام العمليات العكسية.',
    summaryPoints: [
      'المعادلة: جملة رياضية تتضمن علامة التساوي (=) بين طرفين وبها رمز مجهول مثل (س).',
      'حل المعادلة: هو إيجاد قيمة المجهول (س) التي تجعل الطرفين متساويين.',
      'العملية العكسية: الجمع يلغيه الطرح، والطرح يلغيه الجمع. والضرب يلغيه القسمة، والقسمة يلغيها الضرب.',
      'أي عملية نطبقها على الطرف الأيمن يجب تطبيقها تماماً على الطرف الأيسر للمحافظة على التوازن.'
    ],
    workedExamples: [
      {
        problem: 'حل المعادلة: س + 7 = 15',
        solution: 'ننقل 7 للطرف الآخر بعكس الإشارة: س = 15 - 7 -> س = 8.',
        note: 'التحقق: 8 + 7 = 15 (إجابة صحيحة).'
      },
      {
        problem: 'حل المعادلة: 3س = 18',
        solution: 'نقسم طرفي المعادلة على 3: س = 18 ÷ 3 -> س = 6.',
        note: 'عكس الضرب هو القسمة.'
      }
    ],
    goldenTip: 'المعادلة كالميزان ذي الكفتين: ما تفعله في الكفة اليمنى، افعله تماماً في الكفة اليسرى!',
    keyFormulasOrRules: [
      'س + أ = ب => س = ب - أ',
      'أ × س = ب => س = ب ÷ أ'
    ]
  },
  {
    id: 'math_7',
    subject: 'math',
    level: 7,
    unitNumber: 4,
    unitTitle: 'الوحدة الرابعة: الهندسة والقياس',
    lessonNumber: 7,
    lessonTitle: 'محيط ومساحة الأشكال الهندسية والدائرة',
    bookPageRange: 'ص 86 - ص 100',
    estimatedMinutes: 10,
    objective: 'حساب مساحة المثلث، متوازي الأضلاع، ومساحة ومحيط الدائرة باستخدام ط (π).',
    summaryPoints: [
      'مساحة المثلث = 1/2 × طول القاعدة × الارتفاع المناظر.',
      'مساحة متوازي الأضلاع = طول القاعدة × الارتفاع المناظر لها.',
      'محيط الدائرة = 2 × ط × نق (أو طول القطر × ط)، حيث ط (π) ≈ 22/7 أو 3.14.',
      'مساحة الدائرة = ط × نق² (ط × نق × نق).'
    ],
    workedExamples: [
      {
        problem: 'مثلث طول قاعدته 8 سم وارتفاعه 5 سم. ما مساحته؟',
        solution: 'المساحة = 1/2 × 8 × 5 = 4 × 5 = 20 سم².',
        note: 'لا تنسَ ضرب القاعدة في الارتفاع ثم أخذ النصف.'
      },
      {
        problem: 'دائرة نصف قطرها (نق) = 7 سم. احسب مساحتها (اعتبر ط = 22/7).',
        solution: 'المساحة = ط × نق² = (22/7) × 7 × 7 = 22 × 7 = 154 سم².',
        note: 'وحدة المساحة دائماً مربعة (سم²).'
      }
    ],
    goldenTip: 'في الدائرة: المحيط به 2 في البداية (2×ط×نق)، أما المساحة فبها نق تربيع في النهاية (ط×نق²)!',
    keyFormulasOrRules: [
      'مساحة المثلث = 1/2 × ق × ع',
      'محيط الدائرة = 2 π نق',
      'مساحة الدائرة = π نق²'
    ]
  },
  {
    id: 'math_8',
    subject: 'math',
    level: 8,
    unitNumber: 4,
    unitTitle: 'الوحدة الرابعة: الهندسة والقياس',
    lessonNumber: 8,
    lessonTitle: 'المجسمات والحجوم: المكعب ومتوازي المستطيلات',
    bookPageRange: 'ص 101 - ص 115',
    estimatedMinutes: 10,
    objective: 'التعرف على خصائص المجسمات وحساب حجم المكعب ومتوازي المستطيلات والسعة باللتر.',
    summaryPoints: [
      'المكعب: له 6 أوجه مربعة متطابقة، 12 حرفاً متساوية الطول، و 8 رؤوس.',
      'حجم المكعب = طول الحرف × نفسه × نفسه (ل³).',
      'متوازي المستطيلات: له 6 أوجه مستطيلة. حجمه = الطول × العرض × الارتفاع (مساحة القاعدة × الارتفاع).',
      'السعة والتحويلات: 1 لتر = 1000 سم³ = 1 دسم³.'
    ],
    workedExamples: [
      {
        problem: 'مكعب طول حرفه 4 سم. احسب حجمه.',
        solution: 'حجم المكعب = 4 × 4 × 4 = 64 سم³.',
        note: 'وحدات الحجوم تكون بالمكعب (سم³ أو م³).'
      },
      {
        problem: 'متوازي مستطيلات أبعاده 5 سم، 4 سم، و 3 سم. احسب حجمه.',
        solution: 'الحجم = 5 × 4 × 3 = 60 سم³.',
        note: 'ضرب الأبعاد الثلاثة معاً.'
      }
    ],
    goldenTip: '1 لتر = 1000 ملليلتر = 1000 سنتيمتر مكعب (سم³).',
    keyFormulasOrRules: [
      'حجم المكعب = ل × ل × ل',
      'حجم متوازي المستطيلات = الطول × العرض × الارتفاع',
      'السعة = الحجم الداخلي للمجسم'
    ]
  },
  {
    id: 'math_9',
    subject: 'math',
    level: 9,
    unitNumber: 5,
    unitTitle: 'الوحدة الخامسة: الإحصاء والاحتمال',
    lessonNumber: 9,
    lessonTitle: 'تمثيل البيانات والوسط والوسيط والمنوال والاحتمال',
    bookPageRange: 'ص 116 - ص 130',
    estimatedMinutes: 9,
    objective: 'حساب مقاييس النزعة المركزية (الوسط الحسابي، الوسيط، المنوال) وحساب احتمال وقوع الأحداث البسيطة.',
    summaryPoints: [
      'الوسط الحسابي (المتوسط) = مجموع القيم ÷ عددها.',
      'الوسيط: هو القيمة التي تتوسط القيم بعد ترتيبها تصاعدياً أو تنازلياً.',
      'المنوال: هو القيمة الأكثر تكراراً أو شيوعاً بين البيانات.',
      'الاحتمال: عدد نواتج الحدث ÷ العدد الكلي لجميع النواتج الممكنة (يتراوح دائماً بين 0 للحدث المستحيل و 1 للحدث المؤكد).'
    ],
    workedExamples: [
      {
        problem: 'احسب الوسط الحسابي للأعداد: 4 ، 7 ، 9 ؟',
        solution: 'مجموع القيم = 4 + 7 + 9 = 20. عددهم = 3. الوسط الحسابي = 20 ÷ 3 ≈ 6.67.',
        note: 'اجمع الكل واقسم على عددهم.'
      },
      {
        problem: 'عند إلقاء حجر نرد منتظم مرة واحدة، ما احتمال ظهور عدد زوجي؟',
        solution: 'الأعداد الكلية = {1, 2, 3, 4, 5, 6} (6 أعداد). الأعداد الزوجية = {2, 4, 6} (3 أعداد). الاحتمال = 3 / 6 = 1/2.',
        note: 'احتمال نصف النواتج.'
      }
    ],
    goldenTip: 'قبل إيجاد الوسيط، رتب الأعداد أولاً من الأصغر للأكبر ولا تختر الرقم الأوسط مباشرة بدون ترتيب!',
    keyFormulasOrRules: [
      'الوسط الحسابي = مجموع القيم ÷ عددها',
      'احتمال الحدث = عدد مرات الحدث ÷ العدد الإجمالي لفضاء العينة'
    ]
  },
  {
    id: 'math_10',
    subject: 'math',
    level: 10,
    unitNumber: 5,
    unitTitle: 'الوحدة الخامسة: ختام المنهج وتحدي التفكير الرياضي',
    lessonNumber: 10,
    lessonTitle: 'المراجعة الشاملة ومسائل المهارات العليا وحل المشكلات',
    bookPageRange: 'ص 131 - ص 145',
    estimatedMinutes: 12,
    objective: 'الربط بين مختلف موضوعات الرياضيات وحل المسائل اللفظية المركبة وتحديات الذكاء الرياضي.',
    summaryPoints: [
      'قراءة المسألة اللفظية بعناية واستخراج المعطيات وتحديد المطلوب بدقة.',
      'وضع خطة رياضية خطوة بخطوة للحل.',
      'التحقق من معقولية الناتج وصحة العمليات الحسابية.',
      'استخدام الرسم التخطيطي لتسهيل المسائل الهندسية ومسائل النسب.'
    ],
    workedExamples: [
      {
        problem: 'اشترى تاجر بضاعة بمبلغ 8000 جنيه وباعها بمكسب 15%. ما هو سعر البيع الكلي؟',
        solution: 'قيمة المكسب = 8000 × (15/100) = 1200 جنيه. ثمن البيع = 8000 + 1200 = 9200 جنيه.',
        note: 'مسألة مركبة تجمع بين النسبة والعمليات الحسابية.'
      }
    ],
    goldenTip: 'أبطال الرياضيات يقرأون المسألة مرتين ويفكرون في المطلوب قبل البدء في كتابة الأرقام!',
    keyFormulasOrRules: [
      'ثمن البيع = ثمن الشراء + المكسب (أو - الخسارة)',
      'التحقق من صحة الحل بالعمليات العكسية'
    ]
  },

  // ==========================================
  // ✍️ كتاب اللغة العربية - الصف السادس الابتدائي
  // ==========================================
  {
    id: 'arabic_1',
    subject: 'arabic',
    level: 1,
    unitNumber: 1,
    unitTitle: 'الوحدة الأولى: الجملة الاسمية ونواسخها',
    lessonNumber: 1,
    lessonTitle: 'المبتدأ والخبر وأنواع الخبر في الجملة الاسمية',
    bookPageRange: 'ص 8 - ص 20',
    estimatedMinutes: 8,
    objective: 'تمييز ركني الجملة الاسمية (المبتدأ والخبر) والتعرف على أنواع الخبر الثلاثة (مفرد، جملة، شبه جملة).',
    summaryPoints: [
      'الجملة الاسمية: تبدأ باسم وتتكون من ركنين أساسيين هما المبتدأ والخبر.',
      'المبتدأ: الاسم المرفوع الذي نبدأ به الجملة.',
      'الخبر: هو الجزء الذي يُتمم معنى الجملة مع المبتدأ ويكون مرفوعاً أو في محل رفع.',
      'أنواع الخبر: 1. مفرد (ليس جملة ولا شبه جملة مثل: الطالبُ مجتهدٌ) | 2. جملة اسمية أو فعلية (مثل: الحديقةُ أشجارُها مورقةٌ / المعلمُ يشرحُ الدرسَ) | 3. شبه جملة جار ومجرور أو ظرف (مثل: العصفورُ فوقَ الشجرةِ).'
    ],
    workedExamples: [
      {
        problem: 'حدد نوع الخبر في جملة: "المهندسُ يخططُ المشروعَ"',
        solution: 'المبتدأ هو "المهندسُ"، والخبر هو جملة "يخططُ المشروعَ" وهي جملة فعلية (تبدأ بفعل مضارع).',
        note: 'الخبر جملة فعلية في محل رفع.'
      },
      {
        problem: 'ما نوع الخبر في: "الكتابُ على الطاولةِ"؟',
        solution: 'الخبر هو "على الطاولةِ" ونوعه شبه جملة (جار ومجرور).',
        note: 'حرف جر واسم مجرور أتما معنى الجملة.'
      }
    ],
    goldenTip: 'لمعرفة الخبر في الجملة، اسأل نفسك: "المبتدأ ماله؟" الإجابة هي الخبر دائماً!',
    keyFormulasOrRules: [
      'أنواع الخبر: مفرد • جملة (اسمية/فعلية) • شبه جملة (جار ومجرور/ظرف)',
      'الخبر المفرد يطابق المبتدأ في التذكير/التأنيث والعدد.'
    ]
  },
  {
    id: 'arabic_2',
    subject: 'arabic',
    level: 2,
    unitNumber: 1,
    unitTitle: 'الوحدة الأولى: الجملة الاسمية ونواسخها',
    lessonNumber: 2,
    lessonTitle: 'كان وأخواتها (الأفعال الناسخة الناقصة)',
    bookPageRange: 'ص 21 - ص 35',
    estimatedMinutes: 9,
    objective: 'التعرف على الأفعال الناسخة (كان، أصبح، أضحى، أمسى، ظل، بات، صار، ليس) وتأثيرها الإعرابي.',
    summaryPoints: [
      'كان وأخواتها: أفعال ماضية ناقصة وناسخة تدخل على الجملة الاسمية.',
      'معنى ناسخة: تغير الحكم الإعرابي للجملة (ترفع المبتدأ ويسمى اسمها، وتنصب الخبر ويسمى خبرها).',
      'أخوات كان: (كان، أصبح، أضحى، أمسى، ظل، بات، صار، ليس).',
      'علامات نصب الخبر: الفتحة (للمفرد وجمع التكسير)، الياء (للمثنى وجمع المذكر السالم)، الكسرة (لجمع المؤنث السالم).'
    ],
    workedExamples: [
      {
        problem: 'أعرب كلمة "نشيطاً" في جملة: "صارَ التلميذُ نشيطاً"',
        solution: 'نشيطاً: خبر صار منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
        note: 'اسم صار هو "التلميذُ" وهو مرفوع بالضمة.'
      },
      {
        problem: 'أدخل "أصبح" على جملة "المعلمون مخلصون" واضبطها.',
        solution: '"أصبحَ المعلمونَ مخلصينَ" (اسم أصبح مرفوع بالواو، وخبرها منصوب بالياء لأنه جمع مذكر سالم).',
        note: 'انتبه لتغيير الواو والنون إلى ياء ونون في الخبر المنصوب.'
      }
    ],
    goldenTip: 'كان وأخواتها ترفع الرأس (الاسم) وتنصب على الخبر (تنصبه)!',
    keyFormulasOrRules: [
      'كان + اسم مرفوع + خبر منصوب',
      'أخوات كان: كان، أصبح، أضحى، أمسى، ظل، بات، صار، ليس'
    ]
  },
  {
    id: 'arabic_3',
    subject: 'arabic',
    level: 3,
    unitNumber: 2,
    unitTitle: 'الوحدة الثانية: الحروف الناسخة والأسماء الخمسة',
    lessonNumber: 3,
    lessonTitle: 'إنّ وأخواتها (الحروف الناسخة)',
    bookPageRange: 'ص 36 - ص 48',
    estimatedMinutes: 9,
    objective: 'التعرف على الحروف الناسخة (إنّ، أنّ، كأنّ، لكنّ، ليت، لعلّ) وعملها العكسي مقارنة بكان وأخواتها.',
    summaryPoints: [
      'إنّ وأخواتها: حروف ناسخة تدخل على الجملة الاسمية فتنصب المبتدأ ويسمى اسمها، وترفع الخبر ويسمى خبرها.',
      'أخوات إنّ ومعانيها: إنّ وأنّ (للتوكيد)، كأنّ (للإشباه أو التشبيه)، لكنّ (للاستدراك)، ليت (للتمني المستحيل)، لعلّ (للترجي والإمكان).',
      'الفرق بين كان وإنّ: كان (ترفع ثم تنصب) أما إنّ (تنصب ثم ترفع).'
    ],
    workedExamples: [
      {
        problem: 'أدخل "إنّ" على جملة: "الامتحانُ سهلٌ"',
        solution: '"إنّ الامتحانَ سهلٌ" (الامتحانَ: اسم إن منصوب بالفتحة، سهلٌ: خبر إن مرفوع بالضمة).',
        note: 'المبتدأ أصبح منصوباً.'
      },
      {
        problem: 'ما دلالة ومعنى الحرف "لعلّ" في: "لعلّ النصرَ قريبٌ"؟',
        solution: 'يفيد الترجي والرجاء لما هو متوقع وقريب الحدوث.',
        note: 'ليت للتمني، لعل للترجي.'
      }
    ],
    goldenTip: 'إنّ عكس كان: إنّ تبدأ بالنصب ثم الرفع (تنصب الاسم وترفع الخبر).',
    keyFormulasOrRules: [
      'إنّ وأخواتها + اسم منصوب + خبر مرفوع',
      'الحروف: إنّ، أنّ، كأنّ، لكنّ، ليت، لعلّ'
    ]
  },
  {
    id: 'arabic_4',
    subject: 'arabic',
    level: 4,
    unitNumber: 2,
    unitTitle: 'الوحدة الثانية: الحروف الناسخة والأسماء الخمسة',
    lessonNumber: 4,
    lessonTitle: 'الأسماء الخمسة وعلامات إعرابها الفرعية',
    bookPageRange: 'ص 49 - ص 62',
    estimatedMinutes: 10,
    objective: 'تحديد الأسماء الخمسة (أب، أخ، حم، فو، ذو) وإعرابها بالواو رفعاً، وبالألف نصباً، وبالياء جراً.',
    summaryPoints: [
      'الأسماء الخمسة هي: (أبُو، أخُو، حَمُو، فُو، ذُو بمعنى صاحب).',
      'علامات إعرابها الفرعية: تُرفع بالواو (جاء أبوك)، تُنصب بالألف (رأيت أباك)، وتُجر بالياء (مررت بأبيك).',
      'شروط إعرابها بالحروف: 1. أن تكون مفردة (ليست مثنى أو جمع) | 2. أن تكون مضافة لغير ياء المتكلم (لو قلت "أبي" تعرب بحركات مقدرة) | 3. خلو كلمة "فم" من حرف الميم (تكون "فو" أو "فا" أو "في").'
    ],
    workedExamples: [
      {
        problem: 'أعرب "أخوك" في جملة: "أخوكَ ذو خُلقٍ كريم"',
        solution: 'أخوكَ: مبتدأ مرفوع وعلامة رفعه الواو لأنه من الأسماء الخمسة، والكاف ضمير متصل مبني في محل جر مضاف إليه.',
        note: 'ذو: خبر مرفوع بالواو لأنه من الأسماء الخمسة.'
      },
      {
        problem: 'اختر الصواب: "شاهدتُ (أبوك - أباك - أبيك) في المسجد"',
        solution: 'أباك (لأنها مفعول به منصوب وعلامة نصبه الألف لأنه من الأسماء الخمسة).',
        note: 'النصب في الأسماء الخمسة يكون بالألف دائماً.'
      }
    ],
    goldenTip: 'تذكر كلمة (واي - W-A-Y): ترفع بالـ (واو)، تنصب بالـ (ألف)، وتجر بالـ (ياء)!',
    keyFormulasOrRules: [
      'رفع -> الواو (أبو)',
      'نصب -> الألف (أبا)',
      'جر -> الياء (أبي)'
    ]
  },
  {
    id: 'arabic_5',
    subject: 'arabic',
    level: 5,
    unitNumber: 3,
    unitTitle: 'الوحدة الثالثة: الأفعال وإعرابها',
    lessonNumber: 5,
    lessonTitle: 'الأفعال الخمسة وإعرابها بثبوت النون وحذفها',
    bookPageRange: 'ص 64 - ص 76',
    estimatedMinutes: 9,
    objective: 'التعرف على الأفعال الخمسة وصياغتها وإعرابها (ثبوت النون في الرفع، وحذف النون في النصب والجزم).',
    summaryPoints: [
      'الأفعال الخمسة: هي كل فعل مضارع اتصلت به (ألف الاثنين مثل: يكتبان/تكتبان)، أو (واو الجماعة مثل: يكتبون/تكتبون)، أو (ياء المخاطبة مثل: تكتبين).',
      'إعرابها: تُرفع بثبوت النون (الطلاب يذاكرون بجد).',
      'تُنصب وتُجزم بحذف النون (الطلاب لن يهملوا / لم يهملوا).',
      'الضمير المتصل (الألف أو الواو أو الياء) يُعرب دائماً فاعلاً في محل رفع.'
    ],
    workedExamples: [
      {
        problem: 'أعرب الفعل في جملة: "أنتم تتقنونَ عملكم"',
        solution: 'تتقنون: فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة، وواو الجماعة ضمير في محل رفع فاعل.',
        note: 'النون موجودة وثابتة في حالة الرفع.'
      },
      {
        problem: 'صحح الخطأ: "المهندسون لم يتأخرون عن العمل"',
        solution: 'الصواب: "المهندسون لم يتأخروا" (بحذف النون لأن الفعل مجزوم بعد لم).',
        note: 'أدوات النصب والجزم تحذف النون وتضع ألفاً فارقة بعد واو الجماعة.'
      }
    ],
    goldenTip: 'إذا رأيت قبل الفعل أداة نصب (أن، لن، كي) أو جزم (لم، لا الناهية)، احذف النون فوراً!',
    keyFormulasOrRules: [
      'فعل مضارع + (ألف الاثنين / واو الجماعة / ياء المخاطبة) = أفعال خمسة',
      'الرفع: ثبوت النون | النصب والجزم: حذف النون'
    ]
  },
  {
    id: 'arabic_6',
    subject: 'arabic',
    level: 6,
    unitNumber: 3,
    unitTitle: 'الوحدة الثالثة: الأفعال وإعرابها',
    lessonNumber: 6,
    lessonTitle: 'النعت والحال والتمييز بين التابع والوصف',
    bookPageRange: 'ص 78 - ص 90',
    estimatedMinutes: 9,
    objective: 'التمييز الدقيق بين النعت (الصفة التابعة لمنعوتها) والحال (الاسم النكرة المنصوب المبين للهيئة).',
    summaryPoints: [
      'النعت (الصفة): اسم يتبع المنعوت في 4 أشياء: (التعريف والتنكير، الإعراب رفعاً ونصباً وجراً، العدد إفراداً وتثنية وجمعاً، والنوع تذكيراً وتأنيثاً).',
      'مثال النعت: "قرأتُ كتاباً مفيداً" (مفيداً نعت منصوب يطابق كتاباً).',
      'الحال: اسم نكرة منصوب يبين هيئة صاحبه (المعرفة) عند وقوع الفعل، ونسأل عنه بـ "كيف؟".',
      'مثال الحال: "جاء القائدُ منتصراً" (كيف جاء القائد؟ منتصراً -> حال منصوب بالفتحة).'
    ],
    workedExamples: [
      {
        problem: 'ما إعراب كلمة "مبتسماً" في جملة: "استقبل المعلمُ الطلابَ مبتسماً"؟',
        solution: 'مبتسماً: حال منصوب وعلامة نصبه الفتحة (يبين هيئة المعلم أثناء الاستقبال، ونسأل عنه بـ: كيف استقبل المعلم الطلاب؟).',
        note: 'صاحب الحال هو المعلم (معرفة) والحال نكرة منصوبة.'
      }
    ],
    goldenTip: 'قاعدة ذهبية: "النعت يقلد ما قبله في كل شيء، أما الحال فنكرة منصوبة تسأل عنها بـ كيف؟"',
    keyFormulasOrRules: [
      'معرفة + معرفة (تصفها) = نعت | نكرة + نكرة (تصفها) = نعت',
      'كيف + الفعل = الحال'
    ]
  },
  {
    id: 'arabic_7',
    subject: 'arabic',
    level: 7,
    unitNumber: 4,
    unitTitle: 'الوحدة الرابعة: الإعراب والضبط الإملائي',
    lessonNumber: 7,
    lessonTitle: 'إعراب الفعل المضارع (الرفع، النصب، والجزم)',
    bookPageRange: 'ص 92 - ص 105',
    estimatedMinutes: 9,
    objective: 'معرفة أدوات نصب المضارع وأدوات جزمه وعلامات الإعراب الصحيحة.',
    summaryPoints: [
      'الأصل في الفعل المضارع أن يكون مرفوعاً بالضمة إذا لم تسبقه أداة نصب أو جزم (مثل: يكتبُ محمد).',
      'أدوات نصب المضارع: (أنْ، لَنْ، كَيْ، حتى، لام التعليل). ينصب بالفتحة الظاهرة.',
      'أدوات جزم المضارع: (لَمْ، لا الناهية، لام الأمر). يجزم بالسكون للصحيح الآخر، وبحذف حرف العلة إذا كان معتل الآخر.'
    ],
    workedExamples: [
      {
        problem: 'أعرب الفعل "تنجحَ" في جملة: "ذاكرْ بجدٍ كي تنجحَ"',
        solution: 'تنجحَ: فعل مضارع منصوب بعد (كي) وعلامة نصبه الفتحة الظاهرة على آخره.',
        note: 'كي من حروف النصب.'
      },
      {
        problem: 'ما نوع (لا) في جملة: "لا تؤجلْ عمل اليوم إلى الغد"؟',
        solution: 'لا الناهية (حرف جزم يفيد طلب الكف عن الفعل)، والفعل "تؤجلْ" مجزوم بالسكون.',
        note: 'فرق بين لا الناهية (تجزم وتطلب عدم الفعل) ولا النافية (تخبر فقط ولا تجزم).'
      }
    ],
    goldenTip: 'أن ولن وكي تنصب، ولم ولا الناهية تجزم بالسكون وتغضب!',
    keyFormulasOrRules: [
      'نصب المضارع: أن، لن، كي، حتى، لام التعليل',
      'جزم المضارع: لم، لا الناهية، لام الأمر'
    ]
  },
  {
    id: 'arabic_8',
    subject: 'arabic',
    level: 8,
    unitNumber: 4,
    unitTitle: 'الوحدة الرابعة: الإعراب والضبط الإملائي',
    lessonNumber: 8,
    lessonTitle: 'قواعد الإملاء: همزتا الوصل والقطع',
    bookPageRange: 'ص 106 - ص 118',
    estimatedMinutes: 8,
    objective: 'التفريق الدقيق بين همزة الوصل (ا) وهمزة القطع (أ / إ) نطقاً وكتابة باستخدام اختبار الواو.',
    summaryPoints: [
      'همزة القطع: همزة تكتب وتنطق دائماً في أول الكلام ووسطه (أَ، أُ، إِ). مثل: أحمد، إكرام، أكل.',
      'همزة الوصل: ألف قائمة بدون رأس همزة (ا)، تنطق في أول الكلام وتسقط عند وصل الكلام بما قبله. مثل: ابن، اسم، اكتب، استخرج.',
      'اختبار الواو السحري: ضع حرف (الواو) قبل الكلمة وانطقها؛ إذا نطقت الهمزة فهي قطع (و + أحمد = وَأحمد)، وإذا سقطت وانتقلت للحرف التالي فهي وصل (و + اكتب = وَكْتُب).'
    ],
    workedExamples: [
      {
        problem: 'بين نوع الهمزة في كلمتي: (إبراهيم) و (استيقظ)',
        solution: 'إبراهيم: همزة قطع (تكتب وتنطق همزتها). استيقظ: همزة وصل (ألف بدون همزة وتسقط نطقاً مع الواو: واستيقظ).',
        note: 'جميع أسماء الأعلام همزتها قطع ما عدا الأسماء التسعة المخصوصة.'
      }
    ],
    goldenTip: 'سر الإملاء: ضع حرف الواو قبل الكلمة، إن سمعت صوت الهمزة اكتب رأس العين (أ)، وإن لم تسمعها اتركها ألفاً صامتة (ا)!',
    keyFormulasOrRules: [
      'وَ + الكلمة: نُطقت الهمزة = قَطْع (أ)',
      'وَ + الكلمة: لم تُنطق الهمزة = وَصْل (ا)'
    ]
  },
  {
    id: 'arabic_9',
    subject: 'arabic',
    level: 9,
    unitNumber: 5,
    unitTitle: 'الوحدة الخامسة: الكتابة والمهارات الإملائية المتقدمة',
    lessonNumber: 9,
    lessonTitle: 'الهمزة المتوسطة والمتطرفة وعلامات الترقيم',
    bookPageRange: 'ص 120 - ص 134',
    estimatedMinutes: 9,
    objective: 'كتابة الهمزة المتوسطة حسب قاعدة قوة الحركات والهمزة المتطرفة حسب حركة ما قبلها وعلامات الترقيم.',
    summaryPoints: [
      'سلم قوة الحركات: الكسرة (أقوى الحركات وتناسبها النبرة ئ) > الضمة (يناسبها الواو ؤ) > الفتحة (يناسبها الألف أ) > السكون (الأضعف).',
      'الهمزة المتوسطة: نقارن بين حركة الهمزة وحركة الحرف الذي قبلها ونكتبها على الحرف المناسب للحركة الأقوى (مثل: فِئَة، سُؤَال، رَأْس).',
      'الهمزة المتطرفة (في آخر الكلمة): تعتمد فقط على حركة الحرف الذي قبلها مباشرة (سماء على السطر لأن قبلها مد ساكن، قارئ على الياء لأن قبلها مكسور، يجرؤ على الواو لأن قبلها مضموم، بدأ على الألف لأن قبلها مفتوح).'
    ],
    workedExamples: [
      {
        problem: 'علل كتابة الهمزة على نبرة في كلمة: "سُئِلَ"',
        solution: 'لأن الهمزة مكسورة وما قبلها مضموم، والكسرة أقوى من الضمة ويناسبها النبرة (الياء غير المنقوطة).',
        note: 'الكسرة ملكة الحركات دائماً.'
      }
    ],
    goldenTip: 'ترتيب القوة: كسرة (ئ) ثم ضمة (ؤ) ثم فتحة (أ) ثم سكون! الأقوى تفوز دائماً في الهمزة المتوسطة.',
    keyFormulasOrRules: [
      'الكسرة > الضمة > الفتحة > السكون',
      'الهمزة المتطرفة تكتب حسب حركة ما قبلها فقط.'
    ]
  },
  {
    id: 'arabic_10',
    subject: 'arabic',
    level: 10,
    unitNumber: 5,
    unitTitle: 'الوحدة الخامسة: ختام المنهج وبلاغة الضاد',
    lessonNumber: 10,
    lessonTitle: 'الإعراب الشامل وتطبيقات النصوص وتحدي الفرسان',
    bookPageRange: 'ص 136 - ص 150',
    estimatedMinutes: 12,
    objective: 'إتقان الإعراب التراكمي لقطع النحو كاملة، وتذوق الجماليات البلاغية وحل التدريبات النموذجية.',
    summaryPoints: [
      'خطوات الإعراب الذهبية: 1. تحديد نوع الجملة (اسمية أم فعلية) | 2. تحديد أركان الجملة الأساسية (مبتدأ وخبر / فعل وفاعل ومفعول) | 3. البحث عن النواسخ والزوائد كالنعت والحال والجار والمجرور.',
      'التأكد من علامات الإعراب الأصلية (ضمة، فتحة، كسرة) والفرعية (ألف، واو، ياء، ثبوت وحذف النون).'
    ],
    workedExamples: [
      {
        problem: 'أعرب جملة: "كانَ المعلمونَ المخلصونَ يوجهونَ الطلابَ"',
        solution: 'كان: فعل ماض ناقص ناسخ. المعلمون: اسم كان مرفوع بالواو. المخلصون: نعت مرفوع بالواو. يوجهون: فعل مضارع مرفوع بثبوت النون وواو الجماعة فاعل، والجملة الفعلية في محل نصب خبر كان. الطلاب: مفعول به منصوب بالفتحة.',
        note: 'نموذج إعرابي شامل ومتكامل.'
      }
    ],
    goldenTip: 'النحو كالهندسة: افهم المعنى أولاً، فالمعنى هو مفتاح الإعراب الدقيق!',
    keyFormulasOrRules: [
      'الإعراب فرع المعنى: افهم من فعل وماذا حدث قبل وضع العلامة الإعرابية.'
    ]
  },

  // ==========================================
  // 🇬🇧 كتاب اللغة الإنجليزية - Grade 6 English Adventure
  // ==========================================
  {
    id: 'english_1',
    subject: 'english',
    level: 1,
    unitNumber: 1,
    unitTitle: 'Unit 1: Everyday Life & Habits',
    lessonNumber: 1,
    lessonTitle: 'Present Simple Tense & Daily Routines',
    bookPageRange: 'Pages 4 - 15',
    estimatedMinutes: 8,
    objective: 'Master the Present Simple tense for habits, daily routines, facts, and subject-verb agreement (He/She/It + s/es).',
    summaryPoints: [
      'Use Present Simple to talk about habits, repeated daily routines, and universal facts.',
      'With singular subjects (He, She, It, or singular nouns): add -s or -es to the base verb (e.g. He walks, She watches).',
      'With plural subjects (I, You, We, They): use the base form of the verb without adding anything (e.g. They play football).',
      'Negative & Questions: Use (do / don’t) for I/We/They/You, and (does / doesn’t) for He/She/It + base verb.',
      'Keywords & Adverbs of frequency: always, usually, often, sometimes, never, every day.'
    ],
    workedExamples: [
      {
        problem: 'Choose the correct verb: "Sami usually _____ (wake / wakes) up at 6:30 AM."',
        solution: 'wakes (because Sami is singular "He", so we add -s to the verb).',
        note: 'He/She/It loves the letter S!'
      },
      {
        problem: 'Make negative: "They like fish."',
        solution: '"They don’t like fish."',
        note: 'Use "don’t" for plural subjects.'
      }
    ],
    goldenTip: 'Golden Rule: He, She, It are the "S" family! Always give their verbs an -s or -es in present simple!',
    keyFormulasOrRules: [
      'He / She / It + Verb(-s / -es)',
      'I / We / You / They + Base Verb',
      'Negative: Subject + don\'t / doesn\'t + Base Verb'
    ]
  },
  {
    id: 'english_2',
    subject: 'english',
    level: 2,
    unitNumber: 1,
    unitTitle: 'Unit 1: Everyday Life & Habits',
    lessonNumber: 2,
    lessonTitle: 'Present Continuous & Actions Happening Now',
    bookPageRange: 'Pages 16 - 28',
    estimatedMinutes: 8,
    objective: 'Express actions happening right now at the moment of speaking using (am/is/are + verb-ing).',
    summaryPoints: [
      'Use Present Continuous to describe actions happening right now at this exact moment.',
      'Form: Subject + (am / is / are) + Verb-ing.',
      'I -> am | He, She, It -> is | We, You, They -> are.',
      'Spelling rules: write -> writing (drop e), swim -> swimming (double consonant), play -> playing.',
      'Keywords: now, at the moment, look!, listen!, right now.'
    ],
    workedExamples: [
      {
        problem: 'Complete: "Look! The birds _____ (fly) in the blue sky."',
        solution: '"are flying" (Birds is plural, so we use are + fly + ing).',
        note: '"Look!" signals an action happening right now.'
      },
      {
        problem: 'Form a question: "What _____ you _____ (do) now?"',
        solution: '"What are you doing now?"',
        note: 'Question structure: Wh-word + are + subject + verb-ing.'
      }
    ],
    goldenTip: 'Never forget the helper verb (am/is/are) before adding -ing! (Say "He is eating", not "He eating").',
    keyFormulasOrRules: [
      'I + am + Verb-ing',
      'He / She / It + is + Verb-ing',
      'We / You / They + are + Verb-ing'
    ]
  },
  {
    id: 'english_3',
    subject: 'english',
    level: 3,
    unitNumber: 2,
    unitTitle: 'Unit 2: Memories & Past Adventures',
    lessonNumber: 3,
    lessonTitle: 'Past Simple: Regular & Irregular Verbs',
    bookPageRange: 'Pages 30 - 44',
    estimatedMinutes: 9,
    objective: 'Talk about completed actions in the past using regular (-ed) and common irregular verbs (go->went, see->saw).',
    summaryPoints: [
      'Use Past Simple for finished actions in the past at a specific time.',
      'Regular verbs: add -ed (play -> played, visit -> visited, watch -> watched).',
      'Irregular verbs: change completely and must be memorized (go -> went, see -> saw, buy -> bought, have -> had, eat -> ate).',
      'Negative: Subject + didn\'t + Base Verb (e.g., I didn\'t go, NOT didn\'t went).',
      'Keywords: yesterday, last week / last year, ago, in 2020.'
    ],
    workedExamples: [
      {
        problem: 'Change to past: "We _____ (go) to Alexandria last summer."',
        solution: 'went (irregular past of go).',
        note: '"last summer" tells us the action is in the past.'
      },
      {
        problem: 'Correct the sentence: "She didn\'t bought a new dress."',
        solution: '"She didn\'t buy a new dress."',
        note: 'After "didn\'t", the verb returns to its simple base form (buy).'
      }
    ],
    goldenTip: 'The "didn\'t" magnet rule: When "didn\'t" appears, it steals the past tense, so the verb stays in its base form!',
    keyFormulasOrRules: [
      'Regular: Verb + -ed',
      'Irregular: go->went, see->saw, write->wrote, make->made',
      'Negative: didn\'t + Base Verb'
    ]
  },
  {
    id: 'english_4',
    subject: 'english',
    level: 4,
    unitNumber: 2,
    unitTitle: 'Unit 2: Memories & Past Adventures',
    lessonNumber: 4,
    lessonTitle: 'Future Plans: (Will vs Going To)',
    bookPageRange: 'Pages 46 - 58',
    estimatedMinutes: 9,
    objective: 'Distinguish between quick decisions/predictions (will) and planned future intentions (am/is/are going to).',
    summaryPoints: [
      'Will + Base Verb: used for quick decisions, promises, and general future predictions without current evidence (e.g., I think it will rain).',
      'Be going to + Base Verb: used for prior plans, intentions, and predictions with clear physical evidence (e.g., Look at those dark clouds! It is going to rain).',
      'Keywords: tomorrow, next week, soon, in the future.'
    ],
    workedExamples: [
      {
        problem: 'Complete: "I have already booked my ticket. I _____ (travel) to Dubai next Friday."',
        solution: '"am going to travel" (because it is a planned arrangement with tickets).',
        note: 'Planned actions use "going to".'
      },
      {
        problem: 'The phone is ringing! - "I _____ (answer) it."',
        solution: '"will answer" (a quick spontaneous decision made at the moment of speaking).',
        note: 'Instant decision = will.'
      }
    ],
    goldenTip: 'Planned ahead = "going to". Decided in a flash = "will"!',
    keyFormulasOrRules: [
      'Quick Decision: Will + Base Verb',
      'Pre-planned Intent: am/is/are + going to + Base Verb'
    ]
  },
  {
    id: 'english_5',
    subject: 'english',
    level: 5,
    unitNumber: 3,
    unitTitle: 'Unit 3: Health, Rules & Helpful Advice',
    lessonNumber: 5,
    lessonTitle: 'Modal Verbs for Advice and Obligation (Should / Must)',
    bookPageRange: 'Pages 60 - 72',
    estimatedMinutes: 8,
    objective: 'Give advice using (should / shouldn’t) and express strong rules/obligation using (must / mustn’t).',
    summaryPoints: [
      'Should / Shouldn’t + Base Verb: used to give friendly advice or recommendations (e.g., You have a toothache, you should see a dentist).',
      'Must / Mustn’t + Base Verb: used for strong rules, school laws, and prohibition (e.g., You must wear your seatbelt / You mustn’t shout in the library).',
      'After modal verbs, the main verb always stays in base form without -s, -ed, or -ing.'
    ],
    workedExamples: [
      {
        problem: 'Choose: "You have a cold. You _____ (should / must) drink warm lemon tea."',
        solution: 'should (it is good friendly advice).',
        note: 'Advice = should.'
      },
      {
        problem: 'Traffic rule: "Drivers _____ (must / shouldn\'t) stop when the light turns red."',
        solution: 'must (it is an obligatory law).',
        note: 'Strong rule = must.'
      }
    ],
    goldenTip: 'Modal verbs are polite and clean: they never take "to" after them, and the verb stays pure base form!',
    keyFormulasOrRules: [
      'Advice: Should / Shouldn\'t + Base Verb',
      'Rule / Law: Must / Mustn\'t + Base Verb'
    ]
  },
  {
    id: 'english_6',
    subject: 'english',
    level: 6,
    unitNumber: 3,
    unitTitle: 'Unit 3: Health, Rules & Helpful Advice',
    lessonNumber: 6,
    lessonTitle: 'Comparative & Superlative Adjectives',
    bookPageRange: 'Pages 74 - 88',
    estimatedMinutes: 10,
    objective: 'Compare two items using (-er than / more than) and one item among all using (the -est / the most).',
    summaryPoints: [
      'Short Adjectives (1 syllable):',
      '  - Comparative (between 2): adjective + -er + than (tall -> taller than, fast -> faster than).',
      '  - Superlative (number 1 of all): the + adjective + -est (the tallest, the fastest).',
      'Long Adjectives (2+ syllables):',
      '  - Comparative: more + adjective + than (more dangerous than, more beautiful than).',
      '  - Superlative: the most + adjective (the most dangerous, the most beautiful).',
      'Irregular comparisons: good -> better than -> the best | bad -> worse than -> the worst.'
    ],
    workedExamples: [
      {
        problem: 'A cheetah is _____ (fast) than a lion.',
        solution: 'faster (comparing two animals, short adjective adds -er).',
        note: 'Notice the word "than" after the adjective.'
      },
      {
        problem: 'The blue whale is _____ (large) animal on Earth.',
        solution: 'the largest (superlative of all animals, add the + -est).',
        note: 'Superlative always needs "the" before it.'
      }
    ],
    goldenTip: 'If you see "than", look for "-er" or "more". If you see "the", look for "-est" or "most"!',
    keyFormulasOrRules: [
      'Short Comp: adj + -er + than',
      'Short Sup: the + adj + -est',
      'Long Comp: more + adj + than',
      'Long Sup: the most + adj',
      'Irregular: good -> better -> best'
    ]
  },
  {
    id: 'english_7',
    subject: 'english',
    level: 7,
    unitNumber: 4,
    unitTitle: 'Unit 4: Food, Market & Quantities',
    lessonNumber: 7,
    lessonTitle: 'Countable vs Uncountable Nouns & Quantifiers',
    bookPageRange: 'Pages 90 - 104',
    estimatedMinutes: 9,
    objective: 'Identify countable and uncountable nouns, and correctly use (some, any, much, many, a lot of, how many, how much).',
    summaryPoints: [
      'Countable Nouns: things you can count individually and have plurals (apples, books, pens). Use: many, few, how many.',
      'Uncountable Nouns: liquids, powders, concepts that cannot be counted as individual items (water, rice, milk, money, cheese, sugar). Use: much, little, how much.',
      'Some vs Any:',
      '  - Some: used in positive affirmative sentences and polite offers (I have some apples / Would you like some tea?).',
      '  - Any: used in negative sentences and regular questions (I don\'t have any money / Do you have any pens?).'
    ],
    workedExamples: [
      {
        problem: 'Fill in the blank: "_____ (How many / How much) water do you drink every day?"',
        solution: '"How much" (water is an uncountable liquid).',
        note: 'How much for uncountable liquids and quantities.'
      },
      {
        problem: 'Choose: "There isn\'t _____ (some / any) milk left in the fridge."',
        solution: 'any (because the sentence is negative with "isn\'t").',
        note: 'Negative sentences require "any".'
      }
    ],
    goldenTip: 'Countable has an "s" in plural (coins -> how many). Uncountable has no plural (money -> how much)!',
    keyFormulasOrRules: [
      'Countable: How many + Plural noun',
      'Uncountable: How much + Uncountable noun',
      'Positive: Some | Negative & Questions: Any'
    ]
  },
  {
    id: 'english_8',
    subject: 'english',
    level: 8,
    unitNumber: 4,
    unitTitle: 'Unit 4: Food, Market & Quantities',
    lessonNumber: 8,
    lessonTitle: 'Question Words & Forming Wh- Questions',
    bookPageRange: 'Pages 106 - 118',
    estimatedMinutes: 8,
    objective: 'Master Wh- question words (Who, What, Where, When, Why, How) and the formula for constructing English questions.',
    summaryPoints: [
      'Wh- question words:',
      '  - Who: asks about people (Who is your teacher?).',
      '  - Where: asks about places (Where do you live?).',
      '  - When: asks about time (When does school start?).',
      '  - Why: asks about reasons (Why are you happy? Because...).',
      '  - What: asks about things or actions (What are you doing?).',
      '  - How: asks about manner or state (How do you go to school? By bus).',
      'Standard Question Formula: (Wh- Word) + (Helping Verb: do/does/is/are/did) + (Subject) + (Main Verb)?'
    ],
    workedExamples: [
      {
        problem: '"_____ did you put my glasses?" - "On the table."',
        solution: 'Where (the answer "On the table" indicates a location).',
        note: 'Look at the answer to deduce the right question word.'
      }
    ],
    goldenTip: 'The 4-Step Question Rocket: 1. Wh-Word -> 2. Helper (do/does/did) -> 3. Person (Subject) -> 4. Action (Verb)?',
    keyFormulasOrRules: [
      'Wh-Word + Helper + Subject + Main Verb + ?'
    ]
  },
  {
    id: 'english_9',
    subject: 'english',
    level: 9,
    unitNumber: 5,
    unitTitle: 'Unit 5: Places, Directions & Prepositions',
    lessonNumber: 9,
    lessonTitle: 'Prepositions of Time and Place (In, On, At)',
    bookPageRange: 'Pages 120 - 134',
    estimatedMinutes: 8,
    objective: 'Apply prepositions of time and place (In, On, At) accurately using the pyramid rule.',
    summaryPoints: [
      'Prepositions of Time:',
      '  - IN (Bigger periods): months, years, seasons, centuries (in May, in 2026, in summer, in the morning).',
      '  - ON (Specific days & dates): days of the week, full dates (on Monday, on my birthday, on October 6th).',
      '  - AT (Precise clock times): exact times, night, weekend (at 7:00 PM, at night, at noon).',
      'Prepositions of Place: in the room (inside), on the table (surface), at the door / at school (specific point).'
    ],
    workedExamples: [
      {
        problem: 'Choose: "We have our English exam _____ (in / on / at) Tuesday morning."',
        solution: 'on (because Tuesday is a specific day of the week).',
        note: 'Days of the week always take "on".'
      },
      {
        problem: 'Choose: "My grandfather was born _____ (in / on / at) 1960."',
        solution: 'in (years take "in").',
        note: 'Years and months use "in".'
      }
    ],
    goldenTip: 'The Time Triangle: IN is the biggest (years/months), ON is in the middle (days), and AT is the sharpest point (exact clock time)!',
    keyFormulasOrRules: [
      'IN: Months, Years, Seasons, Parts of day',
      'ON: Days, Dates',
      'AT: Clock times, Night, Noon'
    ]
  },
  {
    id: 'english_10',
    subject: 'english',
    level: 10,
    unitNumber: 5,
    unitTitle: 'Unit 5: Final Review & English Champion Quest',
    lessonNumber: 10,
    lessonTitle: 'Reading Comprehension & Language Master Challenge',
    bookPageRange: 'Pages 136 - 150',
    estimatedMinutes: 12,
    objective: 'Integrate reading comprehension, grammar accuracy, dialogue completion, and contextual vocabulary mastery.',
    summaryPoints: [
      'Reading Strategy: Skim the text quickly first to get the main idea, then read questions, then scan for exact keywords.',
      'Always pay attention to pronoun references (e.g., what does "it" or "they" refer to in line 3?).',
      'Verify verb tenses throughout the paragraph to maintain consistency.'
    ],
    workedExamples: [
      {
        problem: 'Reading skill: How to find the main idea of a passage?',
        solution: 'Look at the title, the first sentence of the first paragraph, and the concluding sentence.',
        note: 'The first sentence often states the topic.'
      }
    ],
    goldenTip: 'True English Champions read the question first, then look for the secret clue inside the paragraph!',
    keyFormulasOrRules: [
      'Skim for the main idea -> Scan for specific details.'
    ]
  }
];

export const getLessonBySubjectAndLevel = (subject: string, level: number): TextbookLesson | undefined => {
  return TEXTBOOK_LESSONS.find(l => l.subject === subject && l.level === level);
};
