import type { Preview } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fn } from 'storybook/test'

import { AuthApiProvider, SessionProvider, type SessionUser } from '../src/features/auth'
import { mockAuthApiSuccess } from '../src/features/auth/api/auth.api.mock'
import { onboardingStoreApi } from '../src/features/auth/store/onboarding.store'
import { ToastProvider } from '../src/providers/toast-provider'

// Fixture user + a mock AuthClient injected into every story via the
// `SessionProvider`'s `authClient` prop, so no story ever touches the
// real server actions / cookies. See src/features/auth/hooks/session-provider.tsx.
const mockUser: SessionUser = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane@example.com',
}

const mockAuthClient = {
  login: fn(async () => ({ user: mockUser })),
  logout: fn(async () => {}),
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },

    // Required by @storybook/nextjs-vite for any story whose component
    // tree calls a `next/navigation` hook (useRouter, useSearchParams,
    // …) — without it, `useRouter()` throws "expected app router to be
    // mounted" (see SignupForm, which calls it via useSignupMutation).
    nextjs: {
      appDirectory: true,
    },
  },

  // Toolbar toggle to preview a component under each session state
  // (Authenticated / Unauthenticated / Loading) without a real backend.
  globalTypes: {
    session: {
      name: 'Session',
      description: 'Mock authentication state',
      toolbar: {
        icon: 'user',
        items: [
          { value: 'authenticated', title: 'Authenticated' },
          { value: 'unauthenticated', title: 'Unauthenticated' },
          { value: 'loading', title: 'Loading' },
        ],
      },
    },
  },

  initialGlobals: {
    session: 'unauthenticated',
  },

  decorators: [
    // A fresh QueryClient + the success mock AuthApi for every story — no
    // story ever touches a real fetch, and no cached data leaks between
    // stories. Override `AuthApiProvider`'s `api` prop per-story (see
    // SignupForm.stories.tsx) for error/pending scenarios.
    (Story) => {
      const [queryClient] = useState(
        () => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
      )
      // Reset the onboarding store's plain-JS state before each story —
      // it lives outside React, so nothing else clears it between mounts.
      onboardingStoreApi.getState().actions.reset()

      return (
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthApiProvider api={mockAuthApiSuccess}>
              <Story />
            </AuthApiProvider>
          </ToastProvider>
        </QueryClientProvider>
      )
    },
    (Story, context) => {
      const status = (context.globals.session as
        | 'authenticated'
        | 'unauthenticated'
        | 'loading'
        | undefined) ?? 'unauthenticated'

      return (
        <SessionProvider
          initialUser={status === 'authenticated' ? mockUser : null}
          initialStatus={status}
          authClient={mockAuthClient}
        >
          <Story />
        </SessionProvider>
      )
    },
  ],
}

export default preview
