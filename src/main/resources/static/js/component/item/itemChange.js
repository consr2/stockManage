const itemChange_JS = (() =>{

    let index = 1;
    let selector = {
        addItemBtn: null,
        subItemBtn: null,
        ItemListBox: null,
        changeItemBtn: null,
        typeGroup: null,
        date: null,
        customer: null,
        customerTel: null,
        itemInfoList: null,
        type: () => document.querySelector('input[name="type"]:checked'),
        totalPrice: null,
        receiptBox: null,
        custNum: null,
        address: null,
        totalCount: null,
        autoSearchCustomer: null,
    };

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
        selector.addItemBtn.click();
    })


    function onLoad(){
        selector.addItemBtn = document.querySelector('#add-item-btn');
        selector.subItemBtn = document.querySelector('#sub-item-btn');
        selector.ItemListBox = document.querySelector('#ItemListBox');
        selector.changeItemBtn = document.querySelector('#changeItemBtn');
        selector.typeGroup = document.querySelector('#typeGroup');
        selector.date = document.querySelector('#dateTime');
        selector.customer = document.querySelector('#customer');
        selector.customerTel = document.querySelector('#customerTel');
        selector.totalPrice = document.querySelector('#totalPrice');
        selector.receiptBox = document.querySelector('#receiptBox');
        selector.custNum = document.querySelector('#custNum');
        selector.address = document.querySelector('#address');
        selector.totalCount = document.querySelector('#totalCount');
        selector.autoSearchCustomer = document.querySelector('#autoSearchCustomer');
        index = 1;
    }



    function initEventListener(){
        /**
         * 출고, 입고 선택지
         */
        selector.typeGroup.addEventListener('change', function (){
            initTotalPrice();
        })

        /**
         * 품목 추가클릭
         */
        selector.addItemBtn.addEventListener('click',async function() {
            let div = createComponent.품목추가(index);
            ItemListBox.insertAdjacentHTML('beforeend',div);

            initSearchEvent(index);
            index++;
        });


        /**
         * 최종 제출
         */
        selector.changeItemBtn.addEventListener('click',async function(){
            if(!fn_validate()){
                return;
            }

            let list = document.querySelectorAll('.itemInfo');
            let itemInfoList = [];
            list.forEach((item) =>{
                let idx = item.id.substring(9,12);
                const id = document.querySelector(`#itemNameId_${idx}`)?.value;
                const name = document.querySelector(`#itemName_${idx}`)?.value;
                const cnt = document.querySelector(`#itemCnt_${idx}`)?.value;
                const price1 = document.querySelector(`#price1_${idx}`).value;
                const price2 = document.querySelector(`#price2_${idx}`).value;
                const type = selector.type().value;

                let price = 0;
                price = (type === 'IN') ? price1 : price2;

                // 데이터가 있는 경우만 리스트에 추가
                if (id && cnt) {
                    itemInfoList.push({
                        itemId: parseInt(id),
                        itemName: name,
                        cnt: parseInt(cnt),
                        price: price,
                    });
                }
            })

            const params = {
                date: selector.date.value,
                customer: selector.customer.value,
                customerTel: selector.customerTel.value,
                custNum: selector.custNum.value,
                address: selector.address.value,
                type: selector.type().value,
                itemInfoList: itemInfoList,
            };

            let data = await sendRequest("/item/changeCnt",'POST',params);
            if(data.code === 200){
                alert(data.msg);
                ItemListBox.innerHTML = '';
                selector.totalPrice.innerHTML = '0원';
                selector.receiptBox.innerHTML = '';
                selector.customer.value  = '';
                selector.customerTel.value  = '';
                selector.custNum.value  = '';
                selector.address.value  = '';
                index = 1;
                selector.addItemBtn.click();
            }
        })

        selector.customer.addEventListener('input',async function(){
            let value = this.value;

            if(!checkAutoComplete(value)){
                selector.autoSearchCustomer.innerHTML = '';
                return;
            }
            let param = {
                customerName: value
            }

            let data = await sendRequest('/customer/getCustomerList', 'POST', param);
            if(data.code === 200){
                console.log(data.data);
                let result = '';
                data.data.forEach(item => {
                    result += createComponent.고객검색목록(item);
                })
                selector.autoSearchCustomer.innerHTML = result;
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
                    div += createComponent.검색된품목(item, idx);
                });
                listContainer.innerHTML = div;
            }
        });
    }


    /**
     * 최종 합계 계산서
     */
    function initTotalPrice(){
        let list = document.querySelectorAll('.itemInfo');
        let totalCnt = 0;

        let div = '';
        list.forEach((item) =>{
            let idx = item.id.substring(9,12);
            let price1 = document.querySelector(`#price1_${idx}`).value;
            let price2 = document.querySelector(`#price2_${idx}`).value;
            let cnt = document.querySelector(`#itemCnt_${idx}`).value;
            let itemName = document.querySelector(`#itemName_${idx}`).value;
            let calculate = '';
            let price = '';


            if(selector.type().value === "IN"){
                calculate = '(' + fommatter('comma',price1) + ' * ' +  cnt + ')  '
                price += fommatter('comma', price1 * cnt);
            }else{
                calculate = '(' + fommatter('comma',price2) + ' * ' +  cnt + ')  '
                price += fommatter('comma', price2 * cnt);
            }

            totalCnt += cnt;

            div += createComponent.합계금액(itemName, calculate, price);
        });

        selector.totalCount = totalCnt + '개';
        selector.receiptBox.innerHTML = div;

        let total = Array.from(document.querySelectorAll('.sumPrice')).reduce((acc, el) =>{
            const price = parseInt(el.innerText.replace(/[^0-9]/g, '')) || 0;
            return acc + price;
        },0)
        selector.totalPrice.innerHTML = fommatter('comma', total) + '원';
    }

    /**
     * 유효성 검증
     * @returns {boolean}
     */
    function fn_validate(){
        if(isEmpty(selector.date.value)){
            alert("날짜가 비었습니다");
            return false;
        }
        if(isEmpty(selector.customer.value)){
            alert("매출, 매입처가 비었습니다");
            return false;
        }
        if(isEmpty(selector.customerTel.value)){
            alert("연락처가 비었습니다");
            return false;
        }
        return true;
    }

    function 품목제거(idx){
        document.querySelector(`#boxIndex_${idx}`).remove();
    }

    function 고객선택(custInfo){
        selector.customer.value = custInfo.customerName;
        selector.custNum.value = custInfo.custNum;
        selector.customerTel.value = custInfo.customerTel;
        selector.address.value = custInfo.custAddress;

        selector.autoSearchCustomer.innerHTML = '';
    }

    return {
        onLoad: onLoad,
        initTotalPrice: initTotalPrice,
        selectItem: selectItem,
        품목제거: 품목제거,
        고객선택: 고객선택,
    }
})();

