// ---------------------------------------------
// 약 데이터베이스 (한국 OTC + 상비약 예시)
// ---------------------------------------------
const MEDS = [
  // 1. 타이레놀 (아세트아미노펜)
  {
    id: "tylenol_500",
    name: "타이레놀정 500mg",
    class: "해열·진통",
    indications: ["발열", "두통", "근육통", "생리통", "목통증", "인후통"],
    allergy_tags: ["아세트아미노펜"],
    avoid_tags: ["간질환"],
    age_min: 12,
    dose: "성인 1정, 4~6시간 간격 (하루 최대 3,000mg)",
    notes: ["간 질환이 있는 경우 복용 전 전문가 상담", "다른 감기약과 아세트아미노펜 성분 중복 주의"],
    imgAlt: "해열·진통제(타이레놀 계열)"
  },

  // 2. 이부프로펜
  {
    id: "ibuprofen_200",
    name: "이부프로펜 200mg",
    class: "진통·소염",
    indications: ["두통", "인후통", "목통증", "근육통", "생리통"],
    allergy_tags: ["NSAID"],
    avoid_tags: ["위장질환", "천식", "임신수유", "신장질환", "고혈압"],
    age_min: 12,
    dose: "성인 1정씩 식후 복용, 6~8시간 간격",
    notes: ["위장 장애·속쓰림 유발 가능", "천식·고혈압·신장질환자는 복용 전 상담 권장"],
    imgAlt: "소염·진통제(이부프로펜 계열)"
  },

  // 3. 클로르페니라민(항히스타민)
  {
    id: "chlorpheniramine",
    name: "클로르페니라민정",
    class: "항히스타민제(비염·알레르기)",
    indications: ["코막힘", "콧물", "가려움"],
    allergy_tags: [],
    avoid_tags: ["수면장애", "임신수유"],
    age_min: 12,
    dose: "1정, 8~12시간 간격",
    notes: ["졸음 유발 가능, 운전·시험 전 복용 피하기"],
    imgAlt: "비염·알레르기 완화제"
  },

  // 4. 감기 복합제 (판콜A, 콜대원 등)
  {
    id: "cold_complex",
    name: "감기 복합제(판콜A·콜대원 등)",
    class: "종합 감기약",
    indications: ["발열", "두통", "기침", "코막힘", "콧물", "인후통", "목통증"],
    allergy_tags: [],
    avoid_tags: ["성분중복", "고혈압", "임신수유"],
    age_min: 12,
    dose: "제품별 용법·용량 준수",
    notes: ["여러 성분이 한 번에 들어 있어 다른 진통제·감기약과 병용 시 성분 중복 주의"],
    imgAlt: "감기 증상 완화 종합제"
  },

  // 5. 코푸시럽 (진해·거담)
  {
    id: "cough_syrup",
    name: "코푸시럽",
    class: "진해·거담제",
    indications: ["기침", "가래"],
    allergy_tags: [],
    avoid_tags: ["수면장애"],
    age_min: 12,
    dose: "성인 10mL씩 하루 3회 (제품 설명서 확인)",
    notes: ["졸음이 올 수 있어 운전·위험 작업 전 복용 주의"],
    imgAlt: "기침·가래 완화 시럽"
  },

  // 6. 덱스트로메토르판 (마른기침)
  {
    id: "dextromethorphan",
    name: "덱스트로메토르판 시럽",
    class: "기침(진해제)",
    indications: ["기침", "마른기침", "목통증", "인후통"],
    allergy_tags: [],
    avoid_tags: ["천식"],
    age_min: 6,
    dose: "성인 10mL, 6~12세 5mL씩 하루 3회",
    notes: ["어지러움·졸림 발생 시 복용 중단 후 상담"],
    imgAlt: "마른기침 완화 시럽"
  },

  // 7. 가래약(카르보시스테인/엘도스 계열)
  {
    id: "carbocisteine",
    name: "가래약(카르보시스테인 계열)",
    class: "거담제",
    indications: ["가래", "기침"],
    allergy_tags: [],
    avoid_tags: ["간질환"],
    age_min: 12,
    dose: "성인 1회 1정, 하루 3회 (제품별 상이)",
    notes: ["간 기능 이상이 있는 경우 복용 전 상담"],
    imgAlt: "가래를 묽게 해주는 약"
  },

  // 8. 훼스탈플러스정 (복합 소화제)
  {
    id: "festal",
    name: "훼스탈플러스정",
    class: "소화제",
    indications: ["소화불량", "복부팽만"],
    allergy_tags: [],
    avoid_tags: ["췌장질환"],
    age_min: 0,
    dose: "성인 1~2정, 식후 복용",
    notes: ["복통·구토가 심할 경우 사용 중단 후 진료 필요"],
    imgAlt: "소화불량·더부룩함 완화제"
  },

  // 9. 제산제 (겔포스 등)
  {
    id: "antacid",
    name: "제산제(겔포스 등)",
    class: "위산·속쓰림 완화제",
    indications: ["속쓰림"],
    allergy_tags: [],
    avoid_tags: ["신장질환"],
    age_min: 0,
    dose: "속쓰림 시 1포 또는 1회 복용, 하루 사용 횟수는 제품 설명서 참고",
    notes: ["다른 약과 최소 1시간 이상 간격 두고 복용", "신장질환자는 전문가와 상담 필요"],
    imgAlt: "위산 과다·속쓰림 완화제"
  },

  // 10. 스멕타 (지사제)
  {
    id: "smecta",
    name: "스멕타(디오스멕타이트)",
    class: "지사제",
    indications: ["설사"],
    allergy_tags: [],
    avoid_tags: ["변비"],
    age_min: 0,
    dose: "1포씩 하루 2~3회 (연령별 용법 확인)",
    notes: ["심한 복통·혈변·고열이 동반되면 즉시 진료 필요"],
    imgAlt: "설사·묽은 변 완화제"
  }
];

// ---------------------------------------------
// 추천 로직
// ---------------------------------------------
function recommend(meds, symptoms, allergyTags, age) {
  return meds
    // 나이 제한
    .filter((m) => (m.age_min ?? 0) <= age)

    // 알레르기/주의와 충돌하는 약 제거
    .filter(
      (m) =>
        !m.allergy_tags?.some((t) => allergyTags.includes(t)) &&
        !m.avoid_tags?.some((t) => allergyTags.includes(t))
    )

    // 증상 매칭 점수 계산
    .map((m) => {
      const score = (m.indications || []).reduce(
        (s, tag) => s + (symptoms.includes(tag) ? 1 : 0),
        0
      );
      return { ...m, score };
    })

    // 관련 증상이 하나도 없는 약은 제외
    .filter((m) => m.score > 0)

    // 점수 높은 순으로 정렬 (추천순)
    .sort((a, b) => b.score - a.score);
}

// ---------------------------------------------
// 결과 렌더링
// ---------------------------------------------
function render(cards) {
  const box = document.getElementById("results");

  if (cards.length === 0) {
    box.innerHTML =
      "<div>조건에 맞는 추천이 없습니다. 증상/주의 선택을 다시 확인해 주세요.</div>";
    return;
  }

  box.innerHTML = cards
    .map(
      (c) => `
    <article class="card">
      <div>
        <h3>${c.name}</h3>
        <div class="badge">${c.class}</div>
        ${
          c.age_min > 0
            ? `<span class="badge warn">${c.age_min}세 이상 권장</span>`
            : ""
        }
        <p><b>적응증:</b> ${c.indications.join(", ")}</p>
        <p><b>복용법:</b> ${c.dose}</p>
        <p><b>주의:</b> ${c.notes.join(" / ")}</p>
      </div>
      <div class="imgbox">${c.imgAlt}</div>
    </article>
  `
    )
    .join("");
}

// ---------------------------------------------
// 유틸: 체크된 값 배열로 가져오기
// ---------------------------------------------
function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(
    (i) => i.value
  );
}

// ---------------------------------------------
// 이벤트 연결
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("run");

  button.addEventListener("click", () => {
    const symptoms = getCheckedValues("sym");
    const allergies = getCheckedValues("alg");
    const age = parseInt(document.getElementById("age").value || "0", 10);

    const result = recommend(MEDS, symptoms, allergies, age);
    render(result);
  });
});
