'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  LANGUAGE_COOKIE,
  LANGUAGE_STORAGE_KEY,
  LOCALES,
  getPageMetadata,
  isLocale,
  type Locale,
} from '@/lib/locale'

export { LOCALES }
export type { Locale }

type Translation = Record<Locale, string>

const MESSAGES: Record<string, Translation> = {
  'nav.services': { ru: 'Услуги', es: 'Servicios', en: 'Services', fr: 'Services' },
  'nav.levels': { ru: 'Уровни ремонта', es: 'Niveles de reforma', en: 'Renovation levels', fr: 'Niveaux de rénovation' },
  'nav.objects': { ru: 'Проекты', es: 'Proyectos', en: 'Projects', fr: 'Projets' },
  'nav.contacts': { ru: 'Контакты', es: 'Contacto', en: 'Contact', fr: 'Contact' },
  'nav.estimate': { ru: 'Расчёт', es: 'Calcular', en: 'Estimate', fr: 'Estimation' },
  'nav.language': { ru: 'Язык', es: 'Idioma', en: 'Language', fr: 'Langue' },
  'language.prompt': { ru: 'Мы выбрали язык по настройкам вашего браузера:', es: 'Hemos elegido el idioma según la configuración de tu navegador:', en: 'We selected a language based on your browser settings:', fr: 'Nous avons choisi la langue selon les réglages de votre navigateur :' },
  'language.continue': { ru: 'Продолжить', es: 'Continuar', en: 'Continue', fr: 'Continuer' },
  'language.choose': { ru: 'Выбрать язык', es: 'Elegir idioma', en: 'Choose language', fr: 'Choisir la langue' },
  'language.close': { ru: 'Закрыть и сохранить язык', es: 'Cerrar y guardar el idioma', en: 'Close and save language', fr: 'Fermer et enregistrer la langue' },
  'nav.open': { ru: 'Открыть меню', es: 'Abrir menú', en: 'Open menu', fr: 'Ouvrir le menu' },
  'nav.close': { ru: 'Закрыть меню', es: 'Cerrar menú', en: 'Close menu', fr: 'Fermer le menu' },
  'brand.home': { ru: 'Adelfia Flow — на главную', es: 'Adelfia Flow — inicio', en: 'Adelfia Flow — home', fr: 'Adelfia Flow — accueil' },
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
  'levels.lux.tag': { ru: 'Камин, камень и драматичный свет', es: 'Chimenea, piedra y luz escénica', en: 'Fireplace, stone and dramatic light', fr: 'Cheminée, pierre et lumière scénique' },
  'levels.lux.desc': { ru: 'Выразительный интерьер с камином, тёмным камнем, бордовым бархатом и сложными сценариями света.', es: 'Un interior expresivo con chimenea, piedra oscura, terciopelo burdeos y una iluminación escénica por capas.', en: 'An expressive interior with a fireplace, dark stone, burgundy velvet and layered dramatic lighting.', fr: 'Un intérieur expressif avec cheminée, pierre sombre, velours bordeaux et mise en lumière travaillée.' },
  'levels.premium.name': { ru: 'Премиум', es: 'Premium', en: 'Premium', fr: 'Premium' },
  'levels.premium.tag': { ru: 'Архитектура под вас', es: 'Arquitectura a medida', en: 'Architecture made for you', fr: 'Architecture sur mesure' },
  'levels.premium.desc': { ru: 'Комплексная реконструкция с эксклюзивной отделкой и полной комплектацией объекта.', es: 'Rehabilitación integral con acabados exclusivos y equipamiento completo.', en: 'A comprehensive remodelling with exclusive finishes and complete furnishing.', fr: 'Une réhabilitation complète avec finitions exclusives et aménagement intégral.' },
  'levels.visual': { ru: 'Визуальный пример', es: 'Ejemplo visual', en: 'Visual example', fr: 'Exemple visuel' },
  'levels.realObject': { ru: 'Реальный объект', es: 'Proyecto realizado', en: 'Completed project', fr: 'Projet réalisé' },
  'levels.realCollection': { ru: 'Реальные объекты', es: 'Proyectos realizados', en: 'Completed projects', fr: 'Projets réalisés' },
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
  'levels.open': { ru: 'Подробнее', es: 'Ver detalles', en: 'View details', fr: 'Voir les détails' },
  'levels.close': { ru: 'Закрыть', es: 'Cerrar', en: 'Close', fr: 'Fermer' },
  'levels.scope': { ru: 'Состав работ', es: 'Trabajos incluidos', en: 'Scope of work', fr: 'Travaux inclus' },
  'levels.tasks': { ru: 'Типовые задачи', es: 'Proyectos habituales', en: 'Typical projects', fr: 'Projets types' },
  'levels.economy.work.1': { ru: 'Локальный демонтаж и подготовка поверхностей', es: 'Demolición puntual y preparación de superficies', en: 'Targeted demolition and surface preparation', fr: 'Démolition ciblée et préparation des surfaces' },
  'levels.economy.work.2': { ru: 'Выравнивание и окраска стен и потолков', es: 'Nivelado y pintura de paredes y techos', en: 'Levelling and painting walls and ceilings', fr: 'Remise à niveau et peinture des murs et plafonds' },
  'levels.economy.work.3': { ru: 'Серийная плитка, ламинат или виниловое покрытие', es: 'Cerámica de serie, laminado o suelo vinílico', en: 'Standard tile, laminate or vinyl flooring', fr: 'Carrelage de série, stratifié ou sol vinyle' },
  'levels.economy.work.4': { ru: 'Базовое обновление сантехники, розеток и света', es: 'Renovación básica de sanitarios, enchufes e iluminación', en: 'Basic renewal of sanitaryware, sockets and lighting', fr: 'Rénovation de base des sanitaires, prises et éclairage' },
  'levels.economy.example.1': { ru: 'Косметический ремонт квартиры', es: 'Actualización estética de un piso', en: 'Cosmetic apartment refresh', fr: 'Rafraîchissement d’un appartement' },
  'levels.economy.example.2': { ru: 'Подготовка жилья к аренде', es: 'Preparación de una vivienda para alquiler', en: 'Preparing a rental property', fr: 'Préparation d’un logement locatif' },
  'levels.economy.example.3': { ru: 'Кухня или санузел без перепланировки', es: 'Cocina o baño sin redistribución', en: 'Kitchen or bathroom without layout changes', fr: 'Cuisine ou salle de bains sans redistribution' },
  'levels.comfort.work.1': { ru: 'Демонтаж и корректировка планировки', es: 'Demolición y ajuste de la distribución', en: 'Demolition and layout adjustments', fr: 'Démolition et ajustement de la distribution' },
  'levels.comfort.work.2': { ru: 'Обновление электрики и сантехнических сетей', es: 'Renovación de electricidad y fontanería', en: 'Electrical and plumbing renewal', fr: 'Rénovation de l’électricité et de la plomberie' },
  'levels.comfort.work.3': { ru: 'Улучшенная отделка и несколько сценариев света', es: 'Acabados mejorados y varias escenas de iluminación', en: 'Upgraded finishes and layered lighting', fr: 'Finitions améliorées et plusieurs scénarios lumineux' },
  'levels.comfort.work.4': { ru: 'Функциональная кухня и системы хранения', es: 'Cocina funcional y soluciones de almacenaje', en: 'Functional kitchen and storage solutions', fr: 'Cuisine fonctionnelle et solutions de rangement' },
  'levels.comfort.example.1': { ru: 'Полный ремонт городской квартиры', es: 'Reforma integral de un piso urbano', en: 'Full city apartment renovation', fr: 'Rénovation complète d’un appartement en ville' },
  'levels.comfort.example.2': { ru: 'Кухня-гостиная для семьи', es: 'Cocina-salón para una familia', en: 'Family kitchen and living room', fr: 'Cuisine-séjour familiale' },
  'levels.comfort.example.3': { ru: 'Обновление нескольких санузлов', es: 'Renovación de varios baños', en: 'Multiple bathroom renovation', fr: 'Rénovation de plusieurs salles de bains' },
  'levels.lux.work.1': { ru: 'Индивидуальный дизайн и рабочие чертежи', es: 'Diseño personalizado y planos técnicos', en: 'Bespoke design and technical drawings', fr: 'Conception sur mesure et plans techniques' },
  'levels.lux.work.2': { ru: 'Полная инженерия и продуманная климатическая система', es: 'Instalaciones completas y climatización avanzada', en: 'Complete building services and advanced climate control', fr: 'Réseaux complets et climatisation avancée' },
  'levels.lux.work.3': { ru: 'Натуральный камень, дерево и декоративные покрытия', es: 'Piedra natural, madera y revestimientos decorativos', en: 'Natural stone, wood and decorative finishes', fr: 'Pierre naturelle, bois et revêtements décoratifs' },
  'levels.lux.work.4': { ru: 'Мебель на заказ и встроенное освещение', es: 'Mobiliario a medida e iluminación integrada', en: 'Custom furniture and integrated lighting', fr: 'Mobilier sur mesure et éclairage intégré' },
  'levels.lux.example.1': { ru: 'Дизайнерская квартира в центре', es: 'Piso de diseño en el centro', en: 'Designer city-centre apartment', fr: 'Appartement design en centre-ville' },
  'levels.lux.example.2': { ru: 'Жилая зона современной виллы', es: 'Zona de día de una villa contemporánea', en: 'Living area of a contemporary villa', fr: 'Espace de vie d’une villa contemporaine' },
  'levels.lux.example.3': { ru: 'Мастер-спальня и ванная', es: 'Dormitorio principal y baño', en: 'Principal suite and bathroom', fr: 'Suite principale et salle de bains' },
  'levels.premium.work.1': { ru: 'Архитектурный проект и комплексная реконструкция', es: 'Proyecto arquitectónico y rehabilitación integral', en: 'Architectural design and comprehensive remodelling', fr: 'Projet architectural et réhabilitation complète' },
  'levels.premium.work.2': { ru: 'Индивидуальная инженерия, автоматизация и климат', es: 'Instalaciones a medida, automatización y climatización', en: 'Bespoke services, automation and climate control', fr: 'Réseaux sur mesure, automatisation et climatisation' },
  'levels.premium.work.3': { ru: 'Эксклюзивные материалы и сложные узлы', es: 'Materiales exclusivos y detalles constructivos complejos', en: 'Exclusive materials and complex detailing', fr: 'Matériaux exclusifs et détails techniques complexes' },
  'levels.premium.work.4': { ru: 'Мебель на заказ, комплектация и финальный декор', es: 'Mobiliario a medida, equipamiento y decoración final', en: 'Custom furniture, furnishing and final styling', fr: 'Mobilier sur mesure, équipement et décoration finale' },
  'levels.premium.example.1': { ru: 'Вилла под ключ', es: 'Villa llave en mano', en: 'Turnkey villa', fr: 'Villa clé en main' },
  'levels.premium.example.2': { ru: 'Квартира в старом фонде с реставрацией деталей', es: 'Piso antiguo con restauración de elementos originales', en: 'Historic apartment with restored original details', fr: 'Appartement ancien avec restauration des éléments d’origine' },
  'levels.premium.example.3': { ru: 'Полная комплектация резиденции', es: 'Equipamiento completo de una residencia', en: 'Complete furnishing of a residence', fr: 'Aménagement complet d’une résidence' },
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
  'real.eyebrow': { ru: '/ Реализованные проекты', es: '/ Proyectos realizados', en: '/ Completed projects', fr: '/ Projets réalisés' },
  'real.title': { ru: 'Интерьеры, созданные для жизни', es: 'Interiores creados para vivir', en: 'Interiors designed for living', fr: 'Des intérieurs pensés pour vivre' },
  'real.intro': { ru: 'Пять проектов с разным характером и задачами. Показываем не только красивый кадр, а планировочные, отделочные и интерьерные решения каждого объекта.', es: 'Cinco proyectos con diferentes retos y personalidades. Mostramos no solo una imagen atractiva, sino también las soluciones de distribución, acabados e interiorismo.', en: 'Five projects with different briefs and personalities. We show not just a beautiful image, but the planning, finishing and interior decisions behind each one.', fr: 'Cinq projets aux enjeux et aux caractères différents. Nous présentons les choix d’aménagement, de finition et d’intérieur au-delà d’une simple belle image.' },
  'real.project': { ru: 'Проект', es: 'Proyecto', en: 'Project', fr: 'Projet' },
  'real.fivePhotos': { ru: '5 фото', es: '5 fotos', en: '5 photos', fr: '5 photos' },
  'real.viewProject': { ru: 'Смотреть проект', es: 'Ver el proyecto', en: 'View project', fr: 'Voir le projet' },
  'real.area': { ru: 'Площадь', es: 'Superficie', en: 'Area', fr: 'Surface' },
  'real.rooms': { ru: 'Комнаты', es: 'Estancias', en: 'Rooms', fr: 'Pièces' },
  'real.format': { ru: 'Формат работ', es: 'Tipo de obra', en: 'Project type', fr: 'Type de travaux' },
  'real.fullRenovation': { ru: 'Комплексный ремонт', es: 'Reforma integral', en: 'Full renovation', fr: 'Rénovation complète' },
  'projects.rooms.2': { ru: '2 комнаты', es: '2 estancias', en: '2 rooms', fr: '2 pièces' },
  'projects.rooms.3': { ru: '3 комнаты', es: '3 estancias', en: '3 rooms', fr: '3 pièces' },
  'projects.rooms.4': { ru: '4 комнаты', es: '4 estancias', en: '4 rooms', fr: '4 pièces' },
  'projects.emerald.title': { ru: 'Изумрудная неоклассика', es: 'Neoclásico esmeralda', en: 'Emerald neoclassical', fr: 'Néoclassique émeraude' },
  'projects.emerald.description': { ru: 'Светлая неоклассика с изумрудным бархатом, тонкими золотыми линиями, встроенным хранением и камерной каминной зоной.', es: 'Un neoclásico luminoso con terciopelo esmeralda, finas líneas doradas, almacenaje integrado y una acogedora zona de chimenea.', en: 'Light neoclassical styling with emerald velvet, fine gold lines, integrated storage and an intimate fireplace setting.', fr: 'Un néoclassique lumineux mêlant velours émeraude, fines lignes dorées, rangements intégrés et espace cheminée intimiste.' },
  'projects.urban.title': { ru: 'Тёплый городской минимализм', es: 'Minimalismo urbano cálido', en: 'Warm urban minimalism', fr: 'Minimalisme urbain chaleureux' },
  'projects.urban.description': { ru: 'Бетон, тёмное дерево и стекло смягчены тёплой подсветкой, спокойным текстилем и продуманными встроенными системами.', es: 'El hormigón, la madera oscura y el vidrio se suavizan con luz cálida, textiles serenos y soluciones integradas cuidadosamente diseñadas.', en: 'Concrete, dark timber and glass are softened by warm lighting, calm textiles and carefully planned built-in storage.', fr: 'Le béton, le bois sombre et le verre sont adoucis par une lumière chaude, des textiles apaisants et des rangements intégrés bien pensés.' },
  'projects.chocolate.title': { ru: 'Тёмное дерево и мягкий свет', es: 'Madera oscura y luz suave', en: 'Dark timber and soft light', fr: 'Bois sombre et lumière douce' },
  'projects.chocolate.description': { ru: 'Просторный семейный интерьер в шоколадных оттенках: цельная столярная архитектура, графичный камень и многоуровневое освещение.', es: 'Un interior familiar amplio en tonos chocolate, con carpintería envolvente, piedra gráfica e iluminación en varios niveles.', en: 'A spacious family interior in chocolate tones, with cohesive joinery, graphic stone and layered lighting.', fr: 'Un intérieur familial spacieux aux tons chocolat, avec menuiseries architecturales, pierre graphique et éclairage en plusieurs niveaux.' },
  'projects.cobalt.title': { ru: 'Кобальт и современная классика', es: 'Cobalto y clasicismo contemporáneo', en: 'Cobalt and contemporary classicism', fr: 'Cobalt et classicisme contemporain' },
  'projects.cobalt.description': { ru: 'Парадный интерьер для большой семьи: насыщенный синий, белые стеновые панели, мраморные фактуры и мебель по индивидуальным размерам.', es: 'Un interior representativo para una familia grande: azul intenso, paneles blancos, texturas de mármol y mobiliario a medida.', en: 'A statement interior for a large family: rich blue, white wall panelling, marble textures and bespoke furniture.', fr: 'Un intérieur affirmé pour une grande famille : bleu intense, panneaux muraux blancs, textures de marbre et mobilier sur mesure.' },
  'projects.family.title': { ru: 'Светлый семейный интерьер', es: 'Interior familiar luminoso', en: 'A bright family interior', fr: 'Un intérieur familial lumineux' },
  'projects.family.description': { ru: 'Функциональная планировка для семьи с детьми, нейтральная база, зелёные акценты и отдельные сценарии для общих и приватных зон.', es: 'Una distribución funcional para una familia con niños, base neutra, acentos verdes y ambientes diferenciados para las zonas comunes y privadas.', en: 'A functional layout for a family with children, a neutral foundation, green accents and distinct moods for shared and private spaces.', fr: 'Une distribution fonctionnelle pour une famille avec enfants, une base neutre, des accents verts et des ambiances distinctes entre espaces communs et privés.' },
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

function persistBrowserLocale(locale: Locale) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${LANGUAGE_COOKIE}=${locale}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
}

export function LanguageProvider({
  children,
  initialLocale,
  shouldPrompt,
}: {
  children: ReactNode
  initialLocale: Locale
  shouldPrompt: boolean
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [promptOpen, setPromptOpen] = useState(shouldPrompt)

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (!isLocale(saved)) return
    setLocaleState(saved)
    persistBrowserLocale(saved)
    setPromptOpen(false)
  }, [])

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale)
    persistBrowserLocale(nextLocale)
    setPromptOpen(false)
  }

  useEffect(() => {
    document.documentElement.lang = locale
    const pageMetadata = getPageMetadata(locale, window.location.pathname)
    document.title = pageMetadata.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = pageMetadata.description
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: string) => MESSAGES[key]?.[locale] ?? MESSAGES[key]?.ru ?? key,
    }),
    [locale],
  )

  const languageName = LOCALES.find((item) => item.code === locale)?.name ?? locale.toUpperCase()

  return (
    <I18nContext.Provider value={value}>
      {children}
      {promptOpen && (
        <aside
          aria-label={MESSAGES['language.choose'][locale]}
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-[85] mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-4 shadow-[0_22px_70px_-22px] shadow-foreground/45 backdrop-blur-xl sm:bottom-5 sm:p-5"
        >
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {MESSAGES['language.prompt'][locale]} <strong className="text-foreground">{languageName}</strong>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    persistBrowserLocale(locale)
                    setPromptOpen(false)
                  }}
                  className="rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:shadow-[0_0_24px_-7px] hover:shadow-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {MESSAGES['language.continue'][locale]}
                </button>
                <span className="sr-only">{MESSAGES['language.choose'][locale]}</span>
                {LOCALES.filter((item) => item.code !== locale).map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLocale(item.code)}
                    className="rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                persistBrowserLocale(locale)
                setPromptOpen(false)
              }}
              aria-label={MESSAGES['language.close'][locale]}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-lg text-muted-foreground transition hover:border-primary/45 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              ×
            </button>
          </div>
        </aside>
      )}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside LanguageProvider')
  return context
}

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/34611884411?text=${encodeURIComponent(message)}`
}
