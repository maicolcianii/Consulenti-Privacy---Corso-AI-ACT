import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function App() {
  // Form state
  const [formData, setFormData] = useState({
    nome: '',
    azienda: '',
    email: '',
    ruolo: '',
    ruoloAltro: '',
    dipendenti: '',
    consenso: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('iscrizione');
    if (el) {
      const isDesktop = window.innerWidth >= 960;
      if (isDesktop) {
        // Su desktop il modulo è affiancato all'headline nell'hero principale:
        // scrollando a inizio pagina (top: 0), l'intero hero e il modulo sono perfettamente visibili
        // con 72px di respiro naturale sotto l'header sticky, senza alcun taglio.
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        // Su mobile e tablet il modulo è posizionato sotto l'headline:
        // calcoliamo l'offset esatto dell'header sticky (68px/84px) con 24px di margine superiore
        // per mostrare la card completa (angoli arrotondati, ombra e titolo) senza nascondere nulla.
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : (window.innerWidth < 640 ? 68 : 84);
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const targetPosition = elementPosition - headerHeight - 24;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });
      }
    }
  };

  // Predisposizione per webhook (Zapier o MailUp)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.ruolo === 'Altro' && !formData.ruoloAltro.trim()) {
      return;
    }

    const finalRuolo =
      formData.ruolo === 'Altro'
        ? `Altro: ${formData.ruoloAltro.trim()}`
        : formData.ruolo;

    const webhookPayload = {
      nome: formData.nome,
      azienda: formData.azienda,
      email: formData.email,
      ruolo: finalRuolo,
      dipendenti: formData.dipendenti,
      consenso: formData.consenso,
      dataIscrizione: new Date().toISOString(),
      fonte: 'Landing Page AI Literacy',
    };

    // Callback webhook pronta per Zapier / MailUp:
    // fetch('https://hooks.zapier.com/hooks/catch/xxxx/yyyy', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(webhookPayload)
    // });
    console.log('Webhook payload registrato con successo:', webhookPayload);

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1E1B3A] font-sans">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E6E4F5] h-[68px] sm:h-[84px]">
        <div className="max-w-[1160px] mx-auto h-full px-6 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center shrink-0">
            <img
              src="/logo-consulenti-privacy.webp"
              alt="Consulenti Privacy"
              height={52}
              onError={(e) => {
                e.currentTarget.style.visibility = 'hidden';
              }}
              className="h-[40px] sm:h-[52px] w-auto object-contain"
            />
          </a>

          <a
            href="#iscrizione"
            onClick={scrollToForm}
            className="flex-none shrink-0 inline-flex items-center justify-center font-semibold rounded-[6px] bg-[#302687] hover:bg-[#3e32a6] text-white text-[13px] py-[9px] px-[16px] sm:text-[15px] sm:py-[14px] sm:px-[26px] whitespace-nowrap transition cursor-pointer"
          >
            <span className="inline sm:hidden">Iscriviti</span>
            <span className="hidden sm:inline">Iscriviti alla lista d’attesa</span>
          </a>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative overflow-hidden bg-brand-gradient text-white pt-[48px] pb-[56px] min-[960px]:pt-[72px] min-[960px]:pb-[80px]">
        {/* Aloni radiali bianchi semitrasparenti */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-white/10 blur-3xl transform translate-x-1/3 -translate-y-1/3"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full bg-white/10 blur-3xl transform -translate-x-1/3 translate-y-1/3"
        />

        <div className="relative max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 min-[960px]:grid-cols-[55%_45%] gap-12 items-center">
            {/* Colonna sinistra */}
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/15 border border-white/40 text-white backdrop-blur-sm mb-6">
                Corso AI Literacy · AI Act, art. 4
              </div>

              <h1 className="text-[32px] sm:text-[40px] min-[960px]:text-[46px] font-bold leading-[1.15] tracking-tight">
                L’AI Act obbliga le aziende{' '}
                <span className="text-[#D9D5FA]">
                  a formare chi usa l’Intelligenza Artificiale.
                </span>
              </h1>

              <p className="mt-6 text-[17px] text-white/88 leading-relaxed max-w-xl">
                <span className="inline sm:hidden">
                  Un corso online on demand sull’uso corretto dell’IA, come richiesto dall’art. 4 dell’AI Act: ognuno lo segue quando vuole, con attestato nominativo.
                </span>
                <span className="hidden sm:inline">
                  Un corso online on demand che forma i dipendenti sull’uso corretto dell’IA, come richiesto dall’art. 4 del Regolamento europeo. Nessuna diretta e nessuna data da fissare: ognuno lo segue quando vuole, in circa 90 minuti complessivi, e al termine riceve un attestato nominativo.
                </span>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center bg-[#302687]/60 border border-white/20 text-white text-[14px] font-medium px-4 py-2 rounded-lg backdrop-blur-sm">
                  On demand, quando vuoi
                </span>
                <span className="inline-flex items-center bg-[#302687]/60 border border-white/20 text-white text-[14px] font-medium px-4 py-2 rounded-lg backdrop-blur-sm">
                  Senza fermare il lavoro
                </span>
                <span className="inline-flex items-center bg-[#302687]/60 border border-white/20 text-white text-[14px] font-medium px-4 py-2 rounded-lg backdrop-blur-sm">
                  Attestato nominativo
                </span>
              </div>
            </div>

            {/* Colonna destra: Form Card */}
            <div
              id="iscrizione"
              className="scroll-mt-[88px] min-[960px]:scroll-mt-[110px] bg-white rounded-[14px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(48,38,135,0.25)] text-[#1E1B3A] border border-[#E6E4F5]"
            >
              {!isSubmitted ? (
                <div>
                  <h2 className="text-[22px] font-bold text-[#302687] leading-snug">
                    Sii tra i primi ad accedere al corso
                  </h2>
                  <p className="mt-2 text-[14px] text-[#5E5B78] leading-relaxed">
                    Avrai la precedenza all’apertura dei nuovi corsi e potrai scaricare subito il modello Excel per la mappatura degli strumenti di IA nella tua azienda.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Riga 1: Nome e cognome | Azienda */}
                    <div className="grid grid-cols-1 min-[560px]:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                          Nome e cognome *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                          placeholder="Mario Rossi"
                          className="w-full h-11 px-3.5 text-sm bg-white border border-[#E6E4F5] rounded-md text-[#1E1B3A] placeholder-[#5E5B78]/60 focus:outline-none focus:border-[#302687] focus:ring-1 focus:ring-[#302687]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                          Azienda *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.azienda}
                          onChange={(e) =>
                            setFormData({ ...formData, azienda: e.target.value })
                          }
                          placeholder="Nome dell’azienda"
                          className="w-full h-11 px-3.5 text-sm bg-white border border-[#E6E4F5] rounded-md text-[#1E1B3A] placeholder-[#5E5B78]/60 focus:outline-none focus:border-[#302687] focus:ring-1 focus:ring-[#302687]"
                        />
                      </div>
                    </div>

                    {/* Email aziendale */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                        Email aziendale *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="mario.rossi@azienda.it"
                        className="w-full h-11 px-3.5 text-sm bg-white border border-[#E6E4F5] rounded-md text-[#1E1B3A] placeholder-[#5E5B78]/60 focus:outline-none focus:border-[#302687] focus:ring-1 focus:ring-[#302687]"
                      />
                    </div>

                    {/* Riga 2: Ruolo | Dipendenti */}
                    <div className="grid grid-cols-1 min-[560px]:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                          Il tuo ruolo in azienda *
                        </label>
                        <select
                          required
                          value={formData.ruolo}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              ruolo: val,
                              ruoloAltro: val === 'Altro' ? prev.ruoloAltro : '',
                            }));
                          }}
                          className="w-full h-11 px-3 text-sm bg-white border border-[#E6E4F5] rounded-md text-[#1E1B3A] focus:outline-none focus:border-[#302687] focus:ring-1 focus:ring-[#302687]"
                        >
                          <option value="">Seleziona</option>
                          <option value="Titolare / Direzione">
                            Titolare / Direzione
                          </option>
                          <option value="Risorse umane">Risorse umane</option>
                          <option value="DPO / Compliance">DPO / Compliance</option>
                          <option value="IT">IT</option>
                          <option value="Altro">Altro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                          Dipendenti da formare *
                        </label>
                        <select
                          required
                          value={formData.dipendenti}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dipendenti: e.target.value,
                            })
                          }
                          className="w-full h-11 px-3 text-sm bg-white border border-[#E6E4F5] rounded-md text-[#1E1B3A] focus:outline-none focus:border-[#302687] focus:ring-1 focus:ring-[#302687]"
                        >
                          <option value="">Seleziona</option>
                          <option value="1–10">1–10</option>
                          <option value="11–50">11–50</option>
                          <option value="51–250">51–250</option>
                          <option value="Oltre 250">Oltre 250</option>
                        </select>
                      </div>
                    </div>

                    {/* Campo specifica ruolo se "Altro" */}
                    {formData.ruolo === 'Altro' && (
                      <div className="animate-fade-slide">
                        <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                          Specifica il tuo ruolo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.ruoloAltro}
                          onChange={(e) =>
                            setFormData({ ...formData, ruoloAltro: e.target.value })
                          }
                          placeholder="Es. Responsabile qualità"
                          className="w-full h-11 px-3.5 text-sm bg-white border border-[#E6E4F5] rounded-md text-[#1E1B3A] placeholder-[#5E5B78]/60 focus:outline-none focus:border-[#302687] focus:ring-1 focus:ring-[#302687]"
                        />
                      </div>
                    )}

                    {/* Checkbox informativa privacy */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer text-left">
                        <input
                          type="checkbox"
                          required
                          checked={formData.consenso}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consenso: e.target.checked,
                            })
                          }
                          className="mt-1 h-4 w-4 rounded border-[#E6E4F5] text-[#302687] focus:ring-[#302687]"
                        />
                        <span className="text-[13px] text-[#5E5B78] leading-snug">
                          Ho preso visione dell’
                          <a
                            href="https://www.iconsulentiprivacy.it/privacy-cookie-policy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#302687] underline hover:text-[#5A4FC0] font-medium"
                          >
                            informativa privacy
                          </a>{' '}
                          e acconsento al trattamento dei dati per ricevere informazioni sul corso.
                        </span>
                      </label>
                    </div>

                    {/* Bottone CTA */}
                    <button
                      type="submit"
                      className="w-full btn-primary text-center mt-2 shadow-md"
                    >
                      Richiedi l’accesso prioritario
                    </button>

                    <p className="text-center text-[12.5px] text-[#5E5B78] pt-1">
                      L’iscrizione non comporta alcun impegno di acquisto.
                    </p>
                  </form>
                </div>
              ) : (
                /* Stato di conferma dopo l'invio */
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#302687] text-white flex items-center justify-center mb-5 shadow-lg">
                    <Check className="w-9 h-9 stroke-[2.5]" />
                  </div>
                  <h3 className="text-[22px] font-bold text-[#302687]">
                    Iscrizione confermata
                  </h3>
                  <p className="mt-3 text-[14.5px] text-[#5E5B78] leading-relaxed max-w-sm">
                    Il modello di mappatura è in arrivo nella tua casella email. All’apertura del corso gli iscritti saranno contattati per primi.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLIENTI */}
      <section className="bg-white border-b border-[#E6E4F5] py-12">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 min-[960px]:grid-cols-[260px_1fr] gap-8 items-center">
            {/* Sinistra */}
            <div>
              <h2 className="text-[26px] font-bold text-[#302687] leading-tight">
                Oltre 500 clienti in tutta Italia
              </h2>
              <p className="mt-2 text-[14.5px] text-[#5E5B78] leading-relaxed">
                Aziende, enti e associazioni che affidano la propria compliance a Consulenti Privacy.
              </p>
            </div>

            {/* Destra: griglia 4x2 su desktop, 2 colonne su mobile */}
            <div className="grid grid-cols-2 min-[560px]:grid-cols-4 gap-6 items-center">
              {[
                { alt: 'Belle Vetrate Scorrevoli', src: '/cliente-belle.webp' },
                { alt: 'Babbi', src: '/cliente-babbi.webp' },
                { alt: 'Gruppo Carli', src: '/cliente-gruppo-carli.webp' },
                { alt: 'Fondazione Santa Rita da Cascia', src: '/cliente-santa-rita.webp' },
                { alt: 'Urbinati', src: '/cliente-urbinati.webp' },
                { alt: 'Pumaisdue', src: '/cliente-pumaisdue.webp' },
                { alt: "Citrus l'orto italiano", src: '/cliente-citrus.webp' },
                { alt: 'POLI.design', src: '/cliente-polidesign.webp' },
              ].map((client) => (
                <div
                  key={client.src}
                  className="flex items-center justify-center p-2 h-[60px]"
                >
                  <img
                    src={client.src}
                    alt={client.alt}
                    height={44}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden';
                    }}
                    className="h-[44px] w-auto max-w-full object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. IL CONTESTO NORMATIVO */}
      <section className="bg-white pt-16 min-[960px]:pt-[88px] pb-12">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[14px] font-semibold text-[#8C82DE] uppercase tracking-wider block">
              Il contesto normativo
            </span>
            <h2 className="text-[28px] sm:text-[34px] min-[960px]:text-[38px] font-bold text-[#302687] mt-2 leading-tight">
              Cosa chiede l’AI Act alle aziende
            </h2>
            <p className="mt-4 text-[16px] text-[#5E5B78] leading-relaxed">
              L’art. 4 del Regolamento (UE) 2024/1689, applicabile dal 2 febbraio 2025, chiede alle organizzazioni che utilizzano sistemi di Intelligenza Artificiale di adottare misure per sviluppare le competenze del personale che li impiega, in modo proporzionato alle dimensioni dell’azienda, ai ruoli e ai rischi.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[960px]:grid-cols-3 gap-6 mt-10">
            {/* Card 1 */}
            <div className="card-base flex flex-col justify-start">
              <div className="w-[42px] h-[42px] rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold text-[18px] mb-5 shadow-sm">
                1
              </div>
              <h3 className="text-[19px] font-bold text-[#302687] mb-2">
                Chi riguarda
              </h3>
              <p className="text-[15px] text-[#5E5B78] leading-relaxed">
                Tutto il personale che nell’attività lavorativa utilizza chatbot generativi, software con funzioni di IA o sistemi di raccomandazione e scoring.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-base flex flex-col justify-start">
              <div className="w-[42px] h-[42px] rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold text-[18px] mb-5 shadow-sm">
                2
              </div>
              <h3 className="text-[19px] font-bold text-[#302687] mb-2">
                Cosa serve
              </h3>
              <p className="text-[15px] text-[#5E5B78] leading-relaxed">
                Una formazione adeguata ai rischi reali dell’uso quotidiano dell’IA e la possibilità di dimostrare di averla svolta.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-base flex flex-col justify-start">
              <div className="w-[42px] h-[42px] rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold text-[18px] mb-5 shadow-sm">
                3
              </div>
              <h3 className="text-[19px] font-bold text-[#302687] mb-2">
                Perché ora
              </h3>
              <p className="text-[15px] text-[#5E5B78] leading-relaxed">
                Dal 2 agosto 2026 le autorità nazionali hanno avviato le attività di vigilanza sull’applicazione del Regolamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4b. BLOCCO MAGNET CON ANTEPRIMA (CTA INTERMEDIA 1) */}
      <section className="bg-white pb-16 min-[960px]:pb-[88px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="bg-brand-gradient rounded-[18px] p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-10 items-center">
              {/* Sinistra */}
              <div>
                <span className="text-[14px] font-semibold text-[#D9D5FA] uppercase tracking-wider block">
                  Incluso con l’iscrizione
                </span>
                <h3 className="text-[24px] sm:text-[30px] min-[960px]:text-[32px] font-bold text-white mt-2 leading-tight">
                  Il modello per mappare l’uso dell’IA in azienda
                </h3>
                <p className="mt-4 text-[15.5px] text-white/88 leading-relaxed">
                  Un file Excel pronto da compilare per capire quali strumenti di IA vengono utilizzati, in quali reparti e da quante persone. Il riepilogo calcola in automatico quante persone formare e quali utilizzi richiedono attenzione.
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-[14.5px] text-white">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Censimento di strumenti, reparti e utilizzatori</span>
                  </li>
                  <li className="flex items-center gap-3 text-[14.5px] text-white">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Evidenza di strumenti non autorizzati e dati riservati</span>
                  </li>
                  <li className="flex items-center gap-3 text-[14.5px] text-white">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Numero di persone da formare, calcolato in automatico</span>
                  </li>
                </ul>

                <div className="mt-8">
                  <a
                    href="#iscrizione"
                    onClick={scrollToForm}
                    className="btn-primary-outline"
                  >
                    Ricevi il modello e iscriviti →
                  </a>
                </div>
              </div>

              {/* Destra: Anteprima Excel costruita in HTML/CSS */}
              <div className="relative">
                <div className="bg-white rounded-[12px] shadow-2xl overflow-hidden border border-[#DAD7EE] text-[#1E1B3A] rotate-0 min-[960px]:rotate-[1.2deg] transition-transform">
                  {/* Barra superiore grigio-lilla #F1F0F8 con tre pallini grigi e nome file */}
                  <div className="bg-[#F1F0F8] px-4 py-2.5 flex items-center justify-between border-b border-[#DAD7EE]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C9C5E0]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C9C5E0]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C9C5E0]" />
                    </div>
                    <span className="text-[12px] font-medium text-[#5E5B78] font-mono">
                      Mappatura_strumenti_IA.xlsx
                    </span>
                    <div className="w-8" />
                  </div>

                  {/* Schede */}
                  <div className="flex items-center bg-[#F1F0F8]/60 px-3 pt-1 border-b border-[#DAD7EE] text-[11px] gap-2">
                    <span className="px-2.5 py-1 text-[#5E5B78]">
                      Istruzioni
                    </span>
                    <span className="px-3 py-1 bg-white text-[#302687] font-bold rounded-t border-t border-x border-[#DAD7EE] -mb-[1px]">
                      Mappatura
                    </span>
                    <span className="px-2.5 py-1 text-[#5E5B78]">
                      Riepilogo
                    </span>
                  </div>

                  {/* Tabella con intestazione #302687 e testo bianco 11px */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-[#302687] text-white">
                          <th className="py-2 px-3 font-semibold border-r border-[#4A3FB5]">
                            Strumento di IA
                          </th>
                          <th className="py-2 px-3 font-semibold border-r border-[#4A3FB5] hidden min-[560px]:table-cell">
                            Reparto
                          </th>
                          <th className="py-2 px-2.5 font-semibold text-center border-r border-[#4A3FB5]">
                            Persone
                          </th>
                          <th className="py-2 px-2.5 font-semibold text-center border-r border-[#4A3FB5]">
                            Autorizzato
                          </th>
                          <th className="py-2 px-3 font-semibold text-center">
                            Dati riservati
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#EFEDFB]">
                        <tr className="border-b border-[#DAD7EE]">
                          <td className="py-2 px-3 font-medium text-[#1E1B3A] border-r border-[#DAD7EE]">
                            ChatGPT
                          </td>
                          <td className="py-2 px-3 text-[#5E5B78] border-r border-[#DAD7EE] hidden min-[560px]:table-cell">
                            Marketing
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            4
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            Sì
                          </td>
                          <td className="py-2 px-3 text-center text-[#1E1B3A]">
                            No
                          </td>
                        </tr>

                        <tr className="border-b border-[#DAD7EE]">
                          <td className="py-2 px-3 font-medium text-[#1E1B3A] border-r border-[#DAD7EE]">
                            ChatGPT
                          </td>
                          <td className="py-2 px-3 text-[#5E5B78] border-r border-[#DAD7EE] hidden min-[560px]:table-cell">
                            Commerciale
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            5
                          </td>
                          <td className="py-2 px-2.5 text-center border-r border-[#DAD7EE]">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1D6] text-[#8A5A00]">
                              Da verificare
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1D6] text-[#8A5A00]">
                              Sì
                            </span>
                          </td>
                        </tr>

                        <tr className="border-b border-[#DAD7EE]">
                          <td className="py-2 px-3 font-medium text-[#1E1B3A] border-r border-[#DAD7EE]">
                            Copilot
                          </td>
                          <td className="py-2 px-3 text-[#5E5B78] border-r border-[#DAD7EE] hidden min-[560px]:table-cell">
                            Amministraz.
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            4
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            Sì
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1D6] text-[#8A5A00]">
                              Sì
                            </span>
                          </td>
                        </tr>

                        <tr className="border-b border-[#DAD7EE]">
                          <td className="py-2 px-3 font-medium text-[#1E1B3A] border-r border-[#DAD7EE]">
                            Gemini
                          </td>
                          <td className="py-2 px-3 text-[#5E5B78] border-r border-[#DAD7EE] hidden min-[560px]:table-cell">
                            Direzione
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            2
                          </td>
                          <td className="py-2 px-2.5 text-center border-r border-[#DAD7EE]">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FCE4E4] text-[#9B1C1C]">
                              No
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center text-[#5E5B78]">
                            Non so
                          </td>
                        </tr>

                        <tr className="border-b border-[#DAD7EE]">
                          <td className="py-2 px-3 font-medium text-[#1E1B3A] border-r border-[#DAD7EE]">
                            Selezione CV
                          </td>
                          <td className="py-2 px-3 text-[#5E5B78] border-r border-[#DAD7EE] hidden min-[560px]:table-cell">
                            HR
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            2
                          </td>
                          <td className="py-2 px-2.5 text-center text-[#1E1B3A] border-r border-[#DAD7EE]">
                            Sì
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1D6] text-[#8A5A00]">
                              Sì
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Riga finale bianca */}
                  <div className="bg-white p-3.5 flex items-center justify-between border-t border-[#DAD7EE]">
                    <span className="text-[13px] font-semibold text-[#302687]">
                      Persone da formare
                    </span>
                    <span className="text-[26px] font-bold text-[#302687] bg-[#EFEDFB] px-3.5 py-1 rounded-md border border-[#DAD7EE]">
                      28
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IL PROGRAMMA */}
      <section className="bg-[#F5F4FC] py-16 min-[960px]:py-[88px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 min-[960px]:grid-cols-[45%_55%] gap-12 items-start">
            {/* Sinistra */}
            <div>
              <span className="text-[14px] font-semibold text-[#8C82DE] uppercase tracking-wider block">
                Il programma
              </span>
              <h2 className="text-[28px] sm:text-[34px] min-[960px]:text-[38px] font-bold text-[#302687] mt-2 leading-tight">
                Cosa imparano i dipendenti
              </h2>
              <p className="mt-4 text-[16px] text-[#5E5B78] leading-relaxed">
                Un percorso pensato per coniugare adempimento normativo, praticità organizzativa e qualità dei contenuti, per chi utilizza l’IA nel lavoro di tutti i giorni.
              </p>

              {/* Box con la sfumatura del brand */}
              <div className="bg-brand-gradient text-white rounded-[14px] p-6 sm:p-8 mt-8 shadow-lg">
                <h3 className="text-[18px] font-bold text-white mb-4">
                  Un corso on demand
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[14.5px]">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Nessuna diretta e nessuna data da concordare</span>
                  </li>
                  <li className="flex items-center gap-3 text-[14.5px]">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Fruizione flessibile, nei tempi compatibili con il lavoro</span>
                  </li>
                  <li className="flex items-center gap-3 text-[14.5px]">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Accesso individuale e riservato</span>
                  </li>
                  <li className="flex items-center gap-3 text-[14.5px]">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Contenuti uniformi per tutto il personale</span>
                  </li>
                  <li className="flex items-center gap-3 text-[14.5px]">
                    <Check className="w-5 h-5 text-[#D9D5FA] shrink-0 stroke-[2.5]" />
                    <span>Test finale e attestato nominativo</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Destra: Lista numerata 01–05 */}
            <div className="bg-white rounded-[14px] p-6 sm:p-8 border border-[#E6E4F5] shadow-sm divide-y divide-[#E6E4F5]">
              {/* 01 */}
              <div className="pb-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[24px] font-bold text-[#8C82DE]">01</span>
                  <h4 className="text-[18px] font-bold text-[#302687]">
                    Il quadro di riferimento
                  </h4>
                </div>
                <p className="text-[15px] text-[#5E5B78] leading-relaxed pl-10">
                  Perché la formazione è richiesta, a chi si rivolge e come è strutturato il percorso.
                </p>
              </div>

              {/* 02 */}
              <div className="py-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[24px] font-bold text-[#8C82DE]">02</span>
                  <h4 className="text-[18px] font-bold text-[#302687]">
                    Come funziona l’IA
                  </h4>
                </div>
                <p className="text-[15px] text-[#5E5B78] leading-relaxed pl-10">
                  Riconoscere chatbot generativi, sistemi di raccomandazione e scoring, e conoscerne i limiti: allucinazioni e bias.
                </p>
              </div>

              {/* 03 */}
              <div className="py-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[24px] font-bold text-[#8C82DE]">03</span>
                  <h4 className="text-[18px] font-bold text-[#302687]">
                    Rischi e opportunità
                  </h4>
                </div>
                <p className="text-[15px] text-[#5E5B78] leading-relaxed pl-10">
                  Usare l’IA in modo produttivo evitando discriminazioni algoritmiche, esposizione di dati riservati e strumenti non autorizzati (shadow AI).
                </p>
              </div>

              {/* 04 */}
              <div className="py-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[24px] font-bold text-[#8C82DE]">04</span>
                  <h4 className="text-[18px] font-bold text-[#302687]">
                    Le regole dell’AI Act
                  </h4>
                </div>
                <p className="text-[15px] text-[#5E5B78] leading-relaxed pl-10">
                  Le quattro categorie di rischio, le pratiche vietate e l’attuazione della normativa in Italia.
                </p>
              </div>

              {/* 05 */}
              <div className="pt-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[24px] font-bold text-[#8C82DE]">05</span>
                  <h4 className="text-[18px] font-bold text-[#302687]">
                    Le regole pratiche in azienda
                  </h4>
                </div>
                <p className="text-[15px] text-[#5E5B78] leading-relaxed pl-10">
                  Quali dati non inserire nei prompt, come verificare un output, quando serve la revisione umana, quali strumenti sono autorizzati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LA DOCUMENTAZIONE */}
      <section className="bg-white pt-16 min-[960px]:pt-[88px] pb-12">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-12 items-center">
            {/* Sinistra */}
            <div>
              <span className="text-[14px] font-semibold text-[#8C82DE] uppercase tracking-wider block">
                La documentazione
              </span>
              <h2 className="text-[28px] sm:text-[34px] min-[960px]:text-[38px] font-bold text-[#302687] mt-2 leading-tight">
                In caso di controllo, la formazione è documentata
              </h2>
              <p className="mt-4 text-[16px] text-[#5E5B78] leading-relaxed">
                L’AI Act non prevede una certificazione ufficiale per l’alfabetizzazione in materia di IA: chiede di adottare misure adeguate e di poterle dimostrare. Il corso fornisce all’azienda gli elementi per farlo.
              </p>

              <div className="mt-8 space-y-4 divide-y divide-[#E6E4F5]">
                <div className="flex items-start gap-3.5 pt-3">
                  <div className="w-6 h-6 rounded-full bg-[#302687] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[15px] text-[#1E1B3A]">
                    <strong>Attestato nominativo</strong> di partecipazione e superamento del corso, rilasciato dopo il test finale
                  </p>
                </div>

                <div className="flex items-start gap-3.5 pt-4">
                  <div className="w-6 h-6 rounded-full bg-[#302687] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[15px] text-[#1E1B3A]">
                    <strong>Tracciabilità</strong> delle attività e monitoraggio di ogni partecipante, grazie al formato SCORM
                  </p>
                </div>

                <div className="flex items-start gap-3.5 pt-4">
                  <div className="w-6 h-6 rounded-full bg-[#302687] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[15px] text-[#1E1B3A]">
                    <strong>Reportistica</strong> della piattaforma e-learning, utile ai fini documentali in caso di verifiche ispettive
                  </p>
                </div>
              </div>
            </div>

            {/* Destra: Anteprima attestato */}
            <div className="w-full">
              <div className="w-full aspect-[16/9] bg-white rounded-[14px] overflow-hidden border border-[#E6E4F5] shadow-[0_30px_70px_-36px_rgba(48,38,135,0.55)]">
                <img
                  src="/attestato-ai-literacy.webp"
                  alt="Fac-simile dell'attestato di partecipazione e superamento del corso AI Literacy di Consulenti Privacy"
                  width={1600}
                  height={900}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden';
                  }}
                  className="w-full h-auto aspect-[16/9] object-contain block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6b. CTA INTERMEDIA 2 (SFONDO BIANCO) */}
      <section className="bg-white pb-16 min-[960px]:pb-[88px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="bg-brand-gradient rounded-[18px] p-8 sm:p-12 text-white shadow-xl flex flex-col min-[960px]:flex-row min-[960px]:items-center justify-between gap-8">
            <div>
              <h3 className="text-[24px] sm:text-[30px] min-[960px]:text-[32px] font-bold text-white leading-tight">
                Ognuno si forma quando vuole, l’azienda documenta tutto.
              </h3>
              <p className="mt-2 text-[16px] text-white/88">
                Riserva l’accesso prioritario per la tua azienda.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="#iscrizione"
                onClick={scrollToForm}
                className="btn-primary-outline"
              >
                Riserva l’accesso prioritario →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CHI CURA IL CORSO */}
      <section className="bg-white py-16 min-[960px]:py-[88px] border-t border-[#E6E4F5]">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 min-[960px]:grid-cols-[40%_60%] gap-12 items-center">
            {/* Sinistra: /ceo.webp in 4/5 con targhetta bianca al 95% */}
            <div className="relative w-full max-w-sm mx-auto min-[960px]:max-w-none">
              <div className="relative w-full aspect-[4/5] rounded-[14px] overflow-hidden shadow-lg border border-[#E6E4F5]">
                <img
                  src="/ceo.webp"
                  alt="Paolo Rosetti, CEO e Data Protection Officer di Consulenti Privacy"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden';
                  }}
                  className="w-full h-full aspect-[4/5] object-cover rounded-[14px]"
                />
                {/* Targhetta bianca al 95% in basso sopra la foto */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md border border-[#E6E4F5]">
                  <p className="font-bold text-[#302687] text-[15px]">
                    Paolo Rosetti
                  </p>
                  <p className="text-[12.5px] text-[#5E5B78] mt-0.5">
                    CEO e Data Protection Officer, Consulenti Privacy
                  </p>
                </div>
              </div>
            </div>

            {/* Destra */}
            <div>
              <span className="text-[14px] font-semibold text-[#8C82DE] uppercase tracking-wider block">
                Chi cura il corso
              </span>
              <h2 className="text-[28px] sm:text-[34px] min-[960px]:text-[38px] font-bold text-[#302687] mt-2 leading-tight">
                Un corso curato da chi segue ogni giorno la compliance di oltre 500 aziende
              </h2>

              <blockquote className="mt-6 border-l-[3px] border-[#8C82DE] pl-5 text-[19px] font-medium text-[#1E1B3A] leading-relaxed italic">
                «L’Intelligenza Artificiale è entrata nelle aziende più in fretta delle regole per usarla. Con questo corso vogliamo dare a ogni dipendente le basi per utilizzarla in modo consapevole, e alle aziende la documentazione per dimostrarlo.»
              </blockquote>

              {/* Sotto: riga con /team.webp e testo */}
              <div className="mt-8 flex flex-col min-[560px]:flex-row items-center gap-5 p-4 rounded-xl bg-[#F5F4FC] border border-[#E6E4F5]">
                <img
                  src="/team.webp"
                  alt="Il team di Consulenti Privacy"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden';
                  }}
                  className="w-full min-[560px]:w-[200px] aspect-[3/2] object-cover rounded-[10px] shrink-0 shadow-sm"
                />
                <div>
                  <p className="text-[14.5px] text-[#5E5B78] leading-relaxed">
                    Un team di consulenti specializzati in GDPR, NIS2 e AI Act, con sedi a Rimini, Bologna, Milano e Roma, al fianco di aziende, enti pubblici e privati.
                  </p>
                  <a
                    href="https://www.iconsulentiprivacy.it/ai-legal-compliance-check/"
                    target="_blank"
                    rel="noopener"
                    className="inline-block mt-[10px] text-[14.5px] text-[#302687] font-semibold underline hover:opacity-85 transition-opacity"
                  >
                    Approfondisci la nostra consulenza AI Act sul sito →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIANZA */}
      <section className="bg-white pb-16 min-[960px]:pb-[88px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="bg-brand-gradient rounded-[18px] p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row gap-6 sm:gap-10 items-start">
            <span className="font-serif text-7xl sm:text-8xl leading-none select-none shrink-0 text-[#D9D5FA]">
              “
            </span>
            <div className="pt-2">
              <p className="text-[19px] leading-relaxed text-white/95">
                Grazie a un’attività di consulenza sartoriale, abbiamo potuto rendere effettivamente operativa la documentazione privacy predisposta e, attraverso una formazione mirata sul suo utilizzo, siamo diventati autonomi nel dialogo con i nostri clienti, potendo pur sempre contare sul supporto tempestivo dei consulenti.
              </p>
              <p className="mt-6 text-[15px] text-[#D9D5FA]">
                <strong className="text-white font-bold">
                  Il Team di Adria Congrex
                </strong>{' '}
                · Organizzazione di eventi e congressi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-[#F5F4FC] py-16 min-[960px]:py-[88px] border-t border-[#E6E4F5]">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center">
            <span className="text-[14px] font-semibold text-[#8C82DE] uppercase tracking-wider block">
              Domande frequenti
            </span>
            <h2 className="text-[28px] sm:text-[34px] min-[960px]:text-[38px] font-bold text-[#302687] mt-2 leading-tight">
              Le risposte alle domande più comuni
            </h2>
          </div>

          <div className="mt-10 bg-white rounded-[14px] border border-[#E6E4F5] divide-y divide-[#E6E4F5] shadow-sm">
            {[
              {
                q: "La formazione sull’IA è obbligatoria?",
                a: "Sì. L’art. 4 dell’AI Act, applicabile dal 2 febbraio 2025, richiede a chi utilizza sistemi di IA in ambito professionale di adottare misure per sviluppare le competenze del proprio personale, in modo proporzionato al contesto e ai rischi.",
              },
              {
                q: "Chi deve seguire il corso?",
                a: "Tutto il personale che nell’attività lavorativa utilizza o entra in contatto con strumenti di Intelligenza Artificiale: dagli uffici amministrativi al marketing, dalle risorse umane all’assistenza clienti.",
              },
              {
                q: "L’attestato è valido in caso di controllo?",
                a: "L’AI Act non prevede una certificazione ufficiale per l’alfabetizzazione in materia di IA. L’attestato nominativo di partecipazione e superamento, insieme alla tracciabilità e alla reportistica della piattaforma e-learning, costituisce la documentazione da esibire in caso di verifica.",
              },
              {
                q: "Serve fissare una data o fermare il lavoro?",
                a: "No. Il corso è on demand: non ci sono dirette né date da concordare. Ogni dipendente lo segue nel momento più adatto, per circa 90 minuti complessivi.",
              },
              {
                q: "L’iscrizione alla lista d’attesa è vincolante?",
                a: "No. L’iscrizione garantisce l’accesso prioritario e l’invio del modello di mappatura, senza alcun impegno di acquisto.",
              },
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="px-6 py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                  >
                    <span className="text-[17px] font-semibold text-[#1E1B3A] group-hover:text-[#302687] transition-colors">
                      {faq.q}
                    </span>
                    <span className="text-[24px] font-bold text-[#8C82DE] shrink-0 leading-none select-none">
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-[15px] text-[#5E5B78] leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CTA FINALE */}
      <section className="bg-white py-16 min-[960px]:py-[88px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="bg-[#F5F4FC] border border-[#E6E4F5] rounded-[18px] p-8 sm:p-[52px] flex flex-col min-[960px]:flex-row min-[960px]:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[26px] sm:text-[30px] font-bold text-[#302687] leading-tight">
                Il corso è in arrivo. Riserva l’accesso prioritario per il tuo personale.
              </h2>
              <p className="mt-3 text-[16px] text-[#5E5B78] leading-relaxed">
                Iscriviti alla lista d’attesa e ricevi subito il modello Excel per la mappatura degli strumenti di IA in azienda.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="#iscrizione"
                onClick={scrollToForm}
                className="btn-primary"
              >
                Iscriviti alla lista d’attesa →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#111214] text-[#C9C9D2] text-[14px]">
        <div className="max-w-[1160px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 min-[960px]:grid-cols-3 gap-10 items-start">
            {/* Colonna 1: logo icona footer */}
            <div>
              <img
                src="/logo-icona-footer.webp"
                alt="Consulenti Privacy"
                height={64}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden';
                }}
                className="h-[64px] w-auto object-contain"
              />
            </div>

            {/* Colonna 2: Sedi */}
            <div className="space-y-2 leading-relaxed">
              <p>
                <strong className="text-white font-bold">RIMINI</strong> – Via Valentini 11
              </p>
              <p>
                <strong className="text-white font-bold">BOLOGNA</strong> – Via Vittorio Lugli 4/A-D
              </p>
              <p>
                <strong className="text-white font-bold">MILANO</strong> – Corso Europa 15
              </p>
              <p>
                <strong className="text-white font-bold">ROMA</strong> – Via Mario Bianchini 51
              </p>
            </div>

            {/* Colonna 3: Contatti */}
            <div className="space-y-2">
              <p className="font-bold text-white text-base">
                0541 1798723
              </p>
              <p>
                <a
                  href="mailto:info@iconsulentiprivacy.it"
                  className="text-[#C9C9D2] hover:text-white transition-colors underline"
                >
                  info@iconsulentiprivacy.it
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Barra legale su #1B1C20 */}
        <div className="bg-[#1B1C20] py-5 border-t border-white/5">
          <div className="max-w-[1160px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-[#C9C9D2]">
            <p className="text-center sm:text-left">
              Consulenti Privacy S.r.l., Via Valentini 11, 47923 Rimini (RN) · P.IVA 04391970409
            </p>
            <div>
              <a
                href="https://www.iconsulentiprivacy.it/privacy-cookie-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Informativa privacy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL INFORMATIVA PRIVACY */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl text-[#1E1B3A] relative">
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute top-5 right-5 text-[#5E5B78] hover:text-[#1E1B3A] p-1 rounded-md cursor-pointer"
              aria-label="Chiudi"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-[20px] font-bold text-[#302687] mb-4">
              Informativa sul trattamento dei dati personali (art. 13 Reg. UE 2016/679)
            </h3>

            <div className="space-y-4 text-[14px] text-[#5E5B78] leading-relaxed">
              <p>
                <strong>Titolare del Trattamento:</strong> Consulenti Privacy S.r.l., con sede legale in Via Valentini 11, 47923 Rimini (RN) - P.IVA 04391970409. Contatto email:{' '}
                <a href="mailto:info@iconsulentiprivacy.it" className="text-[#302687] underline">
                  info@iconsulentiprivacy.it
                </a>.
              </p>
              <p>
                <strong>Finalità del trattamento e base giuridica:</strong> I dati personali conferiti attraverso la compilazione del form (nome, cognome, azienda, email aziendale, ruolo e dimensione dell’organico da formare) sono trattati esclusivamente per:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Gestire l’iscrizione alla lista d’attesa prioritaria del corso e-learning «AI Literacy (art. 4 AI Act)».</li>
                <li>Inviare all’indirizzo email indicato il modello Excel operativo per la mappatura degli strumenti di IA in azienda.</li>
                <li>Fornire aggiornamenti sull’apertura delle iscrizioni al corso e sulle modalità di fruizione.</li>
              </ul>
              <p>
                La base giuridica del trattamento è l’esecuzione di misure precontrattuali adottate su richiesta dell’interessato (art. 6, par. 1, lett. b, GDPR) e il consenso espresso dell’interessato (art. 6, par. 1, lett. a, GDPR).
              </p>
              <p>
                <strong>Modalità di trattamento e conservazione:</strong> I dati saranno trattati con strumenti informatici idonei a garantirne la sicurezza e la riservatezza. Non saranno ceduti a terzi per scopi promozionali. Saranno conservati per il tempo strettamente necessario alla gestione della lista d’attesa e delle comunicazioni relative al corso.
              </p>
              <p>
                <strong>Diritti dell’interessato:</strong> L’interessato ha il diritto di chiedere in qualunque momento l’accesso ai dati, la rettifica, la cancellazione, la limitazione del trattamento o di opporsi al trattamento inviando una comunicazione a{' '}
                <a href="mailto:info@iconsulentiprivacy.it" className="text-[#302687] underline">
                  info@iconsulentiprivacy.it
                </a>.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6E4F5] flex justify-end">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="btn-primary"
              >
                Ho capito e chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
