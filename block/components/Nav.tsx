"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Post } from "@/app/types";
import { usePathname } from "next/navigation";

interface NavProps {
  posts: Post[];
}

export default function Nav({ posts }: NavProps) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  // 过滤后的文章
  const filteredPosts =
    search.trim() === ""
      ? []
      : posts.filter(
          (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.content.toLowerCase().includes(search.toLowerCase())
        );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  };

  // 点击外部关闭下拉
  React.useEffect(() => {
    const handler = () => setShowDropdown(false);
    if (showDropdown) {
      window.addEventListener("click", handler);
      return () => window.removeEventListener("click", handler);
    }
  }, [showDropdown]);

  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 relative">
        {/* 左侧 Logo 和菜单 */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-base text-muted-foreground hover:text-blue-700 transition",
              pathname === "/" && "font-bold text-blue-700"
            )}
          >
            首页
          </Link>
          <Link
            href="/tags"
            className={cn(
              "text-base text-muted-foreground hover:text-blue-700 transition",
              pathname.startsWith("/tags") && "font-bold text-blue-700"
            )}
          >
            分类
          </Link>
        </div>
        {/* 中间搜索框 */}
        <div className="flex-1 flex justify-center px-4 relative">
          <Input
            type="text"
            placeholder="搜索文章标题或内容…"
            value={search}
            onChange={handleSearch}
            onFocus={() => setShowDropdown(true)}
            className={cn(
              "w-72 max-w-full rounded-full bg-gray-100 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            )}
          />
          {/* 搜索结果下拉列表 */}
          {showDropdown && search.trim() !== "" && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-12 w-80 max-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredPosts.length === 0 ? (
                <div className="p-4 text-gray-400 text-center">无匹配结果</div>
              ) : (
                <ul>
                  {filteredPosts.slice(0, 8).map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/post/${post.id}`}
                        className="block px-4 py-2 hover:bg-blue-50 transition text-gray-700"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="font-medium">{post.title}</div>
                        <div className="text-xs text-gray-400 truncate">
                          {post.content}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        {/* 右侧按钮 */}
        <div className="flex items-center gap-3">
          {/* <Button variant="outline" asChild>
            <Link href="/login">登录</Link>
          </Button> */}
          <Button asChild>
            <Link href="/write">写文章</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
