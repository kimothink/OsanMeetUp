"use client";

import { useEffect, useRef, useState } from "react";

type SponsorKey = "teut" | "automo" | "infragistics";

const schedule = [
  { time: "13:00 — 13:10", kind: "OPENING", title: "오리엔테이션", speaker: "함께 여는 Osan MeetUp" },
  { time: "13:10 — 13:50", kind: "SESSION 01", title: "AI의 핵심은 컨텍스트: DataHub로 완성하는 AI-ready 데이터와 실무 적용", speaker: "권윤재 님 · 40분" },
  { time: "13:50 — 14:00", kind: "NETWORKING", title: "참가자 자기소개", speaker: "반갑게 인사해요" },
  { time: "14:00 — 14:15", kind: "BREAK", title: "쉬는 시간", speaker: "차 한 잔과 함께" },
  { time: "14:15 — 14:55", kind: "SESSION 02", title: "이제 쿼리 돌리고 커피 못 탑니다: OLAP ClickHouse 도입기", speaker: "최윤진 님 · 40분" },
  { time: "14:55 — 15:10", kind: "BREAK", title: "쉬는 시간", speaker: "잠깐 숨을 고르고" },
  { time: "15:10 — 15:50", kind: "SESSION 03", title: "ComfyUI 퇴사하고 응가메이트를 만들기까지", speaker: "이진 님 · 40분" },
  { time: "15:50 — 16:05", kind: "BREAK", title: "쉬는 시간", speaker: "다음 이야기를 기다리며" },
  { time: "16:05 — 16:45", kind: "SESSION 04", title: "유저 워크플로우 안에 있는 사이드 프로젝트, 어렵다 어려워", speaker: "홍성민 님 · 40분" },
  { time: "16:45 — 17:00", kind: "BREAK", title: "쉬는 시간", speaker: "마지막 세션 전 휴식" },
  { time: "17:00 — 17:30", kind: "SESSION 05", title: "덕질의 끝은 창업", speaker: "김희애 님 · 30분" },
  { time: "17:30 — 17:40", kind: "LUCKY DRAW", title: "경품 추첨", speaker: "행운의 주인공은 누구?" },
];

const sponsorDetails: Record<SponsorKey, { title: string; url: string; content: React.ReactNode }> = {
  teut: {
    title: "티웃 · 차 마시는 이웃",
    url: "https://smartstore.naver.com/t-eut",
    content: <>
      <p>이번 행사를 함께해 주시는 후원사 티웃(차 마시는 이웃)을 소개합니다. 🍵💚</p>
      <p>티웃은 차를 좋아하는 사람들이 이야기를 나누고, 자신의 차 기록을 공유하며 다양한 차 문화를 경험할 수 있는 차 문화 플랫폼입니다. 스마트스토어에서는 홍차, 녹차, 우롱차와 다양한 차도구를 만나볼 수 있습니다. 바쁜 일상 속 커피 대신 향긋한 차 한 잔의 여유를 즐겨보세요.</p>
      <a href="https://smartstore.naver.com/t-eut" target="_blank" rel="noreferrer">티웃 스마트스토어 바로가기 ↗</a>
      <h3>디메르 베이커리와 함께해요 🥐🍰</h3>
      <p>행사에 준비한 맛있는 디저트는 디메르 베이커리의 디저트와 함께합니다.</p>
      <a href="https://naver.me/59UC6WR5" target="_blank" rel="noreferrer">디메르 베이커리 위치 보기 ↗</a>
      <p className="detail-note">경기 오산시 동부대로 332-13 더테라스퀘어 나동 301호</p>
      <h3>작은 이벤트도 준비했어요 🎁</h3>
      <p>현재 거주하거나 근무하고 계신 곳의 건물 이름과 광고 문의가 가능한 연락처를 확인하여 행사 당일 알려주시면 작은 선물을 드립니다.</p>
      <p>좋은 차와 맛있는 디저트, 즐거운 이벤트까지 준비할 수 있도록 함께해 주신 후원사 여러분께 진심으로 감사드립니다. 😊</p>
    </>,
  },
  automo: {
    title: "AUTOMO 안전연구소",
    url: "https://www.automosafety.co.kr/",
    content: <>
      <p>AUTOMO 안전연구소는 산업 현장의 사고 예방을 위해 위험성평가, 안전교육, 현장점검, 사고조사와 디지털 안전 솔루션을 제공하는 산업안전 전문 기업입니다. 현장 맞춤형 위험요인을 분석하고 실질적인 개선 대책을 제시해 더 안전한 작업환경을 만듭니다.</p>
      <h3>Smart GHS Labeler</h3>
      <p>화학물질 정보를 바탕으로 산업 현장에 필요한 GHS 경고표지와 화학물질 안전 라벨 제작을 지원합니다.</p>
      <a href="https://6a34a3d33270fadc2b9c677c--papaya-heliotrope-bfd2d3.netlify.app/" target="_blank" rel="noreferrer">Smart GHS Labeler 체험하기 ↗</a>
      <h3>SafeSite · 건설현장 위험성평가</h3>
      <p>작업 공정을 입력하거나 현장 사진을 등록하면 AI가 위험요인을 분석해 위험성평가표 작성을 지원합니다. TBM 회의록 작성, 인쇄와 PDF 저장 기능도 제공합니다.</p>
      <a href="https://famous-horse-21251e.netlify.app/safesite.html" target="_blank" rel="noreferrer">SafeSite 체험하기 ↗</a>
      <p>두 솔루션은 정식 출시를 준비하고 있습니다. 직접 사용해 보신 뒤 불편한 점, 필요한 기능, 개선 아이디어 등 자유로운 피드백을 부탁드립니다.</p>
      <a href="https://www.automosafety.co.kr/" target="_blank" rel="noreferrer">AUTOMO 안전연구소 홈페이지 ↗</a>
    </>,
  },
  infragistics: {
    title: "Infragistics · 인프라지스틱스",
    url: "https://www.infragistics.co.kr/",
    content: <>
      <p>Infragistics는 전 세계 개발자들이 사용하는 글로벌 UI/UX 개발 플랫폼 기업입니다. 다양한 플랫폼을 위한 고성능 UI 컴포넌트와 개발 도구를 제공합니다.</p>
      <p>데이터 그리드, 차트, 스케줄러, 스프레드시트 등 엔터프라이즈 애플리케이션 개발에 필요한 다양한 기능을 지원하며 개발 생산성과 사용자 경험 향상에 기여하고 있습니다. 국내에서도 많은 기업과 개발자가 Infragistics 솔루션을 활용하고 있습니다.</p>
      <p>이번 여름 행사의 후원사로 함께해 주신 Infragistics에 진심으로 감사드립니다.</p>
      <a href="https://www.infragistics.co.kr/" target="_blank" rel="noreferrer">Infragistics 홈페이지 ↗</a>
    </>,
  },
};

const sponsors = [
  { key: "teut" as SponsorKey, name: "티웃", image: "/sponsors/teut.png", detail: true },
  { key: "automo" as SponsorKey, name: "AUTOMO 안전연구소", image: "/sponsors/automo.png", detail: true },
  { key: "infragistics" as SponsorKey, name: "Infragistics", image: "/sponsors/infragistics.png", detail: true },
  { name: "제이펍", image: "/sponsors/jpub.png", url: "http://jpub.tistory.com/" },
  { name: "리코멘드", image: "/sponsors/recommend.png", url: "https://www.rdbook.co.kr/" },
  { name: "이지스퍼블리싱", image: "/sponsors/easyspub.png", url: "https://www.easyspub.co.kr/" },
  { name: "한빛미디어", image: "/sponsors/hanbit.png", url: "https://www.hanbit.co.kr/" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [selected, setSelected] = useState<SponsorKey | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  const detail = selected ? sponsorDetails[selected] : null;

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="주요 메뉴">
          <a className="brand" href="#top"><span>OSAN</span> MEETUP</a>
          <div className="nav-links"><a href="#schedule">일정</a><a href="#sponsors">후원사</a><a href="#location">장소</a></div>
        </nav>
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="shell hero-content">
          <p className="eyebrow">LOCAL PEOPLE · BIG IDEAS</p>
          <h1><span>OSAN</span><br />MEETUP <em>’26</em></h1>
          <p className="hero-copy">기술과 경험, 그리고 좋아하는 것을<br />마음껏 이야기하는 오산의 여름 모임.</p>
          <div className="event-facts">
            <div><b>JUL</b><strong>25</strong><span>토요일</span></div>
            <div className="fact-text"><span>2026. 07. 25</span><strong>13:00 — 17:40</strong><span>오산청년일자리지원센터 이루잡</span></div>
          </div>
          <a className="primary-cta" href="#schedule">오늘의 여정 보기 <span>↓</span></a>
        </div>
        <div className="ticker" aria-hidden="true"><div>AI · DATA · CLICKHOUSE · COMFYUI · SIDE PROJECT · STARTUP · AI · DATA · CLICKHOUSE · COMFYUI · SIDE PROJECT · STARTUP ·</div></div>
      </section>

      <section className="schedule-section" id="schedule">
        <div className="shell">
          <div className="section-heading"><p>01 · PROGRAM</p><h2>함께할<br /><i>이야기들</i></h2><span>13:00부터<br />17:40까지</span></div>
          <div className="schedule-list">
            {schedule.map((item, index) => (
              <article className={`schedule-item ${item.kind === "BREAK" ? "is-break" : ""}`} key={item.time}>
                <div className="schedule-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="schedule-time">{item.time}<small>{item.kind}</small></div>
                <div className="schedule-copy"><h3>{item.title}</h3><p>{item.speaker}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sponsors-section" id="sponsors">
        <div className="shell">
          <div className="section-heading light"><p>02 · WITH US</p><h2>고마운<br /><i>파트너들</i></h2><span>함께 만들어 주신<br />일곱 팀을 소개합니다</span></div>
          <p className="sponsor-lead">로고를 눌러 후원사 이야기를 만나보세요.</p>
          <div className="sponsor-grid">
            {sponsors.map((sponsor) => sponsor.detail ? (
              <button className="sponsor-card" key={sponsor.name} onClick={() => setSelected(sponsor.key!)} aria-label={`${sponsor.name} 후원사 소개 열기`}>
                <img src={`${basePath}${sponsor.image}`} alt={`${sponsor.name} 로고`} /><span>{sponsor.name}<b>소개 보기 ↗</b></span>
              </button>
            ) : (
              <a className="sponsor-card" key={sponsor.name} href={sponsor.url} target="_blank" rel="noreferrer">
                <img src={`${basePath}${sponsor.image}`} alt={`${sponsor.name} 로고`} /><span>{sponsor.name}<b>홈페이지 ↗</b></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="location-section" id="location">
        <div className="shell location-card">
          <div className="location-number">03</div>
          <div className="location-copy"><p>WHERE WE MEET</p><h2>오산청년일자리<br />지원센터 <i>이루잡</i></h2><address>경기도 오산시 운천로 62, 3층</address><a href="https://naver.me/xZVpbYbg" target="_blank" rel="noreferrer">네이버 지도에서 보기 <span>↗</span></a></div>
          <div className="map-art" aria-hidden="true"><span className="pin">●</span><div className="road r1" /><div className="road r2" /><div className="road r3" /><b>IRUJAB</b></div>
        </div>
      </section>

      <footer><div className="shell"><div className="footer-mark">OSAN<br /><span>MEETUP</span></div><p>2026 SUMMER<br />JULY 25 · SATURDAY</p><a href="#top">맨 위로 ↑</a></div></footer>

      <dialog ref={dialogRef} className="sponsor-dialog" onClose={() => setSelected(null)} onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
        {detail && <div className="dialog-panel">
          <button className="dialog-close" onClick={() => setSelected(null)} aria-label="닫기">×</button>
          <p className="dialog-kicker">SPONSOR STORY</p><h2>{detail.title}</h2>
          <div className="dialog-content">{detail.content}</div>
        </div>}
      </dialog>
    </main>
  );
}
