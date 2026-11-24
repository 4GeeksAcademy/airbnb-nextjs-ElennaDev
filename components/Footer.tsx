import { Euro, Globe } from "lucide-react";
import type { FooterGroup } from "@/types/footer";

interface FooterProps {
  groups: FooterGroup[];
}

const Footer = ({ groups }: FooterProps) => {
  return (
    <footer className="bg-neutral-50 px-6 py-8 text-neutral-800 md:px-10 lg:px-20">
      <div className="divide-y divide-neutral-200 md:grid md:grid-cols-3 md:gap-6 md:divide-y-0">
        {groups.map((group) => (
          <section key={group.title} className="py-6 first:pt-0 md:py-0">
            <h2 className="mb-4 text-sm font-semibold">{group.title}</h2>
            <ul className="space-y-4 text-sm">
              {group.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-6 space-y-4 border-t border-neutral-200 pt-6 text-sm md:flex md:items-center md:justify-between md:space-y-0">
        <p className="flex items-center gap-4 font-semibold">
          <span className="flex items-center gap-2">
            <Globe className="size-4" aria-hidden="true" /> Español (ES)
          </span>
          <span className="flex items-center gap-1">
            <Euro className="size-4" aria-hidden="true" /> EUR
          </span>
        </p>
        <p className="text-neutral-500">© 2026 Refugio · Proyecto de práctica</p>
      </div>
    </footer>
  );
};

export default Footer;
