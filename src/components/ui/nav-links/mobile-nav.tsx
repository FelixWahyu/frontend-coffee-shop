import Link from "next/link";

interface MobileNavProps {
  pathName: string;
  links: {
    href: string;
    label: string;
  }[];
  closeMenu: () => void;
}

export default function MobileNav({ pathName, links, closeMenu }: MobileNavProps) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeMenu}
          className={`${pathName === link.href ? "text-[#C67C4E] bg-[#30261C]/10" : "text-gray-800"} px-3 py-1 rounded-lg font-lato font-semibold hover:bg-[#30261C]/10 hover:text-[#C67C4E] transition-all duration-300`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
