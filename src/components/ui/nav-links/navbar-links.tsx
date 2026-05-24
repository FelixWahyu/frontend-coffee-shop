import Link from "next/link";

interface NavLinkProps {
  pathName: string;
  links: {
    href: string;
    label: string;
  }[];
}

export default function NavbarLinks({ pathName, links }: NavLinkProps) {
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={`${pathName === link.href ? "text-[#C67C4E] underline" : "text-gray-800"} font-lato font-semibold hover:underline hover:text-[#C67C4E] transition-all duration-300`}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
