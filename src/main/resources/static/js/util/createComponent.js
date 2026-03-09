const createComponent = (() => {


    function 품목추가(idx){

        let div = `<div class="flex-box itemInfo" id="boxIndex_${idx}">
                            <div class="input-group itemName">
                                <label>재고 품목</label>
                                <input placeholder="품목을 입력하세요" id="itemName_${idx}" autocomplete="off">
                                <input id="itemNameId_${idx}" hidden>
                                <input id="price1_${idx}" hidden>
                                <input id="price2_${idx}" hidden>
                                <div id="autocomplete-list_${idx}" class="autocomplete-suggestions"></div>
                            </div>

                            <div class="input-group" style="width: 15%;">
                                <label>수량</label>
                                <input autocomplete="off" type="number" placeholder="0" id="itemCnt_${idx}" oninput="itemChange_JS.initTotalPrice()">
                            </div>
                            <div class="flex-box" style="margin: 15px 0 0 10px; align-items: center;">
                                <button class="subItem" onclick="itemChange_JS.품목제거(${idx})">삭제</button>
                            </div>
                        </div>`;

        return div;
    }

    function 검색된품목(item, idx){
        const jsonItem = JSON.stringify(item).replace(/"/g, '&quot;');
        let div = `<div class="suggestion-item" onclick="itemChange_JS.selectItem('${jsonItem}', '${idx}')">
                                ${item.itemName} (재고수량 : ${item.currentCnt})
                            </div>`;
        return div;
    }

    function 합계금액(itemName, calculate, price){
        let div = `<div class="flex-box2">
                            <span>${itemName}</span>
                            <div>
                                <span class="sumPrice">${price}원</span>
                                <span>${calculate}</span>
                            </div>
                        </div>`;
        return div;
    }

    function 검색된고객명단(item){
        let div = `<div class="suggestion-item" onclick="itemHistory_JS.setCustomer('${item.customer}')">
                            ${item.customer}
                        </div>`
        return div;
    }

    function 만료된휠체어목록(item){
        let div = `<div class="status-card">
                                <div class="flex-box2">
                                    <div class="item-info">
                                        <h3>대여자: ${item.customerName} (${item.customerTel})</h3>
                                        <p>${item.wheelchairType}</p>
                                    </div>
                                    <div class="returnBtn">
                                        <span class="badge rented">기간 종료</span>
                                        <button class="btn-blue" onclick="chairRentalList_JS.휠체어반납(${item.rentalId})">반납완료</button>
                                        <button class="btn-green" onclick="chairRentalList_JS.휠체어연장(${item.rentalId}, '${item.expectDate}')">연장</button>
                                    </div>
                                </div>
                            </div>`;
        return div;
    }

    function 명세표출력(item, idx){
        let div = `<tr>
                            <td>${idx}</td>
                            <td>${item.itemName}</td>
                            <td>${item.cnt}</td>
                            <td class="text-right">${fommatter('comma',item.price)}</td>
                            <td></td>
                        </tr>`;

        return div;
    }

    function 고객검색목록(item){
        let div = `<div class="suggestion-item" onclick='itemChange_JS.고객선택(${JSON.stringify(item)})'>
                                ${item.customerName} (${fommatter('tel',item.customerTel)})
                            </div>`;
        return div;
    }

    return {
        품목추가: 품목추가,
        검색된품목: 검색된품목,
        합계금액: 합계금액,
        검색된고객명단: 검색된고객명단,
        만료된휠체어목록: 만료된휠체어목록,
        명세표출력: 명세표출력,
        고객검색목록: 고객검색목록,
    }
})();