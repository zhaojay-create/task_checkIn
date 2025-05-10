export interface Post {
  id: number;
  created_at: string; // 或 Date，根据实际处理方式
  title: string;
  content: string; // HTML 字符串
  tags: string[];
}
export interface Posts {
  id: number;
  created_at: string; // 或 Date，根据实际处理方式
  title: string;
  content: string; // HTML 字符串
  tags: string[];
}
