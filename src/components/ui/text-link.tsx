import { Arrow } from "./arrow";

export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a className={`text-link${light ? " text-link-light" : ""}`} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
