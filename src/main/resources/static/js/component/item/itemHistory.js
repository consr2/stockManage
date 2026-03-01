const itemHistory_JS = (() =>{

    let itemHistorySearchBtn, customerInput, autocompleteList, excelDownBtn;
    let grid
    let selector = {
        itemHistorySearchBtn: null,
        customerInput: null,
        autocompleteList: null,
        excelDownBtn: null,
        startDt: null,
        endDt: null,
        itemName: null,
        customer: null,
        typeSelect: null,
    }

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    })


    function onLoad(){
        selector.itemHistorySearchBtn = document.querySelector('#itemHistorySearchBtn');
        selector.customerInput = document.querySelector('#customer');
        selector.autocompleteList = document.querySelector('#autocompleteList');
        selector.excelDownBtn = document.querySelector('#excelDownBtn');
        selector.startDt = document.querySelector('#startDt');
        selector.endDt = document.querySelector('#endDt');
        selector.itemName = document.querySelector('#itemName');
        selector.customer = document.querySelector('#customer');
        selector.typeSelect = document.querySelector('#typeSelect');
    }

    function initEventListener(){
        selector.customerInput.addEventListener('input',async function(){

            if(!checkAutoComplete(this.value)){
                selector.autocompleteList.innerHTML = '';
                return;
            }

            let param = {
                customer: this.value
            }
            let data = await sendRequest('/item/getCustomer', 'POST', param);
            console.log(data);

            let div = '';
            data.data.forEach((item)=> {
                div += createComponent.검색된고객명단(item);
            })

            selector.autocompleteList.innerHTML = div;
        })

        selector.itemHistorySearchBtn.addEventListener('click',async function(){
            let param = {
                startDate: selector.startDt.value,
                endDate: selector.endDt.value,
                itemName: selector.itemName.value,
                customer: selector.customer.value,
                type: selector.typeSelect.value
            }
            let data = await sendRequest('/item/getItemHistory', 'POST', param);
            console.log(data);
            initGrid(data.data);
        })

        selector.excelDownBtn.addEventListener('click', function(){
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
        selector.customer.value = name;
        selector.autocompleteList.innerHTML = '';
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