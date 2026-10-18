"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Search,
  ExternalLink,
  Check,
  AlertCircle,
  Calendar,
  User,
} from "lucide-react";
import { deleteBlog } from "@/lib/actions/blogs-actions";

interface BlogItem {
  id: string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  authorName?: string | null;
  published: boolean;
  createdAt: string | Date;
}

interface BlogsManagerProps {
  initialBlogs: BlogItem[];
}

export function BlogsManager({ initialBlogs }: BlogsManagerProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs);
  const [search, setSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredBlogs = blogs.filter((b) => {
    return (
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.authorName && b.authorName.toLowerCase().includes(search.toLowerCase())) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const handleDelete = async (id: string) => {
    setIsDeletingId(id);
    setError(null);
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        setBlogs(blogs.filter((item) => item.id !== id));
        setDeleteConfirmId(null);
        setSuccessMsg("Blog post deleted successfully");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setError(res.error || "Failed to delete blog post");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to delete blog post");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Editorial & Blogs
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Publish venture guides, founder interviews, society newsletters, and announcements.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.45)]"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
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

      {/* Search Bar */}
      <div className="bg-zinc-950/60 border border-white/[0.08] p-3 rounded-2xl backdrop-blur-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, author, or keywords..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>
      </div>

      {/* Blogs List */}
      {filteredBlogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-zinc-950/40 backdrop-blur-xl">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-300">
            No Blog Posts Found
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {search
              ? "No articles matched your search term."
              : "Start by writing and publishing the first article on the society blog."}
          </p>
          <Link
            href="/admin/blogs/new"
            className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write Post</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBlogs.map((b) => (
            <div
              key={b.id}
              className="group relative rounded-2xl bg-zinc-950/70 border border-white/[0.07] hover:border-orange-500/30 p-5 backdrop-blur-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {b.coverImage ? (
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-20 h-16 rounded-xl object-cover bg-zinc-800 border border-white/10 shrink-0 hidden sm:block"
                  />
                ) : (
                  <div className="w-20 h-16 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 hidden sm:flex">
                    <FileText className="w-6 h-6" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        b.published
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      {b.published ? "Published" : "Draft"}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <User className="w-3 h-3" />
                      {b.authorName || "E-Cell JMI"}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-base group-hover:text-orange-400 transition-colors truncate">
                    {b.title}
                  </h3>

                  {b.excerpt && (
                    <p className="mt-1 text-xs text-zinc-400 line-clamp-1">
                      {b.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0 border-t md:border-t-0 border-white/[0.05] pt-3 md:pt-0 w-full md:w-auto justify-end">
                <Link
                  href="/blogs"
                  target="_blank"
                  className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors"
                  title="View Public Blogs"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <Link
                  href={`/admin/blogs/${b.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 border border-white/10 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

                {deleteConfirmId === b.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(b.id)}
                      disabled={isDeletingId === b.id}
                      className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all"
                    >
                      {isDeletingId === b.id ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(b.id)}
                    className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
