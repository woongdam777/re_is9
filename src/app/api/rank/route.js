import { NextResponse } from 'next/server';

const SHEET_ID = '1-3DK85MfB-h1aq2FfAtnvJ2qoIYIj3MSwpkGwHCGJec';
const RANK_SHEET_NAME = 'rank';
const RANK_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${RANK_SHEET_NAME}`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version')?.trim();  // Trim spaces around version

  if (!version) {
    return NextResponse.json({ error: "버전이 제공되지 않았습니다." }, { status: 400 });
  }

  try {
    const response = await fetch(RANK_SHEET_URL);
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);

    const date = parsedData[1][13].replace(/^"|"$/g, '');
    const rankString = parsedData[2][13].replace(/^"|"$/g, '');
    const ranks = parseRankData(rankString);
    const total = parsedData[3][13].replace(/^"|"$/g, '');
    
    const jobData = {version, date, total, ranks};

    return NextResponse.json(jobData);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

function parseCSV(data) {
  return data.split('\n').map(row => row.split(',').map(cell => cell.trim()));
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