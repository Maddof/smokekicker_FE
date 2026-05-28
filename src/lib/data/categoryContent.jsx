import { CATEGORY_SLUGS } from "./categorySlugs";

const vapeWarningText =
  "Elektroniska cigaretter är nikotinprodukter för vuxna och innehåller nikotin som är ett mycket beroendeframkallande ämne. Åldersverifikation (BankID) krävs för varje köp.";

export const categoryContent = {
  [CATEGORY_SLUGS.DEFAULT]: {
    title: "Allt inom vape, e-juice och vitt snus",
    description:
      "Upptäck lättanvända podsystem, förfyllda pods, e-juice, vitt snus och nikotinprodukter – noggrant utvalda för att stötta ett steg bort från traditionell tobak. Eller smarta prenumerationer som ser till att du alltid har ettt fräscht vape-kit. För dig som vill gå hela vägen erbjuder vi även nikotinfria alternativ och klassisk konfektyr för att bryta vanor.",
    heroImage: "/images/bg/vape_bg_shop.jpg",
    heroImageAlt: "Vape maskin i neon",
    showNavigationButtons: true,
    warningLabelText: vapeWarningText,
    belowHero: {
      title: "Upptäck vårt sortiment",
      iconImgBg: "/images/icons/sketches/multiple_pods_transp.png",
      inconImgBgAlt: "Vape pods illustration",
      initialParagraphs: 3,
      content: (
        <>
          <p>
            På <b>Smokify</b> gör vi saker lite annorlunda. Här hittar du varken
            engångsvapes eller nikotinstarka snuspåsar. I stället fokuserar vi
            på kvalitativa, användarvänliga och återanvändbara produkter som ger
            dig kontroll över ditt nikotinintag – och hjälper dig på vägen mot
            en framtid utan traditionell tobak.
          </p>
          <p>
            Vi tror på att göra skillnad – både för dig och för miljön. Därför
            väljer vi produkter som minskar avfall och är bättre för planeten,
            till exempel podsystem där endast själva poden byts ut istället för
            hela enheten. Vi undviker engångsprodukter och samarbetar med
            varumärken som delar vårt engagemang för hållbarhet och kvalitet.
          </p>
          <p>
            Från förfyllda pods och podsystem till vitt snus och
            nikotintuggummin – vårt sortiment är noga utvalt för att vara
            enkelt, stilrent och tillfredsställande. Allt för att göra ditt val
            både smartare och mer hållbart.
          </p>
          <h2 className="mt-4 font-bold">Våra produktkategorier</h2>
          <h3 className="mt-3 font-semibold">Prenumerationer</h3>
          <p>
            Få dina favoritsmaker levererade regelbundet direkt hem och slipp
            stressen med spontanköp. Du sparar både tid och pengar, samtidigt
            som du minskar onödigt avfall. Du bestämmer själv innehåll och
            leveransintervall. Underhållsprodukter ingår också för att du alltid
            ska ha det du behöver.
          </p>
          <h3 className="mt-4 font-semibold">
            Podsystem Startkit (förfyllda pods)
          </h3>
          <p>
            Den perfekta starten för dig som vill börja med vaping. Kompletta
            paket med batterienhet, laddare och ofta en eller flera pods. När
            smaken förändras eller börjar smaka bränt byter du enkelt pod i
            stället för hela enheten.
          </p>
          <h3 className="mt-4 font-semibold">
            Startkit Vape (påfyllningsbara pods)
          </h3>
          <p>
            För dig som vill ha mer frihet att välja smak och nikotinstyrka.
            Våra påfyllningsbara podsystem har integrerade coils i varje pod, så
            du byter bara pod när det är dags – lika enkelt som förfyllda pods
            (nästan).
          </p>
          <h3 className="mt-3 font-semibold">Förfyllda Poddar</h3>
          <p>
            Praktiska pods med färdig e-vätska som enkelt klickas på ditt
            podsystem. Finns i olika smaker och nikotinstyrkor för att passa din
            personliga preferens – och med mindre avfall än engångsvapes.
          </p>
          <h3 className="mt-3 font-semibold">E-juice</h3>
          <p>
            E-juice för påfyllningsbara podsystem, med ett brett utbud av smaker
            och nikotinstyrkor. Välj din favorit och fyll på dina pods när det
            behövs för en skräddarsydd vaping-upplevelse.
          </p>
          <h3 className="mt-3 font-semibold">Vitt Snus</h3>
          <p>
            Ett tobaksfritt, diskret och modernt nikotinalternativ. Vitt snus
            missfärgar inte tänderna och är enkelt att använda var du än är –
            ett smart val för dig som vill undvika tobak men ändå ha nikotin.
          </p>
          <h3 className="mt-3 font-semibold">Nikotinersättning</h3>
          <p>
            Nikotintuggummin och liknande produkter gör det lättare att hantera
            nikotinbehovet på ett flexibelt och kontrollerat sätt. Perfekt för
            dig som vill trappa ner eller sluta helt, utan att ge upp
            vardagsfriheten.
          </p>
          <h3 className="mt-3 font-semibold">Konfektyr</h3>
          <p>
            Nikotinfritt tuggummi och godis som hjälper dig minska röksuget och
            bryta vanor. Ett smart sätt att hålla munnen sysselsatt – och ett
            steg närmare ett helt nikotinfritt liv.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Blogginlägg om vape, podsystem och nikotinfritt",
      description:
        "Läs guider och tips om podsystem, e-juice, vitt snus och rökfria alternativ – allt för att hjälpa dig ta ett steg bort från tobak.",
    },
  },
  [CATEGORY_SLUGS.START_KIT_PREFILLED]: {
    title: "Förfyllda Vape Startkit Podsystem",
    description:
      "Förfyllda podsystem är ett enkelt och effektivt alternativ för dig som vill börja med vape och sluta röka. Slipp påfyllning och inställningar – bara ladda och börja puffa. Diskreta, lättanvända och ger en tillfredsställande nikotinupplevelse som liknar känslan av att röka, men utan tobaken.",
    heroImage: "/images/bg/vape_bg_shop.jpg",
    heroImageAlt: "Förfyllt podsystem i neon",
    showNavigationButtons: false,
    belowHero: {
      title: "Vad är ett podsystem?",
      iconImgBg: "/images/icons/sketches/vape_sketch_bg.png",
      inconImgBgAlt: "Vape pods illustration",
      initialParagraphs: 2,
      content: (
        <>
          <p>
            Ett podsystem är en modern och användarvänlig form av e-cigarett,
            särskilt utvecklad för att ge en smidig och diskret
            nikotinupplevelse. Till skillnad från stora vape-enheter med
            avancerade inställningar, är podsystem små, kompakta och enkla att
            använda – ofta utan några knappar alls.
          </p>
          <p>
            Ett podsystem består av två delar: själva enheten (batteriet) och en
            pod, alltså en kapsel fylld med e-vätska. Podden kan vara förfylld
            eller påfyllningsbar beroende på modell, vi saluför båda varianter.
            När smaken förändras eller podden är slut, byter du den enkelt mot
            en ny.
          </p>
          <h2 className="mt-4 font-bold">Fördelar med podsystem</h2>

          <h3 className="mt-3 font-semibold">Diskret & användarvänligt</h3>
          <p>
            Liten storlek, smidig design och inga komplicerade inställningar gör
            podsystem perfekta både för nybörjare och vana användare.
          </p>
          <h3 className="mt-3 font-semibold">Kostnadseffektivt</h3>
          <p>Podsystem är ofta billigare i drift än engångsvapes.</p>
          <h3 className="mt-3 font-semibold">Mer hållbart & miljövänligt</h3>
          <p>
            Engångsvapes slängs efter användning och bidrar till stora mängder
            avfall. Med podsystem byter du bara ut själva poden, inte hela
            enheten – vilket sparar både resurser och miljön.
          </p>
          <h3 className="mt-3 font-semibold">Ingen rök, bara ånga</h3>
          <p>
            Cigaretter innehåller tusentals kemikalier, varav många är
            cancerframkallande. Podsystem eliminerar tobaksförbränning, vilket
            kraftigt minskar mängden farliga ämnen du får i dig.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Guider om förfyllda podsystem och vape startkit",
      description:
        "Lär dig allt om förfyllda podsystem – hur du väljer rätt startkit, byter pods och får bästa möjliga vaping-upplevelse utan krångel.",
    },
  },
  [CATEGORY_SLUGS.START_KIT_VAPE]: {
    title: "Startkit Vape",
    description:
      "Påfyllningsbara podsystem med integrerade coils. Byt pod vid behov och fyll på med valfri e-juice för en praktisk, kostnadseffektiv och mer resurseffektiv användning.",
    heroImage: "/images/bg/vape_bg_shop.jpg",
    heroImageAlt: "Påfyllningsbart podsystem i neon",
    showNavigationButtons: false,
    warningLabelText: vapeWarningText,
    belowHero: {
      title: "Påfyllningsbara Podsystem - Frihet & Flexibilitet",
      iconImgBg: "/images/icons/sketches/vape_sketch_bg.png",
      inconImgBgAlt: "Påfyllningsbart podsystem illustration",
      initialParagraphs: 2,
      content: (
        <>
          <p>
            Våra påfyllningsbara podsystem kombinerar enkelheten hos förfyllda
            pods med friheten att välja din egen e-juice. Med integrerade coils
            i varje pod behöver du aldrig byta värmespiral separat – när smaken
            börjar avta eller podden är slut, byter du helt enkelt till en ny
            pod och fyller på med din favoritsmak.
          </p>
          <p>
            Det är det bästa av två världar: lika enkelt som förfyllda pods, men
            med tillgång till hundratals e-juice-smaker och nikotinstyrkor. Du
            får full kontroll över din vaping-upplevelse utan krångliga
            inställningar eller komplicerat underhåll.
          </p>

          <h2 className="mt-4 font-bold">Så fungerar det</h2>
          <h3 className="mt-3 font-semibold">1. Fyll på podden</h3>
          <p>
            Öppna påfyllningshålet på podden och fyll på med valfri e-juice.
            Vänta några minuter så att veken hinner absorbera vätskan ordentligt
            innan första användning.
          </p>
          <h3 className="mt-3 font-semibold">2. Klicka fast podden</h3>
          <p>
            Sätt i podden i din enhet – den klickar enkelt på plats med magneter
            eller en snäppfunktion. Inga komplicerade anslutningar eller
            inställningar.
          </p>
          <h3 className="mt-3 font-semibold">3. Börja vejpa</h3>
          <p>
            De flesta av våra podsystem aktiveras automatiskt när du drar – inga
            knappar, inga menyer. Bara en smidig och tillfredsställande
            upplevelse.
          </p>
          <h3 className="mt-3 font-semibold">4. Byt pod vid behov</h3>
          <p>
            När smaken börjar förändras eller bli bränd är det dags att byta
            pod. Tack vare den integrerade coilen behöver du aldrig byta
            värmespiral separat – bara sätt i en ny pod och fortsätt.
          </p>

          <h2 className="mt-4 font-bold">Fördelar med påfyllningsbara pods</h2>
          <h3 className="mt-3 font-semibold">Obegränsade smakmöjligheter</h3>
          <p>
            Välj bland hundratals e-juice-smaker istället för att vara begränsad
            till ett fåtal förfyllda alternativ. Från klassisk tobak och mentol
            till exotiska frukter och söta desserter.
          </p>
          <h3 className="mt-3 font-semibold">Ekonomiskt smart</h3>
          <p>
            E-juice är mer ekonomiskt på längre sikt. På sikt sparar du pengar
            samtidigt som du får tillgång till fler smaker.
          </p>
          <h3 className="mt-3 font-semibold">Anpassa nikotinstyrkan</h3>
          <p>
            Välj exakt den nikotinstyrka som passar dig – från nikotinfritt till
            högre halter. Perfekt för dig som vill trappa ner gradvis eller
            hitta din optimala nivå.
          </p>
          <h3 className="mt-3 font-semibold">
            Integrerade coils = Enkel användning
          </h3>
          <p>
            Glöm krångliga coil-byten. Våra pods har inbyggda värmespiraler, så
            du byter bara hela podden när det är dags. Lika enkelt som förfyllda
            pods, men med mer frihet.
          </p>
          <h3 className="mt-3 font-semibold">Mer miljövänligt</h3>
          <p>
            Du fyller på samma pod flera gånger innan du byter, vilket minskar
            avfallet jämfört med förfyllda pods och engångsvapes.
          </p>

          <h2 className="mt-4 font-bold">Tips för bästa upplevelse</h2>
          <h3 className="mt-3 font-semibold">Låt podden "primea"</h3>
          <p>
            När du fyller på en ny pod, vänta 5-10 minuter innan du börjar vejpa
            så att bomullsveken hinner absorbera e-juicen. Detta förlänger
            poddens livslängd och ger bättre smak.
          </p>
          <h3 className="mt-3 font-semibold">Undvik att fylla för mycket</h3>
          <p>
            Fyll aldrig podden över max-markeringen. Överfyllning kan orsaka
            läckage och spottande.
          </p>
          <h3 className="mt-3 font-semibold">Byt pod i tid</h3>
          <p>
            När smaken börjar bli bränd eller avvikande är det dags att byta
            pod. Att fortsätta använda en utbränd coil ger en obehaglig
            upplevelse och kan vara skadligt.
          </p>
          <h3 className="mt-3 font-semibold">Förvara e-juice korrekt</h3>
          <p>
            Håll dina e-juicer mörkt, svalt och utom räckhåll för barn. Korrekt
            förvaring bevarar smaken och förlänger hållbarheten.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Tips om påfyllningsbara podsystem och e-juice",
      description:
        "Utforska guider om påfyllningsbara podsystem – rätt e-juice, hur du fyller på pods och tips för smidigare och mer flexibel vaping.",
    },
  },
  [CATEGORY_SLUGS.PREFILLED_PODS]: {
    title: "Förfyllda Poddar",
    description:
      "Byt smak på sekunder och slipp krångel. Våra förfyllda pods klickas enkelt på ditt podsystem och finns i flera smaker och nikotinstyrkor – en renare, mer hållbar och prisvärd lösning än engångsvapes och cigaretter.",
    heroImage: "/images/bg/vape-pods_bg_shoppage_2.jpg",
    heroImageAlt: "Förfyllda vape pods i neon",
    showNavigationButtons: false,
    warningLabelText: vapeWarningText,
    belowHero: {
      title: "Förfyllda Poddar - Enklast möjliga vaping",
      iconImgBg: "/images/icons/sketches/multiple_pods_transp.png",
      inconImgBgAlt: "Förfyllda pods illustration",
      initialParagraphs: 2,
      content: (
        <>
          <p>
            Förfyllda poddar är små kapslar fyllda med e-vätska som enkelt
            klickas fast i ditt podsystem. När smaken börjar avta eller podden
            är slut, byter du helt enkelt till en ny. Inga krångliga
            påfyllningar, ingen kladd – bara en smidig och bekväm
            vaping-upplevelse.
          </p>
          <p>
            Hos oss hittar du noggrant utvalda pods i flera olika smaker från
            flera olika märken och nikotinstyrkor, så att du kan anpassa din
            upplevelse efter just dina behov.
          </p>
          <h2 className="mt-4 font-bold">Fördelar med förfyllda pods</h2>
          <h3 className="mt-3 font-semibold">Enkelt och bekvämt</h3>
          <p>
            Inga påfyllningar, inga läckage, inget kladd. Bara sätt i podden och
            börja vejpa.
          </p>
          <h3 className="mt-3 font-semibold">Perfekt för nybörjare</h3>
          <p>
            Inget att ställa in, ingen e-juice att köpa separat. Allt du behöver
            finns redan i förpackningen, redo att användas direkt.
          </p>
          <p className="mt-3">
            Passar dig som vill ha en enkel och bekväm lösning utan att fylla på
            e-vätska själv. Uppskattar variation av smaker och vill kunna byta
            snabbt och smidigt. Vill ha en diskret, modern och mer hållbar
            alternativ till engångsvapes och cigaretter.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Guider och tips om förfyllda vape pods",
      description:
        "Hitta råd om hur du väljer rätt förfyllda pods, vilka smaker som passar dig och hur du enkelt byter pod på ditt podsystem.",
    },
  },
  [CATEGORY_SLUGS.E_JUICE]: {
    title: "E-Juice",
    description:
      "Fyll på din tank med premium e-juice i hundratals smaker och nikotinstyrkor. Från klassisk tobak till fruktiga och söta alternativ – hitta din favorit och anpassa din vape-upplevelse helt efter dina önskemål.",
    heroImage: "/images/bg/e-juice_bg.jpg",
    heroImageAlt: "E-juice flaska i neon ",
    showNavigationButtons: false,
    warningLabelText: vapeWarningText,
    belowHero: {
      title: "E-Juice - kontroll, smak och valfrihet",
      iconImgBg: "/images/icons/sketches/e-juice_sketch.png",
      inconImgBgAlt: "E-juice flaska illustration",
      initialParagraphs: 2,
      content: (
        <>
          <p>
            E-juice, även kallat e-vätska eller vape juice, är hjärtat i din
            vaping-upplevelse. Det är vätskan som förångas i din e-cigarett och
            ger dig både smak och nikotin. Hos oss hittar du ett noggrant utvalt
            sortiment av högkvalitativa e-juicer från pålitliga tillverkare –
            allt för att ge dig den bästa möjliga upplevelsen.
          </p>
          <p>
            Välj bland klassiska tobakssmaker, mentol, milda fruktprofiler och
            diskreta söta alternativ. Våra e-juicer finns i flera nikotinstyrkor
            – från nikotinfritt till kontrollerade nivåer – så att du kan
            anpassa användningen efter dina behov och eventuella mål att minska
            eller avsluta nikotinintag.
          </p>

          <h2 className="mt-4 font-bold">Vad innehåller e-juice?</h2>
          <p>
            E-juice består av några få, enkla ingredienser som tillsammans
            skapar din vaping-upplevelse:
          </p>
          <h3 className="mt-3 font-semibold">Propylenglykol (PG)</h3>
          <p>
            En tunn, smakfri vätska som bär smaken effektivt och ger en starkare
            "throat hit" – den känsla i halsen som liknar rökning. Högre PG-halt
            passar dig som vill ha mer smak och en intensivare känsla.
          </p>
          <h3 className="mt-3 font-semibold">Vegetabiliskt Glycerin (VG)</h3>
          <p>
            En tjockare, något söt vätska som producerar stora, tjocka ångmoln.
            Högre VG-halt passar dig som vill ha mjukare drag och imponerande
            ångproduktion.
          </p>
          <h3 className="mt-3 font-semibold">Smakämnen</h3>
          <p>
            Livsmedelsklassade aromer som ger e-juicen dess unika smak. Från
            autentiska tobakssmaker till kreativa frukt- och
            dessertkombinationer.
          </p>
          <h3 className="mt-3 font-semibold">Nikotin (valfritt)</h3>
          <p>
            Farmaceutiskt nikotin i olika styrkor. Välj den nivå som passar dig
            – eller gå helt nikotinfritt om du föredrar det.
          </p>

          <h2 className="mt-4 font-bold">Fördelar med e-juice</h2>
          <h3 className="mt-3 font-semibold">Oändliga smakmöjligheter</h3>
          <p>
            Till skillnad från förfyllda pods har du med e-juice tillgång till
            ett nästan obegränsat utbud av smaker. Blanda och matcha för att
            skapa din egen unika kombination.
          </p>
          <h3 className="mt-3 font-semibold">Ekonomiskt smart</h3>
          <p>
            E-juice är ofta det mest prisvärda alternativet för regelbundna
            vejpare.
          </p>
          <h3 className="mt-3 font-semibold">Full kontroll</h3>
          <p>
            Anpassa PG/VG-förhållande och nikotinstyrka efter dina preferenser.
            Du bestämmer exakt hur din vaping-upplevelse ska kännas.
          </p>
          <h3 className="mt-3 font-semibold">Miljövänligare alternativ</h3>
          <p>
            Återanvändbara tankar och större flaskor innebär mindre
            plastförbrukning och avfall jämfört med engångsprodukter.
          </p>

          <h2 className="mt-4 font-bold">Välj rätt nikotinstyrka</h2>
          <p>
            Att välja rätt nikotinstyrka är viktigt för en tillfredsställande
            upplevelse:
          </p>
          <ul className="mt-2 list-disc pl-6">
            <li>
              <strong>0 mg:</strong> Nikotinfritt – för dig som vill känna av
              smaken utan nikotin.
            </li>
            <li>
              <strong>3 mg:</strong> Låg styrka – passar lätta rökare eller de
              som trappar ner.
            </li>
            <li>
              <strong>6 mg:</strong> Medium styrka – för måttliga rökare.
            </li>
            <li>
              <strong>12 mg:</strong> Högre styrka – för dig som rökt mer
              regelbundet.
            </li>
            <li>
              <strong>18+ mg:</strong> Hög styrka – för tunga rökare i
              övergångsfasen.
            </li>
          </ul>
          <p className="mt-3">
            Vår rekommendation: Börja med en styrka som matchar dina nuvarande
            vanor och justera sedan efter behov. Målet kan vara att gradvis
            trappa ner till lägre styrkor eller helt nikotinfritt.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Allt om e-juice – smaker, styrkor och blandningar",
      description:
        "Utforska vår blogg för tips om hur du väljer e-juice, förstår PG/VG-förhållanden och hittar din perfekta nikotinstyrka och smak.",
    },
  },
  [CATEGORY_SLUGS.NICOTINE_CESSATION]: {
    title: "Nikotinersättning",
    description:
      "Tuggummi, Plåster & Spray för dig som vill trappa ner eller sluta röka.",
    heroImage: "/images/bg/nicotine-formula_bg_shop.jpg",
    heroImageAlt: "Nikotinformel i neon",
    showNavigationButtons: false,
    warningLabelText:
      "Receptfria nikotinprodukter för vuxna (18+). Läs bipacksedeln noga före användning. För farmaceutisk rådgivning, kontakta apotek eller Läkemedelsupplysningen.",
    belowHero: {
      title: "Nikotintuggummi - Diskret och effektivt",
      iconImgBg: "/images/icons/nicotine.png",
      inconImgBgAlt: "Nikotintuggummi illustration",
      initialParagraphs: 2,
      content: (
        <>
          <p>
            Nikotinersättning är produkter som hjälper dig hantera
            nikotinbehovet på ett mer kontrollerat sätt – utan rök, tobak eller
            onödiga tillsatser. Det är ett beprövat stöd för dig som vill trappa
            ner eller sluta helt med cigaretter och andra tobaksprodukter.
          </p>
          <p>
            I vårt sortiment hittar du <strong>nikotintuggummin</strong>,{" "}
            <strong>nikotinplåster</strong> och <strong>nikotinspray</strong> –
            enkla och effektiva hjälpmedel som gör det lättare att ta kontroll
            över ditt nikotinintag, steg för steg.
          </p>
          <p className="mt-3">
            Passar dig som vill sluta röka eller snusa men fortfarande behöver
            stöd i övergången. Söker ett tobaksfritt, diskret och beprövat
            alternativ. Vill ha friheten att anpassa styrka och form efter dina
            behov.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Guider om nikotinersättning och rökavvänjning",
      description:
        "Läs om nikotintuggummi, plåster och spray – produkter som hjälper dig trappa ner eller sluta med nikotin på ett kontrollerat sätt.",
    },
  },
  [CATEGORY_SLUGS.WHITE_SNUS]: {
    title: "Vitt Snus",
    description:
      "Nikotinportioner i diskreta påsar och låg nikotinhalt. Ett modernt, tobaksfritt alternativ till traditionellt snus och cigaretter.",
    heroImage: "/images/bg/vitt-snus_bg_shop_2.jpg",
    heroImageAlt: "Vitt snus dosa i neon",
    showNavigationButtons: false,
    warningLabelText:
      "Vitt snus är en nikotinprodukt för vuxna och innehåller nikotin som är ett mycket beroendeframkallande ämne. Åldersverifikation (BankID) krävs för varje köp.",
    belowHero: {
      title: "Vitt snus (nikotinpåsar) – tobaksfritt alternativ",
      iconImgBg: "/images/icons/sketches/nicotine_pouch_sketch-min.png",
      inconImgBgAlt: "Vitt snus illustration",
      initialParagraphs: 2,
      content: (
        <>
          <p>
            Vitt snus, även kallat nikotinpåsar, är en tobaksfri nikotinprodukt
            avsedd för vuxna användare (18+). Produkten innehåller nikotin, som
            är ett beroendeframkallande ämne, men ingen tobak. Till skillnad
            från traditionellt snus innehåller vitt snus växtfiber istället för
            tobak, som inte orsakar missfärgning av tänder och utan tobaksdoft.
          </p>
          <p>
            Portionspåsarna placeras under läppen och används utan rök eller
            förbränning. Vitt snus avger ingen rök och har ingen tobaksdoft,
            vilket gör produkten diskret vid användning.
          </p>
          <h2 className="mt-4 font-bold">Så fungerar vitt snus</h2>
          <p>
            Nikotinpåsarna placeras under överläppen där nikotinet absorberas
            genom munslemhinnan. Eftersom produkten inte förbränns uppstår ingen
            rök, vilket gör vitt snus till ett diskret alternativ – både inomhus
            och i sociala sammanhang.
          </p>
          <ul>
            <li>
              <strong>Tobaksfritt snus:</strong> Innehåller ingen tobak – endast
              nikotin och fyllnadsämnen.
            </li>
            <li>
              <strong>Rökfritt alternativ:</strong> Ingen rök, aska eller lukt.
            </li>
            <li>
              <strong>Diskret format:</strong> Små, vita påsar som inte rinner
              eller missfärgar.
            </li>
            <li>
              <strong>Kontrollerad dosering:</strong> Varje portion innehåller
              en jämn mängd nikotin.
            </li>
            <li>
              <strong>Flera styrkor och smaker:</strong> Finns i olika
              nikotinhalter och smaker.
            </li>
          </ul>
          <h3 className="mt-3 font-semibold">Viktig Information</h3>
          <p>
            Nikotin är ett mycket beroendeframkallande ämne. Denna produkt är
            inte riskfri och rekommenderas endast för personer som redan
            använder nikotin. Produkten ska inte användas av gravida eller
            ammande och ska förvaras utom räckhåll för barn.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Blogginlägg om vitt snus och nikotinpåsar",
      description:
        "Lär dig mer om vitt snus som tobaksfritt alternativ – hur nikotinpåsar fungerar, skillnaden mot traditionellt snus och tips för rätt användning.",
    },
  },
  [CATEGORY_SLUGS.CANDY]: {
    title: "Konfektyr",
    description:
      "Bryt vanor, minska stress och håll röksuget borta. Våra tuggummin, pastiller och godis är ett enkelt steg mot ett helt nikotinfritt liv.",
    heroImage: "/images/bg/candy-snacks_bg_shoppage.jpg",
    heroImageAlt: "Godis och tuggummin i neon",
    showNavigationButtons: false,
    warningLabelText:
      "Konfektyrprodukter är nikotinfria och avsedda för vuxna (18+). Åldersverifikation (BankID) krävs för varje köp.",
    belowHero: {
      title: "Varför godis för rökstopp?",
      iconImgBg: "/images/icons/sketches/candy_sketch-min.png",
      inconImgBgAlt: "Konfektyr illustration",
      initialParagraphs: 1,
      content: (
        <>
          <p>
            Våra konfektyrprodukter – tuggummin, pastiller och godis – är helt
            nikotinfria alternativ som kan hjälpa dig att hantera röksug och
            bryta vanor. De är ett perfekt komplement till
            nikotinersättningsprodukter eller som sista steget mot ett helt
            nikotinfritt liv.
          </p>
          <h2 className="mt-4 font-bold">Fördelar med konfektyr</h2>
          <h3 className="mt-3 font-semibold">Hjälper vid orala vanor</h3>
          <p>
            Många som slutar röka saknar känslan av att ha något i munnen. Våra
            produkter ersätter den orala fixeringen som ofta är kopplad till
            rökning.
          </p>
          <h3 className="mt-3 font-semibold">Stressreducerande</h3>
          <p>
            Tuggande kan ha en lugnande effekt och bidra till minskad stress och
            ångest under avvänjningsperioden.
          </p>
          <h3 className="mt-3 font-semibold">Helt nikotinfritt</h3>
          <p>
            Till skillnad från nikotinersättningsprodukter innehåller konfektyr
            inget nikotin – perfekt för dig som vill ta det sista steget bort
            från nikotin helt och hållet.
          </p>
          <h3 className="mt-3 font-semibold">Distraktionseffekt</h3>
          <p>
            En stark smak, en pastill eller en slickepinne kan ge dig något
            annat att fokusera på när suget efter nikotin gör sig påmint.
          </p>
          <h3 className="mt-3 font-semibold">Ett hälsosammare substitut</h3>
          <p>
            Istället för att återgå till rökning eller ta en cigarett under sug,
            kan konfektyr vara en enkel, vardagsvänlig lösning.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Tips om nikotinfritt godis och rökstopp",
      description:
        "Läs hur nikotinfritt tuggummi och godis kan hjälpa dig bryta vanor och hantera röksug – ett enkelt steg mot ett helt nikotinfritt liv.",
    },
  },

  [CATEGORY_SLUGS.ACCESSORIES]: {
    title: "Tillbehör",
    description:
      "Allt du behöver för att hålla din vape i toppskick. Coils, pods, batterier och laddare – hitta rätt reservdelar och tillbehör för ditt podsystem.",
    heroImage: "/images/bg/vape_accessories_bg_shoppage.jpg",
    heroImageAlt: "Vape tillbehör i neon",
    showNavigationButtons: false,
    warningLabelText:
      "Vape-produkter är avsedda för vuxna (18+). Åldersverifikation (BankID) krävs för varje köp.",
    belowHero: {
      title: "Tillbehör - Håll din vape i toppform",
      iconImgBg: "/images/icons/sketches/usb_charger_sketch.png",
      inconImgBgAlt: "Vape tillbehör illustration",
      initialParagraphs: 2,
      content: (
        <>
          <p>
            Här hittar du alla tillbehör du behöver för att få ut det mesta av
            din vaping-upplevelse. Oavsett om du behöver nya coils för bättre
            smak, extra pods för att byta mellan smaker, eller en ny laddare för
            att hålla enheten redo – vi har dig täckt.
          </p>
          <p>
            Regelbundet underhåll och rätt tillbehör gör stor skillnad. Med
            fräscha coils får du renare smak, med extra pods kan du växla mellan
            favoritsmaker utan att behöva tömma och fylla på, och med pålitliga
            laddare har du alltid batterikraft när du behöver den.
          </p>

          <h2 className="mt-4 font-bold">Våra tillbehörskategorier</h2>

          <h3 className="mt-3 font-semibold">Coils (Värmespiraler)</h3>
          <p>
            Coilen är hjärtat i din vape – det är den som värmer upp e-juicen
            och skapar ångan. Med tiden slits coilen och smaken försämras. Byt
            coil regelbundet för att behålla ren, intensiv smak och undvika
            brända drag. Vi har coils för de flesta populära podsystem.
          </p>

          <h3 className="mt-3 font-semibold">Pods (Patroner)</h3>
          <p>
            Extra pods är perfekt för dig som gillar att ha flera smaker igång
            samtidigt. Fyll olika pods med olika e-juicer och byt enkelt mellan
            dem efter humör. Pods med integrerade coils gör bytet ännu smidigare
            – bara klicka på en ny pod och fortsätt.
          </p>

          <h3 className="mt-3 font-semibold">Batterier</h3>
          <p>
            Har ditt batteri börjat tappa kapacitet? Ett nytt batteri ger dig
            längre användningstid och jämnare effekt. Vi erbjuder
            ersättningsbatterier och kompletta enheter för utvalda podsystem.
          </p>

          <h3 className="mt-3 font-semibold">Laddare & Kablar</h3>
          <p>
            Tappat bort laddaren eller behöver en extra? Våra USB-C-laddare och
            kablar är kompatibla med de flesta moderna podsystem. Ha en hemma,
            en på jobbet och en i väskan – så är du alltid redo.
          </p>

          <h2 className="mt-4 font-bold">Varför köpa tillbehör hos oss?</h2>

          <h3 className="mt-3 font-semibold">Originaltillbehör</h3>
          <p>
            Vi säljer endast originaltillbehör och kvalitetsprodukter från
            pålitliga tillverkare. Inga kopior eller billiga ersättningar som
            kan skada din enhet eller ge sämre upplevelse.
          </p>

          <h3 className="mt-3 font-semibold">Rätt tillbehör till rätt enhet</h3>
          <p>
            Osäker på vilken coil eller pod som passar din enhet? Varje produkt
            har tydlig information om kompatibilitet. Du kan också kontakta oss
            om du behöver hjälp att hitta rätt.
          </p>

          <h3 className="mt-3 font-semibold">Spara med prenumeration</h3>
          <p>
            Använder du regelbundet coils eller pods? Lägg till dem i din
            prenumeration och få dem levererade automatiskt – med fri frakt och
            bättre pris.
          </p>

          <h2 className="mt-4 font-bold">När bör du byta tillbehör?</h2>

          <h3 className="mt-3 font-semibold">Coils</h3>
          <ul className="mt-2 list-disc pl-6">
            <li>Smaken blir svagare eller annorlunda</li>
            <li>Du märker en bränd eller metallisk smak</li>
            <li>Ångan minskar trots fulladdat batteri</li>
            <li>Vanligtvis var 1-2 vecka beroende på användning</li>
          </ul>

          <h3 className="mt-3 font-semibold">Pods</h3>
          <ul className="mt-2 list-disc pl-6">
            <li>Smaken försämras även efter coil-byte</li>
            <li>Podden läcker eller är sprucken</li>
            <li>Du vill ha en ren start med ny smak</li>
          </ul>

          <h3 className="mt-3 font-semibold">Batteri</h3>
          <ul className="mt-2 list-disc pl-6">
            <li>Batteriet håller inte lika länge som förut</li>
            <li>Enheten stängs av oväntat</li>
            <li>Laddningen tar längre tid än normalt</li>
          </ul>

          <h3 className="mt-3 font-semibold">Laddare</h3>
          <ul className="mt-2 list-disc pl-6">
            <li>Kabeln är skadad eller sliten</li>
            <li>Laddningen är långsam eller intermittent</li>
            <li>Du behöver extra laddare för bekvämlighet</li>
          </ul>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Guider om vape-tillbehör, coils och reservdelar",
      description:
        "Lär dig när du ska byta coil, pod eller batteri och hitta tips för att hålla ditt podsystem i toppskick längre med rätt underhåll.",
    },
  },

  [CATEGORY_SLUGS.SUBSCRIPTIONS]: {
    title: "Smarta Prenumerationer",
    description:
      "En prenumeration som gör skillnad – mer hållbar än engångsvapes, mer flexibel än vanliga köp. Få dina favoritsmaker levererade direkt hem och alltid med fri frakt. Anpassa din box efter dina behov och ändra eller pausa när du vill.",
    heroImage: "/images/bg/subscription_bg_shop.jpg",
    heroImageAlt: "Prenumerationslåda med olika vapes i neon",
    showNavigationButtons: false,
    warningLabelText: vapeWarningText,
    belowHero: {
      title: "Prenumerationer - Bekvämt, Flexibelt & Prisvärt",
      iconImgBg: "/images/icons/sketches/vape_prenumeration_sketch.png",
      inconImgBgAlt: "Prenumerationslåda illustration",
      initialParagraphs: 3,
      content: (
        <>
          <p>
            Hos Smokify är en prenumeration inte vilken prenumeration som helst.
            Vi har skapat en tjänst som är lika flexibel som den är smart – med
            fokus på kvalitet, hållbarhet och frihet för dig.
          </p>
          <p>
            Få dina favoritsmaker och produkter levererade regelbundet direkt
            hem eller välj slumpmässiga smaker. Du bestämmer, anpassa din box
            efter dina preferenser och välj leveransintervall som passar dig –
            allt kontrollerar du själv från din kontrollpanel.
          </p>
          <p>
            Början vape enheten slitas ut? Inga problem. Du kan enkelt lägga
            till ersättningsdelar i din nästa leverans. Allt för att din
            upplevelse ska vara så smidig som möjligt. Är du osäker på vad du
            vill ha? Välj slumpmässiga smaker och låt oss överraska dig med nya
            favoriter varje gång.
          </p>

          <h2 className="mt-4 text-lg font-bold">Fördelar med prenumeration</h2>
          <h3 className="mt-3 font-semibold">Spara tid & pengar</h3>
          <p>
            Slipp sista-minuten-stressen. Med en prenumeration får du fri frakt,
            bättre priser än vid enstaka köp och slipper oroa dig för att
            produkterna tar slut.
          </p>
          <h3 className="mt-3 font-semibold">Upptäck nya favoriter</h3>
          <p>
            Vill du överraskas? Välj slumpmässiga smaker i din prenumeration.
            Vår prenumeration gör det enkelt att upptäcka nya favoriter med
            överraskningar i varje leverans.
          </p>
          <h3 className="mt-3 font-semibold">Trygg garanti</h3>
          <p>
            Går något sönder? Beställ enkelt ett ersättningskit. Du gör det
            enkelt efter att ha loggat in på ditt konto.
          </p>
          <h3 className="mt-3 font-semibold">Flexibla extratillägg</h3>
          <p>
            Behöver du mer nikotintuggummi för att hålla suget i schack? Eller
            vill du prova vårt nikotinfria godis? Lägg enkelt till extra
            produkter i din nästa leverans – du bestämmer själv.
          </p>
        </>
      ),
    },
    relatedPostsSection: {
      title: "Om vape-prenumerationer och smarta nikotinval",
      description:
        "Läs om hur en smart vape-prenumeration kan spara tid och pengar – och hur du anpassar smaker, leveransintervall och tillbehör efter dina behov.",
    },
  },
};

export const categoryFaqContent = {
  [CATEGORY_SLUGS.START_KIT_PREFILLED]: {
    title: "Frågor och svar om förfyllda podsystem",
    description:
      "Svar på de vanligaste frågorna om förfyllda podsystem – hur de fungerar, hur du använder dem och vad du bör tänka på.",
    items: [
      {
        question: "Vad är ett podsystem?",
        answer:
          "Ett podsystem är en modern och användarvänlig form av e-cigarett som består av två huvuddelar: batteridelen och en pod (kapsel) med e-vätska. De är designade för att vara enkla att använda utan komplicerade inställningar.",
      },
      {
        question: "Hur länge räcker batteriet?",
        answer:
          "Ett fulladdat batteri räcker vanligtvis för 1-2 dagars användning, beroende på hur intensivt du använder enheten. De flesta moderna podsystem laddas inom 30-60 minuter.",
      },
      {
        question: "Behöver jag trycka på någon knapp?",
        answer:
          "Det beror på modellen. Vissa podsystem aktiveras automatiskt när du drar, medan andra har en knapp som du behöver hålla inne medan du tar ett bloss.",
      },
      {
        question: "När ska jag byta pod?",
        answer:
          "Du bör byta pod när smaken försämras, när du märker en bränd lukt/smak, eller när e-vätskan börjar ta slut. Beroende på användning räcker en pod vanligtvis 2-7 dagar.",
      },
      {
        question: "Kan jag använda andra pods med mitt system?",
        answer:
          "Det varierar mellan olika märken och modeller. Det säkraste är att använda pods som är specifikt designade för ditt system för att säkerställa kompatibilitet och prestanda.",
      },
    ],
  },
  [CATEGORY_SLUGS.START_KIT_VAPE]: {
    title: "Frågor och svar om påfyllnings-bara podsystem",
    description:
      "Allt du behöver veta om påfyllningsbara pods – hur de fungerar, hur du fyller på och vad du bör tänka på.",
    items: [
      {
        question: "Vad är ett påfyllningsbart podsystem?",
        answer:
          "Ett påfyllningsbart podsystem är en typ av e-cigarett där du fyller på podden själv med valfri e-juice istället för att använda förfyllda pods. Våra system har integrerade coils, vilket betyder att du bara byter hela podden när det är dags – ingen separat coil-hantering.",
      },
      {
        question: "Hur fyller jag på en pod?",
        answer:
          "Öppna påfyllningshålet (vanligtvis på sidan eller toppen av podden), fyll på med e-juice upp till max-markeringen, och stäng hålet ordentligt. Vänta sedan 5-10 minuter innan första användning så att veken hinner absorbera vätskan.",
      },
      {
        question: "Vilken typ av e-juice passar bäst?",
        answer:
          "För podsystem rekommenderar vi e-juice med högre PG-halt (50/50 eller 60PG/40VG) och nikotinsalt för bästa smakupplevelse och throat hit. Tjockare vätskor med hög VG-halt kan ha svårt att absorberas i mindre pods.",
      },
      {
        question: "Hur ofta behöver jag byta pod?",
        answer:
          "En pod räcker vanligtvis 1-2 veckor vid normal användning, beroende på hur ofta du vejpar och vilken e-juice du använder. Byt pod när smaken försämras, blir bränd eller om du märker läckage.",
      },
      {
        question: "Hur många gånger kan jag fylla på samma pod?",
        answer:
          "De flesta pods kan fyllas på 5-10 gånger innan coilen är utbränd och smaken försämras. Exakt antal beror på e-juice, användning och hur väl du sköter podden.",
      },
      {
        question: "Varför smakar det bränt?",
        answer:
          "En bränd smak betyder oftast att coilen är utbränd och podden behöver bytas. Det kan också hända om du vejpar med tom eller nästan tom pod, eller om du inte lät veken absorbera vätskan ordentligt innan första användning.",
      },
      {
        question: "Kan jag använda vilken e-juice som helst?",
        answer:
          "Ja, du kan använda de flesta e-juicer, men vi rekommenderar tunnare vätskor med 50/50 eller högre PG-halt för bästa resultat. Undvik mycket tjocka vätskor (max VG) då de kan orsaka dålig vekabsorption och torrbloss.",
      },
      {
        question: "Hur länge räcker batteriet?",
        answer:
          "Batteritiden varierar mellan modeller, men de flesta håller en hel dag vid normal användning. Laddning tar vanligtvis 30-60 minuter via USB-C.",
      },
    ],
  },
  [CATEGORY_SLUGS.PREFILLED_PODS]: {
    title: "Frågor och svar om vape pods",
    description:
      "Svar på de vanligaste frågorna om förfyllda pods – hur de fungerar, hur du byter dem och vad du bör tänka på.",
    items: [
      {
        question: "Vad är en förfylld pod?",
        answer:
          "En förfylld pod är en engångsbehållare fylld med e-vätska som används i pod-system. När vätskan tar slut byter du bara ut podden – enkelt och bekvämt.",
      },
      {
        question: "Hur länge räcker en förfylld pod?",
        answer:
          "En förfylld pod räcker vanligtvis för omkring 600 till 800 puffar, vilket motsvarar ungefär 2-3 dagars användning för en genomsnittlig användare. Detta varierar dock beroende på hur ofta och hur långa drag du tar.",
      },
      {
        question: "Kan jag fylla på en förfylld pod själv?",
        answer:
          "Nej, förfyllda pods är designade för engångsbruk och är inte avsedda att fyllas på. När vätskan är slut ska poden bytas ut mot en ny.",
      },
      {
        question: "Är förfyllda pods bättre än engångsvapes?",
        answer:
          "Ja, förfyllda pods är ett miljövänligare alternativ eftersom bara själva poden byts ut medan enheten återanvänds. Detta genererar mindre elektroniskt avfall jämfört med engångsvapes där hela enheten slängs.",
      },
      {
        question: "Hur byter jag min förfyllda pod?",
        answer:
          "Byt ut podden genom att ta bort den gamla och sätta i en ny. Se till att enheten är avstängd innan du byter podden. Varje startkit innehåller instruktioner för korrekt byte.",
      },
    ],
  },
  [CATEGORY_SLUGS.E_JUICE]: {
    title: "Frågor och svar om e-juice",
    description:
      "Allt du behöver veta om e-juice – ingredienser, användning och hur du väljer rätt produkt för dig.",
    items: [
      {
        question: "Vad är e-juice?",
        answer:
          "E-juice, även kallat e-vätska eller vape juice, är den vätska som förångas i en e-cigarett. Den består vanligtvis av propylenglykol (PG), vegetabiliskt glycerin (VG), smakämnen och eventuellt nikotin.",
      },
      {
        question: "Vad betyder PG och VG?",
        answer:
          "PG (propylenglykol) ger bättre smakåtergivning och en starkare 'throat hit'. VG (vegetabiliskt glycerin) producerar tjockare ånga och ger en mjukare känsla. De flesta e-juicer har en blandning av båda, t.ex. 50/50 eller 70/30 VG/PG.",
      },
      {
        question: "Vilken nikotinstyrka ska jag välja?",
        answer:
          "Det beror på dina tidigare rökvanor. Om du rökte mycket rekommenderas 12-18 mg/ml. Måttliga rökare passar bättre med 6-12 mg/ml. Lätta rökare eller de som vill trappa ner kan välja 3-6 mg/ml. Nikotinfria alternativ (0 mg) finns också.",
      },
      {
        question: "Hur förvarar jag e-juice korrekt?",
        answer:
          "Förvara e-juice mörkt, svalt och torrt, borta från direkt solljus och värme. Håll alltid flaskan väl stängd och oåtkomlig för barn och husdjur. Korrekt förvaring förlänger hållbarheten och bevarar smaken.",
      },
      {
        question: "Hur länge håller en flaska e-juice?",
        answer:
          "Det varierar beroende på hur ofta du vejpar. En 10 ml flaska räcker vanligtvis 3-7 dagar för en genomsnittlig användare. E-juice har normalt en hållbarhet på 1-2 år oöppnad, men bör användas inom 3-6 månader efter öppning för bästa smak.",
      },
      {
        question: "Kan jag blanda olika e-juice smaker?",
        answer:
          "Ja, många vejpare experimenterar med att blanda olika smaker för att skapa unika kombinationer. Börja med små mängder för att testa resultatet. Se dock till att blanda e-juicer med samma PG/VG-förhållande för bästa resultat.",
      },
      {
        question: "Varför smakar min e-juice bränt?",
        answer:
          "En bränd smak beror oftast på att coilen (värmespiralen) är utbränd och behöver bytas, eller att tanken har fått slut på vätska. Det kan också hända om du vejpar med för hög effekt för din coil. Byt coil regelbundet och håll tanken fylld.",
      },
    ],
  },
  [CATEGORY_SLUGS.WHITE_SNUS]: {
    title: "Frågor och svar om vitt snus",
    description:
      "Vanliga frågor om vitt snus (nikotinpåsar), hur det används, dess innehåll och skillnader jämfört med traditionellt snus.",
    items: [
      {
        question: "Vad är vitt snus?",
        answer:
          "Vitt snus, även kallat nikotinpåsar, är ett tobaksfritt alternativ till traditionellt snus. Det består av växtfibrer, nikotin, smakämnen och andra livsmedelsgodkända ingredienser. Eftersom det inte innehåller tobak ger det en renare upplevelse utan tobaksdoft och med minimal risk för missfärgning av tänder.",
      },
      {
        question: "Hur använder man vitt snus?",
        answer:
          "Placera en nikotinpåse under överläppen och låt den verka. Nikotinet absorberas genom munslemhinnan och effekten känns vanligtvis inom några minuter. En portion kan användas i cirka 30–60 minuter beroende på individuell preferens.",
      },
      {
        question: "Är vitt snus säkrare än traditionellt snus?",
        answer:
          "Eftersom vitt snus inte innehåller tobak undviker användaren många av de skadliga ämnena som finns i tobak. Det innehåller dock fortfarande nikotin som är beroendeframkallande.",
      },
      {
        question: "Vad är skillnaden mellan snus och vitt snus?",
        answer:
          "Skillnaden mellan traditionellt snus och vitt snus är att vanligt snus innehåller tobak, medan vitt snus är helt tobaksfritt. Vitt snus är dessutom torrare, vitare och mer diskret i både smak och lukt.",
      },
      {
        question: "Hur starkt är vitt snus jämfört med vanligt snus?",
        answer:
          "Vitt snus finns i olika nikotinstyrkor, vanligtvis mellan 3 mg och ända upp till 50 mg per portion. Vi saluför dock inte de allra starkaste styrkorna. Styrkan kan jämföras med traditionellt snus, men eftersom vitt snus inte innehåller tobak kan upplevelsen av nikotinets effekt vara något annorlunda. Det är viktigt att välja en styrka som passar din tidigare nikotinanvändning och att använda produkten ansvarsfullt.",
      },
      {
        question: "Hur förvarar man vitt snus?",
        answer:
          "Förvara vitt snus svalt och torrt, helst i en lufttät behållare. Undvik direkt solljus och höga temperaturer för att bevara smak och kvalitet. Håll produkten utom räckhåll för barn och husdjur.",
      },
    ],
  },
  [CATEGORY_SLUGS.CANDY]: {
    title: "Frågor och svar om vårt konfektyr-sortiment",
    description:
      "Vanliga frågor om våra nikotinfria tuggummin och slickepinnar, perfekta som hjälpmedel för att sluta med nikotin.",
    items: [
      {
        question: "Varför erbjuder ni vanligt godis?",
        answer:
          "Många som försöker sluta med nikotin upplever ett behov av att hålla händer och mun sysselsatta. Vårt konfektyrsortiment erbjuder ett hälsosammare alternativ som kan hjälpa till med den orala fixeringen utan att tillföra nikotin.",
      },
      {
        question: "Hur kan tuggummi hjälpa vid rökavvänjning?",
        answer:
          "Tuggummi ger både en mekanisk aktivitet (tuggandet) och en smakupplevelse, vilket kan hjälpa till att distrahera från nikotinsug. Det hjälper också till att hantera stressen och kan minska suget efter cigaretter genom att hålla munnen sysselsatt.",
      },
      {
        question: "Kan slickepinnar verkligen hjälpa mig sluta med nikotin?",
        answer:
          "Ja, många ex-rökare rapporterar att slickepinnar och annat godis hjälper dem hantera suget genom att erbjuda en alternativ munstimulering. De fungerar både som en psykologisk distraktion och som ett sätt att hålla händerna och munnen upptagna.",
      },
      {
        question:
          "Kan jag använda dessa produkter tillsammans med nikotinersättning?",
        answer:
          "Absolut! Våra nikotinfria produkter kompletterar nikotinersättningsprodukter väl. Medan nikotinersättning hanterar det fysiska beroendet, hjälper vårt godis med vanor och beteenden kopplade till rökning eller vejpande.",
      },
      {
        question: "Vilka smaker finns tillgängliga?",
        answer:
          "Vi erbjuder en mängd olika smaker, inklusive mint, frukt, lakrits och bär. Många ex-rökare föredrar starka smaker som mint eller kanel, då dessa ger en liknande känsla i munnen som rökning tidigare gjorde.",
      },
    ],
  },
  [CATEGORY_SLUGS.SUBSCRIPTIONS]: {
    title: "Frågor och svar om vape prenumerationer",
    description:
      "Här hittar du svar på de vanligaste frågorna om våra vape prenumerationer.",
    items: [
      {
        question: "Hur fungerar en prenumeration?",
        answer:
          "Du väljer själv vilka produkter du vill ha, hur ofta de ska levereras och du kan enkelt ändra nästa leveransdatum när du vill. Allt sker via din kontrollpanel. Du kan även lägga till engångsköp till din nästa leverans när du vill från hela vårat sortiment, eller ta bort produkter du inte längre vill ha. Mix & Match – du bestämmer!",
      },
      {
        question: "Är det bindningstid?",
        answer:
          "Nej. Våra prenumerationer är helt flexibla – du kan ändra innehåll, leveransdatum eller avsluta när som helst utan extra kostnad.",
      },
      {
        question: "Jag ska resa iväg, kan jag pausa min prenumeration?",
        answer:
          "Ja och nej, du kan ändra nästa leveransdatum i din kontrollpanel, men du kan inte pausa prenumerationen helt och för evigt. Du kan dock avsluta när som helst utan extra kostnad och starta en ny när du är tillbaka.",
      },

      {
        question: "Vad händer om min vape-enhet går sönder?",
        answer:
          "Som prenumerant av förfyllda pods får du kostnadsfritt ersättningskit via din kontrollpanel baserat på antal levereranser. För vape kit får du ersättningspoddar. Kontakta vår kundtjänst vid övriga fel. Vi vill att du alltid ska ha en problemfri upplevelse.",
      },
      {
        question: "Måste jag köpa ett vape pod start-kit för att prenumerera?",
        answer:
          "Nej, äger du redan ett start-kit som passar pods eller e-vätskor kan du självklart prenumerera på pods och e-vätskor utan att köpa ett nytt kit. Se bara till att välja rätt märke och modell som passar din enhet. Vi rekommenderar dock att du köper ett start-kit från oss för att säkerställa bästa kompatibilitet och prestanda samt för att få tillgång till reservdelar och support.",
      },
      {
        question: "Kan jag byta smaker i efterhand?",
        answer:
          "Absolut! Du kan när som helst logga in på ditt konto och ändra smakpreferenser för kommande leveranser. Du kan välja specifika smaker eller låta oss överraska dig med slumpmässiga val.",
      },
      {
        question: "Kan jag byta adress?",
        answer:
          "Nej, du kan inte byta adress. Vi levererar endast till din folkbokförda adress. Om du har flyttat och ändrat din folkbokföringsadress, uppdateras den automatiskt hos oss nästa gång du loggar in.",
      },
    ],
  },
  [CATEGORY_SLUGS.NICOTINE_CESSATION]: {
    title: "Frågor och svar om nikotinersättning",
    description:
      "Allt du behöver veta för att komma igång med nikotintuggummi och andra hjälpmedel för att sluta röka eller snusa.",
    items: [
      {
        question: "Hur fungerar nikotintuggummi?",
        answer:
          "Nikotintuggummi frigör nikotin när du tuggar på det. Nikotinet tas upp av slemhinnorna i munnen och hjälper till att lindra abstinensbesvär. Tugga långsamt och 'parkera' tuggummit i kinden med jämna mellanrum för bästa effekt.",
      },
      {
        question: "Vilken styrka ska jag välja?",
        answer:
          "Valet av styrka beror på hur mycket du röker eller snusar. En generell rekommendation är att välja en högre styrka (t.ex. 4 mg) om du röker mer än 20 cigaretter om dagen, och en lägre styrka (t.ex. 2 mg) om du röker mindre.",
      },
      {
        question: "Hur länge ska jag använda produkterna?",
        answer:
          "En vanlig behandlingstid är cirka 3 månader, men det är individuellt. Målet är att gradvis minska antalet tuggummin eller tabletter per dag tills du inte längre känner ett behov av dem.",
      },
      {
        question: "Kan jag använda nikotinersättning om jag är gravid?",
        answer:
          "Om du är gravid eller ammar bör du alltid rådfråga din läkare eller barnmorska innan du använder nikotinersättningsprodukter. Att sluta helt utan hjälpmedel är alltid det bästa alternativet.",
      },
      {
        question: "Vad är skillnaden mellan tuggummi och sugtabletter?",
        answer:
          "Båda produkterna levererar nikotin via munslemhinnan, men på olika sätt. Tuggummi kräver aktivt tuggande för att frigöra nikotin, medan sugtabletter löses upp långsamt i munnen. Valet är en personlig preferens – vissa föredrar aktiviteten av att tugga, medan andra tycker att sugtabletter är mer diskreta.",
      },
    ],
  },
  [CATEGORY_SLUGS.ACCESSORIES]: {
    title: "Frågor om laddare, pods och reservdelar",
    description:
      "Här hittar du svar på vanliga frågor om laddare, pods och andra tillbehör. Rätt tillbehör är viktigt för både säker användning, bättre livslängd och en smidigare vardag.",
    items: [
      {
        question: "Hur ofta bör jag byta ut pods?",
        answer:
          "Det beror på hur ofta du använder din vape och vilken typ av e-juice du använder. Generellt rekommenderas att byta pod när smaken börjar försämras eller när du märker minskad ångproduktion. För vissa användare kan detta vara varannan vecka, medan andra kan behöva byta oftare.",
      },
      {
        question: "Kan jag använda pods från andra märken?",
        answer:
          "Vi rekommenderar alltid pods och reservdelar som är tillverkade för just din modell. Pods från andra märken passar sällan korrekt och kan påverka både funktion och säkerhet.",
      },
      {
        question: "Är alla laddare kompatibla med min enhet?",
        answer:
          "Nej, det är viktigt att använda rätt laddare för din specifika enhet. Användning av fel laddare kan skada batteriet eller förkorta dess livslängd. Kontrollera alltid specifikationerna eller fråga oss om du är osäker på vilken laddare som passar din modell.",
      },
      {
        question: "Varför behöver jag ett fodral till min vejp?",
        answer:
          "Ett fodral skyddar inte bara din enhet från fysiska skador vid fall eller stötar, utan förhindrar också att damm och smuts kommer in i enheten. Dessutom hindrar det knappar från att tryckas in av misstag när vejpen är i fickan eller väskan.",
      },
    ],
  },
  [CATEGORY_SLUGS.DEFAULT]: {
    title: "Vanliga frågor och svar",
    description:
      "Här hittar du svar på frågor om varför vi valt just dessa produkter och hur vårt sortiment fokuserar på skadereducering jämfört med traditionella tobaksprodukter.",
    items: [
      {
        question: "Varför har ni valt just dessa produkter?",
        answer:
          "Vi har noggrant valt ut produkter som erbjuder ett mindre skadligt alternativ till traditionella cigaretter och tobaksprodukter samt produkter som är användarvänliga och enkla att använda. Vårt fokus ligger på kvalitet, säkerhet och att ge dig som kund bättre valmöjligheter för att minska riskerna med nikotinanvändning.",
      },
      {
        question: "Vad ingår i er vape-prenumeration?",
        answer:
          "Du bygger din prenumeration precis som du vill. Du kan prenumerera på både förfyllda poddar/podsystem och e-juice för påfyllningsbara system. Välj smaker, nikotinstyrka och hur mycket du vill få per leverans. Vid behov kan du även få reservdelar för dina enheter, så att du alltid har det du behöver. Du hanterar och ändrar allt enkelt i din kontrollpanel efter köp.",
      },
      {
        question: "Säljer ni vanliga tobaksprodukter?",
        answer:
          "Nej, vi säljer inte vanliga tobaksprodukter. Vårt fokus ligger på att erbjuda mindre skadliga alternativ till traditionell rökning.",
      },
      {
        question: "Kan jag använda era produkter för att sluta röka?",
        answer:
          "Många av våra kunder använder våra produkter som ett steg på vägen mot ett nikotinfritt liv. Vi erbjuder både nikotinfria och nikotinhaltiga alternativ för att stödja dig oavsett var du befinner dig i din resa.",
      },
      {
        question: "Hur säkerställer ni kvaliteten på produkterna?",
        answer:
          "Vi samarbetar endast med välkända varumärken och leverantörer som följer strikta kvalitets- och säkerhetskrav. Alla produkter testas och kontrolleras för att säkerställa att de uppfyller lagkraven för att säljas och marknadsföras inom EU och Sverige. Bland annat kontrollerar vi korrekt märkning.",
      },
    ],
  },
};

export const categoryBenefitsContent = {
  [CATEGORY_SLUGS.START_KIT_VAPE]: {
    title: "Fördelar med påfyllningsbara podsystem",
    description:
      "Påfyllningsbara vape kit kombinerar flexibiliteten hos e-juice med enkelheten i ett modernt podsystem. Du får mer kontroll över smak, nikotinstyrka och användning – utan att kompromissa med smidighet.",
    benefits: [
      {
        title: "Enkel användning",
        text: "Klicka fast podden, fyll på e-juice och börja använda. Inga avancerade inställningar eller krångliga coil-byten – bara en enkel och pålitlig upplevelse.",
        icon: {
          src: "/images/icons/use.svg",
          alt: "Easy to Use Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Hundratals smaker",
        text: "Välj fritt bland ett brett utbud av e-juice-smaker. Från tobak och mentol till exotiska frukter.",
        icon: {
          src: "/images/icons/orange.svg",
          alt: "Orange flavor icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Lägre kostnad",
        text: "E-juice är ett kostnadseffektivt alternativ. Ett smart val för regelbunden användning.",
        icon: {
          src: "/images/icons/piggy-bank.svg",
          alt: "Piggy Bank Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Integrerade coils",
        text: "Podsen har inbyggda värmespiraler – byt bara hela podden när det är dags. Lika enkelt som förfyllda pods, men med mer frihet.",
        icon: {
          src: "/images/icons/coil.svg",
          alt: "Coil Icon",
          width: 24,
          height: 24,
        },
      },
    ],
    showImage: true,
    image: {
      src: "/images/other/vape-kit_retro_bg.jpg",
      alt: "Vape podsystem i retro stil",
      width: 500,
      height: 500,
    },
  },
  [CATEGORY_SLUGS.E_JUICE]: {
    title: "Fördelar med e-juice",
    description:
      "E-juice ger dig friheten att anpassa din vape-upplevelse efter dina egna preferenser – från smak och nikotinstyrka till ångproduktion.",
    benefits: [
      {
        title: "Brett smakutbud",
        text: "Välj mellan hundratals smaker – från klassisk tobak och mentol till fruktiga, söta och exotiska alternativ.",
        icon: {
          src: "/images/icons/orange.svg",
          alt: "Orange flavor icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Anpassningsbar nikotinstyrka",
        text: "Välj den nikotinstyrka som passar dig bäst, från nikotinfritt till högre styrkor för dig som vill trappa ner gradvis.",
        icon: {
          src: "/images/icons/adjustable.svg",
          alt: "Adjustable Nicotine Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Ekonomiskt alternativ",
        text: "E-juice ger dig mer för pengarna jämfört med förfyllda pods eller engångsvejps, särskilt för regelbundna användare.",
        icon: {
          src: "/images/icons/piggy-bank.svg",
          alt: "Piggy Bank Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Hög kvalitet",
        text: "Våra e-juicer innehåller endast högkvalitativa ingredienser: PG, VG, livsmedelsklassade smakämnen och farmaceutisk nikotin.",
        icon: {
          src: "/images/icons/quality.svg",
          alt: "Quality Badge Icon",
          width: 24,
          height: 24,
        },
      },
    ],
    showImage: true,
    image: {
      src: "/images/other/e-juice_retro_bg_2.jpg",
      alt: "E-juice i retro stil",
      width: 500,
      height: 500,
    },
  },
  [CATEGORY_SLUGS.CANDY]: {
    title: "Fördelar med nikotinfritt godis",
    description:
      "Vårt nikotinfria godissortiment har utvecklats för att hjälpa dig på vägen mot ett nikotinfritt liv på ett bekvämare sätt.",
    benefits: [
      {
        title: "Hjälper med orala vanor",
        text: "Att ha något i munnen kan minska suget efter cigaretter genom att ersätta den orala fixeringen som ofta är kopplad till rökning.",
        icon: {
          src: "/images/icons/chewing_gum_man.svg",
          alt: "Chewing Gum Man Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Stressreducerande",
        text: "Tuggandet av tuggummi kan ha en lugnande effekt som hjälper till att minska stress och ångest under avvänjningen.",
        icon: {
          src: "/images/icons/woman_stress.svg",
          alt: "Woman Stress Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Helt nikotinfritt",
        text: "Till skillnad från nikotinersättningsprodukter innehåller vårt godis ingen nikotin - perfekt för sista steget i din rökavvänjning.",
        icon: {
          src: "/images/icons/candy.svg",
          alt: "Candy Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Distraktionseffekt",
        text: "En stark smak eller en slickepinne kan ge dig något annat att fokusera på när nikotinsuget slår till.",
        icon: {
          src: "/images/icons/lollipop_in-hand.svg",
          alt: "Lollipop Icon",
          width: 24,
          height: 24,
        },
      },
    ],
    showImage: true,
    image: {
      src: "/images/other/lollipops_retro_bg.jpg",
      alt: "Fördelar med nikotinfritt godis",
      width: 500,
      height: 500,
    },
  },
  [CATEGORY_SLUGS.SUBSCRIPTIONS]: {
    title: "Varför prenumerera?",
    description:
      "Vape prenumerationstjänst för bekväma och regelbundna leveranser av dina favorit pods eller e-juice med fri frakt, vape startkit och full kontroll över ditt abonnemang.",
    benefits: [
      {
        title: "RESERVDELAR",
        text: "Om din vape enhet eller pod behöver bytas ingår tomma påfyllningsbara pods och ersättningskit.",
        icon: {
          src: "/images/icons/gift-box-with-a-bow.svg",
          alt: "Gift Box Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "BEKVÄMA LEVERANSER",
        text: "Alltid fri frakt och hemleveranser (giltig folkbokföringsadress).",
        icon: {
          src: "/images/icons/delivery-truck.svg",
          alt: "Delivery Truck Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "NYA SMAKER",
        text: "Få slumpmässigt utvalda pods och e-juicer eller bestäm exakt din låda.",
        icon: {
          src: "/images/icons/surprise-box.svg",
          alt: "Surprise Box Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "BESPARINGAR",
        text: "Spara extra jämfört med vanliga engångsvapes.",
        icon: {
          src: "/images/icons/piggy-bank.svg",
          alt: "Piggy Bank Icon",
          width: 24,
          height: 24,
        },
      },
    ],
    showImage: true,
    image: {
      src: "/images/other/vape-subscriptionbox_illustration.jpg",
      alt: "Illustration av låda med olika vape-produkter",
      width: 500,
      height: 500,
    },
  },
  [CATEGORY_SLUGS.NICOTINE_CESSATION]: {
    title: "Fördelar med nikotinersättning",
    description:
      "Våra nikotinersättningsprodukter är designade för att ge dig kontroll över ditt nikotinintag och hjälpa dig att hantera abstinensbesvär effektivt.",
    benefits: [
      {
        title: "Kontrollerad dosering",
        text: "Produkterna ger en kontrollerad mängd nikotin, vilket hjälper dig att gradvis minska ditt beroende i din egen takt.",
        icon: {
          src: "/images/icons/balance.svg",
          alt: "Balance Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Lindrar abstinens",
        text: "Minskar effektivt vanliga abstinensbesvär som irritation, oro och koncentrationssvårigheter.",
        icon: {
          src: "/images/icons/calm.svg",
          alt: "Calm Mind Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Diskret användning",
        text: "Tuggummin och sugtabletter kan användas diskret när som helst och var som helst, vilket gör det enkelt att hantera plötsligt sug.",
        icon: {
          src: "/images/icons/discrete.svg",
          alt: "Discreet Use Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Tobaksfritt alternativ",
        text: "Få nikotinet du behöver utan de tusentals skadliga ämnena från tobaksrök eller traditionellt snus.",
        icon: {
          src: "/images/icons/no-smoking.svg",
          alt: "No Smoking Icon",
          width: 24,
          height: 24,
        },
      },
    ],
    showImage: true,
    image: {
      src: "/images/other/man_chewing-gum_cartoon.jpg",
      alt: "Tecknad man som använder nikotintuggummi i en affärsmiljö",
      width: 500,
      height: 500,
    },
  },
  [CATEGORY_SLUGS.ACCESSORIES]: {
    title: "Fördelar med originaltillbehör",
    description:
      "Rätt tillbehör förbättrar inte bara din vejp-upplevelse – de förlänger också livslängden på din enhet och säkerställer optimal prestanda.",
    benefits: [
      {
        title: "Förlängd livslängd",
        text: "Rätt laddare och pods skyddar din enhet och batteri från slitage, vilket ger längre livslängd.",
        icon: {
          src: "/images/icons/charging.svg",
          alt: "Battery Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Förbättrad upplevelse",
        text: "Fräscha tillbehör kan förbättra smak och ångproduktion, vilket ger en mer tillfredsställande vejp-upplevelse.",
        icon: {
          src: "/images/icons/tongue.svg",
          alt: "Taste Experience Icon",
          width: 24,
          height: 24,
        },
      },
      {
        title: "Enklare underhåll",
        text: "Rengöringstillbehör håller din enhet i toppskick och säkerställer konsekvent smak och prestanda.",
        icon: {
          src: "/images/icons/tools.svg",
          alt: "Tools Icon",
          width: 24,
          height: 24,
        },
      },
    ],
    showImage: true,
    image: {
      src: "/images/icons/sketches/usb_charger_sketch.png",
      alt: "Samling av vejp-tillbehör",
      width: 500,
      height: 500,
    },
  },
};
