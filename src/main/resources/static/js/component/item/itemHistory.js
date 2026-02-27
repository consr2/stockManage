const itemHistory_JS = (() =>{

    let itemHistorySearchBtn, customerInput, autocompleteList, excelDownBtn, grid

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    })


    function onLoad(){
        itemHistorySearchBtn = document.querySelector('#itemHistorySearchBtn');
        customerInput = document.querySelector('#customer');
        autocompleteList = document.querySelector('#autocomplete-list');
        excelDownBtn = document.querySelector('#excelDownBtn');
    }

    function initEventListener(){
        customerInput.addEventListener('input',async function(){

            if(!checkAutoComplete(this.value)){
                autocompleteList.innerHTML = '';
                return;
            }

            let param = {
                customer: this.value
            }
            let data = await sendRequest('/item/getCustomer', 'POST', param);
            console.log(data);

            let div = '';
            data.data.forEach((item)=> {
                div += createComponent.customerDiv(item);
            })

            autocompleteList.innerHTML = div;
        })

        itemHistorySearchBtn.addEventListener('click',async function(){
            let startDt = document.querySelector('#startDt').value;
            let endDt = document.querySelector('#endDt').value;
            let itemName = document.querySelector('#itemName').value;
            let customer = document.querySelector('#customer').value;
            let type = document.getElementById('typeSelect').value;

            let param = {
                startDate: startDt,
                endDate: endDt,
                itemName: itemName,
                customer: customer,
                type: type
            }
            let data = await sendRequest('/item/getItemHistory', 'POST', param);
            console.log(data);
            initGrid(data.data);
        })

        excelDownBtn.addEventListener('click', function(){
            if(isEmpty(grid)){
                alert("조회 후 이용 가능합니다");
                return;
            }
            grid.export('xlsx', {
                fileName: 'customer_list', // 저장될 파일명
                useFormattedValue: true,    // 포맷터가 적용된 값으로 추출할지 여부
                includeHeader: true         // 헤더 포함 여부
            });
        })
    }

    function setCustomer(name){
        document.querySelector('#customer').value = name;
        document.querySelector('#autocomplete-list').innerHTML = '';
    }

    function initGrid(data){
        grid = tuiGrid_JS.initGrid(grid, data, tuiGrid_JS.Type.itemHistory);

        //색 주기
        grid.getData().forEach((data) => {
            if(data.type == 'IN'){
                grid.addCellClassName(data.rowKey, 'type', 'txt-blue');
            }else{
                grid.addCellClassName(data.rowKey, 'type', 'txt-red');
            }
        })
    }

    return{
        setCustomer: setCustomer,
    }

})()