import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { auth } from '../../utils/googleAuth';

const SHEET_ID = '13hy5XfA8tIR7L_wsOpy7CJ17GWctlJu4UhwL838Fh8g';
const OLD_SHEET_NAME = 'old_1';
const FLOW_SHEET_NAME = 'flow';

const sheets = google.sheets({ version: 'v4', auth });

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: "키워드가 제공되지 않았습니다." }, { status: 400 });
  }

  try {
    // console.log(`Processing request for keyword: ${keyword}`);

    // 업데이트 상태 확인
    const updateInfo = await getUpdateInfo();
    // console.log('Update info:', updateInfo);

    if (!updateInfo.startsWith("UPDATE_FINISHED:")) {
      return NextResponse.json({ error: "현재 데이터 업데이트 중입니다. 잠시 후 다시 시도해 주세요." }, { status: 503 });
    }

    const updateTime = formatDate(updateInfo.substring("UPDATE_FINISHED:".length).trim());

    // 키워드로 데이터 검색
    const [result, flowTicket, flowForce] = await Promise.all([
      searchKeyword(keyword),
      searchKeywordInTicket(keyword),
      searchKeywordInForce(keyword)
    ]);

    // console.log('Search results:', { result, flowTicket, flowForce });

    if (result) {
      return NextResponse.json({ result, flowTicket, flowForce, updateTime });
    } else {
      return NextResponse.json({ error: "워크 아이디를 정확하게 입력해주세요" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

async function getUpdateInfo() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${OLD_SHEET_NAME}!P1`,
    });
    return response.data.values[0][0];
  } catch (error) {
    console.error('Error getting update info:', error);
    throw error;
  }
}

async function searchKeyword(keyword) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${OLD_SHEET_NAME}!A1:P300`,
      majorDimension: 'ROWS',
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    });

    const [headers, ...rows] = response.data.values;
    const keyIndex = headers.indexOf('Key');
    const row = rows.find(row => row[keyIndex] === keyword);

    if (row) {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index];
        return obj;
      }, {});
    }
    return null;
  } catch (error) {
    console.error('Error searching keyword:', error);
    throw error;
  }
}

async function searchKeywordInTicket(keyword) {
  try {
    return await searchInFlow(keyword, 14);
  } catch (error) {
    console.error('Error searching keyword in ticket:', error);
    throw error;
  }
}

async function searchKeywordInForce(keyword) {
  try {
    return await searchInFlow(keyword, 15);
  } catch (error) {
    console.error('Error searching keyword in force:', error);
    throw error;
  }
}

async function searchInFlow(keyword, columnIndex) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${FLOW_SHEET_NAME}!A1:P300`,
      majorDimension: 'ROWS',
    });

    const rows = response.data.values;
    const keywordIndex = rows.findIndex(row => row[0] === keyword);
    if (keywordIndex !== -1 && keywordIndex < rows.length) {
      return rows[keywordIndex][columnIndex];
    }
    return null;
  } catch (error) {
    console.error('Error searching in flow:', error);
    throw error;
  }
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false });
}
