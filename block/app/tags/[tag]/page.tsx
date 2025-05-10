import React from "react";
import { getSupabaseServerClient } from "@/utils/supabase";
import { Post } from "../../types";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: { tag: string };
}

export default async function Page({ params }: PageProps) {
  const supabase = getSupabaseServerClient();
  const { data: blocks = [] } = (await supabase
    .from("block")
    .select("*")
    .order("created_at", { ascending: false })) as { data: Post[] };

  // 过滤出包含当前标签的文章
  const tag = await params.tag.toLowerCase();

  const filtered = blocks.filter((item) =>
    item.tags.map((t: string) => t.toLowerCase()).includes(tag)
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          标签：
          <Badge className="ml-2 px-3 py-1 text-base bg-blue-100 text-blue-700">
            #{tag}
          </Badge>
        </h1>
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-center">暂无该标签的文章</div>
        ) : (
          <div className="space-y-6 flex flex-col gap-2">
            {filtered.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <Card className="shadow-md hover:shadow-lg transition cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(post.created_at).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-700 line-clamp-3">
                      {post.content}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((t: string) => (
                        <Badge
                          key={t}
                          className="bg-blue-50 text-blue-600 px-2 py-1 text-xs"
                        >
                          #{t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
