import Image from "next/image";
import type { ContentImage } from "@/types/content";

type ContentfulImageProps = {
  image: ContentImage;
  priority?: boolean;
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

export function ContentfulImage({ image, priority }: ContentfulImageProps) {
  return (
    <Image
      src={resolveAssetUrl(image.url)}
      alt={image.description || image.title}
      width={image.width}
      height={image.height}
      priority={priority}
      className="h-auto w-full rounded-xl object-cover"
    />
  );
}
