import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { RecipesView } from "@/src/components/recipes/recipes-view";

export default async function RecipesPage() {
  await verifySession(routes.main.recipes);
  return <RecipesView />;
}
