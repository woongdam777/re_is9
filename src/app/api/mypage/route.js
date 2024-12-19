// import { NextResponse } from 'next/server';
// import { google } from 'googleapis';

// const SHEET_ID = '13hy5XfA8tIR7L_wsOpy7CJ17GWctlJu4UhwL838Fh8g';
// const OLD_SHEET_NAME = 'old_1';
// const FLOW_SHEET_NAME = 'flow';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const keyword = searchParams.get('keyword');

//   if (!keyword) {
//     return NextResponse.json({ error: "키워드가 제공되지 않았습니다." }, { status: 400 });
//   }

//   try {
//     const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
//     const sheets = google.sheets({ version: 'v4', auth });

//     const [oldData, flowData, updateInfo] = await Promise.all([
//       getSheetData(sheets, SHEET_ID, `${OLD_SHEET_NAME}!A:P`, keyword),
//       getSheetData(sheets, SHEET_ID, `${FLOW_SHEET_NAME}!A:P`, keyword),
//       sheets.spreadsheets.values.get({
//         spreadsheetId: SHEET_ID,
//         range: `${OLD_SHEET_NAME}!P1`,
//       }),
//     ]);

//     const updateCell = updateInfo.data.values[0][0];

//     if (updateCell && updateCell.startsWith("UPDATE_FINISHED:")) {
//       const updateTime = updateCell.substring("UPDATE_FINISHED:".length).trim();
//       const formattedDate = formatDate(updateTime);

//       if (oldData.length > 0) {
//         const result = convertToJson(oldData[0]);
//         const flowTicket = flowData.length > 0 ? flowData[0][14] : null;
//         const flowForce = flowData.length > 0 ? flowData[0][15] : null;

//         return NextResponse.json({ result, flowTicket, flowForce, updateTime: formattedDate });
//       } else {
//         return NextResponse.json({ error: "워크 아이디를 정확하게 입력해주세요" }, { status: 404 });
//       }
//     } else {
//       return NextResponse.json({ error: "현재 데이터 업데이트 중입니다. 잠시 후 다시 시도해 주세요." }, { status: 503 });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: "데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
//   }
// }

// async function getSheetData(sheets, spreadsheetId, range, keyword) {
//   const response = await sheets.spreadsheets.values.get({
//     spreadsheetId,
//     range,
//     majorDimension: 'ROWS',
//     valueRenderOption: 'UNFORMATTED_VALUE',
//     dateTimeRenderOption: 'FORMATTED_STRING',
//   });

//   const headers = response.data.values[0];
//   const keyIndex = headers.indexOf('Key');
  
//   return response.data.values.slice(1).filter(row => row[keyIndex] === keyword);
// }

// function formatDate(isoString) {
//   const date = new Date(isoString);
//   return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false });
// }

// function convertToJson(row) {
//   const headers = ['Key', 'Title', 'Description', 'Status', 'Project', 'Type', 'Priority', 'Labels', 'Creator', 'Assignee', 'Reporter', 'Created', 'Updated', 'Resolved', 'Components', 'Epic Link'];
//   let obj = {};
//   headers.forEach((header, index) => {
//     obj[header] = row[index];
//   });
//   return obj;
// }
