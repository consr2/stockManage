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
        if (!response.ok) alert("서버 작업에 실패했습니다");
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