"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, Rocket, Globe, User, Tag } from "lucide-react";
import { createStartup, updateStartup, StartupInput } from "@/lib/actions/startups-actions";

interface StartupFormProps {
  initialData?: (StartupInput & { id: string }) | null;
  isEdit?: boolean;
}

export function StartupForm({ initialData, isEdit = false }: StartupFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [founder, setFounder] = useState(initialData?.founder || "");
  const [category, setCategory] = useState(initialData?.category || "AI & DeepTech");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [logo, setLogo] = useState(initialData?.logo || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit && (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!name.trim()) {
      setError("Startup name is required");
      setSubmitting(false);
      return;
    }
    if (!description.trim()) {
      setError("Startup description is required");
      setSubmitting(false);
      return;
    }

    const payload: StartupInput = {
      name,
      slug,
      founder,
      category,
      website,
      logo,
      description,
      published,
    };

    try {
      if (isEdit && initialData?.id) {
        const res = await updateStartup(initialData.id, payload);
        if (!res.success) {
          setError(res.error || "Failed to update startup");
          setSubmitting(false);
          return;
        }
      } else {
        const res = await createStartup(payload);
        if (!res.success) {
          setError(res.error || "Failed to create startup");
          setSubmitting(false);
          return;
        }
      }

      router.push("/admin/startups");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/startups"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">
              {isEdit ? "Edit Startup Profile" : "Register Incubated Startup"}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isEdit
                ? `Updating venture details for: ${initialData?.name}`
                : "Add student-led startups and portfolio ventures incubated at E-Cell."}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl space-y-6"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Startup Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. AeroDynamics AI"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
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
                placeholder="aerodynamics-ai"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Founder(s) Name
              </label>
              <input
                type="text"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
                placeholder="e.g. Rayan Siddiqui & Team"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Industry Sector
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              >
                <option value="AI & DeepTech">AI & DeepTech</option>
                <option value="CleanTech & Energy">CleanTech & Energy</option>
                <option value="Autonomous Hardware & Drones">Autonomous Hardware & Drones</option>
                <option value="Fintech & Web3">Fintech & Web3</option>
                <option value="EdTech & Skill Building">EdTech & Skill Building</option>
                <option value="HealthTech & Bio">HealthTech & Bio</option>
                <option value="E-Commerce & D2C">E-Commerce & D2C</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Official Website URL
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Logo Image URL
              </label>
              <input
                type="url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://... logo PNG/SVG"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Startup Description & Thesis *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the problem being solved, key products, market traction, or pilot deployments..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 resize-y"
            />
          </div>
        </div>

        {/* Publication switch */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <label className="relative flex items-center gap-2 cursor-pointer select-none text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-zinc-700 text-orange-500 focus:ring-orange-500 w-4 h-4 bg-zinc-900"
            />
            <span className="font-semibold text-orange-400">
              Published on Public Startup Showcase
            </span>
          </label>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/startups"
              className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] disabled:opacity-60 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? "Saving..." : isEdit ? "Save Changes" : "Register Startup"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
