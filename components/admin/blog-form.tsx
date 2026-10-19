"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, Link2, ExternalLink, Image as ImageIcon } from "lucide-react";
import { createBlog, updateBlog, BlogInput } from "@/lib/actions/blogs-actions";

interface BlogFormProps {
  initialData?: (Partial<BlogInput> & { id: string; link?: string | null }) | null;
  isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
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
      setError("Article title is required");
      setSubmitting(false);
      return;
    }
    if (!link.trim()) {
      setError("Article link (Medium, LinkedIn, etc.) is required");
      setSubmitting(false);
      return;
    }

    const payload: BlogInput = {
      title,
      link,
      slug,
      excerpt,
      coverImage,
      authorName,
      published,
    };

    try {
      if (isEdit && initialData?.id) {
        const res = await updateBlog(initialData.id, payload);
        if (!res.success) {
          setError(res.error || "Failed to update article");
          setSubmitting(false);
          return;
        }
      } else {
        const res = await createBlog(payload);
        if (!res.success) {
          setError(res.error || "Failed to add article");
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
              {isEdit ? "Edit Society Article" : "Link New Article"}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isEdit
                ? `Editing publication: ${initialData?.title}`
                : "Curate and link Medium, LinkedIn, and external publications."}
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
        <div className="space-y-5">
          {/* Article Title */}
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

          {/* External Article URL (Medium / LinkedIn) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-orange-400" />
                <span>Article Link (Medium / LinkedIn / External URL) *</span>
              </label>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              type="url"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://medium.com/@ecelljmi/... or https://linkedin.com/pulse/..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 font-mono"
            />
            <p className="mt-1.5 text-[11px] text-zinc-500">
              Paste the direct link to the publication on Medium, LinkedIn, Substack, or your external blogging platform.
            </p>
          </div>

          {/* Author & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Author / Byline
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Sarah Jenkins & E-Cell Editorial"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Slug (Optional Identifier)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="navigating-pre-seed-vc"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          {/* Cover Image & Excerpt */}
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
                Short Excerpt / Summary
              </label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief 1-2 sentence synopsis shown on the card..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          {/* Image Thumbnail Preview */}
          {coverImage && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <img
                src={coverImage}
                alt="Preview"
                className="w-16 h-12 object-cover rounded-lg border border-white/10 bg-zinc-900"
                onError={(e) => ((e.target as HTMLElement).style.display = "none")}
              />
              <div className="text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300 block">Cover Image Preview</span>
                <span className="text-[11px] text-zinc-500">Image loaded successfully from URL</span>
              </div>
            </div>
          )}
        </div>

        {/* Publication switch & Submit */}
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
