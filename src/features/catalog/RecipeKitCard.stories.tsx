import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { RECIPE_KIT } from "@/src/data/catalog.mock";

import { RecipeKitCard } from "./RecipeKitCard";

const meta = {
  title: "Catalog/RecipeKitCard",
  component: RecipeKitCard,
  tags: ["autodocs"],
  args: { recipeKit: RECIPE_KIT },
} satisfies Meta<typeof RecipeKitCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PartiallyOutOfStock: Story = {
  args: {
    recipeKit: {
      ...RECIPE_KIT,
      ingredients: RECIPE_KIT.ingredients.map((ingredient, index) => (index === 1 ? { ...ingredient, isAvailable: false } : ingredient)),
    },
  },
};

export const UnchecksAnIngredient: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);
    await expect(canvas.getByText(/4 ingrédients sélectionnés/)).toBeInTheDocument();
  },
};

export const UnchecksEverything: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const checkbox of canvas.getAllByRole("checkbox")) {
      await userEvent.click(checkbox);
    }
    const cta = canvas.getByRole("button", { name: /Ajouter la recette/i });
    await expect(cta).toBeDisabled();
  },
};
