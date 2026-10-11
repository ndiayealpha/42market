import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { SessionProvider } from "@/src/features/auth";
import { LoginForm } from "./LoginForm";

const meta = {
  title: "Organisms/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default/Filled/Invalid/Submitting run inside the shared "Session" toolbar
// decorator from .storybook/preview.tsx (Unauthenticated by default).

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Adresse e-mail"), "jane@example.com");
    await userEvent.type(canvas.getByLabelText("Mot de passe"), "password123");
  },
};

export const Invalid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /se connecter/i }));
    await expect(canvas.getByText("L'adresse e-mail est requise.")).toBeInTheDocument();
    await expect(canvas.getByText("Le mot de passe est requis.")).toBeInTheDocument();
  },
};

export const Submitting: Story = {
  globals: { session: "loading" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: /connexion…/i })).toBeDisabled();
  },
};

export const Disabled: Story = {
  globals: { session: "loading" },
};

// Overrides the shared session decorator with a client that always fails,
// to exercise the server-side (as opposed to field-level) error state.
export const AuthenticationError: Story = {
  decorators: [
    (Story) => (
      <SessionProvider
        initialUser={null}
        authClient={{
          login: async () => ({ error: "Identifiants invalides." }),
          logout: async () => {},
        }}
      >
        <Story />
      </SessionProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Adresse e-mail"), "jane@example.com");
    await userEvent.type(canvas.getByLabelText("Mot de passe"), "wrong-password");
    await userEvent.click(canvas.getByRole("button", { name: /se connecter/i }));
    await expect(canvas.getByRole("alert")).toHaveTextContent("Identifiants invalides.");
  },
};
