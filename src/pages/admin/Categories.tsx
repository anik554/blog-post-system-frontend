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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  useAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/features/category/category.api";
import { categoryOptions } from "@/constants/categories";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories, isLoading } = useAllCategoriesQuery(undefined);
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleAddCategory = async () => {
    if (!selectedCategory) {
      setErrors("Please select a category");
      return;
    }

    try {
      await createCategory({ name: selectedCategory }).unwrap();
      setSelectedCategory(undefined);
      setErrors("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) {
              setErrors("");
              setSelectedCategory(undefined);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>Add Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 w-full">
              <div className="grid gap-1 w-full">
                <Select
                  value={selectedCategory}
                  onValueChange={(val) => setSelectedCategory(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors && <p className="text-red-500 text-sm">{errors}</p>}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddCategory} disabled={isCreating}>
                  {isCreating ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">SN</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Loading categories...
                </td>
              </tr>
            ) : categories?.data?.length ? (
              categories.data.map((cat: {name:string,_id:string}, index: number) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{cat.name}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategory(cat._id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
