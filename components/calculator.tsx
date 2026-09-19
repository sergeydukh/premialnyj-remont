'use client'

import { useEffect, useMemo, useRef, useState, type ComponentType, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  Check,
  Clock3,
  DoorOpen,
  Droplets,
  Fan,
  Gem,
  Hammer,
  House,
  LoaderCircle,
  Paintbrush,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getWhatsAppUrl, useI18n, type Locale } from '@/lib/i18n'
import { calcText } from '@/lib/calculator-copy'
import {
  RENOVATION_TIERS,
  calculateRenovationEstimate,
  getRenovationTier,
  type ProjectType,
  type RenovationEstimate,
  type RenovationTier,
} from '@/lib/renovation-pricing'

type PropertyCondition = 'lived-in' | 'newbuild'
type WetZone = 'shower' | 'bath' | 'keep'
type TowelRail = 'none' | 'electric' | 'water'
type WallFinish = 'tile-full' | 'tile-zones' | 'microcement'
type DoorChoice = 'keep' | 'replace'
type VanityChoice = 'none' | 'standard' | 'custom'
type KitchenCabinets = 'keep' | 'modular' | 'custom'
type Countertop = 'laminate' | 'quartz' | 'stone'
type KitchenSplashback = 'tile' | 'quartz' | 'glass'
type FloorFinish = 'tile' | 'wood' | 'microcement'
type ClimateSystem = 'keep' | 'split' | 'ducted'
type CeilingType = 'paint' | 'plasterboard' | 'stretch'

type CalculatorState = {
  renovationTier: RenovationTier | null
  projectType: ProjectType
  area: number
  condition: PropertyCondition
  demolition: boolean
  layoutChange: boolean
  joinLivingRoom: boolean
  partitions: number
  changeFloor: boolean
  wetZone: WetZone
  waterproofing: boolean
  replacePipes: boolean
  replaceElectrics: boolean
  sanitaryPoints: number
  lightingPoints: number
  towelRail: TowelRail
  floorHeating: boolean
  ventilation: boolean
  wallFinish: WallFinish
  ceilingRepair: boolean
  door: DoorChoice
  vanity: VanityChoice
  niche: boolean
  bedrooms: number
  bathrooms: number
  kitchenCabinets: KitchenCabinets
  countertop: Countertop
  kitchenSplashback: KitchenSplashback
  floorFinish: FloorFinish
  climateSystem: ClimateSystem
  replaceRadiators: boolean
  smoothWalls: boolean
  ceilingType: CeilingType
  replaceWindows: boolean
  windowsCount: number
  doorsCount: number
  builtInStorage: boolean
}

const STEP_DATA = [
  { label: 'Уровень ремонта', icon: Gem },
  { label: 'Проект', icon: Bath },
  { label: 'Характеристики', icon: Sparkles },
  { label: 'Строительные работы', icon: Hammer },
  { label: 'Сантехника и электрика', icon: Droplets },
  { label: 'Климат', icon: Fan },
  { label: 'Отделка', icon: Paintbrush },
  { label: 'Столярные изделия', icon: DoorOpen },
  { label: 'Расчёт', icon: LoaderCircle },
] as const

const PROJECT_LABELS: Record<ProjectType, string> = {
  bathroom: 'Ремонт ванной',
  kitchen: 'Ремонт кухни',
  integral: 'Комплексный ремонт',
}

const initialState: CalculatorState = {
  renovationTier: null,
  projectType: 'bathroom',
  area: 6,
  condition: 'lived-in',
  demolition: true,
  layoutChange: false,
  joinLivingRoom: false,
  partitions: 1,
  changeFloor: true,
  wetZone: 'shower',
  waterproofing: true,
  replacePipes: true,
  replaceElectrics: true,
  sanitaryPoints: 3,
  lightingPoints: 3,
  towelRail: 'electric',
  floorHeating: false,
  ventilation: true,
  wallFinish: 'tile-full',
  ceilingRepair: true,
  door: 'keep',
  vanity: 'standard',
  niche: false,
  bedrooms: 3,
  bathrooms: 2,
  kitchenCabinets: 'custom',
  countertop: 'quartz',
  kitchenSplashback: 'tile',
  floorFinish: 'tile',
  climateSystem: 'keep',
  replaceRadiators: false,
  smoothWalls: true,
  ceilingType: 'paint',
  replaceWindows: false,
  windowsCount: 5,
  doorsCount: 6,
  builtInStorage: false,
}

function formatCurrency(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(value)
}

export function Calculator() {
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [state, setState] = useState<CalculatorState>(initialState)
  const [calculating, setCalculating] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = <K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K],
  ) => setState((current) => ({ ...current, [key]: value }))

  const estimate = useMemo(
    () => calculateRenovationEstimate({
      tier: state.renovationTier ?? 'economy',
      projectType: state.projectType,
      area: state.area,
      layoutChange: state.layoutChange,
      partitions: state.partitions,
      joinLivingRoom: state.joinLivingRoom,
    }),
    [state.area, state.joinLivingRoom, state.layoutChange, state.partitions, state.projectType, state.renovationTier],
  )

  useEffect(() => {
    if (step !== STEP_DATA.length) return
    setCalculating(true)
    const timeout = window.setTimeout(() => setCalculating(false), 900)
    return () => window.clearTimeout(timeout)
  }, [step, state])

  const goToStep = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1)
    setStep(Math.min(STEP_DATA.length, Math.max(1, nextStep)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setState(initialState)
    setSubmitted(false)
    goToStep(1)
  }

  const selectProject = (projectType: ProjectType) => {
    setState((current) => ({
      ...current,
      projectType,
      area: projectType === 'bathroom' ? 6 : projectType === 'kitchen' ? 10 : 90,
      sanitaryPoints: projectType === 'kitchen' ? 2 : 3,
      lightingPoints: projectType === 'integral' ? 12 : projectType === 'kitchen' ? 8 : 3,
    }))
  }

  const selectedTier = state.renovationTier ? getRenovationTier(state.renovationTier) : null
  const canContinue = step !== 1 || state.renovationTier !== null

  return (
    <main className="relative min-h-svh overflow-hidden bg-background px-4 pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-45" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              / {tx('Калькулятор ремонта')}
            </p>
            <h1 className="font-display text-[clamp(2.25rem,5vw,4.75rem)] font-bold leading-[0.98] tracking-tight text-balance">
              {tx('Предварительная смета')} <span className="text-primary text-glow">{tx('без лишних вопросов.')}</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {tx('Сначала выберите уровень и тип ремонта. Рассчитаем базовую стоимость работ с IVA и соберём подробный план проекта.')}
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-card/70 shadow-2xl backdrop-blur-xl">
          <div className="h-1 bg-secondary">
            <motion.div
              className="h-full bg-primary shadow-[0_0_18px] shadow-primary"
              animate={{ width: `${(step / STEP_DATA.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 150, damping: 24 }}
            />
          </div>

          <div className="grid min-w-0 lg:grid-cols-[18rem_1fr]">
            <StepNavigation currentStep={step} onStepClick={goToStep} />

            <section className="min-w-0 min-h-[41rem] p-5 sm:p-8 lg:p-12" aria-live="polite">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {tx('Шаг')} {String(step).padStart(2, '0')} / {String(STEP_DATA.length).padStart(2, '0')}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                    {tx(STEP_DATA[step - 1].label)}
                  </h2>
                </div>
                {step < STEP_DATA.length && selectedTier && (
                  <span className="hidden rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-primary sm:inline-flex">
                    {tx(selectedTier.label)}{step > 1 ? ` · ${tx(PROJECT_LABELS[state.projectType])}` : ''}
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -18 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepContent
                    step={step}
                    state={state}
                    update={update}
                    onProjectChange={selectProject}
                    estimate={estimate}
                    calculating={calculating}
                    submitted={submitted}
                    onSubmit={() => setSubmitted(true)}
                    onReset={reset}
                  />
                </motion.div>
              </AnimatePresence>

              {step < STEP_DATA.length && (
                <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                  <button
                    type="button"
                    onClick={() => goToStep(step - 1)}
                    disabled={step === 1}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
                  >
                    <ArrowLeft className="h-4 w-4" /> {tx('Назад')}
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(step + 1)}
                    disabled={!canContinue}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-10px] shadow-primary transition-shadow hover:shadow-[0_0_38px_-8px] hover:shadow-primary disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
                  >
                    {tx(step === STEP_DATA.length - 1 ? 'Рассчитать' : step === 1 && !canContinue ? 'Сначала выберите уровень ремонта' : 'Продолжить')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {tx('Онлайн-расчёт включает работы и IVA. Материалы, мебель, оборудование и нестандартные решения рассчитываются после замера.')}
        </p>
      </div>
    </main>
  )
}

function StepNavigation({
  currentStep,
  onStepClick,
}: {
  currentStep: number
  onStepClick: (step: number) => void
}) {
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  const stepListRef = useRef<HTMLOListElement>(null)
  const activeStepRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const list = stepListRef.current
    const activeStep = activeStepRef.current
    if (!list || !activeStep || window.matchMedia('(min-width: 1024px)').matches) return

    list.scrollTo({
      behavior: 'smooth',
      left: Math.max(0, activeStep.offsetLeft - (list.clientWidth - activeStep.clientWidth) / 2),
    })
  }, [currentStep])

  return (
    <aside className="min-w-0 border-b border-border bg-background/45 p-4 lg:border-b-0 lg:border-r lg:p-6">
      <ol ref={stepListRef} className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" aria-label={tx('Этапы расчёта')}>
        {STEP_DATA.map((item, index) => {
          const number = index + 1
          const Icon = item.icon
          const active = number === currentStep
          const complete = number < currentStep
          return (
            <li key={item.label} className="shrink-0 lg:w-full">
              <button
                ref={active ? activeStepRef : undefined}
                type="button"
                onClick={() => number <= currentStep && onStepClick(number)}
                disabled={number > currentStep}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex min-w-[10rem] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors lg:w-full lg:min-w-0',
                  active && 'border-primary/60 bg-primary/10 text-foreground',
                  complete && 'border-transparent text-foreground hover:bg-secondary/60',
                  number > currentStep && 'border-transparent text-muted-foreground/45',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border font-mono text-[11px]',
                    active && 'border-primary bg-primary text-primary-foreground',
                    complete && 'border-primary/30 bg-primary/10 text-primary',
                    number > currentStep && 'border-border',
                  )}
                >
                  {complete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span>
                  <span className="block font-mono text-[10px] text-muted-foreground">{String(number).padStart(2, '0')}</span>
                  <span className="mt-0.5 block text-xs font-semibold">{tx(item.label)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

type StepContentProps = {
  step: number
  state: CalculatorState
  update: <K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) => void
  onProjectChange: (projectType: ProjectType) => void
  estimate: RenovationEstimate
  calculating: boolean
  submitted: boolean
  onSubmit: () => void
  onReset: () => void
}

function StepContent(props: StepContentProps) {
  const { step, state, update, onProjectChange } = props
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)

  if (step === 1) {
    return (
      <StepSection
        title="Какой уровень ремонта вам подходит?"
        description="Уровень определяет базовую стоимость работ. Все материалы, мебель и оборудование рассчитываются отдельно."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {RENOVATION_TIERS.map((tier) => (
            <TierChoiceCard
              key={tier.key}
              tier={tier}
              selected={state.renovationTier === tier.key}
              onClick={() => update('renovationTier', tier.key)}
            />
          ))}
        </div>
        <p className="rounded-2xl border border-primary/20 bg-primary/8 p-4 text-xs leading-relaxed text-muted-foreground">
          {tx('В базовую цену входят демонтаж, стандартная подготовка, монтаж и базовое обновление инженерии. На выходе — готовый ремонт без стоимости материалов.')}
        </p>
      </StepSection>
    )
  }

  if (step === 2) {
    return (
      <StepSection
        title="Что будем ремонтировать?"
        description="Выберите тип проекта — следующие вопросы автоматически адаптируются и не будут содержать лишних пунктов."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ProjectChoiceCard
            icon={Bath}
            selected={state.projectType === 'bathroom'}
            title="Ванная комната"
            detail="Сантехника, гидроизоляция, плитка и мебель"
            onClick={() => onProjectChange('bathroom')}
          />
          <ProjectChoiceCard
            icon={UtensilsCrossed}
            selected={state.projectType === 'kitchen'}
            title="Кухня"
            detail="Инженерия, отделка, гарнитур и столешница"
            onClick={() => onProjectChange('kitchen')}
          />
          <ProjectChoiceCard
            icon={House}
            selected={state.projectType === 'integral'}
            title="Комплексный ремонт"
            detail="Полное обновление квартиры или дома"
            onClick={() => onProjectChange('integral')}
          />
        </div>
      </StepSection>
    )
  }

  if (step === 3) {
    const isBathroom = state.projectType === 'bathroom'
    const isKitchen = state.projectType === 'kitchen'

    return (
      <StepSection
        title={isBathroom ? 'Параметры ванной' : isKitchen ? 'Параметры кухни' : 'Параметры объекта'}
        description={isBathroom || isKitchen ? 'Нужны только размеры и текущее состояние помещения.' : 'Площадь и состав объекта определяют объём комплексного ремонта.'}
      >
        <AreaControl
          label={isBathroom ? 'Площадь ванной' : isKitchen ? 'Площадь кухни' : 'Общая площадь объекта'}
          min={isBathroom ? 2 : isKitchen ? 4 : 35}
          max={isBathroom ? 25 : isKitchen ? 40 : 350}
          step={isBathroom || isKitchen ? 0.5 : 1}
          value={state.area}
          onChange={(value) => update('area', value)}
        />
        {state.projectType === 'integral' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Counter label="Спальни" hint="Количество отдельных спален" value={state.bedrooms} min={1} max={8} onChange={(value) => update('bedrooms', value)} />
            <Counter label="Санузлы" hint="Ванные комнаты и гостевые санузлы" value={state.bathrooms} min={1} max={5} onChange={(value) => update('bathrooms', value)} />
          </div>
        )}
        <Question title="Текущее состояние">
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceCard
              selected={state.condition === 'lived-in'}
              title={isBathroom ? 'Ванная в эксплуатации' : isKitchen ? 'Кухня в эксплуатации' : 'Объект с отделкой'}
              detail="Есть старая отделка и оборудование"
              onClick={() => update('condition', 'lived-in')}
            />
            <ChoiceCard
              selected={state.condition === 'newbuild'}
              title="Новостройка"
              detail="Помещение без чистовой отделки"
              onClick={() => update('condition', 'newbuild')}
            />
          </div>
        </Question>
      </StepSection>
    )
  }

  if (step === 4) {
    if (state.projectType === 'kitchen') {
      return (
        <StepSection title="Строительные работы" description="Только демонтаж и изменения, которые относятся к кухонной зоне.">
          <BinaryChoice title="Демонтировать существующую отделку и оборудование?" value={state.demolition} onChange={(value) => update('demolition', value)} />
          <BinaryChoice title="Менять расположение кухонной зоны?" value={state.layoutChange} onChange={(value) => update('layoutChange', value)} />
          <BinaryChoice title="Объединять кухню с гостиной?" value={state.joinLivingRoom} onChange={(value) => update('joinLivingRoom', value)} />
        </StepSection>
      )
    }

    if (state.projectType === 'integral') {
      return (
        <StepSection title="Строительные работы" description="Определим масштаб демонтажа, перепланировки и обновления полов.">
          <BinaryChoice title="Нужен полный демонтаж существующей отделки?" value={state.demolition} onChange={(value) => update('demolition', value)} />
          <BinaryChoice title="Планируется перепланировка?" value={state.layoutChange} onChange={(value) => update('layoutChange', value)} />
          {state.layoutChange && <Counter label="Перегородки" hint="Сколько перегородок нужно перенести или демонтировать" value={state.partitions} min={1} max={8} onChange={(value) => update('partitions', value)} />}
          <BinaryChoice title="Полностью заменить напольные покрытия?" value={state.changeFloor} onChange={(value) => update('changeFloor', value)} />
        </StepSection>
      )
    }

    return (
      <StepSection title="Строительные работы" description="Определим объём демонтажа и изменения планировки ванной.">
        <BinaryChoice title="Демонтировать существующую отделку?" value={state.demolition} onChange={(value) => update('demolition', value)} />
        <BinaryChoice title="Менять расположение сантехники?" value={state.layoutChange} onChange={(value) => update('layoutChange', value)} />
        <Question title="Основная мокрая зона">
          <div className="grid gap-3 sm:grid-cols-3">
            <ChoiceCard selected={state.wetZone === 'shower'} title="Душевая" detail="Новый поддон или душ в уровень пола" onClick={() => update('wetZone', 'shower')} />
            <ChoiceCard selected={state.wetZone === 'bath'} title="Ванна" detail="Установка новой ванны" onClick={() => update('wetZone', 'bath')} />
            <ChoiceCard selected={state.wetZone === 'keep'} title="Оставить" detail="Сохранить текущую мокрую зону" onClick={() => update('wetZone', 'keep')} />
          </div>
        </Question>
        <BinaryChoice title="Выполнить новую гидроизоляцию?" value={state.waterproofing} onChange={(value) => update('waterproofing', value)} recommended />
      </StepSection>
    )
  }

  if (step === 5) {
    if (state.projectType === 'kitchen') {
      return (
        <StepSection title="Сантехника и электрика" description="Подключения и электрика, необходимые именно для новой кухни.">
          <div className="grid gap-4 sm:grid-cols-2">
            <BinaryChoice title="Перенести или заменить кухонные трубы?" value={state.replacePipes} onChange={(value) => update('replacePipes', value)} compact />
            <BinaryChoice title="Обновить электрику кухни?" value={state.replaceElectrics} onChange={(value) => update('replaceElectrics', value)} compact />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Counter label="Сантехнические подключения" hint="Мойка, посудомоечная машина, фильтр" value={state.sanitaryPoints} min={1} max={5} onChange={(value) => update('sanitaryPoints', value)} />
            <Counter label="Электрические точки" hint="Розетки, техника и освещение" value={state.lightingPoints} min={4} max={20} onChange={(value) => update('lightingPoints', value)} />
          </div>
        </StepSection>
      )
    }

    if (state.projectType === 'integral') {
      return (
        <StepSection title="Сантехника и электрика" description="Инженерные системы всего объекта без вопросов по отдельным помещениям.">
          <div className="grid gap-4 sm:grid-cols-2">
            <BinaryChoice title="Полностью заменить водопровод и канализацию?" value={state.replacePipes} onChange={(value) => update('replacePipes', value)} compact />
            <BinaryChoice title="Полностью заменить электрику?" value={state.replaceElectrics} onChange={(value) => update('replaceElectrics', value)} compact />
          </div>
        </StepSection>
      )
    }

    return (
      <StepSection title="Сантехника и электрика" description="Только инженерные работы, которые относятся к ванной комнате.">
        <div className="grid gap-4 sm:grid-cols-2">
          <BinaryChoice title="Заменить водопровод и канализацию?" value={state.replacePipes} onChange={(value) => update('replacePipes', value)} compact />
          <BinaryChoice title="Обновить электрику ванной?" value={state.replaceElectrics} onChange={(value) => update('replaceElectrics', value)} compact />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Counter label="Сантехнические точки" hint="Раковина, унитаз, душ или ванна" value={state.sanitaryPoints} min={2} max={7} onChange={(value) => update('sanitaryPoints', value)} />
          <Counter label="Точки света и розетки" hint="Светильники, зеркало, розетки" value={state.lightingPoints} min={1} max={10} onChange={(value) => update('lightingPoints', value)} />
        </div>
      </StepSection>
    )
  }

  if (step === 6) {
    if (state.projectType === 'kitchen') {
      return (
        <StepSection title="Климат кухни" description="Вентиляция и отопление только в кухонной зоне.">
          <BinaryChoice title="Установить новую вытяжку и вентиляционный канал?" value={state.ventilation} onChange={(value) => update('ventilation', value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <BinaryChoice title="Тёплый пол на кухне?" value={state.floorHeating} onChange={(value) => update('floorHeating', value)} compact />
            <BinaryChoice title="Перенести или заменить радиатор?" value={state.replaceRadiators} onChange={(value) => update('replaceRadiators', value)} compact />
          </div>
        </StepSection>
      )
    }

    if (state.projectType === 'integral') {
      return (
        <StepSection title="Климат объекта" description="Выберите систему охлаждения и объём обновления отопления.">
          <Question title="Кондиционирование">
            <div className="grid gap-3 sm:grid-cols-3">
              <ChoiceCard selected={state.climateSystem === 'keep'} title="Сохранить" detail="Без новой системы" onClick={() => update('climateSystem', 'keep')} />
              <ChoiceCard selected={state.climateSystem === 'split'} title="Сплит-системы" detail="Отдельные блоки в основных комнатах" onClick={() => update('climateSystem', 'split')} />
              <ChoiceCard selected={state.climateSystem === 'ducted'} title="Канальная система" detail="Скрытая разводка по всему объекту" onClick={() => update('climateSystem', 'ducted')} />
            </div>
          </Question>
          <div className="grid gap-4 sm:grid-cols-2">
            <BinaryChoice title="Тёплый пол во всём объекте?" value={state.floorHeating} onChange={(value) => update('floorHeating', value)} compact />
            <BinaryChoice title="Заменить радиаторы?" value={state.replaceRadiators} onChange={(value) => update('replaceRadiators', value)} compact />
          </div>
        </StepSection>
      )
    }

    return (
      <StepSection title="Климат ванной" description="Отопление, комфорт пола и правильный воздухообмен.">
        <Question title="Полотенцесушитель">
          <div className="grid gap-3 sm:grid-cols-3">
            <ChoiceCard selected={state.towelRail === 'none'} title="Не нужен" detail="Без установки" onClick={() => update('towelRail', 'none')} />
            <ChoiceCard selected={state.towelRail === 'electric'} title="Электрический" detail="Независимое управление" onClick={() => update('towelRail', 'electric')} />
            <ChoiceCard selected={state.towelRail === 'water'} title="Водяной" detail="Подключение к системе" onClick={() => update('towelRail', 'water')} />
          </div>
        </Question>
        <div className="grid gap-4 sm:grid-cols-2">
          <BinaryChoice title="Тёплый пол?" value={state.floorHeating} onChange={(value) => update('floorHeating', value)} compact />
          <BinaryChoice title="Новая вытяжная вентиляция?" value={state.ventilation} onChange={(value) => update('ventilation', value)} compact />
        </div>
      </StepSection>
    )
  }

  if (step === 7) {
    if (state.projectType === 'kitchen') {
      return (
        <StepSection title="Отделка кухни" description="Покрытия, которые непосредственно входят в ремонт кухонной зоны.">
          <Question title="Кухонный фартук">
            <div className="grid gap-3 sm:grid-cols-3">
              <ChoiceCard selected={state.kitchenSplashback === 'tile'} title="Плитка" detail="Практичное классическое решение" onClick={() => update('kitchenSplashback', 'tile')} />
              <ChoiceCard selected={state.kitchenSplashback === 'quartz'} title="Кварц" detail="Единая поверхность со столешницей" onClick={() => update('kitchenSplashback', 'quartz')} />
              <ChoiceCard selected={state.kitchenSplashback === 'glass'} title="Стекло" detail="Закалённая панель без швов" onClick={() => update('kitchenSplashback', 'glass')} />
            </div>
          </Question>
          <Question title="Напольное покрытие">
            <div className="grid gap-3 sm:grid-cols-3">
              <ChoiceCard selected={state.floorFinish === 'tile'} title="Плитка" detail="Керамогранит или керамика" onClick={() => update('floorFinish', 'tile')} />
              <ChoiceCard selected={state.floorFinish === 'wood'} title="Дерево" detail="Паркет или инженерная доска" onClick={() => update('floorFinish', 'wood')} />
              <ChoiceCard selected={state.floorFinish === 'microcement'} title="Микроцемент" detail="Бесшовное покрытие" onClick={() => update('floorFinish', 'microcement')} />
            </div>
          </Question>
          <BinaryChoice title="Выравнивать и окрашивать потолок?" value={state.ceilingRepair} onChange={(value) => update('ceilingRepair', value)} />
        </StepSection>
      )
    }

    if (state.projectType === 'integral') {
      return (
        <StepSection title="Отделка объекта" description="Подготовка стен и решение для потолков фиксируются в плане проекта.">
          <BinaryChoice title="Выравнивать стены под покраску?" value={state.smoothWalls} onChange={(value) => update('smoothWalls', value)} />
          <Question title="Потолки">
            <div className="grid gap-3 sm:grid-cols-3">
              <ChoiceCard selected={state.ceilingType === 'paint'} title="Под покраску" detail="Выравнивание и окрашивание" onClick={() => update('ceilingType', 'paint')} />
              <ChoiceCard selected={state.ceilingType === 'plasterboard'} title="Гипсокартон" detail="Ниши и встроенное освещение" onClick={() => update('ceilingType', 'plasterboard')} />
              <ChoiceCard selected={state.ceilingType === 'stretch'} title="Натяжной" detail="Быстрый монтаж полотна" onClick={() => update('ceilingType', 'stretch')} />
            </div>
          </Question>
        </StepSection>
      )
    }

    return (
      <StepSection title="Отделка и покраска" description="Выберите решение для стен и состояние потолка.">
        <Question title="Отделка стен">
          <div className="grid gap-3 sm:grid-cols-3">
            <ChoiceCard selected={state.wallFinish === 'tile-full'} title="Плитка полностью" detail="От пола до потолка" onClick={() => update('wallFinish', 'tile-full')} />
            <ChoiceCard selected={state.wallFinish === 'tile-zones'} title="Плитка в мокрых зонах" detail="Остальные стены под покраску" onClick={() => update('wallFinish', 'tile-zones')} />
            <ChoiceCard selected={state.wallFinish === 'microcement'} title="Микроцемент" detail="Бесшовная премиальная отделка" onClick={() => update('wallFinish', 'microcement')} />
          </div>
        </Question>
        <BinaryChoice title="Выравнивать и окрашивать потолок?" value={state.ceilingRepair} onChange={(value) => update('ceilingRepair', value)} />
      </StepSection>
    )
  }

  if (step === 8) {
    if (state.projectType === 'kitchen') {
      return (
        <StepSection title="Мебель и столярные изделия" description="Только кухонный гарнитур, столешница и дверь.">
          <Question title="Кухонный гарнитур">
            <div className="grid gap-3 sm:grid-cols-3">
              <ChoiceCard selected={state.kitchenCabinets === 'keep'} title="Сохранить" detail="Оставить существующую мебель" onClick={() => update('kitchenCabinets', 'keep')} />
              <ChoiceCard selected={state.kitchenCabinets === 'modular'} title="Модульный" detail="Готовые секции стандартных размеров" onClick={() => update('kitchenCabinets', 'modular')} />
              <ChoiceCard selected={state.kitchenCabinets === 'custom'} title="На заказ" detail="Индивидуальная конфигурация" onClick={() => update('kitchenCabinets', 'custom')} />
            </div>
          </Question>
          <Question title="Столешница">
            <div className="grid gap-3 sm:grid-cols-3">
              <ChoiceCard selected={state.countertop === 'laminate'} title="Ламинат" detail="Практичный базовый вариант" onClick={() => update('countertop', 'laminate')} />
              <ChoiceCard selected={state.countertop === 'quartz'} title="Кварц" detail="Прочная композитная поверхность" onClick={() => update('countertop', 'quartz')} />
              <ChoiceCard selected={state.countertop === 'stone'} title="Натуральный камень" detail="Премиальная фактура" onClick={() => update('countertop', 'stone')} />
            </div>
          </Question>
          <Question title="Дверь кухни">
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceCard selected={state.door === 'keep'} title="Сохранить" detail="Без замены двери" onClick={() => update('door', 'keep')} />
              <ChoiceCard selected={state.door === 'replace'} title="Заменить" detail="Новая дверь и монтаж" onClick={() => update('door', 'replace')} />
            </div>
          </Question>
        </StepSection>
      )
    }

    if (state.projectType === 'integral') {
      return (
        <StepSection title="Столярные изделия" description="Двери, окна и встроенное хранение для всего объекта.">
          <BinaryChoice title="Заменить межкомнатные двери?" value={state.door === 'replace'} onChange={(value) => update('door', value ? 'replace' : 'keep')} />
          {state.door === 'replace' && <Counter label="Межкомнатные двери" hint="Количество новых дверных блоков" value={state.doorsCount} min={1} max={15} onChange={(value) => update('doorsCount', value)} />}
          <BinaryChoice title="Заменить окна?" value={state.replaceWindows} onChange={(value) => update('replaceWindows', value)} />
          {state.replaceWindows && <Counter label="Окна" hint="Количество оконных блоков" value={state.windowsCount} min={1} max={15} onChange={(value) => update('windowsCount', value)} />}
          <BinaryChoice title="Нужно встроенное хранение на заказ?" value={state.builtInStorage} onChange={(value) => update('builtInStorage', value)} />
        </StepSection>
      )
    }

    return (
      <StepSection title="Столярные изделия" description="Последние позиции, относящиеся непосредственно к ванной.">
        <Question title="Дверь ванной">
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceCard selected={state.door === 'keep'} title="Сохранить" detail="Оставить существующую дверь" onClick={() => update('door', 'keep')} />
            <ChoiceCard selected={state.door === 'replace'} title="Заменить" detail="Новая дверь и монтаж" onClick={() => update('door', 'replace')} />
          </div>
        </Question>
        <Question title="Тумба под раковину">
          <div className="grid gap-3 sm:grid-cols-3">
            <ChoiceCard selected={state.vanity === 'none'} title="Не нужна" detail="Без мебели" onClick={() => update('vanity', 'none')} />
            <ChoiceCard selected={state.vanity === 'standard'} title="Готовая" detail="Серийная тумба" onClick={() => update('vanity', 'standard')} />
            <ChoiceCard selected={state.vanity === 'custom'} title="На заказ" detail="По индивидуальным размерам" onClick={() => update('vanity', 'custom')} />
          </div>
        </Question>
        <BinaryChoice title="Нужна встроенная ниша для хранения?" value={state.niche} onChange={(value) => update('niche', value)} />
      </StepSection>
    )
  }

  return <ResultStep {...props} />
}

function StepSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  return (
    <div>
      <h3 className="font-display text-xl font-bold md:text-2xl">{tx(title)}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{tx(description)}</p>
      <div className="mt-7 space-y-6">{children}</div>
    </div>
  )
}

function Question({ title, children }: { title: string; children: ReactNode }) {
  const { locale } = useI18n()
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-foreground">{calcText(title, locale)}</legend>
      {children}
    </fieldset>
  )
}

function TierChoiceCard({
  tier,
  selected,
  onClick,
}: {
  tier: (typeof RENOVATION_TIERS)[number]
  selected: boolean
  onClick: () => void
}) {
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  const price = tier.rateLow === tier.rateHigh
    ? formatCurrency(tier.rateLow, locale)
    : `${formatCurrency(tier.rateLow, locale)}–${formatCurrency(tier.rateHigh, locale)}`

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'relative min-h-64 overflow-hidden rounded-3xl border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected
          ? 'border-primary bg-primary/10 glow-border'
          : 'border-border bg-background/30 hover:-translate-y-1 hover:border-primary/45 hover:bg-secondary/35',
      )}
    >
      <span className={cn('absolute inset-x-0 top-0 h-1', tier.accent)} aria-hidden="true" />
      <span className="flex items-center justify-between gap-4">
        <span className={cn('h-3 w-3 rounded-full ring-4 ring-background', tier.accent)} aria-hidden="true" />
        <span className={cn('flex h-7 w-7 items-center justify-center rounded-full border', selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>
          {selected && <Check className="h-4 w-4" />}
        </span>
      </span>
      <span className="mt-8 block font-display text-2xl font-bold text-foreground">{tx(tier.label)}</span>
      <span className="mt-2 block min-h-10 text-xs leading-relaxed text-muted-foreground">{tx(tier.tagline)}</span>
      <span className="mt-7 block font-display text-2xl font-bold text-primary">{price}</span>
      <span className="mt-1 block text-xs font-medium text-muted-foreground">{tx('за м²')}</span>
      <span className="mt-4 block border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
        {tx('работы и IVA включены · материалы отдельно')}
      </span>
    </button>
  )
}

function ProjectChoiceCard({
  icon: Icon,
  selected,
  title,
  detail,
  onClick,
}: {
  icon: ComponentType<{ className?: string }>
  selected: boolean
  title: string
  detail: string
  onClick: () => void
}) {
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'relative min-h-60 rounded-3xl border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected
          ? 'border-primary bg-primary/10 glow-border'
          : 'border-border bg-background/30 hover:-translate-y-1 hover:border-primary/45 hover:bg-secondary/35',
      )}
    >
      <span className="flex items-start justify-between gap-4">
        <span className={cn('flex h-14 w-14 items-center justify-center rounded-2xl border', selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-secondary/40 text-muted-foreground')}>
          <Icon className="h-7 w-7" />
        </span>
        <span className={cn('flex h-7 w-7 items-center justify-center rounded-full border', selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>
          {selected && <Check className="h-4 w-4" />}
        </span>
      </span>
      <span className="mt-10 block font-display text-xl font-bold text-foreground">{tx(title)}</span>
      <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">{tx(detail)}</span>
    </button>
  )
}

function AreaControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}) {
  const { locale } = useI18n()
  const translatedLabel = calcText(label, locale)
  const setClampedValue = (nextValue: number) => {
    if (Number.isNaN(nextValue)) return
    onChange(Math.min(max, Math.max(min, nextValue)))
  }

  return (
    <div className="rounded-3xl border border-border bg-background/35 p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{translatedLabel}</p>
          <p className="mt-1 text-xs text-muted-foreground">{locale === 'ru' ? `От ${min} до ${max} м²` : locale === 'es' ? `De ${min} a ${max} m²` : locale === 'fr' ? `De ${min} à ${max} m²` : `${min} to ${max} m²`}</p>
        </div>
        <label className="flex items-baseline gap-2">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => setClampedValue(Number(event.target.value))}
            className="w-24 border-0 bg-transparent p-0 text-right font-display text-3xl font-bold text-primary outline-none"
            aria-label={translatedLabel}
          />
          <span className="text-sm text-muted-foreground">м²</span>
        </label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-6 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        aria-label={translatedLabel}
      />
    </div>
  )
}

function ChoiceCard({
  selected,
  title,
  detail,
  onClick,
}: {
  selected: boolean
  title: string
  detail: string
  onClick: () => void
}) {
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'relative min-h-28 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected
          ? 'border-primary bg-primary/10 shadow-[inset_0_0_22px_-18px] shadow-primary'
          : 'border-border bg-secondary/20 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-secondary/40',
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="font-display text-base font-bold text-foreground">{tx(title)}</span>
        <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-full border', selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>
          {selected && <Check className="h-3 w-3" />}
        </span>
      </span>
      <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">{tx(detail)}</span>
    </button>
  )
}

function BinaryChoice({
  title,
  value,
  onChange,
  recommended = false,
  compact = false,
}: {
  title: string
  value: boolean
  onChange: (value: boolean) => void
  recommended?: boolean
  compact?: boolean
}) {
  const { locale } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  return (
    <div
      role="group"
      aria-label={tx(title)}
      className={cn('rounded-2xl border border-border bg-background/30 p-4', !compact && 'sm:p-5')}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="pr-3 text-sm font-semibold">
          {tx(title)}
          {recommended && <span className="ml-2 text-[10px] uppercase tracking-wide text-primary">{tx('рекомендуем')}</span>}
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          {[true, false].map((option) => (
            <button
              key={String(option)}
              type="button"
              aria-pressed={value === option}
              onClick={() => onChange(option)}
              className={cn(
                'min-w-20 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors',
                value === option
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground',
              )}
            >
              {tx(option ? 'Да' : 'Нет')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Counter({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  hint: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  const { locale } = useI18n()
  const translatedLabel = calcText(label, locale)
  return (
    <div className="rounded-2xl border border-border bg-background/30 p-5">
      <p className="text-sm font-semibold">{translatedLabel}</p>
      <p className="mt-1 min-h-8 text-xs leading-relaxed text-muted-foreground">{calcText(hint, locale)}</p>
      <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-1.5">
        <button type="button" aria-label={translatedLabel} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="h-9 w-9 rounded-lg text-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30">−</button>
        <span className="font-display text-xl font-bold text-primary">{value}</span>
        <button type="button" aria-label={translatedLabel} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className="h-9 w-9 rounded-lg text-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30">+</button>
      </div>
    </div>
  )
}

function formatArea(value: number, locale: Locale) {
  return `${new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : 'en-GB', {
    maximumFractionDigits: 1,
  }).format(value)} м²`
}

function formatEstimateRange(estimate: RenovationEstimate, locale: Locale) {
  return estimate.low === estimate.high
    ? formatCurrency(estimate.low, locale)
    : `${formatCurrency(estimate.low, locale)}–${formatCurrency(estimate.high, locale)}`
}

function getProjectPlanLines(state: CalculatorState, tx: (value: string) => string) {
  const yesNo = (value: boolean) => tx(value ? 'Да' : 'Нет')
  const line = (label: string, value: string | number) => `${tx(label)}: ${typeof value === 'string' ? tx(value) : value}`
  const lines: string[] = [
    line('Текущее состояние', state.condition === 'newbuild' ? 'Новостройка' : 'Объект с отделкой'),
  ]

  if (state.projectType === 'bathroom') {
    lines.push(
      line('Демонтировать существующую отделку?', yesNo(state.demolition)),
      line('Менять расположение сантехники?', yesNo(state.layoutChange)),
      line('Основная мокрая зона', state.wetZone === 'shower' ? 'Душевая' : state.wetZone === 'bath' ? 'Ванна' : 'Оставить'),
      line('Выполнить новую гидроизоляцию?', yesNo(state.waterproofing)),
      line('Заменить водопровод и канализацию?', yesNo(state.replacePipes)),
      line('Обновить электрику ванной?', yesNo(state.replaceElectrics)),
      line('Сантехнические точки', state.sanitaryPoints),
      line('Точки света и розетки', state.lightingPoints),
      line('Полотенцесушитель', state.towelRail === 'none' ? 'Не нужен' : state.towelRail === 'electric' ? 'Электрический' : 'Водяной'),
      line('Тёплый пол?', yesNo(state.floorHeating)),
      line('Новая вытяжная вентиляция?', yesNo(state.ventilation)),
      line('Отделка стен', state.wallFinish === 'tile-full' ? 'Плитка полностью' : state.wallFinish === 'tile-zones' ? 'Плитка в мокрых зонах' : 'Микроцемент'),
      line('Выравнивать и окрашивать потолок?', yesNo(state.ceilingRepair)),
      line('Дверь ванной', state.door === 'replace' ? 'Заменить' : 'Сохранить'),
      line('Тумба под раковину', state.vanity === 'none' ? 'Не нужна' : state.vanity === 'standard' ? 'Готовая' : 'На заказ'),
      line('Нужна встроенная ниша для хранения?', yesNo(state.niche)),
    )
  }

  if (state.projectType === 'kitchen') {
    lines.push(
      line('Демонтировать существующую отделку и оборудование?', yesNo(state.demolition)),
      line('Менять расположение кухонной зоны?', yesNo(state.layoutChange)),
      line('Объединять кухню с гостиной?', yesNo(state.joinLivingRoom)),
      line('Перенести или заменить кухонные трубы?', yesNo(state.replacePipes)),
      line('Обновить электрику кухни?', yesNo(state.replaceElectrics)),
      line('Сантехнические подключения', state.sanitaryPoints),
      line('Электрические точки', state.lightingPoints),
      line('Установить новую вытяжку и вентиляционный канал?', yesNo(state.ventilation)),
      line('Тёплый пол на кухне?', yesNo(state.floorHeating)),
      line('Перенести или заменить радиатор?', yesNo(state.replaceRadiators)),
      line('Кухонный фартук', state.kitchenSplashback === 'tile' ? 'Плитка' : state.kitchenSplashback === 'quartz' ? 'Кварц' : 'Стекло'),
      line('Напольное покрытие', state.floorFinish === 'tile' ? 'Плитка' : state.floorFinish === 'wood' ? 'Дерево' : 'Микроцемент'),
      line('Выравнивать и окрашивать потолок?', yesNo(state.ceilingRepair)),
      line('Кухонный гарнитур', state.kitchenCabinets === 'keep' ? 'Сохранить' : state.kitchenCabinets === 'modular' ? 'Модульный' : 'На заказ'),
      line('Столешница', state.countertop === 'laminate' ? 'Ламинат' : state.countertop === 'quartz' ? 'Кварц' : 'Натуральный камень'),
      line('Дверь кухни', state.door === 'replace' ? 'Заменить' : 'Сохранить'),
    )
  }

  if (state.projectType === 'integral') {
    lines.push(
      line('Спальни', state.bedrooms),
      line('Санузлы', state.bathrooms),
      line('Нужен полный демонтаж существующей отделки?', yesNo(state.demolition)),
      line('Планируется перепланировка?', yesNo(state.layoutChange)),
      ...(state.layoutChange ? [line('Перегородки', state.partitions)] : []),
      line('Полностью заменить напольные покрытия?', yesNo(state.changeFloor)),
      line('Полностью заменить водопровод и канализацию?', yesNo(state.replacePipes)),
      line('Полностью заменить электрику?', yesNo(state.replaceElectrics)),
      line('Кондиционирование', state.climateSystem === 'keep' ? 'Без новой системы' : state.climateSystem === 'split' ? 'Сплит-системы' : 'Канальная система'),
      line('Тёплый пол во всём объекте?', yesNo(state.floorHeating)),
      line('Заменить радиаторы?', yesNo(state.replaceRadiators)),
      line('Выравнивать стены под покраску?', yesNo(state.smoothWalls)),
      line('Потолки', state.ceilingType === 'paint' ? 'Под покраску' : state.ceilingType === 'plasterboard' ? 'Гипсокартон' : 'Натяжной'),
      line('Заменить межкомнатные двери?', yesNo(state.door === 'replace')),
      ...(state.door === 'replace' ? [line('Межкомнатные двери', state.doorsCount)] : []),
      line('Заменить окна?', yesNo(state.replaceWindows)),
      ...(state.replaceWindows ? [line('Окна', state.windowsCount)] : []),
      line('Нужно встроенное хранение на заказ?', yesNo(state.builtInStorage)),
    )
  }

  return lines
}

function ResultStep({ state, estimate, calculating, submitted, onSubmit, onReset }: StepContentProps) {
  const { locale, t } = useI18n()
  const tx = (value: string) => calcText(value, locale)
  const tier = getRenovationTier(state.renovationTier ?? 'economy')
  const estimateRange = formatEstimateRange(estimate, locale)
  const tierRate = tier.rateLow === tier.rateHigh
    ? formatCurrency(tier.rateLow, locale)
    : `${formatCurrency(tier.rateLow, locale)}–${formatCurrency(tier.rateHigh, locale)}`

  if (calculating) {
    return (
      <div className="flex min-h-[30rem] flex-col items-center justify-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-primary/35" />
          <span className="absolute inset-3 animate-spin rounded-full border-2 border-border border-t-primary" />
          <LoaderCircle className="h-8 w-8 animate-pulse text-primary" />
        </div>
        <h3 className="mt-8 font-display text-2xl font-bold">{tx('Собираем предварительную смету')}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tx('Рассчитываем базовую стоимость работ…')}</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="flex min-h-[31rem] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_32px_-6px] shadow-primary">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-3xl font-bold">{tx('WhatsApp готов')}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {tx('Проверьте подготовленное сообщение в WhatsApp и нажмите «Отправить», чтобы передать параметры проекта.')}
        </p>
        <button type="button" onClick={onReset} className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-primary/10">
          <RotateCcw className="h-4 w-4" /> {tx('Новый расчёт')}
        </button>
      </div>
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const dayWord = locale === 'ru' ? 'дней' : locale === 'es' ? 'días' : locale === 'fr' ? 'jours' : 'days'
    const projectLines = getProjectPlanLines(state, tx)
    const message = [
      tx('Вот мой план ремонта. Хотел бы обсудить детали и точную смету.'),
      '',
      `${tx('Уровень ремонта')}: ${tx(tier.label)} (${tierRate} ${tx('за м²')})`,
      `${tx('Проект')}: ${tx(PROJECT_LABELS[state.projectType])}`,
      `${tx('Фактическая площадь')}: ${formatArea(estimate.actualArea, locale)}`,
      ...(estimate.minimumApplied ? [`${tx('Расчётная площадь')}: ${formatArea(estimate.billableArea, locale)} (${tx('Минимальный оплачиваемый объём')})`] : []),
      `${tx('Ориентировочная стоимость работ')}: ${estimateRange} (${tx('IVA включён')})`,
      `${estimate.days}–${estimate.days + 5} ${dayWord}`,
      '',
      `${tx('Параметры проекта')}:`,
      ...projectLines.map((line) => `• ${line}`),
      '',
      tx('Дополнительные решения обсудим после замера. Материалы и оборудование в сумму не входят.'),
      '',
      `${tx('Имя')}: ${name}`,
      `${tx('Телефон')}: ${phone}`,
      `Email: ${email}`,
    ].join('\n')
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
    onSubmit()
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="overflow-hidden rounded-3xl border border-primary/35 bg-primary/8 p-6 glow-border sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/50 px-3 py-1.5 text-xs text-primary">
            <ShieldCheck className="h-4 w-4" /> {tx(tier.label)} · {tx(PROJECT_LABELS[state.projectType])}
          </span>
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Clock3 className="h-4 w-4 text-primary" /> ≈ {estimate.days}–{estimate.days + 5} {locale === 'ru' ? 'дней' : locale === 'es' ? 'días' : locale === 'fr' ? 'jours' : 'days'}
          </span>
        </div>

        <p className="mt-7 text-sm text-muted-foreground">{tx('Базовая стоимость работ')}</p>
        <p className="mt-2 whitespace-nowrap font-display text-[clamp(1.75rem,3vw,3.25rem)] font-bold leading-none text-primary text-glow">
          {estimateRange}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{tx('IVA включён')} · {tx('Материалы отдельно')}</p>

        <dl className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-background/45 p-4">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{tx('Цена тарифа')}</dt>
            <dd className="mt-1 font-mono text-sm font-semibold">{tierRate} {tx('за м²')}</dd>
          </div>
          <div className="rounded-2xl bg-background/45 p-4">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{tx('Фактическая площадь')}</dt>
            <dd className="mt-1 font-mono text-sm font-semibold">{formatArea(estimate.actualArea, locale)}</dd>
          </div>
          {estimate.minimumApplied && (
            <div className="rounded-2xl border border-amber/30 bg-amber/10 p-4 sm:col-span-2">
              <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{tx('Расчётная площадь')}</dt>
              <dd className="mt-1 font-mono text-sm font-semibold">{formatArea(estimate.billableArea, locale)} · {tx('Минимальный оплачиваемый объём')}</dd>
            </div>
          )}
        </dl>

        <div className="mt-4 rounded-2xl border border-border bg-background/35 p-4">
          <p className="text-xs font-semibold text-foreground">{tx('Дополнительные решения')}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tx('Уточняются после замера и не увеличивают онлайн-расчёт.')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col rounded-3xl border border-border bg-background/35 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{tx('Следующий шаг')}</p>
        <h3 className="mt-3 font-display text-2xl font-bold">{tx('Обсудить план и точную смету')}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {tx('Все выбранные параметры будут подготовлены в сообщении WhatsApp. Вы проверите его перед отправкой.')}
        </p>
        <div className="mt-6 space-y-4">
          <FormField label="Имя">
            <input required name="name" placeholder={tx('Как к вам обращаться')} className="calculator-input" />
          </FormField>
          <FormField label="Телефон">
            <input required name="phone" type="tel" placeholder="+34 ___ ___ ___" className="calculator-input" />
          </FormField>
          <FormField label="Email">
            <input required name="email" type="email" placeholder="you@example.com" className="calculator-input" />
          </FormField>
        </div>
        <button type="submit" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_34px_-7px] hover:shadow-primary">
          {tx('Отправить план в WhatsApp')} <Send className="h-4 w-4" />
        </button>
        <button type="button" onClick={onReset} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          <RotateCcw className="h-3.5 w-3.5" /> {tx('Начать заново')}
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
          {t('contact.privacy.prefix')} <a href="/privacy" className="underline decoration-primary/40 underline-offset-2 hover:text-foreground">{t('contact.privacy.link')}</a>.
        </p>
      </form>
    </div>
  )
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  const { locale } = useI18n()
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{calcText(label, locale)}</span>
      {children}
    </label>
  )
}
