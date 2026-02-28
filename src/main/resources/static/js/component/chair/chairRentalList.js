const chairRentalList_JS = (() =>{

    let grid = null;
    let endRentalList = null;
    let chairListSearchBtn, excelDownBtn, endRentalSearch;


    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
        checkEndRental();
    })


    function onLoad(){
        chairListSearchBtn = document.querySelector('#chairListSearchBtn');
        excelDownBtn = document.querySelector('#excelDownBtn');
        endRentalSearch = document.querySelector('#endRentalSearch');
    }

    function initEventListener(){
        chairListSearchBtn.addEventListener('click', async function(){
            let startDate = document.querySelector('#startDt').value;
            let endDate = document.querySelector('#endDt').value;
            let customerName = document.querySelector('#customerName').value;
            let customerTel = document.querySelector('#customerTel').value;

            let param = {
                startDate: startDate,
                endDate: endDate,
                customerName: customerName,
                customerTel: customerTel,
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

        endRentalSearch.addEventListener('input', function(){
            let value = this.value;
            let target = endRentalList.filter(e =>
                e.customer_tel.includes(value) || e.customer_name.includes(value)
            );

            drowEndRentalList(target);
        })

        excelDownBtn.addEventListener('click', function(){
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
        let EndRentListBox = document.querySelector('#EndRentListBox');
        let div = '';
        data.forEach(item => {
            div += createComponent.endChairRental(item);
        })

        EndRentListBox.innerHTML = div;
    }


    async function chairReturnBtn(rentalId, where){
        let param = {
            rentalId: rentalId
        }

        let data = await sendRequest('/chair/saveRentInfo','POST', param);
        if(data.code === 200){
            alert(data.msg);
            if(where === 'grid'){
                chairListSearchBtn.click();
            }else{
                endRentalList = endRentalList.filter(item => item.rental_id != rentalId);
                drowEndRentalList(endRentalList);
            }

        }
    }

    async function 휠체어반납철회(rentalId){
        let param = {
            rentalId: rentalId
        }

        let data = await sendRequest('/chair/returnRentInfo','POST', param);
        if(data.code === 200){
            alert(data.msg);
            chairListSearchBtn.click();
        }
    }

    return{
        onLoad:onLoad,
        chairReturnBtn:chairReturnBtn,
        휠체어반납철회:휠체어반납철회,
    }

})();