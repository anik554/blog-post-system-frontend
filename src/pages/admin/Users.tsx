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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAllUserQuery,
  useCreateUserMutation,
} from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import { Spinner } from "@/components/ui/spinner";

const Users = () => {
  const [newUser, setNewUser] = useState<Partial<IUser>>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allUsers, isLoading: isUsersLoading } = useAllUserQuery(undefined);
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  if(isUsersLoading){
    return <Spinner />
  }

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/;

    if (!newUser.name) tempErrors.name = "Name is required";
    if (!newUser.email) tempErrors.email = "Email is required";
    else if (!emailRegex.test(newUser.email))
      tempErrors.email = "Invalid email format";

    if (!newUser.password) tempErrors.password = "Password is required";
    else if (!passwordRegex.test(newUser.password))
      tempErrors.password =
        "Password must be at least 6 characters, include 1 capital letter and 1 special character";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validate()) return;

    try {
      await createUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      }).unwrap();

      setNewUser({ name: "", email: "", password: ""});
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Users Data</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddUser} disabled={isCreating}>
                  {isCreating ? "Saving..." : "Save User"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">SN</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.data?.length ? (
              allUsers.data.map((user:{name:string,email:string,role:string,_id:string}, index:number) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button variant="destructive" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
