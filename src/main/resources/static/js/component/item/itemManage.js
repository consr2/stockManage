const itemManage_JS = (() =>{

    let btnAdd;

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    });

    function onLoad(){
        btnAdd = document.querySelector('#saveItemBtn');
    }

    function initEventListener(){
        btnAdd.addEventListener('click',async function() {
            if(!fn_validate()){
                return;
            }

            // 2. 파라미터 구성
            const params = {
                itemName: document.querySelector('#itemName').value,
                price1: document.querySelector('#price1').value.replace(',',''),
                price2: document.querySelector('#price2').value.replace(',',''),
                price3: document.querySelector('#price3').value.replace(',','')
            };

            let data = await sendRequest("/item/save",'POST',params);
            console.log(data);
            if(data.code === 200){
                alert(data.msg);
                document.querySelector('#itemName').value = '';
                document.querySelector('#price1').value = '';
                document.querySelector('#price2').value = '';
                document.querySelector('#price3').value = '';
            }
        });
    }


    function fn_validate(){
        if(isEmpty(document.querySelector('#itemName').value)){
            alert("품목이 비었습니다");
            return false;
        }
        if(isEmpty(document.querySelector('#price1').value)){
            alert("매입단가가 비었습니다");
            return false;
        }
        if(isEmpty(document.querySelector('#price2').value)){
            alert("매출단가가 비었습니다");
            return false;
        }
        return true;
    }

    return {
        onLoad: onLoad,
    }
})();