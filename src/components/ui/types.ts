import type { Article } from "@/types/content";
import type { PropsWithChildren, ReactNode } from "react";

export type AdPlaceholderProps = {
  width: number;
  height: number;
  className?: string;
};

export type CardProps = {
  article: Article;
};

export type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export type ContainerProps = PropsWithChildren<{
  className?: string;
  /** Wider max width for editorial layouts */
  wide?: boolean;
}>;
