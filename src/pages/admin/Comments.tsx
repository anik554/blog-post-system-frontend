import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAllCommentQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/features/comment/comment.api";
import { useAllPostsQuery } from "@/redux/features/post/post.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getPostNameById } from "@/utils/getPostById";
import { getUserNameById } from "@/utils/getnameById";
import type { IComment } from "@/types/comment.type";

const Comments = () => {
  const [selectedPost, setSelectedPost] = useState<string | undefined>(undefined);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const { data: comments, isLoading } = useAllCommentQuery(undefined);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();

  const { data: posts } = useAllPostsQuery(undefined);
  const { data: userInfo } = useUserInfoQuery(undefined);
  console.log(userInfo)

const handleSaveComment = async () => {
    if (!selectedPost) {
      setErrors("Please select a post");
      return;
    }
    if (!text.trim()) {
      setErrors("Please enter a comment");
      return;
    }

    try {
      if (isEditMode && editingCommentId) {
        await updateComment({
          id: editingCommentId,
          data: { post: selectedPost, text },
        }).unwrap();
      } else {
        await createComment({
          post: selectedPost,
          user: userInfo?.data?._id,
          text,
        }).unwrap();
      }

      setText("");
      setSelectedPost(undefined);
      setErrors("");
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingCommentId(null);
    } catch (err) {
      console.error("Failed to save comment:", err);
    }
  };

  const openModalForEdit = (comment: IComment) => {
    setIsEditMode(true);
    setEditingCommentId(comment._id);
    setSelectedPost(comment.post);
    setText(comment.text);
    setIsModalOpen(true);
  };


  const handleDeleteComment = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(id).unwrap();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setErrors("");
          }}
        >
          <DialogTrigger asChild>
            <Button>Add Comment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Comment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 w-full">
              <Select
                value={selectedPost}
                onValueChange={(val) => setSelectedPost(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a post" />
                </SelectTrigger>
                <SelectContent>
                  {posts?.data?.map((post: { _id: string; title: string }) => (
                    <SelectItem key={post._id} value={post._id}>
                      {post.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <textarea
                className="w-full border rounded-md p-2"
                placeholder="Enter your comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {errors && <p className="text-red-500 text-sm">{errors}</p>}

              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSaveComment} disabled={isCreating}>
                  {isCreating ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Comments Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">SN</th>
              <th className="border px-4 py-2">Post</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Comment</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading comments...
                </td>
              </tr>
            ) : comments?.data?.length ? (
              comments.data.map(
                (comment: IComment, index: number) => (
                  <tr key={comment._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{getPostNameById(posts?.data,comment.post)}</td>
                    <td className="border px-4 py-2">{getUserNameById(userInfo?.data,comment.user)}</td>
                    <td className="border px-4 py-2">{comment.text}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <Button
                        variant="destructive"
                        size="sm"
                         onClick={() => openModalForEdit(comment)}
                        disabled={isUpdating}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteComment(comment._id)}
                        disabled={isDeleting}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
