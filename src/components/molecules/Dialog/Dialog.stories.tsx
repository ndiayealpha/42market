import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "@/src/components/atoms/Button/Button";

import { Dialog } from "./Dialog";

const meta = {
  title: "Molecules/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Supprimer définitivement mon compte ?",
    children: <p className="text-sm text-muted-foreground">Cette action est irréversible.</p>,
  },
};

export const OpensAndCloses: Story = {
  args: { open: false, onClose: () => {}, title: "Confirmation", children: null },
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Ouvrir
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)} title="Confirmation">
            <p className="text-sm text-muted-foreground">Contenu du dialogue.</p>
          </Dialog>
        </>
      );
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Ouvrir" }));
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Fermer" }));
  },
};
