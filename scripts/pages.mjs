// Every page the site publishes. Each one is the same tool, with its own
// search-focused title, intro and questions, and a different tab pre-selected.
// Edit here, then run: node scripts/build.mjs

export const SITE = 'https://nobs-qr.vercel.app';

// Shared English how-to steps (shown on every English page).
const HOWTO_EN = {
  h2: 'How to make a free QR code',
  steps: [
    ['Choose what it opens', 'A link, text, email, Wi-Fi login, contact card, calendar event, phone number, SMS, WhatsApp chat or map location.'],
    ['Style it', 'Pick colours, padding and an optional border. Add your logo in the centre if you like.'],
    ['Pick your formats', 'SVG for print and design tools, PNG, JPG or WEBP for screens, PDF for documents.'],
    ['Download or copy', 'Save the files, or copy the QR code straight to your clipboard. No account, no email, done.'],
  ],
};

// Questions every English page can answer.
const FAQ_CORE_EN = [
  ['Is it actually free?', 'Yes. Every feature, every format, every size. No sign-up, no watermark, no trial, no premium tier waiting to ambush you.'],
  ['Do the QR codes expire?', 'Never. These are static QR codes: the content lives inside the QR code itself, so there is no subscription keeping it alive.'],
  ['What happens to my data?', 'Nothing. The QR code is generated in your browser. What you type or upload never touches a server and is not stored anywhere.'],
];

export const PAGES = [
  {
    slug: '', lang: 'en', type: 'url', nav: 'All QR codes',
    title: 'Free QR Code Generator | No BS QR (no sign-up, no watermark)',
    description: 'Free QR code generator with no sign-up, no watermark and no expiry. Make QR codes for links, Wi-Fi, vCards, events and more, with your logo. Download SVG, PNG, JPG, WEBP or PDF. Runs privately in your browser.',
    keywords: 'free QR code generator, QR code generator, QR code maker, free QR code, QR code with logo, Wi-Fi QR code, vCard QR code, SVG QR code, QR code no sign up, QR code that never expires',
    h1: 'Free QR code generator',
    eyebrow: 'Free QR code generator',
    lead: ['Your new favourite', 'no bullshit QR code generator.'],
    sub: ['No shitty branding, no hidden fees, no sign-up, no expiry.', 'Make your QR code and get on with your day.'],
    howto: HOWTO_EN,
    faqTitle: 'Free QR code generator, explained',
    faq: [
      ...FAQ_CORE_EN,
      ['Can I add my logo?', 'Yes. Drop a logo in the centre and the QR code switches to its strongest error correction so it still scans.'],
      ['Can I track scans?', 'Yes, honestly. Add UTM tags to a link and scans show up in your own analytics. No redirect service, no middleman.'],
      ['What can a QR code hold?', 'Links, text, email, Wi-Fi logins, contact cards, calendar events, phone numbers, SMS, WhatsApp chats and map locations. Download as SVG, PNG, JPG, WEBP or PDF.'],
    ],
  },
  {
    slug: 'wifi-qr-code-generator', lang: 'en', type: 'wifi', nav: 'Wi-Fi QR code',
    title: 'Free Wi-Fi QR Code Generator | No BS QR (no sign-up)',
    description: 'Make a Wi-Fi QR code for free. Guests scan it and join your network without typing the password. WPA, WEP or open networks. No sign-up, no watermark, runs in your browser.',
    keywords: 'Wi-Fi QR code generator, WiFi QR code, free WiFi QR code, QR code for WiFi password, guest WiFi QR code',
    h1: 'Free Wi-Fi QR code generator',
    eyebrow: 'Free Wi-Fi QR code generator',
    lead: ['Your new favourite', 'no bullshit Wi-Fi QR code generator.'],
    sub: ['Guests scan, phones join your network.', 'No more reading passwords off a sticky note.'],
    about: {
      h2: 'How a Wi-Fi QR code works',
      p: [
        'A Wi-Fi QR code stores your network name, password and security type in a standard format that iPhone and Android cameras understand. Point the camera at it, tap the prompt, and the phone joins the network.',
        'Your password is built into the QR code on your own device. It is never sent to a server, which matters when the thing you are encoding is the key to your network.',
        'Print it for the office, a café table, an Airbnb welcome card or the fridge at home. If you change the password, make a new QR code.',
      ],
    },
    howto: HOWTO_EN,
    faqTitle: 'Wi-Fi QR codes, explained',
    faq: [
      ['Does it work on iPhone and Android?', 'Yes. The camera app on iPhone (iOS 11 and later) and on most Android phones (Android 10 and later) reads Wi-Fi QR codes without any extra app.'],
      ['Is my Wi-Fi password safe?', 'It never leaves your browser while you make the QR code. Once printed, anyone who scans it can join, exactly as if you had told them the password.'],
      ['What about hidden networks?', 'Tick Hidden network and the QR code tells the phone to look for a network that does not broadcast its name.'],
      ['Which security type should I pick?', 'Most home and office routers use WPA, WPA2 or WPA3. Pick None only for open networks without a password.'],
      ...FAQ_CORE_EN.slice(0, 2),
    ],
  },
  {
    slug: 'vcard-qr-code-generator', lang: 'en', type: 'vcard', nav: 'vCard QR code',
    title: 'Free vCard QR Code Generator | No BS QR (contact card)',
    description: 'Make a vCard QR code for free. One scan saves your name, number, email and website to a phone’s contacts. No sign-up, no watermark, no expiry.',
    keywords: 'vCard QR code generator, contact QR code, business card QR code, free vCard QR code, QR code for contact details',
    h1: 'Free vCard QR code generator',
    eyebrow: 'Free vCard QR code generator',
    lead: ['Your new favourite', 'no bullshit vCard QR code generator.'],
    sub: ['One scan and your details land in their contacts.', 'No more spelling out your email at a networking event.'],
    about: {
      h2: 'Why put a contact card in a QR code',
      p: [
        'A vCard QR code holds your name, company, job title, phone number, email and website in the vCard format every phone understands. Scanning it opens a ready-made contact that saves with one tap.',
        'Put it on business cards, conference badges, email signatures or the last slide of a talk. Because the details are stored in the QR code itself, it keeps working without any account or subscription.',
        'Keep it short. The more you add, the denser the QR code gets, so leave out anything people will not need.',
      ],
    },
    howto: HOWTO_EN,
    faqTitle: 'vCard QR codes, explained',
    faq: [
      ['Will it work on iPhone and Android?', 'Yes. Both read vCard QR codes straight from the camera and offer to save the contact.'],
      ['Can I change my details later?', 'The details live inside the QR code, so a change means a new QR code. That is the trade-off for a QR code that never expires and needs no account.'],
      ['Can I add a photo?', 'No. Photos make a QR code far too dense to scan reliably, so we leave them out.'],
      ['Which format is best for business cards?', 'SVG or PDF. Both are vector, so they stay sharp at any print size.'],
      ...FAQ_CORE_EN.slice(0, 2),
    ],
  },
  {
    slug: 'qr-code-with-logo', lang: 'en', type: 'url', open: 'logo', nav: 'QR code with logo',
    title: 'Free QR Code Generator with Logo | No BS QR',
    description: 'Add your logo to a QR code for free. Upload PNG, JPG or SVG and error correction switches to high automatically, so it still scans. No sign-up, no watermark.',
    keywords: 'QR code with logo, QR code generator with logo, free QR code with logo, custom QR code, branded QR code',
    h1: 'Free QR code generator with logo',
    eyebrow: 'Free QR code generator with logo',
    lead: ['Your new favourite', 'no bullshit QR code with your logo.'],
    sub: ['Your logo in the middle, your colours around it.', 'Nobody else’s logo anywhere.'],
    about: {
      h2: 'How a logo fits in a QR code',
      p: [
        'QR codes have built-in error correction: they can lose part of their pattern and still scan. At the highest level, H, around 30% of the QR code can be covered. A logo in the centre uses some of that spare capacity.',
        'No BS QR switches to level H as soon as you add a logo, and can clear the modules behind it so the edges stay crisp. Keep the logo between 15 and 20% of the width for the safest scans.',
        'Your logo is read on your own device and never uploaded. Upload an SVG and it stays vector in the SVG export.',
      ],
    },
    howto: HOWTO_EN,
    faqTitle: 'QR codes with logos, explained',
    faq: [
      ['Will a logo stop the QR code from scanning?', 'Not if it stays within what error correction can recover. Keep it around 15 to 20% of the width and test with a phone before you print.'],
      ['What size should the logo be?', 'Between 15 and 20% of the QR code width is the sweet spot. The slider goes from 10 to 25%.'],
      ['Which file types work?', 'PNG, JPG, SVG and WEBP. A transparent PNG or an SVG looks cleanest.'],
      ['Is there a watermark?', 'No. The only logo on your QR code is yours.'],
      ...FAQ_CORE_EN.slice(1, 3),
    ],
  },
  {
    slug: 'svg-qr-code-generator', lang: 'en', type: 'url', format: 'svg', nav: 'SVG QR code',
    title: 'Free SVG QR Code Generator | No BS QR (vector, print-ready)',
    description: 'Download QR codes as clean SVG vectors for free. One merged path, sharp at any size, ready for Illustrator, Figma and print. Also PNG, JPG, WEBP and vector PDF.',
    keywords: 'SVG QR code generator, vector QR code, QR code SVG download, print QR code, QR code for Illustrator, QR code for Figma',
    h1: 'Free SVG QR code generator',
    eyebrow: 'Free SVG QR code generator',
    lead: ['Your new favourite', 'no bullshit SVG QR code generator.'],
    sub: ['Vector QR codes that stay sharp', 'from a business card to a billboard.'],
    about: {
      h2: 'Why designers want SVG QR codes',
      p: [
        'An SVG QR code is made of vector shapes, not pixels, so it scales to any size without blurring. Print shops prefer it, and it drops straight into Illustrator, Figma, InDesign or Affinity.',
        'No BS QR exports each QR code as one merged path with crisp edges, at exact pixel dimensions, with transparent backgrounds or knocked-out codes if you need them. You can also copy the SVG code and paste it straight into a design tool or a website.',
        'Need a raster version too? Pick several formats and they download together as one zip.',
      ],
    },
    howto: HOWTO_EN,
    faqTitle: 'SVG QR codes, explained',
    faq: [
      ['Can I edit the SVG in Illustrator or Figma?', 'Yes. The QR code is a single path, so you can recolour or resize it freely. Keep strong contrast between the QR code and its background.'],
      ['Is there a vector PDF?', 'Yes. Pick PDF and the QR code is drawn as vector shapes, ready for print.'],
      ['Can the background be transparent?', 'Yes. Tick Transparent under Background, or cut the QR code out of a solid block.'],
      ['How small can I print it?', 'As a rule of thumb, at least 2 cm wide for close-up scanning. For scanning from further away, make it about a tenth of the scanning distance.'],
      ...FAQ_CORE_EN.slice(0, 2),
    ],
  },
  {
    slug: 'whatsapp-qr-code-generator', lang: 'en', type: 'whatsapp', nav: 'WhatsApp QR code',
    title: 'Free WhatsApp QR Code Generator | No BS QR',
    description: 'Make a WhatsApp QR code for free. One scan opens a chat with your number, with a message ready to send. No sign-up, no watermark, no expiry.',
    keywords: 'WhatsApp QR code generator, WhatsApp QR code, QR code for WhatsApp chat, WhatsApp Business QR code, free WhatsApp QR code',
    h1: 'Free WhatsApp QR code generator',
    eyebrow: 'Free WhatsApp QR code generator',
    lead: ['Your new favourite', 'no bullshit WhatsApp QR code maker.'],
    sub: ['One scan opens a chat with you, message already typed.', 'Made for shop windows, menus and flyers.'],
    about: {
      h2: 'How a WhatsApp QR code works',
      p: [
        'The QR code holds a wa.me link with your number in international format and an optional message. Scanning it opens WhatsApp with a chat to you and the message ready to send.',
        'It is an easy way to take enquiries from a shop window, a menu, packaging or a flyer without anyone saving your number first. Always include the country code, such as +49 for Germany, or the link opens the wrong person.',
        'Works with personal and WhatsApp Business numbers.',
      ],
    },
    howto: HOWTO_EN,
    faqTitle: 'WhatsApp QR codes, explained',
    faq: [
      ['Do people need my number saved?', 'No. The QR code opens a chat with you straight away.'],
      ['Why do I need the country code?', 'WhatsApp links only work with international numbers. The QR code checks for it before it builds.'],
      ['Can I prefill a message?', 'Yes. Add an optional message and it appears ready to send.'],
      ['Does it work with WhatsApp Business?', 'Yes, with any number that has WhatsApp.'],
      ...FAQ_CORE_EN.slice(0, 2),
    ],
  },
  {
    slug: 'event-qr-code-generator', lang: 'en', type: 'event', nav: 'Event QR code',
    title: 'Free Calendar Event QR Code Generator | No BS QR',
    description: 'Make a QR code that adds an event to the calendar. Name, place, date and time in one scan. Free, no sign-up, no watermark.',
    keywords: 'event QR code generator, calendar QR code, QR code add to calendar, save the date QR code, iCal QR code',
    h1: 'Free calendar event QR code generator',
    eyebrow: 'Free event QR code generator',
    lead: ['Your new favourite', 'no bullshit event QR code generator.'],
    sub: ['One scan puts your event in their calendar.', 'Fewer no-shows, fewer “when was it again?”'],
    about: {
      h2: 'How an event QR code works',
      p: [
        'An event QR code stores the event name, location, date and time in the iCalendar format. Scanning it offers to add the event to the phone’s calendar.',
        'Use it on posters, invitations, tickets and save-the-date cards. All-day events work too, and the end time is checked so it always comes after the start.',
        'Times are saved as local time, so the event shows at the time printed on the poster.',
      ],
    },
    howto: HOWTO_EN,
    faqTitle: 'Event QR codes, explained',
    faq: [
      ['Does it work on every phone?', 'Most iPhone and Android cameras recognise calendar QR codes, though some scanner apps show the text first. Test with the phones your audience uses before you print.'],
      ['Can I make an all-day event?', 'Yes. Tick All day and skip the times.'],
      ['What if I leave out the end time?', 'The event is set to one hour long.'],
      ...FAQ_CORE_EN.slice(0, 2),
    ],
  },
  {
    slug: 'email-qr-code-generator', lang: 'en', type: 'email', nav: 'Email QR code',
    title: 'Free Email QR Code Generator | No BS QR',
    description: 'Make an email QR code for free. One scan opens a new email to your address, with subject and message filled in. No sign-up, no watermark.',
    keywords: 'email QR code generator, mailto QR code, QR code for email, free email QR code',
    h1: 'Free email QR code generator',
    eyebrow: 'Free email QR code generator',
    lead: ['Your new favourite', 'no bullshit email QR code generator.'],
    sub: ['One scan opens an email to you,', 'subject and message already written.'],
    about: {
      h2: 'How an email QR code works',
      p: [
        'An email QR code holds a mailto link with your address and, if you like, a subject and message. Scanning it opens the phone’s mail app with everything filled in, ready to send.',
        'Handy for feedback cards, support stickers, event sign-ups and RSVPs. Add several addresses separated by commas to reach a whole team.',
      ],
    },
    howto: HOWTO_EN,
    faqTitle: 'Email QR codes, explained',
    faq: [
      ['Which mail app opens?', 'Whichever mail app is set as the default on the phone.'],
      ['Can I send to several addresses?', 'Yes. Separate them with commas.'],
      ['Is the address checked?', 'Yes. The QR code only builds once the address looks valid.'],
      ...FAQ_CORE_EN.slice(0, 2),
    ],
  },

  // German homepage
  {
    slug: 'de', lang: 'de', type: 'url', nav: 'Deutsch',
    title: 'Kostenloser QR-Code-Generator | No BS QR (ohne Anmeldung)',
    description: 'Kostenloser QR-Code-Generator ohne Anmeldung, ohne Wasserzeichen und ohne Ablaufdatum. QR-Codes für Links, WLAN, Visitenkarten, Termine und mehr, auch mit Logo. Download als SVG, PNG, JPG, WEBP oder PDF. Läuft komplett im Browser.',
    keywords: 'QR Code Generator kostenlos, QR-Code erstellen, QR Code erstellen kostenlos, QR Code ohne Anmeldung, QR Code mit Logo, WLAN QR Code, vCard QR Code, QR Code SVG, QR Code ohne Ablaufdatum',
    h1: 'Kostenloser QR-Code-Generator',
    eyebrow: 'Kostenloser QR-Code-Generator',
    lead: ['Dein neuer Lieblings-', 'QR-Code-Generator ohne Bullshit.'],
    leadJoin: '',
    sub: ['Kein nerviges Branding, keine versteckten Kosten, keine Anmeldung, kein Ablaufdatum.', 'QR-Code erstellen und weitermachen.'],
    howto: {
      h2: 'So erstellst du einen kostenlosen QR-Code',
      steps: [
        ['Inhalt wählen', 'Link, Text, E-Mail, WLAN-Zugang, Visitenkarte, Termin, Telefonnummer, SMS, WhatsApp-Chat oder Standort.'],
        ['Gestalten', 'Farben, Abstand und optional einen Rahmen wählen. Wenn du magst, kommt dein Logo in die Mitte.'],
        ['Formate wählen', 'SVG für Druck und Designtools, PNG, JPG oder WEBP für Bildschirme, PDF für Dokumente.'],
        ['Herunterladen oder kopieren', 'Dateien speichern oder den QR-Code direkt in die Zwischenablage kopieren. Kein Konto, keine E-Mail, fertig.'],
      ],
    },
    faqTitle: 'Kostenloser QR-Code-Generator, kurz erklärt',
    faq: [
      ['Ist das wirklich kostenlos?', 'Ja. Jede Funktion, jedes Format, jede Größe. Keine Anmeldung, kein Wasserzeichen, keine Testphase, kein Premium-Abo, das dir auflauert.'],
      ['Laufen die QR-Codes ab?', 'Nie. Das sind statische QR-Codes: Der Inhalt steckt im QR-Code selbst, es gibt also kein Abo, das ihn am Leben hält.'],
      ['Was passiert mit meinen Daten?', 'Nichts. Der QR-Code entsteht in deinem Browser. Was du eingibst oder hochlädst, landet auf keinem Server und wird nirgends gespeichert.'],
      ['Kann ich mein Logo einfügen?', 'Ja. Leg ein Logo in die Mitte, und der QR-Code schaltet auf die stärkste Fehlerkorrektur, damit er scannbar bleibt.'],
      ['Kann ich Scans messen?', 'Ja, ganz ehrlich. Hänge UTM-Parameter an einen Link, dann tauchen Scans in deiner eigenen Analyse auf. Kein Weiterleitungsdienst, kein Mittelsmann.'],
      ['Was kann ein QR-Code enthalten?', 'Links, Text, E-Mail, WLAN-Zugänge, Visitenkarten, Termine, Telefonnummern, SMS, WhatsApp-Chats und Standorte. Download als SVG, PNG, JPG, WEBP oder PDF.'],
    ],
  },
];

// Words the template needs per language.
export const STRINGS = {
  en: {
    locale: 'en_GB', htmlLang: 'en-GB',
    byline: 'Free QR code generator, vibe-coded by ',
    privacy: 'Your content never leaves this page. No cookies, no tracking, no accounts.',
    github: 'Open source on GitHub',
    more: 'More free QR code generators',
    ogAlt: 'No BS QR: your new favourite no bullshit QR code generator.',
    home: 'Home',
  },
  de: {
    locale: 'de_DE', htmlLang: 'de',
    byline: 'Kostenloser QR-Code-Generator, vibe-coded von ',
    privacy: 'Deine Inhalte verlassen diese Seite nie. Keine Cookies, kein Tracking, keine Konten.',
    github: 'Open Source auf GitHub',
    more: 'Weitere kostenlose QR-Code-Generatoren (Englisch)',
    ogAlt: 'No BS QR: dein neuer Lieblings-QR-Code-Generator ohne Bullshit.',
    home: 'Start',
  },
};
