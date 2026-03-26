import { redirect } from "next/navigation";

/** @deprecated `/category`로 통합 */
export default function CategoriesAliasPage() {
  redirect("/category");
}
