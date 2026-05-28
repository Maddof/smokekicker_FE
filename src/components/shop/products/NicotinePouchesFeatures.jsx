import Image from "next/image";

export default function NicotinePouchCollectionFeatures() {
  return (
    <section>
      <div className="container">
        <div className="flex w-full flex-col items-start gap-3 md:items-center">
          <div className="flex flex-col gap-4 md:max-w-2xl">
            <h2 className="h2-product text-center">
              Vårat vitt snus sortiment
            </h2>
            <p className="text-center text-gray-700">
              Vi fokuserar på påsar med låg nikotinhalt för att stödja en mer
              hållbar och skonsam övergång mot mindre nikotinkonsumtion.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-3">
            {/* Card 1: Okomplicerad vape */}
            <div className="flex flex-row items-center gap-4 text-left md:flex-col md:gap-0 md:text-center">
              <div className="shrink-0 rounded-full bg-white p-4 md:mb-4 md:p-6">
                <Image
                  src="/images/icons/nicotine_black.svg"
                  alt="Nikotin formel"
                  width={64}
                  height={64}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold uppercase md:mb-2">
                  Låg nikotinhalt
                </h3>
                <p className="text-sm text-gray-700">
                  Vi fokuserar på nikotinpåsar med låg nikotinhalt för att
                  hjälpa dig att minska ditt nikotinberoende på ett skonsamt
                  sätt.
                </p>
              </div>
            </div>

            {/* Card 2: Ekonomisk */}
            <div className="flex flex-row items-center gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center">
              <div className="shrink-0 rounded-full bg-white p-4 md:mb-4 md:p-6">
                <Image
                  src="/images/icons/quality.svg"
                  alt="Kvalitetsmärken"
                  width={64}
                  height={64}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold uppercase md:mb-2">
                  Endast kvalitetsmärken
                </h3>
                <p className="text-sm text-gray-700">
                  Vi saluför endast nikotinpåsar från välrenommerade tillverkare
                  som uppfyller höga kvalitets- och säkerhetsstandarder.
                </p>
              </div>
            </div>

            {/* Card 3: Bättre för planeten */}
            <div className="flex flex-row items-center gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center">
              <div className="shrink-0 rounded-full bg-white p-4 md:mb-4 md:p-6">
                <Image
                  src="/images/icons/reduce.svg"
                  alt="Minskad nikotin"
                  width={64}
                  height={64}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold uppercase md:mb-2">
                  För dig som vill minska
                </h3>
                <p className="text-sm text-gray-700">
                  Perfekt för dig som vill trappa ner ditt nikotinintag eller
                  sluta helt, utan att kompromissa med smak eller upplevelse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
