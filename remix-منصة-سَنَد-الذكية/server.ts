import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

import {
  INITIAL_USERS,
  INITIAL_SKILLS,
  INITIAL_INTERESTS,
  INITIAL_TEAMS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_MEMBER_SKILLS,
  INITIAL_MEMBER_INTERESTS,
  INITIAL_PROJECT_IDEAS,
  INITIAL_PROJECTS,
  INITIAL_PHASES,
  INITIAL_TASKS,
  INITIAL_TASK_ASSIGNMENTS,
  INITIAL_PROGRESS_UPDATES,
  INITIAL_NOTIFICATIONS
} from "./src/data/mockData.js";

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
  Notification,
  SmartMatchResult
} from "./src/types.js";

dotenv.config();

const _dirname = process.cwd();

// In-Memory 14-Table Datastore with persistence state
let usersStore: User[] = [...INITIAL_USERS];
let teamsStore: Team[] = [...INITIAL_TEAMS];
let teamMembersStore: TeamMember[] = [...INITIAL_TEAM_MEMBERS];
let skillsStore: Skill[] = [...INITIAL_SKILLS];
let memberSkillsStore: MemberSkill[] = [...INITIAL_MEMBER_SKILLS];
let interestsStore: Interest[] = [...INITIAL_INTERESTS];
let memberInterestsStore: MemberInterest[] = [...INITIAL_MEMBER_INTERESTS];
let projectIdeasStore: ProjectIdea[] = [...INITIAL_PROJECT_IDEAS];
let projectsStore: Project[] = [...INITIAL_PROJECTS];
let phasesStore: Phase[] = [...INITIAL_PHASES];
let tasksStore: Task[] = [...INITIAL_TASKS];
let taskAssignmentsStore: TaskAssignment[] = [...INITIAL_TASK_ASSIGNMENTS];
let progressUpdatesStore: ProgressUpdate[] = [...INITIAL_PROGRESS_UPDATES];
let notificationsStore: Notification[] = [...INITIAL_NOTIFICATIONS];

// Gemini Client initialization
const getGeminiClient = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ----------------------------------------------------
  // REST ENDPOINTS FOR THE 14 TABLES
  // ----------------------------------------------------

  // 1. Users
  app.get("/api/users", (req, res) => res.json(usersStore));
  app.post("/api/users", (req, res) => {
    const newUser: User = {
      user_id: `usr-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...req.body
    };
    usersStore.push(newUser);
    res.status(201).json(newUser);
  });

  // 2. Teams
  app.get("/api/teams", (req, res) => res.json(teamsStore));
  app.post("/api/teams", (req, res) => {
    const newTeam: Team = {
      team_id: `team-${Date.now()}`,
      invite_code: `TEAM-${Math.floor(1000 + Math.random() * 9000)}`,
      ...req.body
    };
    teamsStore.push(newTeam);

    // Auto add creator as قائد الفريق
    if (newTeam.created_by) {
      const creatorMember: TeamMember = {
        team_member_id: `tm-${Date.now()}`,
        team_id: newTeam.team_id,
        user_id: newTeam.created_by,
        role: 'قائد الفريق',
        joined_at: new Date().toISOString()
      };
      teamMembersStore.push(creatorMember);
    }
    res.status(201).json(newTeam);
  });

  // 3. Team Members
  app.get("/api/team-members", (req, res) => res.json(teamMembersStore));
  app.post("/api/team-members", (req, res) => {
    const newMember: TeamMember = {
      team_member_id: `tm-${Date.now()}`,
      joined_at: new Date().toISOString(),
      role: req.body.role || 'عضو',
      ...req.body
    };
    teamMembersStore.push(newMember);
    res.status(201).json(newMember);
  });

  // 4. Skills
  app.get("/api/skills", (req, res) => res.json(skillsStore));
  app.post("/api/skills", (req, res) => {
    const newSkill: Skill = {
      skill_id: `sk-${Date.now()}`,
      ...req.body
    };
    skillsStore.push(newSkill);
    res.status(201).json(newSkill);
  });

  // 5. Member Skills
  app.get("/api/member-skills", (req, res) => res.json(memberSkillsStore));
  app.post("/api/member-skills/set", (req, res) => {
    const { member_id, skill_ids } = req.body;
    memberSkillsStore = memberSkillsStore.filter(ms => ms.member_id !== member_id);
    if (Array.isArray(skill_ids)) {
      skill_ids.forEach(sId => {
        memberSkillsStore.push({ member_id, skill_id: sId });
      });
    }
    res.json(memberSkillsStore.filter(ms => ms.member_id === member_id));
  });

  // 6. Interests
  app.get("/api/interests", (req, res) => res.json(interestsStore));
  app.post("/api/interests", (req, res) => {
    const newInterest: Interest = {
      interest_id: `int-${Date.now()}`,
      ...req.body
    };
    interestsStore.push(newInterest);
    res.status(201).json(newInterest);
  });

  // 7. Member Interests
  app.get("/api/member-interests", (req, res) => res.json(memberInterestsStore));
  app.post("/api/member-interests/set", (req, res) => {
    const { member_id, interest_ids } = req.body;
    memberInterestsStore = memberInterestsStore.filter(mi => mi.member_id !== member_id);
    if (Array.isArray(interest_ids)) {
      interest_ids.forEach(iId => {
        memberInterestsStore.push({ member_id, interest_id: iId });
      });
    }
    res.json(memberInterestsStore.filter(mi => mi.member_id === member_id));
  });

  // 8. Project Ideas
  app.get("/api/project-ideas", (req, res) => res.json(projectIdeasStore));
  app.post("/api/project-ideas", (req, res) => {
    const newIdea: ProjectIdea = {
      idea_id: `idea-${Date.now()}`,
      created_by_ai: false,
      ...req.body
    };
    projectIdeasStore.unshift(newIdea);
    res.status(201).json(newIdea);
  });

  // 9. Projects
  app.get("/api/projects", (req, res) => res.json(projectsStore));
  app.post("/api/projects", (req, res) => {
    const { team_id, idea_id, name, start_date } = req.body;
    const newProj: Project = {
      project_id: `proj-${Date.now()}`,
      team_id,
      idea_id,
      name,
      status: 'planning',
      start_date: start_date || new Date().toISOString().split('T')[0]
    };
    projectsStore.unshift(newProj);

    // If selected idea has suggested phases, populate them!
    const idea = projectIdeasStore.find(i => i.idea_id === idea_id);
    if (idea && idea.suggested_phases && idea.suggested_phases.length > 0) {
      idea.suggested_phases.forEach((phaseTitle, idx) => {
        const phaseId = `ph-${Date.now()}-${idx}`;
        const newPhase: Phase = {
          phase_id: phaseId,
          project_id: newProj.project_id,
          phase_name: `${idx + 1}. ${phaseTitle}`,
          order: idx + 1,
          status: idx === 0 ? 'in_progress' : 'not_started'
        };
        phasesStore.push(newPhase);

        // Add a sample task per phase
        tasksStore.push({
          task_id: `tsk-${Date.now()}-${idx}`,
          phase_id: phaseId,
          title: `تنفيذ مخرجات مرحلة: ${phaseTitle}`,
          description: `العمل على إنهاء متطلبات ${phaseTitle} حسب مواصفات فكرة "${idea.title}".`,
          deadline: new Date(Date.now() + (idx + 1) * 7 * 86400000).toISOString().split('T')[0],
          status: idx === 0 ? 'in_progress' : 'todo'
        });
      });
    }

    res.status(201).json(newProj);
  });

  // 10. Phases
  app.get("/api/phases", (req, res) => res.json(phasesStore));
  app.post("/api/phases", (req, res) => {
    const newPhase: Phase = {
      phase_id: `ph-${Date.now()}`,
      order: phasesStore.filter(p => p.project_id === req.body.project_id).length + 1,
      status: 'not_started',
      ...req.body
    };
    phasesStore.push(newPhase);
    res.status(201).json(newPhase);
  });

  // 11. Tasks
  app.get("/api/tasks", (req, res) => res.json(tasksStore));
  app.post("/api/tasks", (req, res) => {
    const newTask: Task = {
      task_id: `tsk-${Date.now()}`,
      status: 'todo',
      ...req.body
    };
    tasksStore.push(newTask);
    res.status(201).json(newTask);
  });
  app.patch("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksStore.findIndex(t => t.task_id === id);
    if (taskIndex !== -1) {
      tasksStore[taskIndex] = { ...tasksStore[taskIndex], ...req.body };
      res.json(tasksStore[taskIndex]);
    } else {
      res.status(404).json({ error: "المهمة غير موجودة" });
    }
  });

  // 12. Task Assignments
  app.get("/api/task-assignments", (req, res) => res.json(taskAssignmentsStore));
  app.post("/api/task-assignments", (req, res) => {
    const { task_id, team_member_id } = req.body;
    // Remove existing assignment for this task if any
    taskAssignmentsStore = taskAssignmentsStore.filter(ta => ta.task_id !== task_id);
    const newAssign: TaskAssignment = {
      assignment_id: `ta-${Date.now()}`,
      task_id,
      team_member_id,
      assigned_at: new Date().toISOString()
    };
    taskAssignmentsStore.push(newAssign);

    // Notify user
    const member = teamMembersStore.find(m => m.team_member_id === team_member_id);
    const task = tasksStore.find(t => t.task_id === task_id);
    if (member && task) {
      notificationsStore.unshift({
        notification_id: `notif-${Date.now()}`,
        user_id: member.user_id,
        task_id: task.task_id,
        message: `تم إسناد المهمة "${task.title}" إليك بنجاح.`,
        type: 'info',
        is_read: false,
        created_at: new Date().toISOString()
      });
    }

    res.status(201).json(newAssign);
  });

  // 13. Progress Updates
  app.get("/api/progress-updates", (req, res) => res.json(progressUpdatesStore));
  app.post("/api/progress-updates", (req, res) => {
    const { task_id, member_id, progress_percent, note } = req.body;
    const newUpdate: ProgressUpdate = {
      update_id: `pu-${Date.now()}`,
      task_id,
      member_id,
      progress_percent: Number(progress_percent),
      note: note || '',
      updated_at: new Date().toISOString()
    };
    progressUpdatesStore.unshift(newUpdate);

    // If progress is 100%, update task status to done
    const taskIndex = tasksStore.findIndex(t => t.task_id === task_id);
    if (taskIndex !== -1) {
      if (Number(progress_percent) === 100) {
        tasksStore[taskIndex].status = 'done';
      } else if (Number(progress_percent) > 0 && tasksStore[taskIndex].status === 'todo') {
        tasksStore[taskIndex].status = 'in_progress';
      }
    }

    // Add notification to team leader
    const task = tasksStore.find(t => t.task_id === task_id);
    const updatingMember = teamMembersStore.find(m => m.team_member_id === member_id);
    const updatingUser = usersStore.find(u => u.user_id === updatingMember?.user_id);
    const leader = teamMembersStore.find(m => m.role === 'قائد الفريق');

    if (leader && updatingUser && task) {
      notificationsStore.unshift({
        notification_id: `notif-${Date.now()}`,
        user_id: leader.user_id,
        task_id: task.task_id,
        message: `قام ${updatingUser.name} بتحديث نسبة إنجاز "${task.title}" إلى ${progress_percent}%`,
        type: Number(progress_percent) === 100 ? 'success' : 'info',
        is_read: false,
        created_at: new Date().toISOString()
      });
    }

    res.status(201).json(newUpdate);
  });

  // 14. Notifications
  app.get("/api/notifications", (req, res) => res.json(notificationsStore));
  app.patch("/api/notifications/read-all", (req, res) => {
    notificationsStore.forEach(n => n.is_read = true);
    res.json({ status: "ok" });
  });
  app.patch("/api/notifications/:id/read", (req, res) => {
    const { id } = req.params;
    const notif = notificationsStore.find(n => n.notification_id === id);
    if (notif) {
      notif.is_read = true;
      res.json(notif);
    } else {
      res.status(404).json({ error: "الإشعار غير موجود" });
    }
  });

  // ----------------------------------------------------
  // AI ENDPOINTS (GEMINI API SERVER-SIDE)
  // ----------------------------------------------------

  // AI Idea Generation based on Team Interests and Skills
  app.post("/api/ai/suggest-ideas", async (req, res) => {
    const { team_id, filter_interest } = req.body;

    // Fetch team members, skills, and interests
    const members = teamMembersStore.filter(m => m.team_id === (team_id || 'team-01'));
    const memberIds = members.map(m => m.team_member_id);

    const teamSkills = memberSkillsStore
      .filter(ms => memberIds.includes(ms.member_id))
      .map(ms => skillsStore.find(s => s.skill_id === ms.skill_id)?.skill_name)
      .filter(Boolean);

    const teamInterests = memberInterestsStore
      .filter(mi => memberIds.includes(mi.member_id))
      .map(mi => interestsStore.find(i => i.interest_id === mi.interest_id)?.interest_name)
      .filter(Boolean);

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback realistic AI ideas generator if GEMINI_API_KEY is missing
      const fallbackIdeas: ProjectIdea[] = [
        {
          idea_id: `idea-ai-${Date.now()}-1`,
          title: "منصة ذكية للتحليل المالي الشخصي بالذكاء الاصطناعي",
          description: "تطبيق ويب وجوال يستفيد من خوارزميات التعلم الآلي لتحليل سلوك الإنفاق وتوقع الادخار الشهري بتقديم توصيات موجهة باللغة العربية.",
          related_interest: filter_interest || "التقنيات المالية (FinTech)",
          created_by_ai: true,
          difficulty: "متوسط",
          tech_stack: Array.from(new Set([...teamSkills.slice(0, 3), "Python", "React"])),
          suggested_phases: ["تحليل البيانات المالية والنموذج", "تصميم واجهة المستخدم", "تطوير لوحة التحكم والتحليلات", "الاختبار والتسليم"]
        },
        {
          idea_id: `idea-ai-${Date.now()}-2`,
          title: "نظام التشخيص والمساعد الطبي الافتراضي للعيادات",
          description: "تطبيق يساعد الأطباء في تحويل الملاحظات الصوتية إلى تقارير معالجة وتوصيات دوائية أولية باستخدام معالجة اللغات الطبيعية NLP.",
          related_interest: filter_interest || "التكنولوجيا الطبية (HealthTech)",
          created_by_ai: true,
          difficulty: "متقدم",
          tech_stack: Array.from(new Set([...teamSkills.slice(0, 3), "TensorFlow", "FastAPI"])),
          suggested_phases: ["جمع العينات وتدريب نموذج NLP", "بناء API للخدمات الطبية", "تطوير واجهة الطبيب واللوحة", "الاختبار الأمني والتوثيق"]
        },
        {
          idea_id: `idea-ai-${Date.now()}-3`,
          title: "مساعد التعلم الذكي وإدارة مشاريع الطلاب",
          description: "تطبيق لتنظيم المذاكرة، توزيع المهام الدراسية، وتقييم مستوى الاستيعاب الذاتي تلقائياً مع جداول زمنية ديناميكية.",
          related_interest: filter_interest || "التعليم الإلكتروني وتطوير المهارات",
          created_by_ai: true,
          difficulty: "متوسط",
          tech_stack: Array.from(new Set([...teamSkills.slice(0, 3), "Next.js", "Express"])),
          suggested_phases: ["تحديد المقاييس الأكاديمية", "بناء محرك التوصيات", "تطوير واجهات الطلاب", "الاختبار والتطوير"]
        }
      ];

      fallbackIdeas.forEach(i => projectIdeasStore.unshift(i));
      return res.json({ ideas: fallbackIdeas, is_ai_generated: false });
    }

    try {
      const promptText = `
أنت مهندس برمجيات ومستشار مشاريع تخرج أكاديمي خبير.
قم باقتراح 3 أفكار مشاريع تخرج مبتكرة وعملية تناسب فريق طلاب الجامعة بناءً على المهارات والاهتمامات التالية:
- مهارات الفريق المتوفرة: ${teamSkills.join("، ") || "React, Node.js, Python, UI/UX"}
- اهتمامات الفريق: ${filter_interest ? filter_interest : (teamInterests.join("، ") || "الذكاء الاصطناعي، تطبيقات الهواتف، التقنيات المالية")}

المطلوب إرجاع صيغة JSON تحتوي على مصفوفة "ideas" بجميع التفاصيل التالية لكل فكرة باللغة العربية:
1. title: عنوان الفكرة الجذاب والمحدد
2. description: وصف شامل يوضح المشكلة والحل والتقنيات المقترحة (حوالي 2-3 جمل)
3. related_interest: اسم المجال/الاهتمام المرتبط
4. difficulty: إما "سهل" أو "متوسط" أو "متقدم"
5. tech_stack: مصفوفة من التقنيات المستخدمة
6. suggested_phases: مصفوفة من 4 مراحل تنفيذية للمشروع
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ideas: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    related_interest: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    tech_stack: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    suggested_phases: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["title", "description", "related_interest", "difficulty", "tech_stack", "suggested_phases"]
                }
              }
            },
            required: ["ideas"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      const generatedIdeas: ProjectIdea[] = (parsed.ideas || []).map((item: any, index: number) => ({
        idea_id: `idea-gemini-${Date.now()}-${index}`,
        title: item.title,
        description: item.description,
        related_interest: item.related_interest || filter_interest || "الذكاء الاصطناعي",
        created_by_ai: true,
        difficulty: item.difficulty || "متوسط",
        tech_stack: item.tech_stack || ["React", "Python"],
        suggested_phases: item.suggested_phases || ["التخطيط", "التصميم", "التطوير", "الاختبار"]
      }));

      // Store in memory
      generatedIdeas.forEach(idea => projectIdeasStore.unshift(idea));

      res.json({ ideas: generatedIdeas, is_ai_generated: true });
    } catch (err: any) {
      console.error("Gemini API Error in suggest-ideas:", err);
      // Fallback
      res.json({
        ideas: projectIdeasStore.slice(0, 3),
        error: "حدث خطأ أثناء الاتصال بمحرك الذكاء الاصطناعي، تم استخدام الأفكار المخزنة."
      });
    }
  });

  // AI Smart Task Assignment Recommendation Engine
  app.post("/api/ai/smart-assign", (req, res) => {
    const { task_id, team_id } = req.body;

    const task = tasksStore.find(t => t.task_id === task_id);
    if (!task) {
      return res.status(404).json({ error: "المهمة غير موجودة" });
    }

    const members = teamMembersStore.filter(m => m.team_id === (team_id || 'team-01'));
    const requiredSkills = task.required_skills || [];

    const matches: SmartMatchResult[] = members.map(m => {
      const user = usersStore.find(u => u.user_id === m.user_id);
      const mSkills = memberSkillsStore
        .filter(ms => ms.member_id === m.team_member_id)
        .map(ms => skillsStore.find(s => s.skill_id === ms.skill_id)?.skill_name)
        .filter(Boolean) as string[];

      // Count current active tasks assigned to this member
      const assignedTasksCount = taskAssignmentsStore.filter(ta => ta.team_member_id === m.team_member_id).length;

      // Find matching skills
      const matchingSkills = mSkills.filter(sk => requiredSkills.some(reqSk => reqSk.includes(sk) || sk.includes(reqSk)));

      // Calculate score out of 100
      let score = 50; // base score
      if (requiredSkills.length > 0) {
        const skillRatio = matchingSkills.length / requiredSkills.length;
        score += skillRatio * 40;
      } else {
        score += 25;
      }

      // Workload penalty to ensure fairness
      const workloadPenalty = Math.min(assignedTasksCount * 12, 35);
      score = Math.max(10, Math.min(99, Math.round(score - workloadPenalty)));

      let reason = "";
      if (matchingSkills.length > 0) {
        reason = `يمتلك المهارات المطلوبة (${matchingSkills.join("، ")}) مع عبء عمل (${assignedTasksCount} مهام).`;
      } else if (assignedTasksCount === 0) {
        reason = `لا توجد مهام مسندة له حالياً مما يحقق التوزيع العادل لعبء العمل.`;
      } else {
        reason = `يمتلك خلفية تقنية ولديه ${assignedTasksCount} مهام مسندة.`;
      }

      return {
        member_id: m.team_member_id,
        user_name: user ? user.name : 'عضو الفريق',
        match_score: score,
        matching_skills: matchingSkills.length > 0 ? matchingSkills : mSkills.slice(0, 2),
        current_task_count: assignedTasksCount,
        reason
      };
    });

    // Sort by match score descending
    matches.sort((a, b) => b.match_score - a.match_score);

    res.json({
      task,
      recommendations: matches
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
