interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const getUserNameById = (user: IUserProfile | undefined, id: string): string | undefined => {
  if (!user) return undefined;
  return user._id === id ? user.name : undefined;
};

