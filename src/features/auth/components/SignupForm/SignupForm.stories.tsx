import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { AuthApiProvider } from "../../api/auth-api-provider";
import { mockAuthApiEmailTaken, mockAuthApiNetworkError, mockAuthApiPending } from "../../api/auth.api.mock";
import { SignupForm } from "./SignupForm";

const meta = {
  title: "Features/Auth/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default/Filled/ValidationErrors run against the shared "success" mock
// AuthApi from .storybook/preview.tsx.

export const Empty: Story = {};

export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Prénom", { exact: true }), "Awa");
    await userEvent.type(canvas.getByLabelText("Nom", { exact: true }), "Diop");
    await userEvent.type(canvas.getByLabelText("Adresse e-mail", { exact: true }), "awa.diop@example.com");
    await userEvent.type(canvas.getByLabelText("Téléphone", { exact: true }), "612345678");
    await userEvent.type(canvas.getByLabelText("Mot de passe", { exact: true }), "Sup3rS3cret!");
    await expect(canvas.getByText("Fort")).toBeInTheDocument();
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /créer mon compte/i }));
    await expect(canvas.getByText("Le prénom est requis.")).toBeInTheDocument();
    await expect(canvas.getByText("Le nom est requis.")).toBeInTheDocument();
    await expect(canvas.getByText("L'adresse e-mail est requise.")).toBeInTheDocument();
    await expect(
      canvas.getByText("Vous devez accepter les conditions générales pour continuer.")
    ).toBeInTheDocument();
  },
};

export const Submitting: Story = {
  decorators: [
    (StoryComponent) => (
      <AuthApiProvider api={mockAuthApiPending}>
        <StoryComponent />
      </AuthApiProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Prénom", { exact: true }), "Awa");
    await userEvent.type(canvas.getByLabelText("Nom", { exact: true }), "Diop");
    await userEvent.type(canvas.getByLabelText("Adresse e-mail", { exact: true }), "awa.diop@example.com");
    await userEvent.type(canvas.getByLabelText("Téléphone", { exact: true }), "612345678");
    await userEvent.type(canvas.getByLabelText("Mot de passe", { exact: true }), "Sup3rS3cret!");
    await userEvent.click(canvas.getByLabelText(/j'accepte les/i));
    await userEvent.click(canvas.getByRole("button", { name: /créer mon compte/i }));
    await expect(canvas.getByRole("button", { name: /création en cours/i })).toBeDisabled();
  },
};

export const EmailAlreadyUsed: Story = {
  decorators: [
    (StoryComponent) => (
      <AuthApiProvider api={mockAuthApiEmailTaken}>
        <StoryComponent />
      </AuthApiProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Prénom", { exact: true }), "Awa");
    await userEvent.type(canvas.getByLabelText("Nom", { exact: true }), "Diop");
    await userEvent.type(canvas.getByLabelText("Adresse e-mail", { exact: true }), "jane@example.com");
    await userEvent.type(canvas.getByLabelText("Téléphone", { exact: true }), "612345678");
    await userEvent.type(canvas.getByLabelText("Mot de passe", { exact: true }), "Sup3rS3cret!");
    await userEvent.click(canvas.getByLabelText(/j'accepte les/i));
    await userEvent.click(canvas.getByRole("button", { name: /créer mon compte/i }));
    // findBy* (not getBy*): the mock resolves after a short delay, so the
    // error text only appears once that microtask + re-render settle.
    await expect(await canvas.findByText("Cette adresse e-mail est déjà utilisée.")).toBeInTheDocument();
  },
};

export const NetworkError: Story = {
  decorators: [
    (StoryComponent) => (
      <AuthApiProvider api={mockAuthApiNetworkError}>
        <StoryComponent />
      </AuthApiProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Prénom", { exact: true }), "Awa");
    await userEvent.type(canvas.getByLabelText("Nom", { exact: true }), "Diop");
    await userEvent.type(canvas.getByLabelText("Adresse e-mail", { exact: true }), "awa.diop@example.com");
    await userEvent.type(canvas.getByLabelText("Téléphone", { exact: true }), "612345678");
    await userEvent.type(canvas.getByLabelText("Mot de passe", { exact: true }), "Sup3rS3cret!");
    await userEvent.click(canvas.getByLabelText(/j'accepte les/i));
    await userEvent.click(canvas.getByRole("button", { name: /créer mon compte/i }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Impossible de contacter le serveur. Réessayez.");
  },
};
