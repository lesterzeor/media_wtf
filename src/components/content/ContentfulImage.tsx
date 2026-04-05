import Image from "next/image";
import type { ContentImage } from "@/types/content";
import { cn } from "@/lib/utils";

type ContentfulImageProps = {
  image: ContentImage;
  priority?: boolean;
  className?: string;
  /** Parent must be `relative` with explicit dimensions or aspect ratio. */
  fill?: boolean;
  sizes?: string;
};

/** GraphQL may return `//host/...`, `https://host/...`, or protocol-less paths. */
function resolveAssetUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return `https://${url.replace(/^\/+/, "")}`;
}

export function ContentfulImage({ image, priority, className, fill, sizes }: ContentfulImageProps) {
  const src = resolveAssetUrl(image.url);
  const alt = image.description || image.title;

  if (fill) {
    return (
      <Image
        fill
        src={src}
        alt={alt}
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={image.width}
      height={image.height}
      priority={priority}
      className={cn("h-auto w-full rounded-xl object-cover", className)}
    />
  );
}
