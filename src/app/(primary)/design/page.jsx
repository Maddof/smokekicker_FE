import { Button } from "@/components/ui/scn/button";
import { Input } from "@/components/ui/scn/input";

export const metadata = {
  title: "Designsystem & komponenter | Smokify",
  description:
    "En sida för att testa och visa upp designsystemet och UI-komponenter som används på Smokify.",
};

export default async function DesignPage() {
  const text = "Smakpersonlighetstest";
  const headline = "Vilken smak är du?";
  const shareText =
    "Upptäck din unika smakpersonlighet med vårt roliga och insiktsfulla smaktest. Svara på några frågor och få skräddarsydda rekommendationer som matchar just din smakprofil. Ta testet nu och hitta dina nya favoritsmaker!";
  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="border border-black p-4">
            <h1>My header H1</h1>
            <h2>My header H2</h2>
            <h3>My header H3</h3>
            <h4>My header H4</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="bg-secondary text-secondary-foreground p-4">
            <h1>My header H1</h1>
            <h2>My header H2</h2>
            <h3>My header H3</h3>
            <h4>My header H4</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-4 p-4">
            <Button>My button primary</Button>
            <Button variant="secondary">My button secondary</Button>
            <Button variant="ghost">My button ghost</Button>

            <Button variant="outline">My button outline</Button>

            <Button variant="link">My button link</Button>
            <Button variant="destructive">My button destructive</Button>
            <Button disabled>My button disabled</Button>
            <Input placeholder="My input placeholder" />
            <a href="#">My link with default styles</a>
          </div>
          <div className="bg-secondary flex flex-wrap items-start gap-4 p-4">
            <Button>My button primary</Button>
            <Button variant="secondary">My button secondary</Button>
            <Button variant="ghost" className="text-secondary-foreground">
              My button ghost
            </Button>

            <Button
              variant="outline"
              className="text-secondary-foreground hover:text-secondary-foreground"
            >
              My button outline
            </Button>

            <Button variant="link">My button link</Button>
            <Button variant="destructive">My button destructive</Button>
            <Button disabled>My button disabled</Button>
            <Input placeholder="My input placeholder" />
            <a href="#">My link with default styles</a>
          </div>
        </div>
      </div>
    </section>
  );
}
