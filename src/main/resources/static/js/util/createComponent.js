const createComponent = (() => {


    function 품목추가(idx){

        let div = `<div class="flex-box itemInfo" id="boxIndex_${idx}">
                            <div class="input-group itemName">
                                <label>재고 품목</label>
                                <input placeholder="품목을 입력하세요" id="itemName_${idx}">
                                <input id="itemNameId_${idx}" hidden>
                                <input id="price1_${idx}" hidden>
                                <input id="price2_${idx}" hidden>
                                <div id="autocomplete-list_${idx}" class="autocomplete-suggestions"></div>
                            </div>

                            <div class="input-group">
                                <label>수량</label>
                                <input type="number" placeholder="0" id="itemCnt_${idx}" oninput="itemChange_JS.initTotalPrice()">
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

    function 합계금액(itemName, price){
        let div = `<div class="flex-box2">
                            <span>${itemName}</span>
                            <span class="sumPrice">${price}원</span>
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
                                        <button class="btn-blue" data-id="${item.rentalId}" onclick="chairRentalList_JS.휠체어반납(this.dataset.id, 'top')">반납완료</button>
                                    </div>
                                </div>
                            </div>`;
        return div;
    }

    function 단가이력수정목록(item){
        let div = `<tr>
                                <td hidden>
                                    <input data-id="${item.id ?? ''}" data-itemid="${item.itemId ?? ''}">
                                </td>
                                <td>
                                    <input value="${item.createAt ?? getCurrentTime()}">
                                </td>
                                <td>
                                    <input value="${fommatter('comma',item.price1)}" oninput="this.value = fommatter('comma',this.value)">
                                </td>
                                <td>
                                    <input value="${fommatter('comma',item?.price2)}" oninput="this.value = fommatter('comma',this.value)">
                                </td>
                                <td>
                                    <input value="${fommatter('comma',item?.price3)}" oninput="this.value = fommatter('comma',this.value)">
                                </td>
                            </tr>`;
        return div;
    }

    return {
        품목추가: 품목추가,
        검색된품목: 검색된품목,
        합계금액: 합계금액,
        검색된고객명단: 검색된고객명단,
        만료된휠체어목록: 만료된휠체어목록,
        단가이력수정목록: 단가이력수정목록,
    }
})();