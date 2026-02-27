const createComponent = (() => {


    function searchItem(idx){

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

    function searchItemInfo(item, idx){
        const jsonItem = JSON.stringify(item).replace(/"/g, '&quot;');
        let div = `<div class="suggestion-item" onclick="itemChange_JS.selectItem('${jsonItem}', '${idx}')">
                                ${item.itemName} (재고수량 : ${item.itemStock.currentCnt})
                            </div>`;
        return div;
    }

    function priceBox(itemName, price){
        let div = `<div class="flex-box2">
                            <span>${itemName}</span>
                            <span class="sumPrice">${price}원</span>
                        </div>`;
        return div;
    }

    function customerDiv(item){
        let div = `<div class="suggestion-item" onclick="itemHistory_JS.setCustomer('${item.customer}')">
                            ${item.customer}
                        </div>`
        return div;
    }

    return {
        searchItem: searchItem,
        searchItemInfo: searchItemInfo,
        priceBox: priceBox,
        customerDiv: customerDiv,
    }
})();