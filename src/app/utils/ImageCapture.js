import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export const captureAndCopy = async (element) => {
  if (element) {
    try {
      const canvas = await html2canvas(element);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert('이미지가 클립보드에 복사되었습니다.');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        alert('클립보드 복사 실패. 다운로드를 시도합니다.');
        saveAs(blob, 'captured-image.png');
      }
    } catch (err) {
      console.error('캡처 실패:', err);
      alert('이미지 캡처에 실패했습니다.');
    }
  }
};

export const captureAndDownload = async (element) => {
  if (element) {
    try {
      const canvas = await html2canvas(element);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      saveAs(blob, 'captured-image.png');
    } catch (err) {
      console.error('캡처 실패:', err);
      alert('이미지 캡처에 실패했습니다.');
    }
  }
};