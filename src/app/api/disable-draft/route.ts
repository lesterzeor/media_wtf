import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Exits Draft Mode (e.g. from PreviewModeBanner). */
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
