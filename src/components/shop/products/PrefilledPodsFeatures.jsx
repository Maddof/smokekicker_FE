import Image from "next/image";

export default function PrefilledPodsFeatures() {
  return (
    <section>
      <div className="container">
        <div className="flex w-full flex-col items-start gap-3 md:items-center">
          <div className="flex flex-col gap-4 md:max-w-96">
            <h2 className="h2-product text-center">Förfyllda pods</h2>
            <p className="text-center text-gray-700">
              Ett smartare val än engångsvapes. Förfyllda pod-kits minskar
              avfallet och är enkla att använda – byt bara podden, inte hela
              enheten.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-3">
            {/* Card 1: Okomplicerad vape */}
            <div className="flex flex-row items-center gap-4 text-left md:flex-col md:gap-0 md:text-center">
              <div className="shrink-0 rounded-full bg-white p-4 md:mb-4 md:p-6">
                <Image
                  src="/images/icons/snap.svg"
                  alt="Okomplicerad vape"
                  width={64}
                  height={64}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold uppercase md:mb-2">
                  Okomplicerad vape
                </h3>
                <p className="text-sm text-gray-700">
                  Inga knappar, inga inställningar – bara enkel vaping som är
                  perfekt för dig som vill återskapa engångsvape-upplevelsen med
                  välbekanta smaker.
                </p>
              </div>
            </div>

            {/* Card 2: Ekonomisk */}
            <div className="flex flex-row items-center gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center">
              <div className="shrink-0 rounded-full bg-white p-4 md:mb-4 md:p-6">
                <Image
                  src="/images/icons/hand_coin.svg"
                  alt="Ekonomisk"
                  width={64}
                  height={64}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold uppercase md:mb-2">
                  Ekonomisk
                </h3>
                <p className="text-sm text-gray-700">
                  I stället för att slänga hela enheten som med engångsvapes,
                  byter du bara ut poden när den är slut. Det ger lägre kostnad
                  över tid och mindre skräp i naturen.
                </p>
              </div>
            </div>

            {/* Card 3: Bättre för planeten */}
            <div className="flex flex-row items-center gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center">
              <div className="shrink-0 rounded-full bg-white p-4 md:mb-4 md:p-6">
                <Image
                  src="/images/icons/save-the-world.svg"
                  alt="Eko-vänlig"
                  width={64}
                  height={64}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold uppercase md:mb-2">
                  Bättre för planeten
                </h3>
                <p className="text-sm text-gray-700">
                  Genom att välja ett pod-kit väljer du en grönare väg. De är
                  ett steg mot hållbarhet, med mindre avfall än engångsvapes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
