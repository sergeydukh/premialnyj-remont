import { FileText, ClipboardCheck, Wallet, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const POINTS = [
  {
    icon: Wallet,
    title: 'Смета без сюрпризов',
    text: 'Фиксированная цена в договоре. Любое изменение — только по вашему письменному согласию.',
  },
  {
    icon: ClipboardCheck,
    title: 'Отчёты по этапам',
    text: 'Прораб фиксирует выполненные работы и присылает регулярный фотоотчёт. Видно каждый этап.',
  },
  {
    icon: FileText,
    title: 'Прозрачные документы',
    text: 'Один договор, официальные закрывающие акты, чеки на все материалы.',
  },
  {
    icon: ShieldCheck,
    title: 'Ответственность',
    text: 'Сроки фиксируются в договоре, а на выполненные работы действует гарантия 5 лет.',
  },
]

export function Transparency() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card/40">
      <div className="absolute inset-0 grid-noise opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / 05 — Прозрачность
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-balance">
            Вы всегда знаете, за что платите
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 80}
              className="group flex flex-col bg-card p-8 transition-colors hover:bg-accent"
            >
              <point.icon className="mb-6 h-9 w-9 text-primary" />
              <h3 className="font-display text-xl font-bold">{point.title}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {point.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
