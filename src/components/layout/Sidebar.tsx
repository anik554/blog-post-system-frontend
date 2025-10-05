import { NavLink } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
// import { Icons } from "@/components/icons";

const navLinks = [
  { name: "Home", path: "/admin", icon: "🏠" },
  { name: "Posts", path: "/admin/posts", icon: "📝" },
  { name: "Comments", path: "/admin/comments", icon: "💬" },
  { name: "Users", path: "/admin/users", icon: "👤" },
  { name: "Categories", path: "/admin/categories", icon: "👤" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-200 border-r border-slate-100 min-h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <Logo />
      </div>

      <nav className="mt-6">
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-5 py-3 rounded-r-full transition-colors ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
