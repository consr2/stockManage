const chairRental_JS = (() =>{

    let selector = {
        rentalBtn: null,
        wheelchairType: null,
        startDate: null,
        expectDate: null,
        customerName: null,
        customerTel: null,
        remarks: null
    };

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    });

    function onLoad(){
        selector.rentalBtn = document.querySelector('#rentalBtn');
        selector.wheelchairType = document.querySelector('#wheelchairType')
        selector.startDate = document.querySelector('#startDate')
        selector.expectDate = document.querySelector('#expectDate')
        selector.customerName = document.querySelector('#customerName')
        selector.customerTel = document.querySelector('#customerTel')
        selector.remarks = document.querySelector('#remarks')
    }

    function initEventListener(){
        selector.rentalBtn.addEventListener('click',async function(){
            if(!fn_validate()){
                return;
            }

            let param = {
                wheelchairType: selector.wheelchairType.value,
                startDate: selector.startDate.value,
                expectDate: selector.expectDate.value,
                customerName: selector.customerName.value,
                customerTel: selector.customerTel.value,
                remarks: selector.remarks.value
            };

            let data = await sendRequest('/chair/submit', "POST", param);
            if(data.code === 200){
                alert(data.msg);
                selector.customerName.value = '';
                selector.customerTel.value = '';
                selector.remarks.value = '';
            }
        })
    }


    function set30Days(el){
        let value = el.value;
        let date = new Date(value);

        date.setDate(date.getDate() + 30);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');

        let result = `${year}-${month}-${day}`;

        selector.expectDate.value = result;
    }

    function fn_validate(){
        if(isEmpty(selector.wheelchairType.value)){
            alert("휠체어 종류가 비었습니다");
            return false;
        }
        if(isEmpty(selector.startDate.value)){
            alert("대여시작일이 비었습니다");
            return false;
        }
        if(isEmpty(selector.customerName.value)){
            alert("고객명이 비었습니다");
            return false;
        }
        if(isEmpty(selector.customerTel.value)){
            alert("연락처가 비었습니다");
            return false;
        }
        return true;
    }

    return {
        set30Days:set30Days,
    }

})();