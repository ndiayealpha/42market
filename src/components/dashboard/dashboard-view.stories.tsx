import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DashboardView } from './dashboard-view'

const meta = {
  title: 'Pages/Dashboard',
  component: DashboardView,
  tags: ['autodocs'],
  args: {
    user: { id: '1', name: 'Jane Doe', email: 'jane@example.com' },
  },
} satisfies Meta<typeof DashboardView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // Same known false positive as PromoCard's own "Text"/"AllThemes"
  // stories: the bordeaux card's gold accent is checked against the
  // page's white background because its real background is painted on
  // an absolutely-positioned sibling layer axe's ancestor-walk can't
  // see. Real contrast (by hand, WCAG relative-luminance formula) is
  // ~8.4:1 — see PromoCard.stories.tsx for the full note.
  parameters: { a11y: { test: 'todo' } },
}
