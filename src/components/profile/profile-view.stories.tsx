import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ProfileTemplate } from '@/src/features/profile/ProfileTemplate'
import { PROFILE_DETAILS, PROFILE_STATS, TERROIR_SUGGESTION_LABEL, TERROIRS } from '@/src/data/profile.mock'
import { ACTIVE_ORDER, ORDER_HISTORY, ORDERS_TOTAL_COUNT } from '@/src/data/orders.mock'
import { ACCOUNT_SETTINGS } from '@/src/data/account-settings.mock'

// `ProfileView` (the hook-wiring container) is deliberately not what
// Storybook renders — only the pure `ProfileTemplate` is (rule 9: "le
// container... n'est pas rendu dans Storybook"). Fixtures mirror the user
// id "1" used by `mockUser`/`SessionUser` everywhere else.
const meta = {
  title: 'Pages/Profile',
  component: ProfileTemplate,
  tags: ['autodocs'],
  args: {
    userId: PROFILE_DETAILS.id,
    userName: 'Jane Doe',
    profile: PROFILE_DETAILS,
    isProfileLoading: false,
    stats: PROFILE_STATS,
    terroirs: TERROIRS,
    terroirSuggestionLabel: TERROIR_SUGGESTION_LABEL,
    isTerroirsLoading: false,
    isTerroirsError: false,
    activeOrder: ACTIVE_ORDER,
    isActiveOrderLoading: false,
    isActiveOrderError: false,
    orderHistory: ORDER_HISTORY,
    orderHistoryTotalCount: ORDERS_TOTAL_COUNT,
    isOrderHistoryLoading: false,
    isOrderHistoryError: false,
    settings: ACCOUNT_SETTINGS,
    isSettingsLoading: false,
    isSettingsError: false,
  },
} satisfies Meta<typeof ProfileTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SansCommandeEnCours: Story = {
  args: { activeOrder: null },
}

export const SansHistorique: Story = {
  args: { orderHistory: [], orderHistoryTotalCount: 0 },
}

export const SansTerroir: Story = {
  args: { terroirs: [] },
}

export const NouveauMembre: Story = {
  name: 'NouveauMembre (non VIP)',
  args: {
    profile: { ...PROFILE_DETAILS, loyaltyTier: 'none', isVerified: false, bio: 'Nouveau membre — bio à compléter.' },
    stats: { ordersCount: 0, favoritesCount: 0, loyaltyPoints: 0 },
    terroirs: [],
    activeOrder: null,
    orderHistory: [],
    orderHistoryTotalCount: 0,
  },
}

export const Loading: Story = {
  args: {
    isProfileLoading: true,
    profile: null,
    stats: null,
    isTerroirsLoading: true,
    terroirs: [],
    isActiveOrderLoading: true,
    activeOrder: null,
    isOrderHistoryLoading: true,
    orderHistory: [],
    isSettingsLoading: true,
    settings: null,
  },
}

export const Erreur: Story = {
  args: {
    isTerroirsError: true,
    isActiveOrderError: true,
    isOrderHistoryError: true,
    isSettingsError: true,
  },
}

// No viewport addon is installed in this project, so the mobile state is
// demonstrated with a constrained container instead of a device frame.
export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
}
