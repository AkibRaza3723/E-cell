"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, Eye, Edit3, Image as ImageIcon } from "lucide-react";
import { createBlog, updateBlog, BlogInput } from "@/lib/actions/blogs-actions";

interface BlogFormProps {
  initialData?: (BlogInput & { id: string }) | null;
  isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [authorName, setAuthorName] = useState(initialData?.authorName || "E-Cell Editorial");
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit && (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))) {
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

    if (!title.trim()) {
      setError("Blog title is required");
      setSubmitting(false);
      return;
    }
    if (!content.trim()) {
      setError("Blog content is required");
      setSubmitting(false);
      return;
    }

    const payload: BlogInput = {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      authorName,
      published,
    };

    try {
      if (isEdit && initialData?.id) {
        const res = await updateBlog(initialData.id, payload);
        if (!res.success) {
          setError(res.error || "Failed to update blog");
          setSubmitting(false);
          return;
        }
      } else {
        const res = await createBlog(payload);
        if (!res.success) {
          setError(res.error || "Failed to create blog");
          setSubmitting(false);
          return;
        }
      }

      router.push("/admin/blogs");
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
            href="/admin/blogs"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">
              {isEdit ? "Edit Society Blog Post" : "Write New Blog Post"}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isEdit
                ? `Editing article: ${initialData?.title}`
                : "Author insights, startup interviews, and entrepreneurship guides."}
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
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Navigating Pre-Seed Venture Capital as a Student Founder"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-base text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 font-heading font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Slug (URL Path)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="navigating-pre-seed-vc"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Author / Byline
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="E-Cell Editorial Team"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Short Excerpt
              </label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise synopsis to display on article preview cards..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>
        </div>

        {/* Content Editor with Preview Mode */}
        <div className="space-y-2 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between pb-1">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Article Content (Markdown supported) *
            </label>

            <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "edit"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Write</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "preview"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {activeTab === "edit" ? (
            <textarea
              required
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in markdown format...&#10;&#10;## Introduction&#10;Share your insights, advice for founders, or society announcements here."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-zinc-100 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 leading-relaxed resize-y"
            />
          ) : (
            <div className="min-h-[300px] w-full bg-white/[0.02] border border-white/10 rounded-xl p-5 text-sm text-zinc-200 leading-relaxed overflow-y-auto whitespace-pre-wrap">
              {content || (
                <span className="text-zinc-600 italic">No content written yet. Switch to the 'Write' tab to draft your post.</span>
              )}
            </div>
          )}
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
              Publish immediately on E-Cell Blogs page
            </span>
          </label>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/blogs"
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
              <span>{submitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Article"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
