import Link from "next/link";
import Button from "@/components/ui/button";

interface NavAuthProps {
  isAuth: boolean;
  onLogout: () => void;
  atributes?: string;
}

export default function NavAuth({ isAuth, onLogout, atributes = "" }: NavAuthProps) {
  if (isAuth) {
    return (
      <>
        <Button onClick={onLogout} className={`text-white bg-red-500 cursor-pointer px-4 py-1.5 font-lato font-semibold rounded-xl shadow-sm hover:bg-red-600 transition-colors duration-300 ${atributes}`}>
          Sign Out
        </Button>
      </>
    );
  }

  return (
    <>
      <Link href={"/login"} className={`text-white bg-[#C67C4E] px-4 py-1.5 font-lato font-semibold rounded-xl shadow-sm hover:bg-[#C67C4E]/70 transition-colors duration-300 ${atributes}`}>
        Sign In
      </Link>
    </>
  );
}
