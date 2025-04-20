import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { auth } from '../../utils/googleAuth';

const SHEET_ID = '1-3DK85MfB-h1aq2FfAtnvJ2qoIYIj3MSwpkGwHCGJec';
const RANK_SHEET_NAME = 'rank';

const sheets = google.sheets({ version: 'v4', auth });

export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${RANK_SHEET_NAME}!C1:C4`,
      majorDimension: 'COLUMNS',
    });

    const sheetData = response.data.values;
    const allVersionsData = extractAllVersionsData(sheetData);

    return NextResponse.json(allVersionsData);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

function extractAllVersionsData(sheetData) {
  const versionsData = {};

  sheetData.forEach(column => {
    const version = column[0];
    if (version && version !== '') {
      versionsData[version] = {
        version: version,
        date: column[1],
        total: column[3],
        ranks: parseRankData(column[2])
      };
    }
  });

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
