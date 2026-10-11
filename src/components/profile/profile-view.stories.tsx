import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ProfileView } from './profile-view'

const meta = {
  title: 'Pages/Profile',
  component: ProfileView,
  tags: ['autodocs'],
  args: {
    user: { id: '1', name: 'Jane Doe', email: 'jane@example.com' },
  },
} satisfies Meta<typeof ProfileView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
