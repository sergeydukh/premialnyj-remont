export type RenovationTier = 'economy' | 'comfort' | 'premium' | 'lux'
export type ProjectType = 'bathroom' | 'kitchen' | 'integral'

export type RenovationTierConfig = {
  key: RenovationTier
  label: string
  tagline: string
  rateLow: number
  rateHigh: number
  accent: string
}

export const RENOVATION_TIERS: readonly RenovationTierConfig[] = [
  {
    key: 'economy',
    label: 'Эконом',
    tagline: 'Надёжный полный ремонт без лишнего',
    rateLow: 300,
    rateHigh: 300,
    accent: 'bg-amber',
  },
  {
    key: 'comfort',
    label: 'Комфорт',
    tagline: 'Продуманные решения на каждый день',
    rateLow: 370,
    rateHigh: 370,
    accent: 'bg-lime',
  },
  {
    key: 'premium',
    label: 'Премиум',
    tagline: 'Выразительная отделка и комплектация',
    rateLow: 400,
    rateHigh: 420,
    accent: 'bg-primary',
  },
  {
    key: 'lux',
    label: 'Люкс',
    tagline: 'Самые сложные и эффектные решения',
    rateLow: 500,
    rateHigh: 600,
    accent: 'bg-[#d14d57]',
  },
] as const

export const MINIMUM_BILLABLE_AREA: Record<ProjectType, number> = {
  bathroom: 8,
  kitchen: 12,
  integral: 0,
}

export type RenovationEstimate = {
  actualArea: number
  billableArea: number
  minimumApplied: boolean
  rateLow: number
  rateHigh: number
  low: number
  high: number
  days: number
}

export function getRenovationTier(tier: RenovationTier) {
  return RENOVATION_TIERS.find((item) => item.key === tier) ?? RENOVATION_TIERS[0]
}

export function calculateRenovationEstimate({
  tier,
  projectType,
  area,
  layoutChange,
  partitions,
  joinLivingRoom,
}: {
  tier: RenovationTier
  projectType: ProjectType
  area: number
  layoutChange: boolean
  partitions: number
  joinLivingRoom: boolean
}): RenovationEstimate {
  const config = getRenovationTier(tier)
  const minimumArea = MINIMUM_BILLABLE_AREA[projectType]
  const billableArea = Math.max(area, minimumArea)
  const low = Math.round((billableArea * config.rateLow) / 10) * 10
  const high = Math.round((billableArea * config.rateHigh) / 10) * 10
  const days = Math.round(
    projectType === 'integral'
      ? 28 + area * 0.9 + (layoutChange ? partitions * 2 : 0)
      : projectType === 'kitchen'
        ? 18 + area * 1.25 + (joinLivingRoom ? 5 : 0)
        : 14 + area * 1.6 + (layoutChange ? 4 : 0),
  )

  return {
    actualArea: area,
    billableArea,
    minimumApplied: billableArea > area,
    rateLow: config.rateLow,
    rateHigh: config.rateHigh,
    low,
    high,
    days,
  }
}
