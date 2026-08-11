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
} from '../types';

export const api = {
  // Users
  getUsers: async (): Promise<User[]> => {
    const res = await fetch('/api/users');
    return res.json();
  },
  createUser: async (userData: Partial<User>): Promise<User> => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  // Teams
  getTeams: async (): Promise<Team[]> => {
    const res = await fetch('/api/teams');
    return res.json();
  },
  createTeam: async (teamData: Partial<Team>): Promise<Team> => {
    const res = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData)
    });
    return res.json();
  },

  // Team Members
  getTeamMembers: async (): Promise<TeamMember[]> => {
    const res = await fetch('/api/team-members');
    return res.json();
  },
  addTeamMember: async (memberData: Partial<TeamMember>): Promise<TeamMember> => {
    const res = await fetch('/api/team-members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData)
    });
    return res.json();
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    const res = await fetch('/api/skills');
    return res.json();
  },
  addSkill: async (skillData: Partial<Skill>): Promise<Skill> => {
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skillData)
    });
    return res.json();
  },

  // Member Skills
  getMemberSkills: async (): Promise<MemberSkill[]> => {
    const res = await fetch('/api/member-skills');
    return res.json();
  },
  setMemberSkills: async (member_id: string, skill_ids: string[]): Promise<MemberSkill[]> => {
    const res = await fetch('/api/member-skills/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member_id, skill_ids })
    });
    return res.json();
  },

  // Interests
  getInterests: async (): Promise<Interest[]> => {
    const res = await fetch('/api/interests');
    return res.json();
  },
  addInterest: async (interestData: Partial<Interest>): Promise<Interest> => {
    const res = await fetch('/api/interests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interestData)
    });
    return res.json();
  },

  // Member Interests
  getMemberInterests: async (): Promise<MemberInterest[]> => {
    const res = await fetch('/api/member-interests');
    return res.json();
  },
  setMemberInterests: async (member_id: string, interest_ids: string[]): Promise<MemberInterest[]> => {
    const res = await fetch('/api/member-interests/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member_id, interest_ids })
    });
    return res.json();
  },

  // Project Ideas
  getProjectIdeas: async (): Promise<ProjectIdea[]> => {
    const res = await fetch('/api/project-ideas');
    return res.json();
  },
  createProjectIdea: async (ideaData: Partial<ProjectIdea>): Promise<ProjectIdea> => {
    const res = await fetch('/api/project-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ideaData)
    });
    return res.json();
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const res = await fetch('/api/projects');
    return res.json();
  },
  createProject: async (projectData: Partial<Project>): Promise<Project> => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    return res.json();
  },

  // Phases
  getPhases: async (): Promise<Phase[]> => {
    const res = await fetch('/api/phases');
    return res.json();
  },
  createPhase: async (phaseData: Partial<Phase>): Promise<Phase> => {
    const res = await fetch('/api/phases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phaseData)
    });
    return res.json();
  },

  // Tasks
  getTasks: async (): Promise<Task[]> => {
    const res = await fetch('/api/tasks');
    return res.json();
  },
  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    return res.json();
  },
  updateTaskStatus: async (taskId: string, status: Task['status']): Promise<Task> => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Task Assignments
  getTaskAssignments: async (): Promise<TaskAssignment[]> => {
    const res = await fetch('/api/task-assignments');
    return res.json();
  },
  assignTask: async (task_id: string, team_member_id: string): Promise<TaskAssignment> => {
    const res = await fetch('/api/task-assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id, team_member_id })
    });
    return res.json();
  },

  // Progress Updates
  getProgressUpdates: async (): Promise<ProgressUpdate[]> => {
    const res = await fetch('/api/progress-updates');
    return res.json();
  },
  addProgressUpdate: async (updateData: {
    task_id: string;
    member_id: string;
    progress_percent: number;
    note: string;
  }): Promise<ProgressUpdate> => {
    const res = await fetch('/api/progress-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    return res.json();
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    const res = await fetch('/api/notifications');
    return res.json();
  },
  markNotificationRead: async (id: string): Promise<Notification> => {
    const res = await fetch(`/api/notifications/${id}/read`, {
      method: 'PATCH'
    });
    return res.json();
  },
  markAllNotificationsRead: async (): Promise<void> => {
    await fetch('/api/notifications/read-all', { method: 'PATCH' });
  },

  // AI Operations
  suggestIdeasAI: async (team_id?: string, filter_interest?: string): Promise<{ ideas: ProjectIdea[]; is_ai_generated?: boolean; error?: string }> => {
    const res = await fetch('/api/ai/suggest-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team_id, filter_interest })
    });
    return res.json();
  },

  smartAssignAI: async (task_id: string, team_id?: string): Promise<{ task: Task; recommendations: SmartMatchResult[] }> => {
    const res = await fetch('/api/ai/smart-assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id, team_id })
    });
    return res.json();
  }
};
