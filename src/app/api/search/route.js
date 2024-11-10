import { NextResponse } from 'next/server';

const SHEET_ID = '1-3DK85MfB-h1aq2FfAtnvJ2qoIYIj3MSwpkGwHCGJec';
const SHEET_NAME = 'old_1';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: "키워드가 제공되지 않았습니다." }, { status: 400 });
  }

  try {
    const response = await fetch(SHEET_URL);
    const data = await response.text();
    
    const rows = data.split('\n').map(row => row.split(',').map(cell => cell.replace(/^"|"$/g, '')));
    const headers = rows[0];
    const jsonData = rows.slice(1).map(row => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    const updateInfo = rows[0][15]; // P1 셀

    if (updateInfo && updateInfo.startsWith("UPDATE_FINISHED:")) {
      const updateTime = updateInfo.substring("UPDATE_FINISHED:".length).trim();
      const formattedDate = formatDate(updateTime);

      const result = searchKeyword(jsonData, keyword);
      if (result) {
        return NextResponse.json({ result, updateTime: formattedDate });
      } else {
        return NextResponse.json({ error: "워크 아이디를 정확하게 입력해주세요" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "현재 데이터 업데이트 중입니다. 잠시 후 다시 시도해 주세요." }, { status: 503 });
    }
  } catch (error) {
    // console.error('Error:', error);
    return NextResponse.json({ error: "데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false });
}

function searchKeyword(data, keyword) {
  return data.find(row => row.Name === keyword) || null;
}