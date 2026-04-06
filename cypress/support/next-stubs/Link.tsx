import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  children?: ReactNode;
};

/** Minimal `next/link` stand-in for Cypress component tests (renders a plain `<a>`). */
export default function Link({ href, children, ...rest }: Props) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
