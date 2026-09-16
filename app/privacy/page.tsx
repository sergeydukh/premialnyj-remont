'use client'

import { ArrowLeft, ExternalLink, Phone } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { useI18n, type Locale } from '@/lib/i18n'

type Policy = {
  title: string
  updated: string
  intro: string
  sections: Array<{ title: string; paragraphs: string[] }>
  back: string
}

const POLICIES: Record<Locale, Policy> = {
  ru: {
    title: 'Политика конфиденциальности', updated: 'Обновлено: 16 сентября 2026 г.', back: 'На главную',
    intro: 'Эта политика объясняет, как ФОРМА обрабатывает данные посетителей сайта и потенциальных клиентов в соответствии с RGPD и LOPDGDD.',
    sections: [
      { title: '1. Кто отвечает за данные', paragraphs: ['Ответственный: ФОРМА (коммерческое наименование), Валенсия, Испания. Телефон и WhatsApp: +34 611 884 411. Полные фискальные реквизиты указываются в договоре и счетах.'] },
      { title: '2. Какие данные мы обрабатываем', paragraphs: ['Имя, телефон, email, содержание запроса, параметры проекта и технические данные, необходимые для работы и безопасности сайта.'] },
      { title: '3. Цели и правовые основания', paragraphs: ['Ответ на запрос, подготовка предварительного расчёта, организация осмотра и преддоговорное общение. Основание — меры по запросу потенциального клиента до заключения договора и законный интерес в защите сайта. Рекламные рассылки без отдельного согласия не проводятся.'] },
      { title: '4. WhatsApp и получатели', paragraphs: ['Сайт формирует текст сообщения, но не отправляет его автоматически. После нажатия кнопки откроется WhatsApp, где вы сами проверяете и отправляете данные. К такой обработке также применяются условия и политика Meta/WhatsApp. Данные могут быть доступны техническим поставщикам хостинга и сайта только в необходимом объёме.'] },
      { title: '5. Аналитика и локальное хранилище', paragraphs: ['Для агрегированной статистики посещений используется Vercel Web Analytics. По документации Vercel этот сервис не применяет сторонние cookies, не хранит IP-адрес и не связывает посещения с конкретным человеком. Выбранный язык сохраняется только в локальном хранилище вашего браузера.'] },
      { title: '6. Срок хранения', paragraphs: ['Данные по запросу хранятся не дольше 12 месяцев, если договор не был заключён. При заключении договора данные хранятся в течение сроков, установленных налоговым, бухгалтерским и иным применимым законодательством.'] },
      { title: '7. Ваши права', paragraphs: ['Вы можете запросить доступ, исправление, удаление, ограничение обработки, переносимость или возразить против обработки, связавшись по номеру +34 611 884 411. Также вы вправе обратиться в Agencia Española de Protección de Datos: www.aepd.es.'] },
    ],
  },
  es: {
    title: 'Política de privacidad', updated: 'Actualizada: 16 de septiembre de 2026', back: 'Volver al inicio',
    intro: 'Esta política explica cómo FORMA trata los datos de visitantes y potenciales clientes conforme al RGPD y la LOPDGDD.',
    sections: [
      { title: '1. Responsable del tratamiento', paragraphs: ['Responsable: FORMA (nombre comercial), Valencia, España. Teléfono y WhatsApp: +34 611 884 411. Los datos fiscales completos constan en contratos y facturas.'] },
      { title: '2. Datos tratados', paragraphs: ['Nombre, teléfono, correo electrónico, contenido de la consulta, datos del proyecto y datos técnicos necesarios para el funcionamiento y la seguridad del sitio.'] },
      { title: '3. Finalidad y base jurídica', paragraphs: ['Responder consultas, preparar estimaciones, organizar visitas y realizar actuaciones precontractuales. La base jurídica es la aplicación de medidas precontractuales solicitadas por la persona interesada y el interés legítimo en proteger el sitio. No enviamos publicidad sin consentimiento separado.'] },
      { title: '4. WhatsApp y destinatarios', paragraphs: ['El sitio prepara el texto, pero no lo envía automáticamente. WhatsApp se abre para que revises y envíes el mensaje. También se aplican las condiciones de Meta/WhatsApp. Los proveedores técnicos de alojamiento y del sitio podrán acceder solo a los datos necesarios.'] },
      { title: '5. Analítica y almacenamiento local', paragraphs: ['Utilizamos Vercel Web Analytics para estadísticas agregadas. Según la documentación de Vercel, el servicio no usa cookies de terceros, no guarda la dirección IP ni vincula las visitas con una persona concreta. El idioma elegido se guarda únicamente en el almacenamiento local del navegador.'] },
      { title: '6. Conservación', paragraphs: ['Las consultas se conservan hasta 12 meses si no se formaliza un contrato. Si existe relación contractual, los datos se conservan durante los plazos fiscales, contables y legales aplicables.'] },
      { title: '7. Derechos', paragraphs: ['Puedes solicitar acceso, rectificación, supresión, limitación, portabilidad u oposición en el +34 611 884 411. También puedes reclamar ante la Agencia Española de Protección de Datos: www.aepd.es.'] },
    ],
  },
  en: {
    title: 'Privacy policy', updated: 'Updated: 16 September 2026', back: 'Back to home',
    intro: 'This policy explains how FORMA processes visitor and prospective customer data under the GDPR and Spanish LOPDGDD.',
    sections: [
      { title: '1. Data controller', paragraphs: ['Controller: FORMA (trading name), Valencia, Spain. Phone and WhatsApp: +34 611 884 411. Full tax details are included in contracts and invoices.'] },
      { title: '2. Data we process', paragraphs: ['Name, phone, email, enquiry content, project details and technical data required for website operation and security.'] },
      { title: '3. Purpose and lawful basis', paragraphs: ['We answer enquiries, prepare estimates, arrange visits and take pre-contractual steps. The lawful basis is action requested before entering a contract and legitimate interest in site security. We do not send marketing without separate consent.'] },
      { title: '4. WhatsApp and recipients', paragraphs: ['The site prepares a message but does not send it automatically. WhatsApp opens so you can review and send it yourself. Meta/WhatsApp terms also apply. Hosting and website providers may access only the data required to provide their services.'] },
      { title: '5. Analytics and local storage', paragraphs: ['We use Vercel Web Analytics for aggregated traffic statistics. According to Vercel documentation, it uses no third-party cookies, stores no IP address and does not associate visits with an identifiable individual. Your language preference is stored only in your browser’s local storage.'] },
      { title: '6. Retention', paragraphs: ['Enquiries are kept for up to 12 months when no contract follows. Contractual data is retained for the applicable tax, accounting and legal periods.'] },
      { title: '7. Your rights', paragraphs: ['You may request access, correction, deletion, restriction, portability or object by contacting +34 611 884 411. You may also complain to the Spanish Data Protection Agency at www.aepd.es.'] },
    ],
  },
  fr: {
    title: 'Politique de confidentialité', updated: 'Mise à jour : 16 septembre 2026', back: 'Retour à l’accueil',
    intro: 'Cette politique explique comment FORMA traite les données des visiteurs et prospects conformément au RGPD et à la LOPDGDD espagnole.',
    sections: [
      { title: '1. Responsable du traitement', paragraphs: ['Responsable : FORMA (nom commercial), Valence, Espagne. Téléphone et WhatsApp : +34 611 884 411. Les coordonnées fiscales complètes figurent dans les contrats et factures.'] },
      { title: '2. Données traitées', paragraphs: ['Nom, téléphone, e-mail, contenu de la demande, informations sur le projet et données techniques nécessaires au fonctionnement et à la sécurité du site.'] },
      { title: '3. Finalité et base juridique', paragraphs: ['Nous répondons aux demandes, préparons des estimations, organisons les visites et prenons des mesures précontractuelles. La base juridique est la demande de mesures précontractuelles et l’intérêt légitime à protéger le site. Aucun marketing n’est envoyé sans consentement distinct.'] },
      { title: '4. WhatsApp et destinataires', paragraphs: ['Le site prépare le message sans l’envoyer automatiquement. WhatsApp s’ouvre afin que vous puissiez le vérifier et l’envoyer. Les conditions de Meta/WhatsApp s’appliquent également. Les prestataires techniques n’accèdent qu’aux données nécessaires.'] },
      { title: '5. Statistiques et stockage local', paragraphs: ['Nous utilisons Vercel Web Analytics pour des statistiques agrégées. Selon la documentation de Vercel, ce service n’utilise pas de cookies tiers, ne conserve pas l’adresse IP et n’associe pas les visites à une personne identifiable. La langue choisie est enregistrée uniquement dans le stockage local du navigateur.'] },
      { title: '6. Conservation', paragraphs: ['Les demandes sont conservées jusqu’à 12 mois en l’absence de contrat. Les données contractuelles sont conservées pendant les durées fiscales, comptables et légales applicables.'] },
      { title: '7. Vos droits', paragraphs: ['Vous pouvez demander l’accès, la rectification, l’effacement, la limitation, la portabilité ou vous opposer au traitement au +34 611 884 411. Vous pouvez aussi saisir l’Agence espagnole de protection des données : www.aepd.es.'] },
    ],
  },
}

export default function PrivacyPage() {
  const { locale } = useI18n()
  const policy = POLICIES[locale]

  return (
    <>
      <SiteHeader />
      <main className="min-h-svh px-4 pb-20 pt-32 md:pt-40">
        <article className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-10">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" /> {policy.back}</a>
          <h1 className="mt-8 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">{policy.title}</h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{policy.updated}</p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground">{policy.intro}</p>
          <div className="mt-10 space-y-9">
            {policy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-xl font-bold">{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-muted-foreground">{paragraph}</p>)}
              </section>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-7">
            <a href="tel:+34611884411" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white"><Phone className="h-4 w-4" /> +34 611 884 411</a>
            <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold">AEPD <ExternalLink className="h-4 w-4" /></a>
            <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold">Vercel Analytics <ExternalLink className="h-4 w-4" /></a>
          </div>
        </article>
      </main>
    </>
  )
}
