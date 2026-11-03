/* ============================================================
   KENJI'S BIZARRE PORTFOLIO — données
   Tout le contenu du site est ici : modifier ce fichier suffit
   pour mettre à jour le portfolio.
   ============================================================ */

const IMG = "assets/img/";
const DOC = "assets/docs/";

const PROFILE = {
  firstName: "Kenji",
  lastName: "Chapuis--Voisain",
  title: "Étudiant BTS SIO — option SLAM (2e année)",
  email: "k.voisain@gmail.com",
  phone: "06 23 02 75 18",
  cv: DOC + "cv-kenji-chapuis-voisain.pdf",
  photo: IMG + "kenji.webp",
  stand: "KILLER QUERY",
};

/* ---------- MENU PRINCIPAL ---------- */
const MENU = [
  { route: "about",     label: "À PROPOS",     jp: "スタンド使い", size: 1.00, skew: -6, skewY: 8,  dx: 0 },
  { route: "cv",        label: "CV",           jp: "ステータス",   size: 1.10, skew: -11, skewY: -8, dx: 40 },
  { route: "projets",   label: "PROJETS",      jp: "ミッション",   size: 0.96, skew: 0,  skewY: -4, dx: 14 },
  { route: "experiences", label: "EXPÉRIENCES", jp: "パート",      size: 0.80, skew: -3, skewY: 5,  dx: 26 },
  { route: "certifs",   label: "CERTIFS",      jp: "トロフィー",   size: 0.92, skew: -7, skewY: -6, dx: 6 },
  { route: "veille",    label: "VEILLE TECH",  jp: "スピードワゴン財団", size: 0.78, skew: -4, skewY: 7, dx: 30 },
  { route: "passions",  label: "PASSIONS",     jp: "奇妙な趣味",   size: 0.94, skew: -9, skewY: -5, dx: 4 },
  { route: "contact",   label: "CONTACT",      jp: "連絡",        size: 0.90, skew: -2, skewY: 6,  dx: 22 },
];

/* ---------- À PROPOS (style « About me » + révélation) ---------- */
const ABOUT = [
  {
    label: "STAND USER",
    tag: "PROFIL",
    pos: "50% 30%",
    upper: [
      "Nom : Kenji Chapuis--Voisain",
      "Âge : 20 ans (né le 22 mai 2006)",
      "Base : Grand Besançon · Télétravail",
    ],
    lower: "étudiant bts sio — option slam (2e année)",
  },
  {
    label: "FORMATION",
    tag: "ÉCOLE",
    pos: "50% 55%",
    upper: [
      "Lycée Louis Pergaud — Besançon",
      "BTS SIO option SLAM (2025 → 2027)",
      "Bac Général spécialité NSI (2024)",
    ],
    lower: "python | php 8 | javascript | sql | html / css",
  },
  {
    label: "OBJECTIF",
    tag: "QUÊTE",
    pos: "50% 75%",
    upper: [
      "Passionné par le développement web & logiciel,",
      "la sécurité des systèmes et la modélisation 3D.",
    ],
    lower: "stage sio2 recherché : 1er mars → 10 avril 2027",
  },
];

/* ---------- CV (style « Resume » : cartes + panneau détail) ---------- */
const STAND_STATS = [
  { k: "PUISSANCE", v: "B", n: 4 },   // dev back-end
  { k: "VITESSE", v: "A", n: 5 },     // autoformation
  { k: "PORTÉE", v: "A", n: 5 },      // web / 3D / sécu
  { k: "PERSISTANCE", v: "A", n: 5 }, // 5 ans de budo
  { k: "PRÉCISION", v: "A", n: 5 },   // rigueur 3D
  { k: "POTENTIEL", v: "A", n: 5 },
];

const CV = [
  {
    badge: "I", title: "STAND", subtitle: "「KILLER QUERY」 — Kenji Chapuis--Voisain", rank: "A",
    head: "FICHE DE STAND", progress: "6/6",
    radar: true,
    rows: STAND_STATS.map((s, i) => ({ index: "0" + (i + 1), title: s.k, status: s.v })),
    bulletsTitle: "CAPACITÉ",
    bullets: [
      "Transforme un cahier des charges en application web propre, sécurisée et documentée.",
      "Puissance B : PHP 8 / MySQL · Vitesse A : capacité d'autoformation.",
      "Persistance A : 5 ans de Yosekan Budo — discipline et sang-froid.",
    ],
  },
  {
    badge: "II", title: "FORMATION", subtitle: "Lycée Louis Pergaud / Besançon", rank: "A",
    head: "PARCOURS SCOLAIRE", progress: "3/3",
    rows: [
      { index: "01", title: "BTS SIO option SLAM", status: "2025-2027" },
      { index: "02", title: "Bac Général — spécialité NSI", status: "2024" },
      { index: "03", title: "Brevet — Collège Notre Dame", status: "2021" },
    ],
    bulletsTitle: "DÉTAILS",
    bullets: [
      "SLAM : Solutions Logicielles et Applications Métiers.",
      "Lycée Louis Pergaud, Besançon — 2e année en cours.",
    ],
  },
  {
    badge: "III", title: "LANGAGES", subtitle: "PHP 8 / JavaScript / Python / SQL", rank: "A",
    head: "LANGAGES & WEB", progress: "5/5",
    rows: [
      { index: "01", title: "PHP 8 / MySQL", status: "Back" },
      { index: "02", title: "JavaScript (Vanilla ES6+)", status: "Front" },
      { index: "03", title: "Python (POO, Pygame)", status: "Logique" },
      { index: "04", title: "HTML5 / CSS3 (Grid, Flexbox)", status: "UI" },
      { index: "05", title: "SQL (requêtes, jointures, BDD)", status: "Data" },
    ],
    bulletsTitle: "DÉTAILS",
    bullets: [
      "Glassmorphism, animations CSS, sélecteur :has().",
      "Conception de bases de données relationnelles.",
    ],
  },
  {
    badge: "IV", title: "OUTILS", subtitle: "WordPress / Git / SketchUp Pro", rank: "B",
    head: "CMS, OUTILS & VERSIONS", progress: "6/6",
    rows: [
      { index: "01", title: "WordPress, Elementor, MotoPress", status: "CMS" },
      { index: "02", title: "Git / GitHub", status: "Versions" },
      { index: "03", title: "Visual Studio Code", status: "IDE" },
      { index: "04", title: "phpMyAdmin, SFTP (FileZilla)", status: "Serveur" },
      { index: "05", title: "SketchUp Pro (modélisation 3D)", status: "3D" },
      { index: "06", title: "Microsoft Office / LibreOffice", status: "Bureau" },
    ],
    bulletsTitle: "DÉTAILS",
    bullets: ["Déploiement SFTP sur hébergement mutualisé OVH.", "Plus de 15 structures métalliques modélisées en 3D."],
  },
  {
    badge: "V", title: "SÉCURITÉ", subtitle: "Luhn / Regex / RGPD / ANSSI", rank: "A",
    head: "SÉCURITÉ & BONNES PRATIQUES", progress: "4/4",
    rows: [
      { index: "01", title: "Algorithme de Luhn (contrôle CB)", status: "JS + PHP" },
      { index: "02", title: "Assainissement des données (Regex)", status: "Input" },
      { index: "03", title: "Conformité RGPD (CNIL)", status: "6 modules" },
      { index: "04", title: "Sensibilisation cybersécurité", status: "ANSSI" },
    ],
    bulletsTitle: "DÉTAILS",
    bullets: ["Protection CSRF / Nonces, requêtes préparées.", "Privacy by Design dès la conception."],
  },
  {
    badge: "VI", title: "LANGUES", subtitle: "Français / Anglais B1 / Espagnol / Russe", rank: "B",
    head: "LANGUES & ATOUTS", progress: "4/4",
    rows: [
      { index: "01", title: "Français", status: "Natif" },
      { index: "02", title: "Anglais (documentation technique)", status: "B1" },
      { index: "03", title: "Espagnol", status: "Notions" },
      { index: "04", title: "Russe", status: "Notions" },
    ],
    bulletsTitle: "QUALITÉS",
    bullets: [
      "Rigueur logique et esprit d'analyse.",
      "Autoformation et adaptabilité.",
      "Curiosité technique et veille active.",
      "Esprit d'équipe et sens du service client.",
    ],
  },
];

/* ---------- EXPÉRIENCES (cartes « PART ») ---------- */
const EXPERIENCES = [
  {
    badge: "1", title: "MODELEUR 3D", subtitle: "Sous-traitance métallerie — Besançon", rank: "PRO",
    head: "PART 1 · JUIL. 2024 → MARS 2025", progress: "✔",
    rows: [
      { index: "01", title: "Escaliers métalliques sur mesure", status: "3D" },
      { index: "02", title: "Garde-corps, rampes PMR", status: "3D" },
      { index: "03", title: "Barrières & portails", status: "3D" },
      { index: "04", title: "Plans pour validation client", status: "Livré" },
    ],
    bulletsTitle: "COMPÉTENCES",
    bullets: [
      "Maîtrise avancée de SketchUp Pro et visualisation spatiale.",
      "Rigueur géométrique, précision technique, sens du détail.",
      "Communication client et respect des délais.",
    ],
    link: { href: "#/projets/sketchup", label: "VOIR LA GALERIE 3D" },
  },
  {
    badge: "2", title: "STAGE SIO1", subtitle: "Hôtel Siatel — Développeur Web", rank: "OK",
    head: "PART 2 · MAI → JUIN 2026 (5 SEM.)", progress: "✔",
    rows: [
      { index: "01", title: "Refonte UI/UX One-Page Glassmorphism", status: "UI" },
      { index: "02", title: "Moteur multilingue FR / EN / ZH", status: "JS" },
      { index: "03", title: "Tunnel de réservation + Luhn", status: "Sécu" },
      { index: "04", title: "Templates PHP + parade CSS :has", status: "PHP" },
      { index: "05", title: "Guide technique pour l'exploitant", status: "Doc" },
    ],
    bulletsTitle: "CONTEXTE",
    bullets: [
      "SIATEL SARL, Châteauroux — tuteur : M. Ali Morshedian.",
      "PHP 8, JavaScript ES6+, WordPress, Elementor, MotoPress, SFTP, phpMyAdmin.",
      "Stage effectué et validé.",
    ],
    link: { href: "#/projets/siatel", label: "VOIR LE PROJET SIATEL" },
  },
  {
    badge: "3", title: "STAGE SIO2", subtitle: "Développement SLAM — en recherche", rank: "???",
    head: "PART 3 · 1 MARS → 10 AVRIL 2027", progress: "…",
    rows: [
      { index: "01", title: "Application métier (Web / logiciel / mobile)", status: "Cible" },
      { index: "02", title: "Frameworks : React, Vue, Symfony, Laravel", status: "Cible" },
      { index: "03", title: "Tests, sécurité, CI/CD", status: "Cible" },
    ],
    bulletsTitle: "TO BE CONTINUED",
    bullets: [
      "Recherche active : secteur de Besançon ou télétravail.",
      "Disponible pour échanger sur toute opportunité de stage SLAM.",
    ],
    link: { href: "#/contact", label: "ME CONTACTER" },
  },
];

/* ---------- PROJETS (style « Project log ») ---------- */
const PROJECTS = [
  {
    id: "siatel",
    title: "HÔTEL SIATEL",
    stack: "PHP 8 · JS ES6+ · WordPress",
    tag: "STAGE SIO1 · PRO",
    summary:
      "Refonte intégrale UI/UX, One-Page responsive, système multilingue FR/EN/ZH et tunnel de réservation direct sécurisé (Luhn).",
    body: [
      ["Contexte", "Hôtel-restaurant à Châteauroux (SIATEL SARL). Objectif : moderniser l'image de marque et réduire la dépendance aux commissions des plateformes (OTA) avec un tunnel de réservation direct."],
      ["Défi 1 — parade CSS :has()", "Le thème imposait un header/footer opaques. Une règle body:has(#siatel-modern-layout) masque l'ancien en-tête UNIQUEMENT quand le nouveau conteneur est présent, sans toucher aux fichiers maîtres."],
      ["Défi 2 — algorithme de Luhn", "Contrôle des numéros de carte (modulo 10) en JavaScript côté client et revalidé en PHP côté serveur, avec assainissement Regex et Nonces CSRF."],
      ["Défi 3 — i18n trilingue", "Dictionnaire JSON + remplacement instantané du DOM, choix mémorisé dans le localStorage."],
    ],
    code:
`function validateLuhn(cardNumber) {
  let sum = 0, shouldDouble = false;
  const digits = cardNumber.replace(/\\D/g, '');
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits.charAt(i), 10);
    if (shouldDouble) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0 && digits.length >= 13;
}`,
    chips: ["B1.1 Patrimoine", "B1.2 Incidents", "B1.3 Présence en ligne", "B1.4 Mode projet", "B1.5 Mise à dispo"],
    gallery: [
      { src: IMG + "siatel-avant.webp", cap: "Existant — en-tête rigide, pas de responsive" },
      { src: IMG + "siatel-v1.webp", cap: "Maquette V1 — header glassmorphism, FR/EN/ZH" },
      { src: IMG + "siatel-v2.webp", cap: "Version finale V2 — consolidée pour la prod" },
    ],
    links: [{ href: "https://hotelsiatel.com", label: "HOTELSIATEL.COM" }],
  },
  {
    id: "tower-defense",
    title: "TOWER DEFENSE",
    stack: "Python 3 · Pygame · POO",
    tag: "PROJET NSI · TERMINALE",
    summary:
      "Un jeu de stratégie temps réel en Python/Pygame : la consigne demandait un jeu console, j'ai livré un vrai moteur graphique 60 FPS en architecture modulaire.",
    body: [
      ["Fonctionnalités", "Placement et amélioration de tours · vagues d'ennemis progressives · économie temps réel · collisions et portée circulaire · HUD (vie, or, vague) · états du jeu (menu, partie, victoire, défaite)."],
      ["Architecture", "main.py (boucle principale) · towers.py · enemies.py · game.py (règles, vagues, état global) · utils.py (distances, constantes)."],
      ["Compétences", "POO (classes, héritage, encapsulation), boucles d'événements, optimisation des calculs géométriques, code propre et modulaire."],
    ],
    chips: ["main.py", "towers.py", "enemies.py", "game.py", "utils.py"],
  },
  {
    id: "sketchup",
    title: "MODÈLES 3D",
    stack: "SketchUp Pro · SKP / DWG / PDF",
    tag: "PRO · MÉTALLERIE",
    summary:
      "Conception 3D d'escaliers, garde-corps, rampes et portails sur mesure pour des entreprises de métallerie-serrurerie. Modèles manipulables à 360° ci-dessous.",
    body: [
      ["Réalisations", "Escaliers droits, hélicoïdaux, quart tournant · garde-corps barreaudage, verre, découpe laser · rampes PMR · portails coulissants et battants motorisés."],
      ["Compétences", "Normes du bâtiment et tolérances de fabrication, contraintes structurelles, communication avec l'atelier et les clients."],
    ],
    models: [
      { t: "Balcon", d: "Balcon moderne avec garde-corps en acier, conçu sur mesure. Design épuré et robuste.", u: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXBzLWJpbS12aWV3ZXItYnVja2V0LWdxdm5mZ21jYnJqd3V6YXoybDRldnd4ZTZ5eW5pemZtOXJodmRydWVpbnVhMzNwYi9CYWxjb24rcmVmKzYuc2tw" },
      { t: "Portail — Pouilley", d: "Portail sur mesure pour résidence à Pouilley. Esthétique et sécurité.", u: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXBzLWJpbS12aWV3ZXItYnVja2V0LWdxdm5mZ21jYnJqd3V6YXoybDRldnd4ZTZ5eW5pemZtOXJodmRydWVpbnVhMzNwYi9Qb3J0YWlsK1BvdWlsbGV5LnNrcA" },
      { t: "Escalier intérieur", d: "Escalier métallique avec marches sur mesure, normes de sécurité et d'ergonomie.", u: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXBzLWJpbS12aWV3ZXItYnVja2V0LWdxdm5mZ21jYnJqd3V6YXoybDRldnd4ZTZ5eW5pemZtOXJodmRydWVpbnVhMzNwYi9LZW5qaStFc2NhbGllcisyKzIwMjQuc2tw" },
      { t: "Garde-corps A", d: "Référence 3 — design classique à barreaux verticaux.", u: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXBzLWJpbS12aWV3ZXItYnVja2V0LWdxdm5mZ21jYnJqd3V6YXoybDRldnd4ZTZ5eW5pemZtOXJodmRydWVpbnVhMzNwYi9nYXJkZStjb3JwcytyZWYrMy5za3A" },
      { t: "Garde-corps B", d: "Référence 3 (variante) — élégant et sécurisé.", u: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXBzLWJpbS12aWV3ZXItYnVja2V0LWdxdm5mZ21jYnJqd3V6YXoybDRldnd4ZTZ5eW5pemZtOXJodmRydWVpbnVhMzNwYi9nYXJkZStjb3JwcytyZWYzLnNrcA" },
      { t: "Garde-corps C", d: "Référence 8 — lignes épurées pour balcons et terrasses.", u: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXBzLWJpbS12aWV3ZXItYnVja2V0LWdxdm5mZ21jYnJqd3V6YXoybDRldnd4ZTZ5eW5pemZtOXJodmRydWVpbnVhMzNwYi9nYXJkZStjb3JwcytyZWYrOC5za3A" },
      { t: "Garde-corps D", d: "Référence 8 (variante) — robustesse et minimalisme.", u: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXBzLWJpbS12aWV3ZXItYnVja2V0LWdxdm5mZ21jYnJqd3V6YXoybDRldnd4ZTZ5eW5pemZtOXJodmRydWVpbnVhMzNwYi9nYXJkZStjb3JwcytyZWY4LnNrcA" },
    ],
  },
  {
    id: "portfolio",
    title: "CE PORTFOLIO",
    stack: "HTML5 · CSS3 · JavaScript vanilla",
    tag: "ACADÉMIQUE · E5",
    summary:
      "Support officiel de l'épreuve E5. 100 % HTML / CSS / JS, sans framework : routeur maison, transitions animées, sons synthétisés en Web Audio et navigation clavier.",
    body: [
      ["Rubriques", "Profil, CV, projets détaillés, viewer 3D, certifications (PIX, CNIL, ANSSI), veille technologique, passions."],
      ["Apprentissages", "Design system homogène, animations CSS avancées (clip-path, keyframes), interactivité JS sans dépendance, responsive mobile."],
    ],
    chips: ["Vanilla JS", "CSS clip-path", "Web Audio API", "Canvas 2D", "Responsive"],
  },
  {
    id: "sio2",
    title: "SIO2 & SUITE",
    stack: "2026-2027 · en cours",
    tag: "TO BE CONTINUED",
    summary:
      "Préparation des missions d'atelier E6, développement d'applications métiers avancées et recherche du stage SIO2.",
    body: [
      ["Objectifs de l'année", "Missions candidates E6 (SLAM / bases de données) · stage SIO2 de 6 semaines (1er mars → 10 avril 2027) · frameworks modernes (React, Symfony, Laravel)."],
    ],
    links: [{ href: "#/contact", label: "PROPOSER UN STAGE" }],
  },
];

/* ---------- VEILLE TECHNOLOGIQUE ---------- */
const VEILLE = [
  {
    id: "demarche", title: "LA DÉMARCHE", stack: "Méthode & outils", tag: "SPEEDWAGON FOUNDATION",
    summary: "S'informer de manière systématique et continue sur les évolutions techniques, les frameworks, les outils et les menaces de cybersécurité.",
    body: [
      ["Agrégateurs RSS", "Feedly : Dev.to, Medium Tech, Hacker News."],
      ["Newsletters", "JavaScript Weekly, PHP Weekly, GitHub Trending, bulletins CERT-FR (ANSSI)."],
      ["Communautés", "GitHub Releases, Reddit (r/programming, r/webdev), chaînes YouTube et podcasts techniques."],
      ["Expérimentation", "Test concret des nouveaux outils sur des prototypes (ex. IA générative pendant le stage Siatel)."],
    ],
  },
  {
    id: "ia", title: "AXE 1 · IA", stack: "IA générative & cycle de dev", tag: "AXE 1",
    summary: "Comment les assistants de code (LLM) et les agents autonomes transforment-ils le développement, les tests et la sécurité logicielle ?",
    body: [
      ["Accélération", "Gain de temps sur le boilerplate, les regex, les requêtes SQL complexes et la documentation."],
      ["Rôle du développeur", "Du rédacteur de syntaxe au relecteur critique, architecte et garant de la logique métier."],
      ["Vigilance", "Vulnérabilités (OWASP Top 10), dépendances obsolètes, hallucinations : relecture humaine obligatoire."],
      ["Confidentialité", "Données sensibles dans les prompts, respect des licences open source."],
    ],
  },
  {
    id: "agents", title: "FICHE · AGENTS IA", stack: "GitHub Blog / TechCrunch", tag: "FICHE DE LECTURE",
    summary: "Des simples compléteurs de code aux agents capables de cloner un dépôt, lire les logs, corriger un bug, lancer les tests et ouvrir une pull request.",
    body: [["Application BTS SIO", "Automatiser la maintenance corrective tout en gardant un contrôle humain strict sur la validation finale."]],
  },
  {
    id: "secu-ia", title: "FICHE · CODE IA", stack: "ANSSI / Snyk", tag: "FICHE DE LECTURE",
    summary: "Près de 40 % du code généré sans consigne de sécurité contient des failles classiques (injections SQL, XSS, secrets exposés).",
    body: [["Application BTS SIO", "Analyse statique (SAST) et sanitisation systématique : requêtes préparées PDO en PHP."]],
  },
  {
    id: "web", title: "AXE 2 · WEB LÉGER", stack: "Modern CSS & sécurité", tag: "AXE 2",
    summary: "Concevoir des applications web performantes, sobres et sécurisées avec CSS3 et JavaScript natifs, sans surcharge de frameworks.",
    body: [
      ["Vanilla JS & Modern CSS", ":has(), subgrid, variables CSS, container queries : moins de bibliothèques, plus de natif."],
      ["Sobriété & performance", "Core Web Vitals, bande passante réduite, meilleur SEO."],
      ["Flux transactionnels", "Validation client (Luhn) + contrôle serveur strict (CSRF, Nonces, requêtes préparées)."],
    ],
  },
  {
    id: "has", title: "FICHE · :HAS()", stack: "MDN / Smashing Magazine", tag: "FICHE DE LECTURE",
    summary: "Le sélecteur parent :has() conditionne le style d'un élément selon ses enfants, sans JavaScript.",
    body: [["Application BTS SIO", "Utilisé au stage Siatel pour masquer l'en-tête Elementor par défaut sans toucher au code maître."]],
  },
  {
    id: "rgpd", title: "FICHE · RGPD", stack: "CNIL / OWASP", tag: "FICHE DE LECTURE",
    summary: "Bonnes pratiques de collecte des données bancaires et personnelles : non-persistance, validation en temps réel, droits d'accès et de rectification.",
    body: [["Application BTS SIO", "Tunnel de réservation PHP/JS avec validation Luhn pour l'Hôtel Siatel."]],
  },
  {
    id: "bilan", title: "BILAN", stack: "Ma pratique pro", tag: "CONCLUSION",
    summary: "Une vision moderne et critique de mes projets.",
    body: [
      ["IA avec discernement", "Valider systématiquement la robustesse et la sécurité du code généré."],
      ["Solutions pérennes", "Vanilla JS, CSS natif, PHP structuré : moins de dette technique et de modules payants."],
      ["Privacy by Design", "Conformité RGPD et cybersécurité ANSSI dès la conception."],
    ],
  },
];

/* ---------- PASSIONS ---------- */
const PASSIONS = [
  {
    id: "jojo", title: "JOJO", stack: "TOP 1 · anime préféré", tag: "TOP 1 · ARAKI 1987",
    summary: "Une révolution culturelle déguisée en manga. Un héros britannique dans l'Angleterre victorienne, une exposition au Louvre, des collabs Gucci et Uniqlo.",
    body: [
      ["Le système des Stands", "1989, Part 3 : fini la force brute. Des pouvoirs uniques qui reflètent l'âme de leur utilisateur, aucun n'est objectivement supérieur. Hunter x Hunter, Jujutsu Kaisen, Chainsaw Man en héritent."],
      ["Un langage visuel", "Des poses théâtrales inspirées de la mode, des sculptures grecques et de Michel-Ange."],
      ["La musique comme ADN", "Stands et personnages nommés d'après Led Zeppelin, Prince, Queen, Metallica…"],
    ],
    stands: [
      { img: IMG + "c-moon.webp", name: "C-MOON", user: "Enrico Pucci (Part 6)" },
      { img: IMG + "awaking-iii-leaves.webp", name: "AWAKING III LEAVES", user: "Mitsuba Higashikata (Part 8)" },
    ],
  },
  {
    id: "berserk", title: "BERSERK", stack: "TOP 2 · dark fantasy", tag: "TOP 2 · MIURA 1989",
    summary: "Le chef-d'œuvre qui a redéfini la dark fantasy : noirceur, puissance graphique et profondeur philosophique.",
    body: [
      ["L'art au service du récit", "Chaque double page de bataille est un tableau. Une influence directe sur Dark Souls / Elden Ring."],
      ["L'humanité face au destin", "Guts incarne le refus absolu de la fatalité par la persévérance."],
    ],
    gallery: [{ src: IMG + "berserk.webp", cap: "Berserk — Kentaro Miura" }],
  },
  {
    id: "haikyu", title: "HAIKYU!!", stack: "TOP 3 · volley", tag: "TOP 3",
    summary: "La célébration du volleyball et du collectif : placement, vision du jeu et communication d'équipe — ce qui a nourri ma propre pratique au club de Besançon.",
    gallery: [{ src: IMG + "haikyuu.webp", cap: "Haikyu!!" }],
    body: [["Autres œuvres notables", "Gurren Lagann (dépassement de soi) · Bleach (affrontements tactiques) · Princesse Mononoké (nature vs expansion humaine)."]],
  },
  {
    id: "jeux", title: "JEUX VIDÉO", stack: "LoL · Undertale · OMORI · Kenshi", tag: "GAME DESIGN",
    summary: "Les univers interactifs, la stratégie et la narration vidéoludique.",
    body: [
      ["League of Legends", "MOBA — décision en temps réel sous pression, coordination d'équipe, optimisation tactique."],
      ["Undertale", "RPG indé qui déconstruit les codes du genre, choix moraux à impact réel."],
      ["OMORI", "RPG psychologique, direction artistique unique, écriture d'une grande sensibilité."],
      ["Kenshi", "Sandbox sans rails : simulation économique et systèmes de jeu complexes."],
      ["Apport pour le dev", "Game loops, collisions et gestion d'états (→ Tower Defense), sensibilité UI/UX (HUD, retours visuels)."],
    ],
    gallery: [
      { src: IMG + "league-of-legends.webp", cap: "League of Legends" },
      { src: IMG + "undertale.webp", cap: "Undertale" },
      { src: IMG + "omori.webp", cap: "OMORI" },
    ],
  },
  {
    id: "volley", title: "VOLLEYBALL", stack: "Besançon Volley-Ball", tag: "SPORT D'ÉQUIPE",
    summary: "Club : Besançon Volley-Ball (BVB) · pratique loisir régulière · poste polyvalent.",
    body: [
      ["Communication & cohésion", "Sur le terrain comme dans une équipe de dev, la communication claire est la clé."],
      ["Réflexes & anticipation", "Lecture des trajectoires, placement stratégique, réactivité."],
      ["Esprit sportif", "Respect de l'adversaire et valorisation de l'effort collectif."],
    ],
  },
  {
    id: "budo", title: "YOSEKAN BUDO", stack: "5 ans de pratique", tag: "ART MARTIAL",
    summary: "Art martial synthétique japonais fondé par Maître Hiroo Mochizuki : percussions, projections, clés et armes traditionnelles.",
    body: [
      ["Discipline", "Constance dans l'effort et respect des règles."],
      ["Sang-froid", "Rester calme, lucide et concentré face à la pression."],
      ["Adaptabilité", "Passer d'une distance de combat à une autre : une vraie agilité intellectuelle."],
      ["Respect", "Bienveillance envers le partenaire et humilité."],
    ],
  },
];

/* ---------- CERTIFICATIONS (style « Socials ») ---------- */
const CERTIFS = [
  {
    id: "anssi", label: "ANSSI", role: "SÉCU", icon: IMG + "anssi.webp", href: DOC + "attestation-anssi.pdf",
    desc: "SecNumacadémie — sécurité des réseaux, attaques, authentification, hygiène informatique.",
    stats: [{ tag: "MOOC", value: "2025", color: "var(--gold)" }, { tag: "CYBER", value: "OK", color: "var(--green)" }],
    links: [{ text: "Attestation SecNumacadémie", href: DOC + "attestation-anssi.pdf", count: "PDF" }],
  },
  {
    id: "cnil", label: "CNIL RGPD", role: "DATA", icon: IMG + "cnil.webp", href: DOC + "attestation-cnil-module-1.pdf",
    desc: "Atelier RGPD de la Commission Nationale de l'Informatique et des Libertés — 6 modules validés.",
    stats: [{ tag: "MODULES", value: "6/6", color: "var(--gold)" }, { tag: "RGPD", value: "OK", color: "var(--pink)" }],
    links: [
      { text: "M1 · Le RGPD et ses notions clés", href: DOC + "attestation-cnil-module-1.pdf", count: "01" },
      { text: "M2 · Principes de la protection", href: DOC + "attestation-cnil-module-2.pdf", count: "02" },
      { text: "M3 · Responsabilités des acteurs", href: DOC + "attestation-cnil-module-3.pdf", count: "03" },
      { text: "M4 · Le DPO et la conformité", href: DOC + "attestation-cnil-module-4.pdf", count: "04" },
      { text: "M5 · Les droits des personnes", href: DOC + "attestation-cnil-module-5.pdf", count: "05" },
      { text: "M6 · Sanctions et recours", href: DOC + "attestation-cnil-module-6.pdf", count: "06" },
    ],
  },
  {
    id: "pix", label: "PIX", role: "ÉTAT", icon: IMG + "pix.webp", href: DOC + "certification-pix-20250321.pdf",
    desc: "Certification officielle reconnue par l'État — compétences numériques.",
    stats: [{ tag: "CERTIF", value: "×2", color: "var(--gold)" }, { tag: "LAST", value: "2025", color: "var(--green)" }],
    links: [
      { text: "Certification PIX 2025 (BTS SIO)", href: DOC + "certification-pix-20250321.pdf", count: "2025" },
      { text: "Certification PIX 2021 (collège/lycée)", href: DOC + "certification-pix-20210625.pdf", count: "2021" },
    ],
  },
];

/* ---------- CONTACT (style « Socials ») ---------- */
const CONTACT = [
  {
    id: "email", label: "EMAIL", role: "DIRECT", glyph: "✉", href: "mailto:" + PROFILE.email,
    desc: PROFILE.email,
    stats: [{ tag: "RÉPONSE", value: "RAPIDE", color: "var(--gold)" }, { tag: "STAGE", value: "2027", color: "var(--pink)" }],
    links: [{ text: PROFILE.email, href: "mailto:" + PROFILE.email, count: "MAIL" }],
  },
  {
    id: "phone", label: "TÉLÉPHONE", role: "APPEL", glyph: "☎", href: "tel:+33623027518",
    desc: PROFILE.phone,
    stats: [{ tag: "ZONE", value: "BESANÇON", color: "var(--gold)" }, { tag: "REMOTE", value: "OK", color: "var(--green)" }],
    links: [{ text: PROFILE.phone, href: "tel:+33623027518", count: "TEL" }],
  },
  {
    id: "cv", label: "CV PDF", role: "DOSSIER", glyph: "★", href: PROFILE.cv,
    desc: "Télécharger le CV complet au format PDF.",
    stats: [{ tag: "FORMAT", value: "PDF", color: "var(--gold)" }, { tag: "MAJ", value: "2026", color: "var(--pink)" }],
    links: [
      { text: "CV — Kenji Chapuis--Voisain", href: PROFILE.cv, count: "PDF" },
      { text: "Site du stage : hotelsiatel.com", href: "https://hotelsiatel.com", count: "WEB" },
    ],
  },
];
