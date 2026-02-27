// 주소 앞에 프록시 서버(cors-anywhere)를 붙여서 테스트합니다.
const API_URL = "https://cors-anywhere.herokuapp.com/https://proclubs.ea.com/api/fc/clubs/matches?platform=common-gen5&clubIds=250281&matchType=leagueMatch&maxResultCount=10";
async function fetchMatches() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderMatches(data);
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    document.getElementById('match-list').innerHTML = "데이터를 불러올 수 없습니다.";
  }
}

function renderMatches(matches) {
  const matchList = document.getElementById('match-list');
  matchList.innerHTML = ''; // 로딩 문구 제거

  matches.forEach(match => {
    const clubs = match.clubs;
    const myClubId = "250281";

    // 우리 팀과 상대 팀 구분
    const home = Object.values(clubs)[0];
    const away = Object.values(clubs)[1];

    const myTeam = clubs[myClubId];
    const opponent = Object.values(clubs).find(c => c.clubId !== myClubId);

    // 승패 결정
    let resultText = "DRAW";
    let resultClass = "draw";
    if (myTeam.wins > 0) { resultText = "WIN"; resultClass = "win"; }
    else if (myTeam.losses > 0) { resultText = "LOSS"; resultClass = "loss"; }

    const matchHtml = `
            <article class="match-item">
                <div class="match-result ${resultClass}">${resultText}</div>
                <div class="match-info">
                    <span class="team-name">${home.details.name}</span>
                    <span class="match-score">${home.goals} : ${away.goals}</span>
                    <span class="team-name">${away.details.name}</span>
                </div>
                <div class="match-date" style="color: #888; font-size: 12px;">
                    ${new Date(match.timestamp * 1000).toLocaleDateString()}
                </div>
            </article>
        `;
    matchList.innerHTML += matchHtml;
  });
}

fetchMatches();