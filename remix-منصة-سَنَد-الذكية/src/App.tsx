import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { SanadSplashScreen } from './components/SanadSplashScreen';

import { DashboardView } from './views/DashboardView';
import { TeamView } from './views/TeamView';
import { AiSuggestionsView } from './views/AiSuggestionsView';
import { ConflictResolverView } from './views/ConflictResolverView';
import { ProjectOverviewView } from './views/ProjectOverviewView';
import { KanbanView } from './views/KanbanView';
import { TaskAssignmentView } from './views/TaskAssignmentView';
import { ProgressUpdateView } from './views/ProgressUpdateView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileSettingsView } from './views/ProfileSettingsView';
import { AuthView } from './views/AuthView';

const MainContent: React.FC = () => {
  const { activePage, isLoading } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-[#1a1a1a] text-stone-800 dark:text-stone-200 font-cairo transition-colors duration-200 overflow-x-hidden qatt-pattern-bg">
      <SanadSplashScreen />
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
        {activePage !== 'auth' && <Sidebar />}

        <main className={`flex-1 min-w-0 w-full space-y-6 sm:space-y-8 ${activePage === 'auth' ? 'flex items-center justify-center' : ''}`}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {activePage === 'dashboard' && <DashboardView />}
              {activePage === 'team' && <TeamView />}
              {activePage === 'ai-ideas' && <AiSuggestionsView />}
              {activePage === 'conflict-resolver' && <ConflictResolverView />}
              {activePage === 'project-overview' && <ProjectOverviewView />}
              {activePage === 'kanban' && <KanbanView />}
              {activePage === 'task-assignment' && <TaskAssignmentView />}
              {activePage === 'progress' && <ProgressUpdateView />}
              {activePage === 'notifications' && <NotificationsView />}
              {activePage === 'profile' && <ProfileSettingsView />}
              {activePage === 'auth' && <AuthView />}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md py-5 px-6 text-center text-xs text-stone-500 dark:text-stone-400 font-medium">
        <p>سَنَد — منصة إدارة وتوجيه مشاريع التخرج الذكية 🎓 © 2026 | لمسة سعودية أصيلة</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
