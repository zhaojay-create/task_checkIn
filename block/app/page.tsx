import Nav from "@/components/Nav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSupabaseServerClient } from "@/utils/supabase";
import Link from "next/link";

export default async function Page() {
  const supabase = getSupabaseServerClient();

  const { data: blocks, error } = await supabase
    .from("block")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Nav posts={blocks || []} />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
            我的博客
          </h1>
          {error && (
            <div className="text-red-500 text-center mb-4">
              数据加载失败: {error.message}
            </div>
          )}
          {!blocks || blocks.length === 0 ? (
            <div className="text-gray-500 text-center">暂无博客内容</div>
          ) : (
            <div className="space-y-6 flex flex-col gap-2">
              {blocks.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <Card
                    key={post.id}
                    className="shadow-md hover:shadow-lg transition"
                  >
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
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
