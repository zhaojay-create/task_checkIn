import { getSupabaseServerClient } from "@/utils/supabase";
import React from "react";
import { Post } from "../types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

async function page() {
  const supabase = getSupabaseServerClient();

  const { data: blocks = [] } = (await supabase
    .from("block")
    .select("*")
    .order("created_at", { ascending: false })) as { data: Post[] };

  const allTags = [
    ...new Set(
      blocks.flatMap((item) => item.tags.map((tag) => tag.toLowerCase()))
    ),
  ];
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">全部标签</h1>
        <div className="flex flex-wrap gap-3">
          {allTags.length === 0 ? (
            <span className="text-gray-400">暂无标签</span>
          ) : (
            allTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-blue-700 hover:text-blue-900"
              >
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-blue-700 bg-blue-100 hover:bg-blue-200 cursor-pointer px-4 py-2 text-base rounded-full transition"
                >
                  #{tag}
                </Badge>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default page;
