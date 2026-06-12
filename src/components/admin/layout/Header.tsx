import { Menu, User } from "lucide-react";
import Button from "../../ui/button";
import { useNavbar } from "@/hooks/auth/UseLogout";

interface HeaderAdminProps {
  toggleSidebar: () => void;
}

export default function HeaderAdmin({ toggleSidebar }: HeaderAdminProps) {
  const { isAuth, users } = useNavbar();

  return (
    <div className="bg-white px-6 py-3 border-b border-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="border-r border-gray-600 pr-4">
            <Button type="button" onClick={toggleSidebar} className="flex items-center cursor-pointer text-semibold p-1.5 hover:text-white hover:bg-gray-900 transition-all">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          <h3 className="font-semibold text-xl">Admin Panel</h3>
        </div>
        <Button type="button" className="hidden md:flex items-center cursor-pointer hover:text-white hover:bg-gray-900 rounded-lg border border-black px-4 py-1.5 shadow-[4px_4px_0px_#000000]/50 gap-4">
          <User className="w-5 h-5" />
          {isAuth && users && (
            <div>
              <h3 className="text-md font-semibold">{users?.name}</h3>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
