import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Our Work - Balqony Sitraalu Portfolio";
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
          Our Work
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#fff",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Award-winning video production portfolio showcasing cinematic
          excellence
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
