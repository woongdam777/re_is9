import { NextResponse } from 'next/server';

const SHEET_ID = '1-3DK85MfB-h1aq2FfAtnvJ2qoIYIj3MSwpkGwHCGJec';
const RANK_SHEET_NAME = 'rank';
const RANK_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${RANK_SHEET_NAME}&range=A1:C4`;

export async function GET() {
  try {
    const response = await fetch(RANK_SHEET_URL);
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);

    const allVersionsData = extractAllVersionsData(parsedData);

    return NextResponse.json(allVersionsData);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

function parseCSV(data) {
  return data.split('\n').map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
}

function extractAllVersionsData(parsedData) {
  const headerRow = parsedData[0];
  const dateRow = parsedData[1];
  const rankRow = parsedData[2];
  const totalRow = parsedData[3];

  const versionsData = {};

  for (let i = 0; i < headerRow.length; i++) {
    const version = headerRow[i];
    if (version && version !== '') {
      versionsData[version] = {
        version: version,
        date: dateRow[i],
        total: totalRow[i],
        ranks: parseRankData(rankRow[i])
      };
    }
  }

  return versionsData;
}

function parseRankData(rankString) {
  const rankEntries = rankString.split(';');
  const ranks = {};

  rankEntries.forEach(entry => {
    const [job, scoreCount] = entry.split(':');
    if (scoreCount) {
      const [score, count] = scoreCount.split('_');
      ranks[job] = { score: parseInt(score), count: parseInt(count) };
    }
  });

  return ranks;
}
