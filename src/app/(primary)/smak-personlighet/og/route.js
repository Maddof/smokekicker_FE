import { ImageResponse } from "next/og";

export const runtime = "edge";

const BANGERS_FONT_PATH = new URL(
  "@/assets/Bangers-Regular.ttf",
  import.meta.url,
);

let cachedBangersFont;

async function getBangersFont() {
  if (cachedBangersFont) return cachedBangersFont;

  const response = await fetch(BANGERS_FONT_PATH);
  if (!response.ok) throw new Error("Could not load OG font file.");

  cachedBangersFont = await response.arrayBuffer();
  return cachedBangersFont;
}

export async function GET(req) {
  const requestUrl = new URL(req.url);

  // const OG_BASE_URL = "https://logiest-kingston-citizenly.ngrok-free.dev";
  // const imageUrl2 = `${OG_BASE_URL}/images/og/fb_share_neon-space.jpg`;
  // const logoUrl = `${OG_BASE_URL}/smokify_logo_orange.svg`;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smokify.se";
  const imageUrl2 = `${SITE_URL}/images/og/fb_share_neon-space.jpg`;
  const logoUrl = `${SITE_URL}/smokify_logo_orange.svg`;

  const { searchParams } = requestUrl;

  const text = searchParams.get("text") || "Min smak";
  const headline = searchParams.get("headline") || "";
  const shareText = searchParams.get("shareText") || "";
  const bangersFont = await getBangersFont();

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 76,
        fontWeight: 700,
        color: "white",
      }}
    >
      {/* Bakgrund */}
      <img
        src={imageUrl2}
        alt="Smakbakgrund"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom left, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.0) 100%)",
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "5px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          alignItems: "center",
          textAlign: "center",
          padding: 40,
          borderRadius: 20,
          fontFamily: "Bangers, Arial, sans-serif",
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          letterSpacing: "0.05em",
          maxWidth: "850px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          {text}
        </div>

        {headline ? (
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.2,
              maxWidth: "600px",
            }}
          >
            {headline}
          </div>
        ) : null}

        {shareText ? (
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.2,
              maxWidth: "540px",
            }}
          >
            {shareText.length > 170
              ? `${shareText.slice(0, 167)}...`
              : shareText}
          </div>
        ) : null}
      </div>

      {/* Logo */}
      <img
        src={logoUrl}
        alt="Smokify"
        style={{
          position: "absolute",
          right: "30px",
          bottom: "30px",
          width: "230px",
          height: "70px",
          objectFit: "contain",
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Bangers",
          data: bangersFont,
          style: "normal",
        },
      ],
    },
  );
}
