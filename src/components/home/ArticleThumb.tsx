import Image from "next/image";
import type { ArticleThumbProps } from "@/components/home/types";

function resolveAssetUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return `https://${url.replace(/^\/+/, "")}`;
}

const sizePx = { sm: 72, md: 96 };

export function ArticleThumb({ image, alt, size = "sm", className }: ArticleThumbProps) {
  const px = sizePx[size];
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded bg-neutral-200 ${className ?? ""}`}
      style={{ width: px, height: px }}
    >
      <Image
        src={resolveAssetUrl(image.url)}
        alt={alt}
        width={px}
        height={px}
        className="h-full w-full object-cover"
        sizes={`${px}px`}
      />
    </div>
  );
}
