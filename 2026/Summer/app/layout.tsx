import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
    title: "Osan MeetUp 2026 Summer",
    description: "2026년 7월 25일 토요일, 오산에서 만나는 기술과 사람들의 여름 밋업",
    metadataBase: new URL(siteUrl),
    icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
    openGraph: {
      title: "Osan MeetUp 2026 Summer",
      description: "7월 25일 토요일 오후 1시 · 오산청년일자리지원센터 이루잡",
      url: siteUrl,
      siteName: "Osan MeetUp",
      type: "website",
      images: [{ url: `${siteUrl}/og-cute-crows-v3.png`, width: 1731, height: 909, alt: "핑크 배경의 귀여운 오산 까마귀 캐릭터와 Osan MeetUp 2026 행사 정보" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Osan MeetUp 2026 Summer",
      description: "7월 25일 토요일 오후 1시 · 오산청년일자리지원센터 이루잡",
      images: [`${siteUrl}/og-cute-crows-v3.png`],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
