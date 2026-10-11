import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { SearchView } from "@/src/components/search/search-view";

export default async function SearchPage() {
  await verifySession(routes.main.search);
  return <SearchView />;
}
