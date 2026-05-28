import Image from "next/image";

export default function HowToPrefilledPodSystem() {
  const steps = [
    {
      title: "Packa upp poden",
      description:
        "Ta försiktigt ut poden ur förpackningen och ta bort eventuella förseglingar eller skyddsdetaljer.",
      icon: "/images/icons/how-to-podsystem/unpacking.svg",
      imageAlt: "Uppackning av pod",
    },
    {
      title: "Anslut poden",
      description:
        "För in poden i batterihöljet tills du hör ett klick. Se till att kontakterna är i linje med varandra.",
      icon: "/images/icons/how-to-podsystem/connect_pod.svg",
      imageAlt: "Installation av pod i enhet",
    },
    {
      title: "Börja vejpa",
      description:
        "Ta ett mjukt drag från munstycket. Enheten aktiveras automatiskt när du drar. Vissa modeller kan ha en knapp som måste tryckas in.",
      icon: "/images/icons/how-to-podsystem/vape.svg",
      imageAlt: "Användning av podsystem",
    },
    {
      title: "Byt pod vid behov",
      description:
        "Byt poden när smaken försämras eller om den börjar smaka bränt. Dra helt enkelt ut den gamla poden och sätt i en ny.",
      icon: "/images/icons/how-to-podsystem/refresh.svg",
      imageAlt: "Byte av pod",
    },
    {
      title: "Ladda batteriet",
      description:
        "Anslut laddningskabeln (USB-C) vid behov. Vänta tills enheten är fulladdad.",
      icon: "/images/icons/how-to-podsystem/charging.svg",
      imageAlt: "Laddning av podsystem",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="h2-product mb-2">Snabbguide förfyllda podsystem</h2>
          <p className="mb-8">
            Att använda ett förfyllt podsystem är enkelt och smidigt. Följ dessa
            steg för att komma igång snabbt:
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-row items-center rounded-lg bg-white px-4 py-4 shadow-md transition-all hover:shadow-lg md:flex-col"
            >
              {/* Left side (image) on mobile, top section on larger screens */}
              <div className="mr-5 flex flex-col items-center md:mr-0">
                <div className="bg-primary/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20">
                  <Image
                    src={step.icon}
                    alt={step.imageAlt}
                    width={32}
                    height={32}
                    className="h-8 w-8 opacity-90 md:h-10 md:w-10"
                  />
                </div>
              </div>

              {/* Right side (content) on mobile, bottom section on larger screens */}
              <div className="flex flex-col md:items-center">
                <h3 className="mb-2 text-left text-lg font-semibold md:text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-left text-sm md:text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <div className="text-amber-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold">Viktigt att tänka på</h4>
              <p>
                Överanvänd inte poden – när smaken börjar avta eller känns bränd
                är det dags att byta. Förvara alltid din enhet och dina pods
                utom räckhåll för barn och husdjur. Använd inte om förpackningen
                är skadad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
