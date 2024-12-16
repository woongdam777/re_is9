import { NextResponse } from 'next/server';

const SHEET_ID = '1-3DK85MfB-h1aq2FfAtnvJ2qoIYIj3MSwpkGwHCGJec';
const RANK_SHEET_NAME = 'rank';
const RANK_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${RANK_SHEET_NAME}`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version')?.trim();

  if (!version) {
    return NextResponse.json({ error: "버전이 제공되지 않았습니다." }, { status: 400 });
  }

  try {
    const response = await fetch(RANK_SHEET_URL);
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);

    const jobData = extractJobData(parsedData, version);

    if (!jobData) {
      return NextResponse.json({ error: "요청한 버전의 데이터를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(jobData);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

function parseCSV(data) {
  return data.split('\n').map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
}

function extractJobData(parsedData, targetVersion) {
  const headerRow = parsedData[0];
  const versionIndex = headerRow.findIndex(cell => cell === targetVersion);

  if (versionIndex === -1) {
    return null;
  }

  const dateRow = parsedData[1];
  const rankRow = parsedData[2];
  const totalRow = parsedData[3];

  if (!dateRow || !rankRow || !totalRow) {
    return null;
  }

  return {
    version: targetVersion,
    date: dateRow[versionIndex],
    total: totalRow[versionIndex],
    ranks: parseRankData(rankRow[versionIndex])
  };
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
