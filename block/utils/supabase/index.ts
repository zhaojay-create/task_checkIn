import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

/**
 * 获取通用 supabase 客户端（服务端组件专用）
 */
export function getSupabaseServerClient() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}
