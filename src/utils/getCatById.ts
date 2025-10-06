interface ICategory{
    _id:string,
    name:string,
}

export const getCatNameById = (data: ICategory[] | undefined, id: string): string | undefined => {
  if (!Array.isArray(data)) return undefined;
  const result = data.find((item) => item._id === id);
  return result?.name;
};