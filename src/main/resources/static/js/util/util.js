/**
 * 공통 fetch 함수
 * @param {string} url - 요청 주소
 * @param {string} method - GET, POST, PUT, DELETE
 * @param {object} data - 전송할 데이터 (객체 형태)
 */
async function sendRequest(url, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            alert("서버 작업에 실패했습니다");
            return;
        }
        return await response.json(); // JSON 결과 반환
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function isEmpty(data) {
    // 1. null, undefined, 빈 문자열, 0 등을 한 번에 체크
    if (data === null || data === undefined || data === '') {
        return true;
    }
    return false;
}

function fommatter(type, data){
    let cleanData = ''
    if(isEmpty(data)){
        return '';
    }
    switch (type){
        case 'comma':
            cleanData = data.toString().replace(/[^\d]/g, '');
            return cleanData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        case 'yyyy-mm-dd':
            cleanData = data.toString().replace(/[^\d]/g, '');
            return `${cleanData.slice(0,4)}-${cleanData.slice(4,6)}-${cleanData.slice(6,8)}`;
        case 'tel':
            cleanData = data.toString().replace(/[^\d]/g, '');
            return cleanData.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
        case 'custNum':
            cleanData = data.toString().replace(/[^\d]/g, '');
            return cleanData.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");
        default:
            return data;
    }
}

function checkAutoComplete(value){
    let lastChar = value.charAt(value.length-1);
    let validate = /[가-힣a-zA-Z]/.test(lastChar)

    if(value.length > 1 && validate){
        return true;
    }else{
        return false;
    }
}

function getCurrentTime(){
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


function addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);

    return date.toISOString().split('T')[0];
}

function convertToKoreanWon(num) {
    if (num == 0) return '영';

    const unitWords = ['', '만', '억', '조', '경'];
    const digitWords = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const positionWords = ['', '십', '백', '천'];

    let result = '';
    let numStr = num.toString();

    // 4자리씩 끊어서 처리
    for (let i = 0; i < numStr.length; i += 4) {
        let chunk = numStr.substring(Math.max(0, numStr.length - i - 4), numStr.length - i);
        let chunkResult = '';

        for (let j = 0; j < chunk.length; j++) {
            let digit = parseInt(chunk[chunk.length - 1 - j]);
            if (digit !== 0) {
                chunkResult = digitWords[digit] + positionWords[j] + chunkResult;
            }
        }

        if (chunkResult !== '') {
            result = chunkResult + unitWords[i / 4] + result;
        }
    }

    return `${result}원정`;
}


function getRealPrice(price){
    return Math.trunc(Number(price) / 1.1);
}

function getTax(price){
    let real = Math.trunc(Number(price) / 1.1);
    return Math.trunc(Number(real) - price);
}