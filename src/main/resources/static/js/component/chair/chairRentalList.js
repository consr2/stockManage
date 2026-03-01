const chairRentalList_JS = (() =>{

    let grid = null;
    let endRentalList = null;
    let selector = {
        chairListSearchBtn: null,
        excelDownBtn: null,
        endRentalSearch: null,
        startDate: null,
        endDate: null,
        customerName: null,
        customerTel: null,
        EndRentListBox: null
    };


    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
        checkEndRental();
    })


    function onLoad(){
        selector.chairListSearchBtn = document.querySelector('#chairListSearchBtn');
        selector.excelDownBtn = document.querySelector('#excelDownBtn');
        selector.endRentalSearch = document.querySelector('#endRentalSearch');
        selector.startDate = document.querySelector('#startDate');
        selector.endDate = document.querySelector('#endDate');
        selector.customerName = document.querySelector('#customerName');
        selector.customerTel = document.querySelector('#customerTel');
        selector.EndRentListBox = document.querySelector('#EndRentListBox');
    }

    function initEventListener(){
        selector.chairListSearchBtn.addEventListener('click', async function(){
            let param = {
                startDate: selector.startDate.value,
                endDate: selector.endDate.value,
                customerName: selector.customerName.value,
                customerTel: selector.customerTel.value,
            }

            let data = await sendRequest('/chair/rentalList', 'POST', param);
            if(data.code === 200){
                console.log(data.data);

                grid = tuiGrid_JS.initGrid(grid, data.data, tuiGrid_JS.Type.chairList)

                //색 주기
                grid.getData().forEach((data) => {
                    if(!isEmpty(data.payment)){
                        grid.addCellClassName(data.rowKey, 'payment', 'txt-blue');
                    }else{
                        grid.addCellClassName(data.rowKey, 'payment', 'txt-red');
                    }
                })
            }
        })

        selector.endRentalSearch.addEventListener('input', function(){
            let value = this.value;
            let target = endRentalList.filter(e =>
                e.customerTel.includes(value) || e.customerName.includes(value)
            );

            drowEndRentalList(target);
        })

        selector.excelDownBtn.addEventListener('click', function(){
            if(isEmpty(grid)){
                alert("조회 후 이용 가능합니다");
                return;
            }
            grid.export('xlsx', {
                fileName: '휠체어 대여 목록', // 저장될 파일명
                useFormattedValue: true,    // 포맷터가 적용된 값으로 추출할지 여부
                includeHeader: true         // 헤더 포함 여부
            });
        })
    }

    async function checkEndRental(){
        let data = await sendRequest('/chair/endRentalList', 'POST');
        if(data.code === 200){
            console.log(data.data);
            endRentalList = data.data;
            drowEndRentalList(data.data);
        }
    }

    function drowEndRentalList(data){
        let div = '';
        data.forEach(item => {
            div += createComponent.만료된휠체어목록(item);
        })
        selector.EndRentListBox.innerHTML = div;
    }


    async function 휠체어반납(rentalId){
        let param = {
            rentalId: rentalId
        }

        let data = await sendRequest('/chair/saveRentInfo','POST', param);
        if(data.code === 200){
            alert(data.msg);
            selector.chairListSearchBtn.click();
            checkEndRental();
        }
    }

    async function 휠체어반납철회(rentalId){
        let param = {
            rentalId: rentalId
        }

        let data = await sendRequest('/chair/returnRentInfo','POST', param);
        if(data.code === 200){
            alert(data.msg);
            selector.chairListSearchBtn.click();
            checkEndRental();
        }
    }

    return{
        onLoad:onLoad,
        휠체어반납:휠체어반납,
        휠체어반납철회:휠체어반납철회,
    }

})();