'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'ru' | 'es' | 'en' | 'fr'

export const LOCALES: Array<{ code: Locale; label: string }> = [
  { code: 'ru', label: 'RU' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
]

type Translation = Record<Locale, string>

const MESSAGES: Record<string, Translation> = {
  'nav.services': { ru: 'Услуги', es: 'Servicios', en: 'Services', fr: 'Services' },
  'nav.levels': { ru: 'Уровни ремонта', es: 'Niveles de reforma', en: 'Renovation levels', fr: 'Niveaux de rénovation' },
  'nav.objects': { ru: 'Объекты', es: 'Obras', en: 'Projects', fr: 'Chantiers' },
  'nav.contacts': { ru: 'Контакты', es: 'Contacto', en: 'Contact', fr: 'Contact' },
  'nav.estimate': { ru: 'Расчёт', es: 'Calcular', en: 'Estimate', fr: 'Estimation' },
  'nav.language': { ru: 'Язык', es: 'Idioma', en: 'Language', fr: 'Langue' },
  'nav.open': { ru: 'Открыть меню', es: 'Abrir menú', en: 'Open menu', fr: 'Ouvrir le menu' },
  'nav.close': { ru: 'Закрыть меню', es: 'Cerrar menú', en: 'Close menu', fr: 'Fermer le menu' },
  'brand.home': { ru: 'ФОРМА — на главную', es: 'FORMA — inicio', en: 'FORMA — home', fr: 'FORMA — accueil' },
  'hero.location': { ru: 'Валенсия и провинция', es: 'Valencia y provincia', en: 'Valencia and province', fr: 'Valence et sa province' },
  'hero.title.before': { ru: 'Ремонт и', es: 'Reformas y', en: 'Renovation and', fr: 'Rénovation et' },
  'hero.title.accent': { ru: 'реконструкция', es: 'rehabilitación', en: 'remodelling', fr: 'réhabilitation' },
  'hero.title.after': { ru: 'в Валенсии', es: 'en Valencia', en: 'in Valencia', fr: 'à Valence' },
  'hero.subtitle': { ru: 'Квартиры, дома и коммерческие помещения — от проекта и сметы до готового объекта.', es: 'Pisos, viviendas y locales comerciales: desde el proyecto y el presupuesto hasta la entrega.', en: 'Apartments, houses and commercial spaces — from design and budgeting to handover.', fr: 'Appartements, maisons et locaux commerciaux — du projet et du devis à la livraison.' },
  'hero.apartments': { ru: 'Квартиры', es: 'Pisos', en: 'Apartments', fr: 'Appartements' },
  'hero.houses': { ru: 'Дома', es: 'Casas', en: 'Houses', fr: 'Maisons' },
  'hero.commercial': { ru: 'Коммерция', es: 'Locales', en: 'Commercial', fr: 'Commerces' },
  'hero.cta': { ru: 'Рассчитать стоимость', es: 'Calcular presupuesto', en: 'Estimate the cost', fr: 'Estimer le coût' },
  'hero.imageAlt': { ru: 'Визуальный пример современного интерьера', es: 'Referencia visual de un interior contemporáneo', en: 'Visual reference of a contemporary interior', fr: 'Référence visuelle d’un intérieur contemporain' },
  'common.visualReference': { ru: 'Визуальный ориентир', es: 'Referencia visual', en: 'Visual reference', fr: 'Référence visuelle' },
  'hero.turnkey': { ru: 'Под ключ', es: 'Llave en mano', en: 'Turnkey', fr: 'Clé en main' },
  'hero.oneTeam': { ru: 'одна команда на весь проект', es: 'un solo equipo para todo el proyecto', en: 'one team for the entire project', fr: 'une seule équipe pour tout le projet' },
  'facts.projects.value': { ru: '100+', es: '100+', en: '100+', fr: '100+' },
  'facts.projects.label': { ru: 'объектов в работе и сдано', es: 'obras realizadas y en curso', en: 'completed and active projects', fr: 'chantiers réalisés et en cours' },
  'facts.location.value': { ru: 'Валенсия', es: 'Valencia', en: 'Valencia', fr: 'Valence' },
  'facts.location.label': { ru: 'и вся провинция', es: 'y toda la provincia', en: 'and the whole province', fr: 'et toute la province' },
  'facts.contract.value': { ru: 'По договору', es: 'Con contrato', en: 'Contract based', fr: 'Avec contrat' },
  'facts.contract.label': { ru: 'смета и этапы до старта', es: 'presupuesto y fases antes de empezar', en: 'budget and stages agreed upfront', fr: 'devis et étapes fixés avant travaux' },
  'levels.eyebrow': { ru: '/ Уровни ремонта', es: '/ Niveles de reforma', en: '/ Renovation levels', fr: '/ Niveaux de rénovation' },
  'levels.title': { ru: 'Выберите подход к вашему проекту', es: 'Elige el enfoque de tu proyecto', en: 'Choose the right approach', fr: 'Choisissez l’approche de votre projet' },
  'levels.economy.name': { ru: 'Эконом', es: 'Esencial', en: 'Essential', fr: 'Essentiel' },
  'levels.economy.tag': { ru: 'Надёжно и без лишнего', es: 'Fiable y funcional', en: 'Reliable and practical', fr: 'Fiable et fonctionnel' },
  'levels.economy.desc': { ru: 'Практичное обновление с понятным набором работ и долговечными серийными материалами.', es: 'Una renovación práctica con trabajos claros y materiales de serie duraderos.', en: 'A practical update with a clear scope and durable standard materials.', fr: 'Une rénovation pratique avec des travaux clairs et des matériaux durables de série.' },
  'levels.comfort.name': { ru: 'Комфорт', es: 'Confort', en: 'Comfort', fr: 'Confort' },
  'levels.comfort.tag': { ru: 'Удобство на каждый день', es: 'Comodidad diaria', en: 'Everyday comfort', fr: 'Confort au quotidien' },
  'levels.comfort.desc': { ru: 'Полный ремонт с улучшенными материалами, продуманным светом и функциональным хранением.', es: 'Reforma completa con mejores materiales, iluminación estudiada y almacenaje funcional.', en: 'A complete renovation with upgraded materials, thoughtful lighting and functional storage.', fr: 'Une rénovation complète avec de meilleurs matériaux, un éclairage étudié et des rangements fonctionnels.' },
  'levels.lux.name': { ru: 'Люкс', es: 'Lujo', en: 'Luxury', fr: 'Luxe' },
  'levels.lux.tag': { ru: 'Дизайн и детали', es: 'Diseño y detalle', en: 'Design and detail', fr: 'Design et détails' },
  'levels.lux.desc': { ru: 'Индивидуальный интерьер с натуральными фактурами, сложным светом и мебелью на заказ.', es: 'Interior a medida con texturas naturales, iluminación avanzada y mobiliario personalizado.', en: 'A bespoke interior with natural textures, layered lighting and custom furniture.', fr: 'Un intérieur sur mesure avec textures naturelles, éclairage travaillé et mobilier personnalisé.' },
  'levels.premium.name': { ru: 'Премиум', es: 'Premium', en: 'Premium', fr: 'Premium' },
  'levels.premium.tag': { ru: 'Архитектура под вас', es: 'Arquitectura a medida', en: 'Architecture made for you', fr: 'Architecture sur mesure' },
  'levels.premium.desc': { ru: 'Комплексная реконструкция с эксклюзивной отделкой и полной комплектацией объекта.', es: 'Rehabilitación integral con acabados exclusivos y equipamiento completo.', en: 'A comprehensive remodelling with exclusive finishes and complete furnishing.', fr: 'Une réhabilitation complète avec finitions exclusives et aménagement intégral.' },
  'levels.visual': { ru: 'Визуальный пример', es: 'Ejemplo visual', en: 'Visual example', fr: 'Exemple visuel' },
  'levels.features.standardMaterials': { ru: 'Типовые материалы', es: 'Materiales de serie', en: 'Standard materials', fr: 'Matériaux de série' },
  'levels.features.basicEngineering': { ru: 'Базовая инженерия', es: 'Instalaciones básicas', en: 'Basic engineering', fr: 'Réseaux essentiels' },
  'levels.features.simpleLight': { ru: 'Простой свет', es: 'Iluminación sencilla', en: 'Simple lighting', fr: 'Éclairage simple' },
  'levels.features.betterFinish': { ru: 'Улучшенная отделка', es: 'Acabados mejorados', en: 'Upgraded finishes', fr: 'Finitions améliorées' },
  'levels.features.lightScenes': { ru: 'Сценарии света', es: 'Escenas de luz', en: 'Lighting scenes', fr: 'Scénarios lumineux' },
  'levels.features.storage': { ru: 'Хранение', es: 'Almacenaje', en: 'Storage', fr: 'Rangements' },
  'levels.features.natural': { ru: 'Натуральные материалы', es: 'Materiales naturales', en: 'Natural materials', fr: 'Matériaux naturels' },
  'levels.features.customFurniture': { ru: 'Мебель на заказ', es: 'Mobiliario a medida', en: 'Custom furniture', fr: 'Mobilier sur mesure' },
  'levels.features.climate': { ru: 'Климат', es: 'Climatización', en: 'Climate', fr: 'Climatisation' },
  'levels.features.customProject': { ru: 'Индивидуальный проект', es: 'Proyecto personalizado', en: 'Bespoke design', fr: 'Projet sur mesure' },
  'levels.features.complex': { ru: 'Сложные решения', es: 'Soluciones complejas', en: 'Complex solutions', fr: 'Solutions complexes' },
  'levels.features.complete': { ru: 'Полная комплектация', es: 'Equipamiento completo', en: 'Complete furnishing', fr: 'Équipement complet' },
  'services.tags.project': { ru: 'Проект', es: 'Proyecto', en: 'Design', fr: 'Projet' },
  'services.tags.drawings': { ru: 'Чертежи', es: 'Planos', en: 'Drawings', fr: 'Plans' },
  'services.tags.engineering': { ru: 'Инженерия', es: 'Instalaciones', en: 'Engineering', fr: 'Ingénierie' },
  'services.tags.selection': { ru: 'Подбор', es: 'Selección', en: 'Selection', fr: 'Sélection' },
  'services.tags.purchase': { ru: 'Закупка', es: 'Compra', en: 'Purchasing', fr: 'Achats' },
  'services.tags.delivery': { ru: 'Доставка', es: 'Entrega', en: 'Delivery', fr: 'Livraison' },
  'services.eyebrow': { ru: '/ Что мы делаем', es: '/ Qué hacemos', en: '/ What we do', fr: '/ Ce que nous faisons' },
  'services.title': { ru: 'Всё необходимое — в одной команде', es: 'Todo lo necesario, en un solo equipo', en: 'Everything you need, one team', fr: 'Tout le nécessaire, une seule équipe' },
  'services.note': { ru: 'Не нужно отдельно искать дизайнера, инженеров, строителей и поставщиков. Мы соединяем все этапы в один управляемый проект.', es: 'No necesitas buscar por separado diseñador, ingenieros, constructores y proveedores. Coordinamos todo en un único proyecto.', en: 'No need to source designers, engineers, builders and suppliers separately. We coordinate everything as one project.', fr: 'Inutile de chercher séparément architectes, ingénieurs, artisans et fournisseurs. Nous coordonnons l’ensemble du projet.' },
  'services.renovation.title': { ru: 'Ремонт и реконструкция', es: 'Reforma y rehabilitación', en: 'Renovation and remodelling', fr: 'Rénovation et réhabilitation' },
  'services.renovation.desc': { ru: 'Квартиры, дома и коммерческие помещения: демонтаж, инженерные работы и чистовая отделка.', es: 'Pisos, casas y locales: demolición, instalaciones y acabados.', en: 'Apartments, houses and commercial spaces: demolition, services and finishes.', fr: 'Appartements, maisons et locaux : démolition, réseaux et finitions.' },
  'services.design.title': { ru: 'Дизайн и инженерия', es: 'Diseño e instalaciones', en: 'Design and engineering', fr: 'Conception et ingénierie' },
  'services.design.desc': { ru: 'Планировка, рабочие чертежи, электрика, сантехника, освещение и климат в единой системе.', es: 'Distribución, planos, electricidad, fontanería, iluminación y climatización coordinados.', en: 'Layouts, technical drawings, electricity, plumbing, lighting and climate in one coordinated system.', fr: 'Plans, dessins techniques, électricité, plomberie, éclairage et climatisation coordonnés.' },
  'services.supply.title': { ru: 'Комплектация', es: 'Suministro y equipamiento', en: 'Supply and furnishing', fr: 'Fourniture et équipement' },
  'services.supply.desc': { ru: 'Подбираем и организуем поставку отделки, света, сантехники, дверей и мебели.', es: 'Seleccionamos y coordinamos acabados, iluminación, sanitarios, puertas y mobiliario.', en: 'We select and coordinate finishes, lighting, sanitaryware, doors and furniture.', fr: 'Nous sélectionnons et coordonnons finitions, luminaires, sanitaires, portes et mobilier.' },
  'process.eyebrow': { ru: '/ Как работаем', es: '/ Cómo trabajamos', en: '/ How we work', fr: '/ Notre méthode' },
  'process.title': { ru: 'Четыре понятных этапа', es: 'Cuatro etapas claras', en: 'Four clear stages', fr: 'Quatre étapes claires' },
  'process.note': { ru: 'Без длинной цепочки подрядчиков: один план, одна команда и понятная ответственность на каждом этапе.', es: 'Un plan, un equipo y responsabilidades claras en cada fase.', en: 'One plan, one team and clear responsibility at every stage.', fr: 'Un plan, une équipe et des responsabilités claires à chaque étape.' },
  'process.1.title': { ru: 'Оценка и смета', es: 'Visita y presupuesto', en: 'Assessment and budget', fr: 'Évaluation et devis' },
  'process.1.desc': { ru: 'Осматриваем объект, фиксируем задачу и готовим предварительный расчёт.', es: 'Visitamos el inmueble, definimos el alcance y preparamos una estimación inicial.', en: 'We inspect the property, define the scope and prepare an initial estimate.', fr: 'Nous visitons le bien, définissons le périmètre et préparons une première estimation.' },
  'process.2.title': { ru: 'Проект и договор', es: 'Proyecto y contrato', en: 'Design and contract', fr: 'Projet et contrat' },
  'process.2.desc': { ru: 'Согласуем решения, состав работ, график и бюджет до начала стройки.', es: 'Acordamos soluciones, alcance, calendario y presupuesto antes de empezar.', en: 'We agree the design, scope, schedule and budget before work begins.', fr: 'Nous validons les solutions, le périmètre, le planning et le budget avant le démarrage.' },
  'process.3.title': { ru: 'Ремонт и контроль', es: 'Obra y control', en: 'Construction and control', fr: 'Travaux et suivi' },
  'process.3.desc': { ru: 'Организуем работы, поставки и поэтапную проверку качества.', es: 'Coordinamos los trabajos, suministros y controles de calidad por fases.', en: 'We coordinate the work, deliveries and stage-by-stage quality checks.', fr: 'Nous coordonnons les travaux, les livraisons et les contrôles qualité par étape.' },
  'process.4.title': { ru: 'Сдача объекта', es: 'Entrega', en: 'Handover', fr: 'Livraison' },
  'process.4.desc': { ru: 'Проводим финальную приёмку, устраняем замечания и передаём результат.', es: 'Realizamos la revisión final, resolvemos los detalles y entregamos el resultado.', en: 'We complete the final inspection, resolve details and hand over the finished space.', fr: 'Nous effectuons la réception finale, corrigeons les détails et livrons le bien.' },
  'cases.eyebrow': { ru: '/ Типовые задачи', es: '/ Proyectos habituales', en: '/ Typical projects', fr: '/ Projets types' },
  'cases.title': { ru: 'Что часто ремонтируют в Валенсии', es: 'Reformas habituales en Valencia', en: 'Typical renovations in Valencia', fr: 'Rénovations courantes à Valence' },
  'cases.villa.title': { ru: 'Вилла в провинции', es: 'Villa en la provincia', en: 'Villa in the province', fr: 'Villa dans la province' },
  'cases.villa.desc': { ru: 'Обновление планировки, инженерии, климата, фасада и террасы в едином проекте.', es: 'Distribución, instalaciones, climatización, fachada y terraza coordinadas en un solo proyecto.', en: 'Layout, services, climate, façade and terrace coordinated as one project.', fr: 'Distribution, réseaux, climatisation, façade et terrasse coordonnés dans un seul projet.' },
  'cases.apartment.title': { ru: 'Городская квартира', es: 'Piso urbano', en: 'City apartment', fr: 'Appartement en ville' },
  'cases.apartment.desc': { ru: 'Перепланировка, новая кухня, санузлы, электрика и хранение для удобной жизни.', es: 'Nueva distribución, cocina, baños, electricidad y almacenaje para el día a día.', en: 'A new layout, kitchen, bathrooms, electrics and storage for everyday living.', fr: 'Nouvelle distribution, cuisine, salles de bains, électricité et rangements pour le quotidien.' },
  'cases.old.title': { ru: 'Старый жилой фонд', es: 'Vivienda antigua', en: 'Older housing stock', fr: 'Logement ancien' },
  'cases.old.desc': { ru: 'Замена старых сетей, выравнивание поверхностей и сохранение ценных архитектурных деталей.', es: 'Renovación de instalaciones, nivelación de superficies y conservación de elementos arquitectónicos valiosos.', en: 'Renewing old services, levelling surfaces and preserving valuable architectural details.', fr: 'Rénovation des réseaux, remise à niveau des surfaces et conservation des détails architecturaux.' },
  'real.eyebrow': { ru: '/ Сейчас на объектах', es: '/ Ahora en obra', en: '/ On site now', fr: '/ En chantier' },
  'real.title': { ru: 'Фото с объектов', es: 'Fotos de obra', en: 'Photos from our sites', fr: 'Photos de nos chantiers' },
  'real.photo': { ru: 'Фото с объекта', es: 'Foto de obra', en: 'Site photo', fr: 'Photo de chantier' },
  'real.item.commercial': { ru: 'Подготовка коммерческого пространства', es: 'Preparación de un espacio comercial', en: 'Preparing a commercial space', fr: 'Préparation d’un espace commercial' },
  'real.item.finish': { ru: 'Нанесение финишного покрытия', es: 'Aplicación del acabado final', en: 'Applying the final finish', fr: 'Application de la finition' },
  'real.item.floor': { ru: 'Работа с полом и окраской', es: 'Pavimento y pintura', en: 'Flooring and painting', fr: 'Sol et peinture' },
  'faq.eyebrow': { ru: '/ Вопросы', es: '/ Preguntas frecuentes', en: '/ FAQ', fr: '/ Questions fréquentes' },
  'faq.title': { ru: 'Коротко о главном', es: 'Lo esencial, de forma clara', en: 'The essentials, clearly explained', fr: 'L’essentiel, simplement' },
  'faq.1.q': { ru: 'Как получить точную смету?', es: '¿Cómo obtengo un presupuesto exacto?', en: 'How do I get an accurate quote?', fr: 'Comment obtenir un devis précis ?' },
  'faq.1.a': { ru: 'Калькулятор даёт предварительный ориентир. Точную смету составляем после осмотра, замера и согласования состава работ.', es: 'La calculadora ofrece una orientación. El presupuesto exacto se prepara tras la visita, la medición y la definición del alcance.', en: 'The calculator provides an initial guide. The final quote follows a visit, measurements and an agreed scope.', fr: 'Le calculateur donne une première estimation. Le devis précis est établi après visite, relevé et validation du périmètre.' },
  'faq.2.q': { ru: 'Где вы работаете?', es: '¿En qué zonas trabajáis?', en: 'Which areas do you cover?', fr: 'Dans quelles zones intervenez-vous ?' },
  'faq.2.a': { ru: 'Работаем в Валенсии и по провинции. Для удалённых объектов сначала уточняем адрес и масштаб работ.', es: 'Trabajamos en Valencia y su provincia. Para inmuebles alejados confirmamos primero la ubicación y el alcance.', en: 'We work across Valencia and the province. For more remote properties we first confirm location and scope.', fr: 'Nous intervenons à Valence et dans sa province. Pour les biens plus éloignés, nous confirmons d’abord l’adresse et l’ampleur des travaux.' },
  'faq.3.q': { ru: 'Можно ли жить в объекте во время ремонта?', es: '¿Se puede vivir en la vivienda durante la reforma?', en: 'Can I stay in the property during renovation?', fr: 'Peut-on habiter le logement pendant les travaux ?' },
  'faq.3.a': { ru: 'Зависит от масштаба. При комплексном ремонте обычно безопаснее и быстрее освободить объект; при локальных работах возможно этапное выполнение.', es: 'Depende del alcance. En una reforma integral suele ser más seguro y rápido dejar la vivienda libre; en trabajos parciales puede organizarse por fases.', en: 'It depends on the scope. For a full renovation it is usually safer and faster to vacate; partial works may be phased.', fr: 'Cela dépend de l’ampleur. Pour une rénovation complète, il est généralement plus sûr et plus rapide de libérer le logement ; des travaux partiels peuvent être phasés.' },
  'faq.4.q': { ru: 'Что влияет на стоимость и сроки?', es: '¿Qué influye en el precio y el plazo?', en: 'What affects cost and timing?', fr: 'Qu’est-ce qui influence le coût et les délais ?' },
  'faq.4.a': { ru: 'Площадь, состояние объекта, объём демонтажа, инженерные системы, материалы, мебель на заказ и необходимые разрешения.', es: 'La superficie, el estado del inmueble, la demolición, las instalaciones, los materiales, el mobiliario a medida y los permisos necesarios.', en: 'Area, existing condition, demolition, building services, materials, bespoke furniture and required permits.', fr: 'La surface, l’état du bien, la démolition, les réseaux, les matériaux, le mobilier sur mesure et les autorisations.' },
  'contact.estimate.title': { ru: 'Смета до старта', es: 'Presupuesto antes de empezar', en: 'Budget before work starts', fr: 'Devis avant le démarrage' },
  'contact.estimate.text': { ru: 'Состав работ и бюджет фиксируются до начала ремонта.', es: 'Definimos el alcance y el presupuesto antes de iniciar la obra.', en: 'Scope and budget are agreed before renovation begins.', fr: 'Le périmètre et le budget sont fixés avant le début des travaux.' },
  'contact.plan.title': { ru: 'План по этапам', es: 'Plan por etapas', en: 'Stage plan', fr: 'Plan par étapes' },
  'contact.plan.text': { ru: 'Вы заранее знаете последовательность и сроки работ.', es: 'Conoces de antemano la secuencia y los plazos.', en: 'You know the sequence and timing in advance.', fr: 'Vous connaissez à l’avance l’ordre et le calendrier des travaux.' },
  'contact.reports.title': { ru: 'Фотоотчёты', es: 'Informes fotográficos', en: 'Photo reports', fr: 'Rapports photo' },
  'contact.reports.text': { ru: 'Показываем ход работ и важные скрытые этапы.', es: 'Mostramos el avance y las fases ocultas importantes.', en: 'We show progress and important concealed stages.', fr: 'Nous montrons l’avancement et les étapes cachées importantes.' },
  'contact.eyebrow': { ru: '/ Следующий шаг', es: '/ Siguiente paso', en: '/ Next step', fr: '/ Prochaine étape' },
  'contact.title': { ru: 'Обсудим ваш объект', es: 'Hablemos de tu proyecto', en: 'Let’s discuss your project', fr: 'Parlons de votre projet' },
  'contact.text': { ru: 'Оставьте контакты. Уточним задачу, состояние объекта и подскажем, с чего начать.', es: 'Cuéntanos brevemente el proyecto. Aclararemos el estado del inmueble y el mejor punto de partida.', en: 'Tell us briefly about the property. We will clarify its condition and the best place to start.', fr: 'Parlez-nous brièvement du bien. Nous préciserons son état et le meilleur point de départ.' },
  'contact.form.title': { ru: 'Короткая заявка', es: 'Consulta breve', en: 'Quick enquiry', fr: 'Demande rapide' },
  'contact.form.note': { ru: 'Только необходимые данные — без длинной анкеты.', es: 'Solo los datos necesarios, sin formularios largos.', en: 'Only the essentials, no lengthy form.', fr: 'Uniquement les informations utiles, sans long formulaire.' },
  'contact.name': { ru: 'Имя', es: 'Nombre', en: 'Name', fr: 'Nom' },
  'contact.namePlaceholder': { ru: 'Как к вам обращаться', es: '¿Cómo te llamas?', en: 'How should we address you?', fr: 'Comment vous appelez-vous ?' },
  'contact.phone': { ru: 'Телефон', es: 'Teléfono', en: 'Phone', fr: 'Téléphone' },
  'contact.comment': { ru: 'Комментарий — необязательно', es: 'Comentario — opcional', en: 'Comment — optional', fr: 'Commentaire — facultatif' },
  'contact.commentPlaceholder': { ru: 'Квартира, дом или коммерческое помещение', es: 'Piso, casa o local comercial', en: 'Apartment, house or commercial space', fr: 'Appartement, maison ou local commercial' },
  'contact.whatsapp': { ru: 'Продолжить в WhatsApp', es: 'Continuar en WhatsApp', en: 'Continue in WhatsApp', fr: 'Continuer sur WhatsApp' },
  'contact.call': { ru: 'Позвонить', es: 'Llamar', en: 'Call us', fr: 'Appeler' },
  'contact.privacy.prefix': { ru: 'Продолжая, вы подтверждаете, что ознакомились с', es: 'Al continuar confirmas que has leído la', en: 'By continuing you confirm that you have read the', fr: 'En continuant, vous confirmez avoir lu la' },
  'contact.privacy.link': { ru: 'политикой конфиденциальности', es: 'política de privacidad', en: 'privacy policy', fr: 'politique de confidentialité' },
  'footer.tagline': { ru: 'Ремонт и реконструкция · Валенсия', es: 'Reformas y rehabilitación · Valencia', en: 'Renovation and remodelling · Valencia', fr: 'Rénovation et réhabilitation · Valence' },
  'whatsapp.base': { ru: 'Здравствуйте! Хочу обсудить ремонт в Валенсии.', es: '¡Hola! Quiero consultar una reforma en Valencia.', en: 'Hello! I would like to discuss a renovation in Valencia.', fr: 'Bonjour ! Je souhaite discuter d’une rénovation à Valence.' },
}

const I18nContext = createContext<{
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
} | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru')

  useEffect(() => {
    const saved = window.localStorage.getItem('forma-locale') as Locale | null
    if (saved && LOCALES.some((item) => item.code === saved)) setLocaleState(saved)
  }, [])

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale)
    window.localStorage.setItem('forma-locale', nextLocale)
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: string) => MESSAGES[key]?.[locale] ?? MESSAGES[key]?.ru ?? key,
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside LanguageProvider')
  return context
}

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/34611884411?text=${encodeURIComponent(message)}`
}
