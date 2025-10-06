import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useCreatePostMutation } from "@/redux/features/post/post.api";
import SingleImageUploader from "@/components/SingleImageUploader";
import { formSchema, type FormValues } from "@/types/post.zod.type";
import RichTextQuill from "../../../utils/RichTextEditor";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_featured: false,
    },
  });
  const [image, setImage] = useState<File | null>(null);
  const { data: categories } = useAllCategoriesQuery(undefined);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { data: getMe } = useUserInfoQuery(undefined);
  console.log("getMe", getMe);

  const onSubmit = async (values: FormValues) => {
    console.log("cleck submit button");
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (values.title) formData.append("title", values.title);
    if (values.summary) formData.append("summary", values.summary);
    if (values.meta_description)
      formData.append("meta_description", values.meta_description);
    if (values.tags) formData.append("tags", values.tags);
    if (values.category) formData.append("category", values.category);
    if (values.publish_on) formData.append("publish_on", values.publish_on);
    if (values.blog_content)
      formData.append("blog_content", values.blog_content);
    formData.append("is_featured", String(values.is_featured));
    if (getMe?.data?._id) formData.append("author", getMe.data._id);

    try {
      await createPost(formData).unwrap();
      form.reset();
      setImage(null);
      alert("✅ Post created successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create post");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              encType="multipart/form-data"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SingleImageUploader onChange={setImage} />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="publish_on"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publish On</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span>{field.value ? "Yes" : "No"}</span>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. React, JavaScript, Web"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="w-full border rounded-md p-2"
                        {...field}
                      >
                        <option value="">Select Category</option>
                        {categories?.data.map(
                          (cat: { _id: string; name: string }) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          )
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Short summary of your blog..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meta_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="SEO meta description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blog_content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <RichTextQuill
                        placeholder="Enter Blog Content description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full my-10" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  "Create Post"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
