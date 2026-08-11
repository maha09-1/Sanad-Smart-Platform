export type Role = 'قائد الفريق' | 'عضو';

export interface User {
  user_id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  avatar?: string;
}

export interface Team {
  team_id: string;
  team_name: string;
  created_by: string; // user_id
  invite_code?: string;
}

export interface TeamMember {
  team_member_id: string;
  team_id: string;
  user_id: string;
  role: Role;
  joined_at: string;
}

export interface Skill {
  skill_id: string;
  skill_name: string;
  category?: string;
}

export interface MemberSkill {
  member_id: string; // team_member_id
  skill_id: string;
}

export interface Interest {
  interest_id: string;
  interest_name: string;
  icon?: string;
}

export interface MemberInterest {
  member_id: string; // team_member_id
  interest_id: string;
}

export interface ProjectIdea {
  idea_id: string;
  title: string;
  description: string;
  related_interest: string;
  created_by_ai: boolean;
  difficulty?: 'سهل' | 'متوسط' | 'متقدم';
  tech_stack?: string[];
  suggested_phases?: string[];
}

export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed';

export interface Project {
  project_id: string;
  team_id: string;
  idea_id?: string;
  name: string;
  status: ProjectStatus;
  start_date: string;
}

export type PhaseStatus = 'not_started' | 'in_progress' | 'completed';

export interface Phase {
  phase_id: string;
  project_id: string;
  phase_name: string;
  order: number;
  status: PhaseStatus;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface Task {
  task_id: string;
  phase_id: string;
  title: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  required_skills?: string[];
}

export interface TaskAssignment {
  assignment_id: string;
  task_id: string;
  team_member_id: string;
  assigned_at: string;
}

export interface ProgressUpdate {
  update_id: string;
  task_id: string;
  member_id: string; // team_member_id
  progress_percent: number;
  note: string;
  updated_at: string;
}

export interface Notification {
  notification_id: string;
  user_id: string;
  task_id: string | null;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  is_read: boolean;
  created_at: string;
}

export interface SmartMatchResult {
  member_id: string;
  user_name: string;
  match_score: number;
  matching_skills: string[];
  current_task_count: number;
  reason: string;
}
