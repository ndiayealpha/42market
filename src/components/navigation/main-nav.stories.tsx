import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'

import { MainNav } from './main-nav'

const meta = {
  title: 'Navigation/MainNav',
  component: MainNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MainNav>

export default meta
type Story = StoryObj<typeof meta>

// Use the "Session" toolbar in the Storybook toolbar to flip between
// these three states manually on any story.

export const Authenticated: Story = {
  globals: { session: 'authenticated' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Jane Doe')).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'href',
      '/main/home'
    )
    await expect(canvas.getByRole('link', { name: 'Profile' })).toHaveAttribute(
      'href',
      '/main/profile'
    )
    await expect(canvas.getByRole('link', { name: 'Settings' })).toHaveAttribute(
      'href',
      '/main/settings'
    )
  },
}

export const Unauthenticated: Story = {
  globals: { session: 'unauthenticated' },
}

export const Loading: Story = {
  globals: { session: 'loading' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: /logging out/i })).toBeInTheDocument()
  },
}

export const LogsOut: Story = {
  globals: { session: 'authenticated' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /log out/i }))
  },
}
