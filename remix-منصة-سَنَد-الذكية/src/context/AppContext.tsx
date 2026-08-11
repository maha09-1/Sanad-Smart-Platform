import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
import { api } from '../services/api';

export type ActivePage =
  | 'dashboard'
  | 'team'
  | 'ai-ideas'
  | 'conflict-resolver'
  | 'project-overview'
  | 'kanban'
  | 'task-assignment'
  | 'progress'
  | 'notifications'
  | 'profile'
  | 'auth';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;

  // Active User & Team State
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  currentTeam: Team | null;
  currentMember: TeamMember | null;
  currentProject: Project | null;

  // Data Stores (14 Tables)
  users: User[];
  teams: Team[];
  teamMembers: TeamMember[];
  skills: Skill[];
  memberSkills: MemberSkill[];
  interests: Interest[];
  memberInterests: MemberInterest[];
  projectIdeas: ProjectIdea[];
  projects: Project[];
  phases: Phase[];
  tasks: Task[];
  taskAssignments: TaskAssignment[];
  progressUpdates: ProgressUpdate[];
  notifications: Notification[];

  // Loading & State Refreshes
  isLoading: boolean;
  refreshData: () => Promise<void>;

  // Dark Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Mobile Navigation Drawer
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Quick Action Helpers
  selectProjectIdea: (idea: ProjectIdea) => Promise<void>;
  updateTaskProgress: (taskId: string, percent: number, note: string) => Promise<void>;
  assignTaskToMember: (taskId: string, memberId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>;
  markAllNotifsRead: () => Promise<void>;
  switchUser: (userId: string) => void;
  isLeader: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleSetActivePage = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 14 Data Stores
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [memberSkills, setMemberSkills] = useState<MemberSkill[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [memberInterests, setMemberInterests] = useState<MemberInterest[]>([]);
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskAssignments, setTaskAssignments] = useState<TaskAssignment[]>([]);
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Active Context
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Dark Mode state (Default to Light Mode now)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_preference');
    if (saved) {
      return saved === 'dark';
    }
    return false; // Default to Light Mode (الوضع الصباحي)
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Toast System
  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Fetch all 14 data sources
  const refreshData = async () => {
    try {
      const [
        u, tm, tmb, sk, msk, int, mint, pi, pr, ph, tsk, ta, pu, notif
      ] = await Promise.all([
        api.getUsers(),
        api.getTeams(),
        api.getTeamMembers(),
        api.getSkills(),
        api.getMemberSkills(),
        api.getInterests(),
        api.getMemberInterests(),
        api.getProjectIdeas(),
        api.getProjects(),
        api.getPhases(),
        api.getTasks(),
        api.getTaskAssignments(),
        api.getProgressUpdates(),
        api.getNotifications()
      ]);

      setUsers(u);
      setTeams(tm);
      setTeamMembers(tmb);
      setSkills(sk);
      setMemberSkills(msk);
      setInterests(int);
      setMemberInterests(mint);
      setProjectIdeas(pi);
      setProjects(pr);
      setPhases(ph);
      setTasks(tsk);
      setTaskAssignments(ta);
      setProgressUpdates(pu);
      setNotifications(notif);

      if (!currentUser && u.length > 0) {
        setCurrentUser(u[0]);
      }
    } catch (err) {
      console.error("Failed to load initial app data", err);
      showToast("خطأ في التحميل", "تعذر الاتصال بخادم البيانات.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const currentTeam = teams.find(t => t.team_id === 'team-01') || teams[0] || null;
  const currentMember = teamMembers.find(
    tm => tm.team_id === currentTeam?.team_id && tm.user_id === currentUser?.user_id
  ) || null;
  const currentProject = projects.find(p => p.team_id === currentTeam?.team_id) || projects[0] || null;
  const isLeader = currentMember?.role === 'قائد الفريق';

  const selectProjectIdea = async (idea: ProjectIdea) => {
    if (!currentTeam) {
      showToast("تنبيه", "يرجى إنشاء أو الانضمام إلى فريق أولاً.", "warning");
      return;
    }
    try {
      setIsLoading(true);
      const newProj = await api.createProject({
        team_id: currentTeam.team_id,
        idea_id: idea.idea_id,
        name: idea.title,
        status: 'in_progress',
        start_date: new Date().toISOString().split('T')[0]
      });
      await refreshData();
      showToast("تم اختيار الفكرة بنجاح!", `تم إنشاء مشروع "${newProj.name}" وتوليد المراحل والمهام تلقائياً.`, "success");
      setActivePage('project-overview');
    } catch (err) {
      showToast("خطأ", "فشل في إنشاء المشروع من الفكرة المختارة.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskProgress = async (taskId: string, percent: number, note: string) => {
    if (!currentMember) {
      showToast("تنبيه", "يجب أن تكون عضواً في الفريق لتحديث التقدم.", "warning");
      return;
    }
    try {
      await api.addProgressUpdate({
        task_id: taskId,
        member_id: currentMember.team_member_id,
        progress_percent: percent,
        note
      });
      await refreshData();
      showToast("تم حفظ التحديث", `تم تسجيل نسبة الإنجاز (${percent}%) بنجاح.`, "success");
    } catch (err) {
      showToast("خطأ", "فشل في تسجيل التحديث.", "error");
    }
  };

  const assignTaskToMember = async (taskId: string, memberId: string) => {
    try {
      await api.assignTask(taskId, memberId);
      await refreshData();
      const targetMember = teamMembers.find(m => m.team_member_id === memberId);
      const targetUser = users.find(u => u.user_id === targetMember?.user_id);
      showToast("تم إسناد المهمة", `تم إسناد المهمة إلى ${targetUser?.name || 'العضو'} بنجاح.`, "success");
    } catch (err) {
      showToast("خطأ", "فشل في إسناد المهمة.", "error");
    }
  };

  const updateTaskStatus = async (taskId: string, status: Task['status']) => {
    try {
      await api.updateTaskStatus(taskId, status);
      await refreshData();
      showToast("تم تغيير الحالة", "تم تحديث حالة المهمة في اللوحة.", "info");
    } catch (err) {
      showToast("خطأ", "فشل تحديث حالة المهمة.", "error");
    }
  };

  const markAllNotifsRead = async () => {
    try {
      await api.markAllNotificationsRead();
      await refreshData();
      showToast("تنبيه", "تم تحديد جميع الإشعارات كمقروءة.", "info");
    } catch (err) {
      console.error(err);
    }
  };

  const switchUser = (userId: string) => {
    const selected = users.find(u => u.user_id === userId);
    if (selected) {
      setCurrentUser(selected);
      showToast("تم تبديل المستخدم", `أهلاً بك، ${selected.name} (${selected.user_id === 'usr-101' ? 'قائد الفريق' : 'عضو الفريق'})`, "info");
    }
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage: handleSetActivePage,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        currentUser,
        setCurrentUser,
        currentTeam,
        currentMember,
        currentProject,
        users,
        teams,
        teamMembers,
        skills,
        memberSkills,
        interests,
        memberInterests,
        projectIdeas,
        projects,
        phases,
        tasks,
        taskAssignments,
        progressUpdates,
        notifications,
        isLoading,
        refreshData,
        isDarkMode,
        toggleDarkMode,
        toasts,
        showToast,
        removeToast,
        selectProjectIdea,
        updateTaskProgress,
        assignTaskToMember,
        updateTaskStatus,
        markAllNotifsRead,
        switchUser,
        isLeader
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};