const MEDS = [
  // 1. 아세트아미노펜 (타이레놀)
  {
    id: "tylenol_500",
    name: "타이레놀정 500mg",
    class: "해열·진통",
    indications: ["발열", "두통", "근육통", "생리통"],
    allergy_tags: [],
    avoid_tags: ["간질환"],
    age_min: 12,
    dose: "성인 1정 4~6시간 간격 (하루 최대 3,000mg)",
    notes: ["다른 감기약과 성분 중복 주의"],
    imgAlt: "타이레놀"
  },

  // 2. 이부프로펜
  {
    id: "ibuprofen_200",
    name: "이부프로펜 200mg",
    class: "진통·소염",
    indications: ["두통", "인후통", "근육통", "생리통"],
    allergy_tags: ["NSAID"],
    avoid_tags: ["위장질환", "천식"],
    age_min: 12,
    dose: "1정씩 식후 복용, 6~8시간 간격",
    notes: ["위장 장애 유발 가능", "천식 환자 주의"],
    imgAlt: "이부프로펜"
  },

  // 3. 클로르페니라민(항히스타민)
  {
    id: "chlorpheniramine",
    name: "클로르페니라민정",
    class: "항히스타민(비염·알레르기)",
    indications: ["코막힘", "콧물", "가려움"],
    allergy_tags: [],
    avoid_tags: [],
    age_min: 12,
    dose: "1정 8~12시간 간격",
    notes: ["졸음 유발", "운전 금지"],
    imgAlt: "알레르기약"
  },

  // 4. 감기 복합제 (판콜A, 콜대원 등)
  {
    id: "cold_complex",
    name: "감기 복합제(판콜A·콜대원 등)",
    class: "감기약(복합제)",
    indications: ["발열", "두통", "기침", "콧물", "인후통"],
    allergy_tags: [],
    avoid_tags: ["성분중복"],
    age_min: 12,
    dose: "제품별 용법 준수 (중복성분 주의)",
    notes: ["여러 성분이 섞여 있어 다른 약과 중복 주의"],
    imgAlt: "감기약"
  },

  // 5. 코푸시럽(기침·가래)
  {
    id: "cough_syrup",
    name: "코푸시럽",
    class: "진해·거담제",
    indications: ["기침", "가래"],
    allergy_tags: [],
    avoid_tags: [],
    age_min: 12,
    dose: "성인 10mL씩 하루 3회",
    notes: ["졸음 가능", "운전 주의"],
    imgAlt: "기침약"
  },

  // 6. 덱스트로메토르판 (마른 기침)
  {
    id: "dextromethorphan",
    name: "덱스트로메토르판 시럽",
    class: "기침(진해제)",
    indications: ["기침", "인후통"],
    allergy_tags: [],
    avoid_tags: ["천식"],
    age_min: 6,
    dose: "성인 10mL, 6~12세 5mL (1일 3회)",
    notes: ["어지러움 가능", "천식 환자 주의"],
    imgAlt: "기침약"
  },

  // 7. 가래약(카르보시스테인/엘도스)
  {
    id: "carbocisteine",
    name: "카르보시스테인(가래약)",
    class: "거담제",
    indications: ["가래", "기침"],
    allergy_tags: [],
    avoid_tags: ["간질환"],
    age_min: 12,
    dose: "성인 1회 1정씩, 하루 3회",
    notes: ["간 손상 환자 주의"],
    imgAlt: "가래약"
  },

  // 8. 훼스탈플러스정(복합 소화제)
  {
    id: "festal",
    name: "훼스탈플러스정",
    class: "소화제",
    indications: ["소화불량", "복부팽만"],
    allergy_tags: [],
    avoid_tags: ["췌장질환"],
    age_min: 0,
    dose: "성인 1~2정 식후 복용",
    notes: ["복통 지속 시 전문가 상담"],
    imgAlt: "소화제"
  },

  // 9. 제산제 (겔포스 등)
  {
    id: "antacid",
    name: "제산제(겔포스 등)",
    class: "위산·속쓰림",
    indications: ["속쓰림", "위산과다"],
    allergy_tags: [],
    avoid_tags: ["신장질환"],
    age_min: 0,
    dose: "필요 시 1포 또는 1회 복용",
    notes: ["다른 약과 1시간 간격 필요"],
    imgAlt: "제산제"
  },

  // 10. 스멕타 (설사약)
  {
    id: "smecta",
    name: "스멕타(디오스멕타이트)",
    class: "지사제",
    indications: ["설사", "묽은변"],
    allergy_tags: [],
    avoid_tags: ["변비"],
    age_min: 0,
    dose: "1포씩 하루 2~3회",
    notes: ["변비 유발 가능"],
    imgAlt: "설사약"
  }
];

// ---------------------------------------------------
// 추천 함수
// ---------------------------------------------------
function recommend(meds, symptoms, allergyTags, age){
  return meds
    // 나이 제한
    .filter(m => (m.age_min ?? 0) <= age)

    // 알레르기/주의 제외
    .filter(m => !m.allergy_tags?.some(t => allergyTags.includes(t)))
    .filter(m => !m.avoid_tags?.some(t => allergyTags.includes(t)))

    // 증상-적응증 매칭 점수 계산
    .map(m => ({
      ...m,
      score: (m.indications || []).reduce(
        (s, tag) => s + (symptoms.includes(tag) ? 1 : 0),
        0
      )
    }))

    // 매칭 점수 0점(해당 없음)은 제외
    .filter(m => m.score > 0)

    // 점수순 정렬 (높은 순)
    .sort((a, b) => b.score - a.score);
}


// ---------------------------------------------------
// 결과 화면 렌더링
// ---------------------------------------------------
function render(cards){
  const box = document.getElementById("results");

  if(cards.length === 0){
    box.innerHTML = `<div>조건에 맞는 추천이 없습니다.</div>`;
    return;
  }

  box.innerHTML = cards.map(c => `
    <article class="card">
      <div>
        <h3 style="margin:0 0 6px">${c.name}</h3>

        <div class="badge">${c.class}</div>
        ${c.age_min > 0 ? `<span class="badge warn">${c.age_min}세 이상</span>` : ""}

        <p><b>적응증:</b> ${c.indications.join(", ")}</p>
        <p><b>복용법:</b> ${c.dose}</p>
        <p><b>주의:</b> ${c.notes.join(" / ")}</p>
      </div>

      <div class="imgbox">${c.imgAlt}</div>
    </article>
  `).join("");
}


// ---------------------------------------------------
// 유틸 함수
// ---------------------------------------------------
function getCheckedValues(name){
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
              .map(i => i.value);
}


// ---------------------------------------------------
// 이벤트 연결
// ---------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("run").addEventListener("click", () => {
    const symptoms = getCheckedValues("sym");
    const allergies = getCheckedValues("alg");
    const age = parseInt(document.getElementById("age").value || "0", 10);

    const result = recommend(MEDS, symptoms, allergies, age);
    render(result);
  });
});
