import {
  User,
  Team,
  TeamMember,
  Skill,
  MemberSkill,
  Interest,
  MemberInterest,
  ProjectIdea,
  Project,
  Phase,
  Task,
  TaskAssignment,
  ProgressUpdate,
  Notification
} from '../types';

export const UNIFIED_TEAM_AVATAR = '/src/assets/images/saudi_female_avatar_1786329166163.jpg';

export const INITIAL_USERS: User[] = [
  {
    user_id: 'usr-101',
    name: 'جوري بدر العتيبي',
    email: 'itsjorybb@gmail.com',
    password_hash: 'hashed_secret_123',
    created_at: '2026-01-15T10:00:00Z',
    avatar: UNIFIED_TEAM_AVATAR
  },
  {
    user_id: 'usr-102',
    name: 'مها محمد البلوي',
    email: 'maha.albalawi09@gmail.com',
    password_hash: 'hashed_secret_123',
    created_at: '2026-01-16T11:30:00Z',
    avatar: UNIFIED_TEAM_AVATAR
  },
  {
    user_id: 'usr-103',
    name: 'ريما صالح الزريقي',
    email: 'reemasaleh019@gmail.com',
    password_hash: 'hashed_secret_123',
    created_at: '2026-01-17T09:15:00Z',
    avatar: UNIFIED_TEAM_AVATAR
  },
  {
    user_id: 'usr-104',
    name: 'أسيل رزق الحجيلي',
    email: 'aseelalhejaili3@gmail.com',
    password_hash: 'hashed_secret_123',
    created_at: '2026-01-18T14:20:00Z',
    avatar: UNIFIED_TEAM_AVATAR
  }
];

export const INITIAL_SKILLS: Skill[] = [
  { skill_id: 'sk-1', skill_name: 'React / Next.js', category: 'Frontend' },
  { skill_id: 'sk-2', skill_name: 'Node.js / Express', category: 'Backend' },
  { skill_id: 'sk-3', skill_name: 'Python & FastAPI', category: 'Backend' },
  { skill_id: 'sk-4', skill_name: 'Machine Learning / PyTorch', category: 'AI' },
  { skill_id: 'sk-5', skill_name: 'تصميم الواجهات UI/UX', category: 'Design' },
  { skill_id: 'sk-6', skill_name: 'Flutter / Dart', category: 'Mobile' },
  { skill_id: 'sk-7', skill_name: 'تصميم قواعد البيانات SQL/NoSQL', category: 'Database' },
  { skill_id: 'sk-8', skill_name: 'الحوسبة السحابية & Docker', category: 'DevOps' },
  { skill_id: 'sk-9', skill_name: 'الأمن السيبراني والتشفير', category: 'Security' },
  { skill_id: 'sk-10', skill_name: 'تحليل البيانات Data Science', category: 'AI' },
  { skill_id: 'sk-11', skill_name: 'معالجة اللغات الطبيعية NLP', category: 'AI' },
  { skill_id: 'sk-12', skill_name: 'إنترنت الأشياء IoT', category: 'Hardware' }
];

export const INITIAL_INTERESTS: Interest[] = [
  { interest_id: 'int-1', interest_name: 'الذكاء الاصطناعي والتعلم الآلي' },
  { interest_id: 'int-2', interest_name: 'تطبيقات الهواتف الذكية' },
  { interest_id: 'int-3', interest_name: 'التقنيات المالية (FinTech)' },
  { interest_id: 'int-4', interest_name: 'التكنولوجيا الطبية (HealthTech)' },
  { interest_id: 'int-5', interest_name: 'المدن الذكية و إنترنت الأشياء' },
  { interest_id: 'int-6', interest_name: 'الأمن السيبراني وحماية البيانات' },
  { interest_id: 'int-7', interest_name: 'التعليم الإلكتروني وتطوير المهارات' },
  { interest_id: 'int-8', interest_name: 'التجارة الإلكترونية واللوجستيات' }
];

export const INITIAL_TEAMS: Team[] = [
  {
    team_id: 'team-01',
    team_name: 'فريق إنجاز سند',
    created_by: 'usr-101',
    invite_code: 'SANAD-2026'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    team_member_id: 'tm-1',
    team_id: 'team-01',
    user_id: 'usr-101',
    role: 'قائد الفريق',
    joined_at: '2026-01-20T10:00:00Z'
  },
  {
    team_member_id: 'tm-2',
    team_id: 'team-01',
    user_id: 'usr-102',
    role: 'عضو',
    joined_at: '2026-01-21T12:00:00Z'
  },
  {
    team_member_id: 'tm-3',
    team_id: 'team-01',
    user_id: 'usr-103',
    role: 'عضو',
    joined_at: '2026-01-22T09:30:00Z'
  },
  {
    team_member_id: 'tm-4',
    team_id: 'team-01',
    user_id: 'usr-104',
    role: 'عضو',
    joined_at: '2026-01-23T15:00:00Z'
  }
];

export const INITIAL_MEMBER_SKILLS: MemberSkill[] = [
  // Osama (tm-1)
  { member_id: 'tm-1', skill_id: 'sk-1' },
  { member_id: 'tm-1', skill_id: 'sk-2' },
  { member_id: 'tm-1', skill_id: 'sk-8' },

  // Sara (tm-2)
  { member_id: 'tm-2', skill_id: 'sk-1' },
  { member_id: 'tm-2', skill_id: 'sk-5' },
  { member_id: 'tm-2', skill_id: 'sk-6' },

  // Ahmed (tm-3)
  { member_id: 'tm-3', skill_id: 'sk-2' },
  { member_id: 'tm-3', skill_id: 'sk-3' },
  { member_id: 'tm-3', skill_id: 'sk-7' },

  // Noura (tm-4)
  { member_id: 'tm-4', skill_id: 'sk-4' },
  { member_id: 'tm-4', skill_id: 'sk-10' },
  { member_id: 'tm-4', skill_id: 'sk-11' }
];

export const INITIAL_MEMBER_INTERESTS: MemberInterest[] = [
  // Osama
  { member_id: 'tm-1', interest_id: 'int-1' },
  { member_id: 'tm-1', interest_id: 'int-3' },

  // Sara
  { member_id: 'tm-2', interest_id: 'int-2' },
  { member_id: 'tm-2', interest_id: 'int-7' },

  // Ahmed
  { member_id: 'tm-3', interest_id: 'int-5' },
  { member_id: 'tm-3', interest_id: 'int-6' },

  // Noura
  { member_id: 'tm-4', interest_id: 'int-1' },
  { member_id: 'tm-4', interest_id: 'int-4' }
];

export const INITIAL_PROJECT_IDEAS: ProjectIdea[] = [
  {
    idea_id: 'idea-001',
    title: 'منصة التشخيص المبكر للأمراض الجلدية بالذكاء الاصطناعي',
    description: 'تطبيق جوال يتيح للمرضى التقاط صور للآفات الجلدية وتحليلها بدقة باستخدام نماذج الرؤية الحاسوبية Deep Learning مع توصية بالعيادات المتاحة.',
    related_interest: 'التكنولوجيا الطبية (HealthTech)',
    created_by_ai: true,
    difficulty: 'متقدم',
    tech_stack: ['Flutter', 'Python', 'PyTorch', 'FastAPI'],
    suggested_phases: ['دراسة المتطلبات والجمع الطبي', 'تدريب النموذج وبناء API', 'تطوير تطبيق الجوال', 'اختبار الدقة والتكامل']
  },
  {
    idea_id: 'idea-002',
    title: 'نظام إدارة وإرشادات مشاريع التخرج بالذكاء الاصطناعي',
    description: 'نظام ذكي يساعد الفرق الطلابية والمشرفين الأكاديميين على تنظيم المراحل وتوزيع المهام الذكي استناداً لنقاط قوة الطلاب والمهارات.',
    related_interest: 'التعليم الإلكتروني وتطوير المهارات',
    created_by_ai: true,
    difficulty: 'متوسط',
    tech_stack: ['React', 'Express', 'TypeScript', 'Gemini API'],
    suggested_phases: ['تحديد الهيكلية وقاعدة البيانات', 'تطوير لوحة التحكم والذكاء الاصطناعي', 'بناء لوحة Kanban والمهام', 'الاختبار الميداني والتوثيق']
  },
  {
    idea_id: 'idea-003',
    title: 'مساعد FinTech لإدارة ميزانية الطلاب والادخار الذكي',
    description: 'تطبيق ويب وجوال يرتبط ببطاقات الشراء ويوجه الطالب بنصائح ادخارية آفر مع تحليلات إنفاق قائمة على الذكاء الاصطناعي.',
    related_interest: 'التقنيات المالية (FinTech)',
    created_by_ai: false,
    difficulty: 'متوسط',
    tech_stack: ['React Native', 'Node.js', 'PostgreSQL', 'Recharts'],
    suggested_phases: ['تصميم واجهات المستخدم', 'ربط الخدمات المصرفية المماثلة', 'بناء خوارزميات التوصية المالية', 'النشر والاختبار']
  },
  {
    idea_id: 'idea-004',
    title: 'نظام مراقبة استهلاك الطاقة في المباني الجامعية بـ IoT',
    description: 'شبكة أجهزة استشعار ذكية تقيس استهلاك الكهرباء وتكتشف الفاقد وتتنبأ بالاستهلاك باستخدام الذكاء الاصطناعي.',
    related_interest: 'المدن الذكية و إنترنت الأشياء',
    created_by_ai: true,
    difficulty: 'متقدم',
    tech_stack: ['IoT Hardware', 'Python', 'InfluxDB', 'React Dashboard'],
    suggested_phases: ['تجميع المستشعرات واختبار الإشارة', 'بناء خادم البيانات', 'تطوير نموذج التنبؤ', 'عرض لوحة التحليلات']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    project_id: 'proj-100',
    team_id: 'team-01',
    idea_id: 'idea-002',
    name: 'المدير الذكي لمشاريع التخرج',
    status: 'in_progress',
    start_date: '2026-02-01'
  }
];

export const INITIAL_PHASES: Phase[] = [
  {
    phase_id: 'ph-1',
    project_id: 'proj-100',
    phase_name: '1. دراسة المتطلبات وتحديد الهيكلية',
    order: 1,
    status: 'completed'
  },
  {
    phase_id: 'ph-2',
    project_id: 'proj-100',
    phase_name: '2. تصميم واجهات المستخدم وقواعد البيانات',
    order: 2,
    status: 'in_progress'
  },
  {
    phase_id: 'ph-3',
    project_id: 'proj-100',
    phase_name: '3. تطوير محرك التوزيع الذكي والذكاء الاصطناعي',
    order: 3,
    status: 'in_progress'
  },
  {
    phase_id: 'ph-4',
    project_id: 'proj-100',
    phase_name: '4. الاختبار والتكامل ولوحة التحكم Kanban',
    order: 4,
    status: 'not_started'
  },
  {
    phase_id: 'ph-5',
    project_id: 'proj-100',
    phase_name: '5. التوثيق والعرض التقديمي النهائي',
    order: 5,
    status: 'not_started'
  }
];

export const INITIAL_TASKS: Task[] = [
  // Phase 1 Tasks
  {
    task_id: 'tsk-101',
    phase_id: 'ph-1',
    title: 'إعداد وثيقة مقترح المشروع (Proposal)',
    description: 'كتابة أهداف المشروع، المشكلة، والحل المقترح والمخطط الزمني الشامل.',
    deadline: '2026-02-10',
    status: 'done',
    required_skills: ['تصميم الواجهات UI/UX', 'React / Next.js']
  },
  {
    task_id: 'tsk-102',
    phase_id: 'ph-1',
    title: 'تحليل المتطلبات الوظيفية وغير الوظيفية',
    description: 'رسم مخططات Use Cases وحالات الاستخدام لجميع أطراف النظام.',
    deadline: '2026-02-15',
    status: 'done',
    required_skills: ['تصميم قواعد البيانات SQL/NoSQL']
  },

  // Phase 2 Tasks
  {
    task_id: 'tsk-201',
    phase_id: 'ph-2',
    title: 'تصميم مخطط قاعدة البيانات ERD (14 جدول)',
    description: 'بناء الهيكل الكامل للجداول الـ14 والعلاقات والمفاتيح الخارجية.',
    deadline: '2026-02-25',
    status: 'done',
    required_skills: ['Node.js / Express', 'تصميم قواعد البيانات SQL/NoSQL']
  },
  {
    task_id: 'tsk-202',
    phase_id: 'ph-2',
    title: 'تطوير الواجهة الأمامية الشاملة بـ React + Tailwind',
    description: 'بناء 10 شاشات رئيسية تدعم RTL والتفاعل السلس و Skeletons.',
    deadline: '2026-03-05',
    status: 'in_progress',
    required_skills: ['React / Next.js', 'تصميم الواجهات UI/UX']
  },

  // Phase 3 Tasks
  {
    task_id: 'tsk-301',
    phase_id: 'ph-3',
    title: 'دمج نماذج Gemini للاقتراحات الذكية',
    description: 'إنشاء API لإنشاء أفكار مشاريع مخصصة حسب مهارات الفريق.',
    deadline: '2026-03-12',
    status: 'in_progress',
    required_skills: ['Machine Learning / PyTorch', 'معالجة اللغات الطبيعية NLP', 'Node.js / Express']
  },
  {
    task_id: 'tsk-302',
    phase_id: 'ph-3',
    title: 'خوارزمية التوزيع العادل للمهام Smart Matching',
    description: 'مطابقة مهام المشروع مع المهارات وعبء العمل الحالي للأعضاء.',
    deadline: '2026-03-18',
    status: 'todo',
    required_skills: ['تحليل البيانات Data Science', 'Python & FastAPI']
  },

  // Phase 4 Tasks
  {
    task_id: 'tsk-401',
    phase_id: 'ph-4',
    title: 'تكامل السحب والإفلات للوحات Kanban',
    description: 'تسهيل تغيير حالة المهمة بسلاسة مع إصدار إشعارات فورية.',
    deadline: '2026-03-25',
    status: 'todo',
    required_skills: ['React / Next.js']
  },
  {
    task_id: 'tsk-402',
    phase_id: 'ph-4',
    title: 'اختبارات الوحدات والتأكد من الأداء',
    description: 'فحص استجابة API وتأكيد دقة حفظ الإنجاز والتنبيهات.',
    deadline: '2026-04-01',
    status: 'todo',
    required_skills: ['Node.js / Express', 'الحوسبة السحابية & Docker']
  }
];

export const INITIAL_TASK_ASSIGNMENTS: TaskAssignment[] = [
  { assignment_id: 'ta-1', task_id: 'tsk-101', team_member_id: 'tm-1', assigned_at: '2026-02-02T09:00:00Z' },
  { assignment_id: 'ta-2', task_id: 'tsk-102', team_member_id: 'tm-3', assigned_at: '2026-02-05T10:00:00Z' },
  { assignment_id: 'ta-3', task_id: 'tsk-201', team_member_id: 'tm-3', assigned_at: '2026-02-16T11:00:00Z' },
  { assignment_id: 'ta-4', task_id: 'tsk-202', team_member_id: 'tm-2', assigned_at: '2026-02-20T08:30:00Z' },
  { assignment_id: 'ta-5', task_id: 'tsk-301', team_member_id: 'tm-4', assigned_at: '2026-02-28T14:00:00Z' }
];

export const INITIAL_PROGRESS_UPDATES: ProgressUpdate[] = [
  {
    update_id: 'pu-1',
    task_id: 'tsk-101',
    member_id: 'tm-1',
    progress_percent: 100,
    note: 'تم إكمال الوثيقة واعتمادها من مشرف المشروع الأكاديمي.',
    updated_at: '2026-02-09T16:00:00Z'
  },
  {
    update_id: 'pu-2',
    task_id: 'tsk-102',
    member_id: 'tm-3',
    progress_percent: 100,
    note: 'تم الانتهاء من صياغة المتطلبات ورسم مخططات Use Case.',
    updated_at: '2026-02-14T18:30:00Z'
  },
  {
    update_id: 'pu-3',
    task_id: 'tsk-201',
    member_id: 'tm-3',
    progress_percent: 100,
    note: 'تم بناء وتدقيق 14 جدول بنجاح وربط المفاتيح الخارجية.',
    updated_at: '2026-02-24T12:00:00Z'
  },
  {
    update_id: 'pu-4',
    task_id: 'tsk-202',
    member_id: 'tm-2',
    progress_percent: 75,
    note: 'تم بناء 7 شاشات رئيسية، وجاري العمل على Kanban وتصميم التنبيهات.',
    updated_at: '2026-03-01T15:45:00Z'
  },
  {
    update_id: 'pu-5',
    task_id: 'tsk-301',
    member_id: 'tm-4',
    progress_percent: 60,
    note: 'تم ربط نموذج Gemini 3.6 Flash واختبار توليد المقترحات باللغة العربية.',
    updated_at: '2026-03-03T10:20:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    notification_id: 'notif-1',
    user_id: 'usr-101',
    task_id: 'tsk-301',
    message: 'قامت أسيل رزق الحجيلي بزيادة نسبة إنجاز مهمة "دمج نماذج Gemini" إلى 60%',
    type: 'info',
    is_read: false,
    created_at: '2026-03-03T10:20:00Z'
  },
  {
    notification_id: 'notif-2',
    user_id: 'usr-101',
    task_id: 'tsk-202',
    message: 'تنبيه: اقترب الموعد النهائي لمهمة "تطوير الواجهة الأمامية الشاملة" (5 مارس)',
    type: 'warning',
    is_read: false,
    created_at: '2026-03-02T09:00:00Z'
  },
  {
    notification_id: 'notif-3',
    user_id: 'usr-102',
    task_id: 'tsk-202',
    message: 'تم إسناد مهمة جديدة إلى مها محمد البلوي: "تطوير الواجهة الأمامية الشاملة بـ React + Tailwind"',
    type: 'info',
    is_read: true,
    created_at: '2026-02-20T08:30:00Z'
  },
  {
    notification_id: 'notif-4',
    user_id: 'usr-101',
    task_id: null,
    message: 'أهلاً بك في نظام سند الذكي لمشاريع التخرج! تم تجهيز "فريق إنجاز سند".',
    type: 'success',
    is_read: true,
    created_at: '2026-01-20T10:05:00Z'
  },
  {
    notification_id: 'notif-5',
    user_id: 'usr-101',
    task_id: 'tsk-302',
    message: 'هناك مهمة "خوارزمية التوزيع العادل" غير مسندة لأحد الأعضاء حتى الآن.',
    type: 'alert',
    is_read: false,
    created_at: '2026-03-04T11:00:00Z'
  }
];
