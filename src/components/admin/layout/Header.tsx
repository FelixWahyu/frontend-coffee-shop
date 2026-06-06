import { Menu, User } from "lucide-react";
import Button from "../../ui/button";

export default function HeaderAdmin() {
  return (
    <div className="bg-white px-6 py-3 border-b border-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Button type="button" className="flex items-center cursor-pointer p-1.5 hover:text-white hover:bg-gray-900 transition-all">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        <Button type="button" className="flex items-center cursor-pointer hover:text-white hover:bg-gray-900 rounded-lg border border-black px-4 py-1.5 shadow-[4px_4px_0px_#000000]/50 gap-4">
          <User className="w-5 h-5" />
          <div>
            <h3 className="text-md font-semibold">Admin Cafe</h3>
          </div>
        </Button>
      </div>
    </div>
  );
}
