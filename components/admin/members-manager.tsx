"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  Search,
  ExternalLink,
  Mail,
  AlertCircle,
  X,
  Check,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons";
import { createMember, deleteMember, MemberData } from "@/lib/actions/members-actions";
import { normalizeGoogleDriveUrl } from "@/lib/utils";

interface MembersManagerProps {
  initialMembers: MemberData[];
}

export function MembersManager({ initialMembers }: MembersManagerProps) {
  const [members, setMembers] = useState<MemberData[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [team, setTeam] = useState("Core Team");
  const [role, setRole] = useState("Core Team Member");
  const [batch, setBatch] = useState("2024-25");
  const [faculty, setFaculty] = useState("Faculty of Engineering & Technology");
  const [avatar, setAvatar] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const teams = [
    "All",
    "Core Team",
    "Technical",
    "Operations",
    "Design",
    "Media",
    "Public Relations",
    "Corporate Relations",
  ];

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.team.toLowerCase().includes(search.toLowerCase()) ||
      m.faculty.toLowerCase().includes(search.toLowerCase());

    const matchesTeam = selectedTeam === "All" || m.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!name.trim()) {
      setError("Member name is required");
      setSubmitting(false);
      return;
    }
    if (!linkedin.trim()) {
      setError("LinkedIn URL is required");
      setSubmitting(false);
      return;
    }

    try {
      const res = await createMember({
        name,
        slug,
        team,
        role,
        batch,
        faculty,
        Avatar:
          normalizeGoogleDriveUrl(avatar.trim()) ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ea580c&color=fff`,
        linkedin,
        github,
        email,
        bio,
      });

      if (!res.success) {
        setError(res.error || "Failed to add member");
        setSubmitting(false);
        return;
      }

      if (res.member) {
        setMembers([res.member as MemberData, ...members]);
      }

      setSuccessMsg(`Member ${name} added successfully!`);
      setTimeout(() => setSuccessMsg(null), 3000);

      // Reset form
      setName("");
      setSlug("");
      setRole("Core Team Member");
      setAvatar("");
      setLinkedin("");
      setGithub("");
      setEmail("");
      setBio("");
      setIsAddModalOpen(false);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeletingId(id);
    try {
      const res = await deleteMember(id);
      if (res.success) {
        setMembers(members.filter((m) => m.id !== id));
        setDeleteConfirmId(null);
        setSuccessMsg("Member removed successfully");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setError(res.error || "Failed to delete member");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to delete member");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Members Directory
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Add or remove society core team leaders, department heads, and members.
          </p>
        </div>

        <button
          onClick={() => {
            setError(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.45)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Team Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-950/60 border border-white/[0.08] p-3 rounded-2xl backdrop-blur-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, department, faculty..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {teams.slice(0, 5).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTeam(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTeam === t
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-zinc-950/40 backdrop-blur-xl">
          <Users className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-300">
            No Members Found
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {search || selectedTeam !== "All"
              ? "No members matched your search or team filter."
              : "Get started by adding your first society team member."}
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-2xl bg-zinc-950/70 border border-white/[0.07] hover:border-orange-500/30 p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <img
                  src={normalizeGoogleDriveUrl(member.Avatar)}
                  alt={member.name}
                  className="w-13 h-13 rounded-2xl object-cover bg-zinc-800 border border-white/10 shrink-0"
                  onError={(e) => {
                    // Fallback avatar on image load failure
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.name
                    )}&background=27272a&color=f4f4f5`;
                  }}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                      {member.team}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {member.batch}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-base mt-1 truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium truncate">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                    {member.faculty}
                  </p>
                </div>
              </div>

              {/* Bio if available */}
              {member.bio && (
                <p className="mt-3 text-xs text-zinc-400 line-clamp-2 border-t border-white/[0.04] pt-2">
                  {member.bio}
                </p>
              )}

              {/* Footer actions & social links */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-orange-400 hover:bg-white/[0.04] transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5 fill-current" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                      title="GitHub"
                    >
                      <GitHubIcon className="w-3.5 h-3.5 fill-current" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                      title="Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={`/teams/${member.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
                    title="View Public Profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Delete button */}
                {deleteConfirmId === member.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(member.id!)}
                      disabled={isDeletingId === member.id}
                      className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-all"
                    >
                      {isDeletingId === member.id ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1 rounded-lg text-zinc-400 hover:text-zinc-200 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(member.id!)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Remove member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-zinc-950 border border-white/10 p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-white">
                  Add Society Member
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Enter details to register a new member in the database.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Sarah Khan"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Slug (URL identifier)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="sarah-khan"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Team Department *
                  </label>
                  <select
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
                  >
                    {teams
                      .filter((t) => t !== "All")
                      .map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Lead Developer, Core Member"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Batch / Tenure *
                  </label>
                  <input
                    type="text"
                    required
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="2024-25"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Faculty / Dept *
                  </label>
                  <input
                    type="text"
                    required
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="Faculty of Engineering & Technology"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://... or leave blank for auto-generated avatar"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    LinkedIn URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="member@ecelljmi.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Bio / Focus Note
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Short bio or responsibilities..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Adding..." : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
