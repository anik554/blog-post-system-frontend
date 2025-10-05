import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Icons } from "@/components/icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gray-200 px-8 py-4 border-b border-slate-100 w-full">
      <div>
        <p className="text-sm text-slate-500">Good Morning !</p>
        <h1 className="text-2xl font-bold">Tylor Greak</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md border border-slate-100 hover:bg-slate-50">
          {/* <Icons.bell className="w-5 h-5" /> */}
        </button>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatar.jpg" alt="user" />
            <AvatarFallback>TI</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
