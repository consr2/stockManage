const chairRental_JS = (() =>{

    let rentalBtn;

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    });

    function onLoad(){
        rentalBtn = document.querySelector('#rentalBtn');
    }

    function initEventListener(){
        rentalBtn.addEventListener('click',async function(){
            let wheelchairType = document.querySelector('#wheelchairType').value;
            let startDate = document.querySelector('#startDate').value;
            let expectDate = document.querySelector('#expectDate').value;
            let customerName = document.querySelector('#customerName').value;
            let customerTel = document.querySelector('#customerTel').value;
            let remarks = document.querySelector('#remarks').value;

            let param = {
                wheelchairType: wheelchairType,
                startDate: startDate,
                expectDate: expectDate,
                customerName: customerName,
                customerTel: customerTel,
                remarks: remarks
            };

            let data = await sendRequest('/chair/submit', "POST", param);
            if(data.code === 200){
                alert(data.msg);
                document.querySelector('#customerName').value = '';
                document.querySelector('#customerTel').value = '';
                document.querySelector('#remarks').value = '';
            }
        })
    }


    function set30Days(el){
        let value = el.value;
        console.log(value);
        let date = new Date(value);
        date.setDate(date.getDate() + 30);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');

        let result = `${year}-${month}-${day}`;

        document.querySelector('#expectDate').value = result;
    }

    return {
        set30Days:set30Days,
    }

})();