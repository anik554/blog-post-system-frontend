import type { IPost } from "@/types/post.type";


export const getPostNameById = (data: IPost[] | undefined, id: string): string | undefined => {
  if (!Array.isArray(data)) return undefined;
  const result = data.find((item) => item._id === id);
  return result?.title;
};

