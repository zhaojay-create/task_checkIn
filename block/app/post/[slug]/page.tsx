import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSupabaseServerClient } from "@/utils/supabase";

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = getSupabaseServerClient();
  const { data: post, error } = await supabase
    .from("block")
    .select("*")
    .eq("id", params.slug)
    .single();

  if (!post || error) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <div className="text-xs text-gray-400 mt-2">
            {new Date(post.created_at).toLocaleString()}
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="text-gray-800 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </CardContent>
      </Card>
    </div>
  );
}
