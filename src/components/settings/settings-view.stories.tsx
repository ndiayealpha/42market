import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SettingsView } from './settings-view'

const meta = {
  title: 'Pages/Settings',
  component: SettingsView,
  tags: ['autodocs'],
  args: {
    user: { id: '1', name: 'Jane Doe', email: 'jane@example.com' },
  },
} satisfies Meta<typeof SettingsView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
