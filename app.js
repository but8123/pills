// 간단한 데이터 (성분 중심). 실제 서비스 전에는 문구/용법을 반드시 재검토하세요.
const MEDS = [
  {
    id: "acetaminophen_500",
    name: "아세트아미노펜 500mg",
    class: "진통·해열",
    indications: ["발열", "두통", "근육통"],
    allergy_tags: ["아세트아미노펜"],
    avoid_tags: ["간질환"],
    age_min: 12,
    dose: "성인 500mg 1정, 4~6시간 간격(하루 최대 3,000mg)",
    how: "물과 함께 복용, 과음 시 복용 금지",
    notes: ["다른 감기약과 성분 중복 주의"],
    imgAlt: "해열제"
  },
  {
    id: "ibuprofen_200",
    name: "이부프로펜 200mg",
    class: "진통·소염",
    indications: ["두통", "인후통", "근육통"],
    allergy_tags: ["NSAID"],
    avoid_tags: [],
    age_min: 12,
    dose: "200mg 1정, 6~8시간 간격",
    how: "식후 복용 권장",
    notes: ["천식·위장질환 주의"],
    imgAlt: "소염진통제"
  },
  {
    id: "antihistamine",
    name: "클로르페니라민(항히스타민)",
    class: "비염·알레르기",
    indications: ["코막힘", "콧물", "가려움"],
    allergy_tags: [],
    avoid_tags: ["유당불내증"],
    age_min: 12,
    dose: "1정, 8~12시간 간격(졸림 주의)",
    how: "운전 전 복용 피하기",
    notes: ["졸음 유발 가능"],
    imgAlt: "항히스타민"
  },
  {
    id: "antacid",
    name: "제산제",
    class: "소화불량",
    indications: ["소화불량"],
    allergy_tags: [],
    avoid_tags: [],
    age_min: 0,
    dose: "표기 용법 준수",
    how: "다른 약과 간격 두고 복용",
    notes: ["신장질환 주의"],
    imgAlt: "제산제"
  },
  {
  id: "dextromethorphan",
  name: "덱스트로메토르판 시럽",
  class: "기침·진해제",
  indications: ["기침", "인후통"],
  allergy_tags: [],
  avoid_tags: ["천식"],
  age_min: 6,
  dose: "성인 10mL, 6~12세 5mL씩 1일 3회",
  how: "정확한 용량을 계량컵으로 측정하여 복용",
  notes: ["과량 복용 시 어지러움 주의", "천식 환자 복용 주의"],
  imgAlt: "기침약"
  }
];

function recommend(meds, symptoms, allergyTags, age){
  return meds
    .filter(m => (m.age_min ?? 0) <= age)
    .filter(m => !m.allergy_tags?.some(t => allergyTags.includes(t)))
    .filter(m => !m.avoid_tags?.some(t => allergyTags.includes(t)))
    .map(m => ({ ...m, score: (m.indications || []).reduce((s, tag) => s + (symptoms.includes(tag) ? 1 : 0), 0) }))
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score);
}

function render(cards){
  const box = document.getElementById('results');
  if(cards.length === 0){
    box.innerHTML = `<div>조건에 맞는 추천이 없습니다. 선택을 바꿔 보세요.</div>`;
    return;
  }
  box.innerHTML = cards.map(c => `
    <article class="card">
      <div>
        <h3 style="margin:0 0 6px">${c.name}</h3>
        <div class="badge">${c.class}</div>
        ${c.age_min > 0 ? `<span class="badge warn">${c.age_min}세 이상</span>` : ''}
        <p style="margin:8px 0 6px"><b>적응증:</b> ${c.indications.join(', ')}</p>
        <p style="margin:0 0 6px"><b>복용법:</b> ${c.dose}</p>
        <p style="margin:0 0 6px"><b>주의:</b> ${c.notes.join(' / ')}</p>
      </div>
      <div class="imgbox" aria-hidden="true">${c.imgAlt}</div>
    </article>
  `).join('');
}

function getCheckedValues(name){
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('run');
  btn.addEventListener('click', () => {
    const symptoms = getCheckedValues('sym');
    const algs = getCheckedValues('alg');
    const age = parseInt(document.getElementById('age').value || '0', 10);
    render(recommend(MEDS, symptoms, algs, age));
  });
});
