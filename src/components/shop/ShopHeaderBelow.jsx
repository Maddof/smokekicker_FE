import Image from "next/image";
import { ReadMore } from "@/components/ReadMore";

export default function ShopHeaderBelow({
  title = "Vad är ett podsystem?",
  iconImgBg = "/images/icons/sketches/multiple_pods_transp.png",
  inconImgBgAlt = "Vape pods illustration",
  initialParagraphs = 1,
  children,
}) {
  return (
    <section className="bg-[#060719] py-8">
      <div className="container">
        <div className="xsm:flex-row flex flex-col items-start justify-between gap-2">
          {/* Text content */}
          <div className="text-secondary-foreground xsm:w-2/3 flex w-full flex-col gap-4">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-primary text-xl font-extrabold uppercase md:text-2xl">
                {title}
              </h2>
              <Image
                src={iconImgBg}
                alt={inconImgBgAlt}
                width={500}
                height={500}
                className="xsm:hidden h-auto w-20 object-contain opacity-20"
              />
            </div>
            <ReadMore
              id="podSystemInfo"
              initialParagraphs={initialParagraphs}
            >
              {children}
            </ReadMore>
          </div>
          {/* Background image (right) */}
          <div className="xsm:flex xsm:w-1/3 hidden w-full items-center justify-center">
            <Image
              src={iconImgBg}
              alt={inconImgBgAlt}
              width={500}
              height={500}
              className="xsm:w-52 h-auto w-36 object-contain opacity-25"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
