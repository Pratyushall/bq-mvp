import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hyderabad Nights - A Cinematic Journey";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#facc15",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Hyderabad Nights
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#fff",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Experience the vibrant nightlife and dreams of Hyderabad through
          cinematic storytelling
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
