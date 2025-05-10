"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { createClient } from "@/utils/supabase/client";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "发布失败");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">写新文章</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">标题</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="请输入文章标题"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">内容</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              placeholder="请输入文章内容"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              标签（逗号分隔）
            </label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="如：React, Next.js, Web3"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "提交中..." : "发布文章"}
          </Button>
        </form>
      </div>
    </main>
  );
}
