import Image from "next/image";
import type { EditorialHeroImageProps } from "@/components/editorial/types";

function resolveAssetUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return `https://${url.replace(/^\/+/, "")}`;
}

/** Full-bleed hero image inside a `relative` container. */
export function EditorialHeroImage({
  image,
  priority,
  sizes = "(max-width: 1024px) 100vw, 42vw",
  className,
}: EditorialHeroImageProps) {
  return (
    <Image
      src={resolveAssetUrl(image.url)}
      alt={image.description || image.title}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
