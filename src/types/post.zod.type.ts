import z from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title is required"),
  summary: z.string().min(10, "Summary is required"),
  meta_description: z.string().min(10, "Meta description is required"),
  category: z.string().nonempty("Category is required"),
  publish_on: z.string().nonempty("Publish date required"),
  blog_content: z.string().nonempty("blog content required"),
  tags: z.string().optional(),
  is_featured: z.boolean().optional(),
  image: z.any().optional(),
});

export type FormValues = z.infer<typeof formSchema>;