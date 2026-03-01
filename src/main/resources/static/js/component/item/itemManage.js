const itemManage_JS = (() =>{

    let selector = {
        btnAdd: null,
        itemName: null,
        price1: null,
        price2: null,
        price3: null
    };

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    });

    function onLoad(){
        selector.btnAdd = document.querySelector('#saveItemBtn');
        selector.itemName = document.querySelector('#itemName');
        selector.price1 = document.querySelector('#price1');
        selector.price2 = document.querySelector('#price2');
        selector.price3 = document.querySelector('#price3');
    }

    function initEventListener(){
        selector.btnAdd.addEventListener('click',async function() {
            if(!fn_validate()){
                return;
            }

            // 2. 파라미터 구성
            const params = {
                itemName: selector.itemName.value,
                price1: selector.price1.value.replace(',',''),
                price2: selector.price2.value.replace(',',''),
                price3: selector.price3.value.replace(',','')
            };

            let data = await sendRequest("/item/save",'POST',params);
            console.log(data);
            if(data.code === 200){
                alert(data.msg);
                selector.itemName.value = '';
                selector.price1.value = '';
                selector.price2.value = '';
                selector.price3.value = '';
            }
        });
    }


    function fn_validate(){
        if(isEmpty(selector.itemName.value)){
            alert("품목이 비었습니다");
            return false;
        }
        if(isEmpty(selector.price1.value)){
            alert("매입단가가 비었습니다");
            return false;
        }
        if(isEmpty(selector.price2.value)){
            alert("매출단가가 비었습니다");
            return false;
        }
        return true;
    }

    return {
        onLoad: onLoad,
    }
})();