const itemChange_JS = (() =>{

    let addItemBtn, subItemBtn, ItemListBox, changeItemBtn, typeGroup;
    let index = 1;

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
        addItemBtn.click();
    })


    function onLoad(){
        addItemBtn = document.querySelector('#add-item-btn');
        subItemBtn = document.querySelector('#sub-item-btn');
        ItemListBox = document.querySelector('#ItemListBox');
        changeItemBtn = document.querySelector('#changeItemBtn');
        typeGroup = document.querySelector('#typeGroup');
        index = 1;
    }



    function initEventListener(){
        /**
         * 출고, 입고 선택지
         */
        typeGroup.addEventListener('click', function (){
            initTotalPrice();
        })

        /**
         * 품목 추가클릭
         */
        addItemBtn.addEventListener('click',async function() {
            let div = createComponent.searchItem(index);
            ItemListBox.insertAdjacentHTML('beforeend',div);

            initSearchEvent(index);
            index++;
        });

        /**
         * 품목 제거 클릭
         */
        subItemBtn.addEventListener('click', function(){
            document.querySelector(`#boxIndex_${index-1}`).remove();
            index--;
        });

        /**
         * 최종 제출
         */
        changeItemBtn.addEventListener('click',async function(){
            if(!fn_validate()){
                return;
            }

            let list = document.querySelectorAll('.itemInfo');
            let itemInfoList = [];
            list.forEach((item, idx) =>{
                const id = document.querySelector(`#itemNameId_${idx + 1}`)?.value;
                const name = document.querySelector(`#itemName_${idx + 1}`)?.value;
                const cnt = document.querySelector(`#itemCnt_${idx + 1}`)?.value;

                // 데이터가 있는 경우만 리스트에 추가
                if (id && cnt) {
                    itemInfoList.push({
                        itemId: parseInt(id),
                        itemName: name,
                        cnt: parseInt(cnt)
                    });
                }
            })

            const params = {
                date: document.querySelector('#dateTime').value,
                customer: document.querySelector('#customer').value,
                customerTel: document.querySelector(`#customerTel`).value.replaceAll('-',''),
                itemInfoList: itemInfoList,
                type: document.querySelector('input[name="type"]:checked').value,
            };

            let data = await sendRequest("/item/changeCnt",'POST',params);
            if(data.code === 200){
                alert(data.msg);
                ItemListBox.innerHTML = '';
                document.querySelector(`#total-price`).innerHTML = '0원';
                document.querySelector(`#receiptBox`).innerHTML = '';
                document.querySelector(`#customer`).value  = '';
                document.querySelector(`#customerTel`).value  = '';
                index = 1;
                addItemBtn.click();
            }
        })
    }



    /**
     * 검색된 품목 선택
     * @param jsonItem
     * @param i
     */
    function selectItem(jsonItem, idx){
        let data = JSON.parse(jsonItem);
        document.querySelector(`#itemNameId_${idx}`).value = data.id;
        document.querySelector(`#itemName_${idx}`).value = data.itemName;
        document.querySelector(`#price1_${idx}`).value = data.price1;
        document.querySelector(`#price2_${idx}`).value = data.price2;
        document.querySelector(`#autocomplete-list_${idx}`).innerHTML = '';
    }


    /**
     * 품목 검색
     * @param idx
     */
    function initSearchEvent(idx){
        let itemName = document.querySelector(`#itemName_${idx}`);
        let listContainer = document.querySelector(`#autocomplete-list_${idx}`);

        itemName.addEventListener('input',async function() {

            if(!checkAutoComplete(itemName.value)){
                listContainer.innerHTML = '';
                return;
            }

            const params = {
                itemName: itemName.value,
            };

            let data = await sendRequest("/item/search",'POST',params);
            if(data.code === 200){
                console.log(data);
                let div = '';
                data.data.forEach(item => {
                    div += createComponent.searchItemInfo(item, idx);
                });
                listContainer.innerHTML = div;
            }
        });
    }


    /**
     * 최종 합계 계산서
     */
    function initTotalPrice(){
        let type = document.querySelector('input[name="type"]:checked').value;
        let receiptBox = document.querySelector(`#receiptBox`);
        let totalPrice = document.querySelector(`#total-price`);

        let list = document.querySelectorAll('.itemInfo');
        let div = '';
        list.forEach((item, idx) =>{
            let price1 = document.querySelector(`#price1_${idx + 1}`).value;
            let price2 = document.querySelector(`#price2_${idx + 1}`).value;
            let cnt = document.querySelector(`#itemCnt_${idx + 1}`).value;
            let itemName = document.querySelector(`#itemName_${idx + 1}`).value;
            let price = '';

            if(type === "IN"){
                let price = fommatter('comma', price1 * cnt);
            }else{
                let price = fommatter('comma', price2 * cnt);
            }

            div += createComponent.priceBox(itemName, price);
        });

        receiptBox.innerHTML = div;

        let total = Array.from(document.querySelectorAll('.sumPrice')).reduce((acc, el) =>{
            const price = parseInt(el.innerText.replace(/[^0-9]/g, '')) || 0;
            return acc + price;
        },0)
        totalPrice.innerHTML = fommatter('comma', total) + '원';
    }

    /**
     * 유효성 검증
     * @returns {boolean}
     */
    function fn_validate(){
        if(isEmpty(document.querySelector('#dateTime').value)){
            alert("날짜가 비었습니다");
            return false;
        }
        if(isEmpty(document.querySelector('#customer').value)){
            alert("매출, 매입처가 비었습니다");
            return false;
        }
        if(isEmpty(document.querySelector('#customerTel').value)){
            alert("연락처가 비었습니다");
            return false;
        }
        return true;
    }


    return {
        onLoad: onLoad,
        initTotalPrice: initTotalPrice,
        selectItem: selectItem,
    }
})();

