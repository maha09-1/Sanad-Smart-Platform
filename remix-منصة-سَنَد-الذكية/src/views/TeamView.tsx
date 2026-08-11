import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Users, Plus, Award, Heart, Check, X,
  Edit3
} from 'lucide-react';

export const TeamView: React.FC = () => {
  const {
    currentTeam,
    teamMembers,
    users,
    skills,
    memberSkills,
    interests,
    memberInterests,
    refreshData,
    showToast
  } = useApp();

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);

  // Form states
  const [newTeamName, setNewTeamName] = useState('');
  const [tempSkills, setTempSkills] = useState<string[]>([]);
  const [tempInterests, setTempInterests] = useState<string[]>([]);

  // Open skill modal for a member
  const openSkillModalFor = (memberId: string) => {
    setSelectedMemberId(memberId);
    const existing = memberSkills.filter(ms => ms.member_id === memberId).map(ms => ms.skill_id);
    setTempSkills(existing);
    setShowSkillModal(true);
  };

  // Open interest modal for a member
  const openInterestModalFor = (memberId: string) => {
    setSelectedMemberId(memberId);
    const existing = memberInterests.filter(mi => mi.member_id === memberId).map(mi => mi.interest_id);
    setTempInterests(existing);
    setShowInterestModal(true);
  };

  // Save Skills for Member
  const saveMemberSkills = async () => {
    if (!selectedMemberId) return;
    try {
      await api.setMemberSkills(selectedMemberId, tempSkills);
      await refreshData();
      showToast("تم تحديث المهارات", "تم حفظ المهارات المحددة للعضو بنجاح.", "success");
      setShowSkillModal(false);
    } catch (err) {
      showToast("خطأ", "تعذر حفظ المهارات.", "error");
    }
  };

  // Save Interests for Member
  const saveMemberInterests = async () => {
    if (!selectedMemberId) return;
    try {
      await api.setMemberInterests(selectedMemberId, tempInterests);
      await refreshData();
      showToast("تم تحديث الاهتمامات", "تم حفظ الاهتمامات المحددة للعضو بنجاح.", "success");
      setShowInterestModal(false);
    } catch (err) {
      showToast("خطأ", "تعذر حفظ الاهتمامات.", "error");
    }
  };

  // Create Team Action
  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    try {
      const creator = users[0];
      await api.createTeam({
        team_name: newTeamName,
        created_by: creator.user_id
      });
      await refreshData();
      showToast("تم إنشاء الفريق", `تم إنشاء فريق "${newTeamName}" بنجاح.`, "success");
      setNewTeamName('');
      setShowNewTeamModal(false);
    } catch (err) {
      showToast("خطأ", "فشل في إنشاء الفريق.", "error");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header Bar */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 qatt-corner-accent">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#3D6346] dark:text-emerald-400 mb-1 font-tajawal">
            <Users className="w-4 h-4" />
            <span>إدارة أفراد الفريق ونقاط القوة</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">
            فريق: {currentTeam?.team_name || 'فريق الرواد التقني'}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            رمز الدعوة الخاص بالفريق: <span className="font-mono font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-full border border-stone-200/80 dark:border-stone-700">{currentTeam?.invite_code || 'PIONEER-2026'}</span>
          </p>
        </div>

        <button
          onClick={() => setShowNewTeamModal(true)}
          className="bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-xs transition-all self-start md:self-auto font-tajawal"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء فريق جديد</span>
        </button>
      </div>

      {/* Members Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map(member => {
          const user = users.find(u => u.user_id === member.user_id);
          const mSkills = memberSkills
            .filter(ms => ms.member_id === member.team_member_id)
            .map(ms => skills.find(s => s.skill_id === ms.skill_id))
            .filter(Boolean);

          const mInterests = memberInterests
            .filter(mi => mi.member_id === member.team_member_id)
            .map(mi => interests.find(i => i.interest_id === mi.interest_id))
            .filter(Boolean);

          return (
            <div
              key={member.team_member_id}
              className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-5 hover:border-[#3D6346]/30 dark:hover:border-emerald-500/30 transition-all"
            >
              {/* Member Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                    alt={user?.name}
                    className="w-13 h-13 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 shadow-xs border border-white dark:border-stone-800"
                  />
                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base font-tajawal">{user?.name}</h3>
                    <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">{user?.email}</span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  member.role === 'قائد الفريق'
                    ? 'bg-[#E9F1EA] dark:bg-[#2E4D36]/30 text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-emerald-800/40'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700'
                }`}>
                  {member.role}
                </span>
              </div>

              {/* Skills Tags Section */}
              <div className="space-y-2 pt-3 border-t border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 font-tajawal">
                    <Award className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                    المهارات التقنية (Skills):
                  </span>
                  <button
                    onClick={() => openSkillModalFor(member.team_member_id)}
                    className="text-xs font-bold text-[#3D6346] dark:text-emerald-400 hover:underline flex items-center gap-1 font-tajawal"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mSkills.map(s => (
                    <span
                      key={s?.skill_id}
                      className="bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-stone-200/80 dark:border-stone-700"
                    >
                      {s?.skill_name}
                    </span>
                  ))}
                  {mSkills.length === 0 && (
                    <p className="text-xs text-stone-400 dark:text-stone-500 italic">لم يتم إدخال مهارات بعد</p>
                  )}
                </div>
              </div>

              {/* Interests Tags Section */}
              <div className="space-y-2 pt-3 border-t border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 font-tajawal">
                    <Heart className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    الاهتمامات والمجالات (Interests):
                  </span>
                  <button
                    onClick={() => openInterestModalFor(member.team_member_id)}
                    className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 font-tajawal"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mInterests.map(i => (
                    <span
                      key={i?.interest_id}
                      className="bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-medium px-2.5 py-1 rounded-lg border border-amber-200/80 dark:border-amber-800/60"
                    >
                      {i?.interest_name}
                    </span>
                  ))}
                  {mInterests.length === 0 && (
                    <p className="text-xs text-stone-400 dark:text-stone-500 italic">لم يتم إدخال اهتمامات بعد</p>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* SKILL SELECTION MODAL */}
      {showSkillModal && createPortal(
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full m-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">تحديد المهارات التقنية للعضو</h3>
              <button onClick={() => setShowSkillModal(false)} className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {skills.map(skill => {
                const isSelected = tempSkills.includes(skill.skill_id);
                return (
                  <div
                    key={skill.skill_id}
                    onClick={() => {
                      if (isSelected) {
                        setTempSkills(tempSkills.filter(id => id !== skill.skill_id));
                      } else {
                        setTempSkills([...tempSkills, skill.skill_id]);
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#E9F1EA] dark:bg-[#2E4D36]/40 border-[#3D6346]/30 dark:border-emerald-700/50 text-[#1C3022] dark:text-emerald-200 font-bold'
                        : 'bg-stone-50 dark:bg-stone-800/70 border-stone-200/60 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span className="text-xs font-tajawal">{skill.skill_name}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200/80 dark:border-stone-800">
              <button
                onClick={() => setShowSkillModal(false)}
                className="px-4 py-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
              >
                إلغاء
              </button>
              <button
                onClick={saveMemberSkills}
                className="px-5 py-2 text-xs font-bold bg-[#3D6346] hover:bg-[#2E4D36] text-white rounded-full shadow-xs font-tajawal"
              >
                حفظ المهارات
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* INTEREST SELECTION MODAL */}
      {showInterestModal && createPortal(
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full m-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">تحديد اهتمامات ومجالات العضو</h3>
              <button onClick={() => setShowInterestModal(false)} className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {interests.map(interest => {
                const isSelected = tempInterests.includes(interest.interest_id);
                return (
                  <div
                    key={interest.interest_id}
                    onClick={() => {
                      if (isSelected) {
                        setTempInterests(tempInterests.filter(id => id !== interest.interest_id));
                      } else {
                        setTempInterests([...tempInterests, interest.interest_id]);
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold'
                        : 'bg-stone-50 dark:bg-stone-800/70 border-stone-200/60 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span className="text-xs font-tajawal">{interest.interest_name}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-700 dark:text-amber-400" />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200/80 dark:border-stone-800">
              <button
                onClick={() => setShowInterestModal(false)}
                className="px-4 py-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
              >
                إلغاء
              </button>
              <button
                onClick={saveMemberInterests}
                className="px-5 py-2 text-xs font-bold bg-[#3D6346] hover:bg-[#2E4D36] text-white rounded-full shadow-xs font-tajawal"
              >
                حفظ الاهتمامات
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* NEW TEAM MODAL */}
      {showNewTeamModal && createPortal(
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <form onSubmit={handleCreateTeam} className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full m-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">إنشاء فريق مشروع تخرج جديد</h3>
              <button type="button" onClick={() => setShowNewTeamModal(false)} className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5 font-tajawal">اسم الفريق الجديد</label>
              <input
                type="text"
                value={newTeamName}
                onChange={e => setNewTeamName(e.target.value)}
                placeholder="مثال: فريق الذكاء المتقدم"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#3D6346]"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200/80 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setShowNewTeamModal(false)}
                className="px-4 py-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-[#3D6346] hover:bg-[#2E4D36] text-white rounded-full shadow-xs font-tajawal"
              >
                إنشاء الفريق
              </button>
            </div>
          </form>
        </div>,
        document.body
      )}

    </div>
  );
};
