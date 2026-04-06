import type { CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

/** Minimal `next/image` stand-in for Cypress component tests. */
export default function Image({ src, alt, className, fill, width, height, ...rest }: Props) {
  const style: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }
    : width != null && height != null
      ? { width, height }
      : undefined;

  /* Intentional `<img>` stub for Cypress CT (not Next.js runtime). */
  // eslint-disable-next-line @next/next/no-img-element -- test double for `next/image`
  return <img src={src} alt={alt} className={className} style={style} {...rest} />;
}
