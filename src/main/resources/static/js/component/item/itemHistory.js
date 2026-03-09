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
        paymentReportBtn: null,
        paymentTemplate: null,
        editHistId: null,
        editItemName: null,
        editCnt: null,
        editPrice: null,
        editCustomer: null,
        editModal: null,
        totalSumDisplay: null,
        editItemIdx: null,
        editBeforeCnt: null,
        editType: null,
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
        selector.paymentReportBtn = document.querySelector('#paymentReportBtn');
        selector.paymentTemplate = document.querySelector('#paymentTemplate');
        selector.closeModal = document.querySelector('#closeModal');
        selector.editHistId = document.querySelector('#editHistId');
        selector.editItemName = document.querySelector('#editItemName');
        selector.editCnt = document.querySelector('#editCnt');
        selector.editPrice = document.querySelector('#editPrice');
        selector.editCustomer = document.querySelector('#editCustomer');
        selector.editModal = document.querySelector('#editModal');
        selector.totalSumDisplay = document.querySelector('#totalSumDisplay');
        selector.editItemIdx = document.querySelector('#editItemIdx');
        selector.editBeforeCnt = document.querySelector('#editBeforeCnt');
        selector.editType = document.querySelector('#editType');
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

            let totalPrice = data.data.reduce((acc, e) =>{
                return acc + (Number(e.price) * Number(e.cnt));
            }, 0)
            selector.totalSumDisplay.innerHTML = `₩ ${fommatter('comma', totalPrice)}`;
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

        selector.paymentReportBtn.addEventListener('click', function(){
            if(!grid){
                alert("검색 후 명세표를 출력 할 수 있습니다");
                return;
            }

            let data = grid.getData();
            let template = selector.paymentTemplate.cloneNode(true);
            template.style.display = 'block'

            let result = '';
            data.forEach((item,idx) => {
                result += createComponent.명세표출력(item, idx);
            })

            //정보 세팅
            let totalPrice = data.reduce((acc, e) =>{
                return acc + (Number(e.price) * Number(e.cnt));
            }, 0)
            let totalCnt = data.reduce((acc, e) =>{
                return acc +  Number(e.cnt);
            }, 0)
            let realPrice = Math.trunc(totalPrice / 1.1);
            let vat = Math.trunc(Number(realPrice) * 0.1);

            template.querySelector('#paymentBody').innerHTML = result;
            template.querySelector('#report_customer').innerHTML = data[0].customer;
            template.querySelector('#report_customerTel').innerHTML = fommatter('tel' ,data[0].customerTel);
            template.querySelector('#report_address').innerHTML = data[0].address;
            template.querySelector('#report_totalPriceKR').innerHTML = convertToKoreanWon(totalPrice);
            template.querySelector('#report_totalPrice').innerHTML = fommatter('comma',totalPrice);

            template.querySelector('#report_totalCnt').innerHTML = totalCnt;
            template.querySelector('#report_totalPrice2').innerHTML = fommatter('comma',realPrice);
            template.querySelector('#report_totalVat').innerHTML = fommatter('comma',vat);
            template.querySelector('#report_totalAmount').innerHTML = fommatter('comma',totalPrice);

            const printWindow = window.open('', '_blank', 'width=870,height=600');
            printWindow.document.body.appendChild(template);
            printWindow.document.close();
            printWindow.print();
        })

        selector.closeModal.addEventListener('click', function(){
            selector.editModal.style.display = 'none';
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

        if(!isEmpty(grid)){
            initGridEvent();
        }
    }

    function initGridEvent(){
        grid.on('dblclick', async (e) => {
            const rowData = grid.getRow(e.rowKey);
            console.log(rowData);
            selector.editHistId.value = rowData.id;
            selector.editItemName.value = rowData.itemName;
            selector.editCnt.value = rowData.cnt;
            selector.editPrice.value = rowData.price;
            selector.editCustomer.value = rowData.customer;

            selector.editItemIdx.value = rowData.itemIdx;
            selector.editBeforeCnt.value = rowData.cnt;
            selector.editType.value = rowData.type;

            // 모달 열기
            selector.editModal.style.display = 'flex';
        })
    }

    async function 입출고이력수정(){
        let beforeCnt = selector.editBeforeCnt.value;
        let afterCnt = selector.editCnt.value;
        let editType = selector.editType.value;
        let calCnt = editType === 'IN' ? Number(afterCnt) - Number(beforeCnt) : Number(beforeCnt) - Number(afterCnt);

        let param = {
            id: selector.editHistId.value,
            itemIdx: selector.editItemIdx.value,
            cnt: selector.editCnt.value,
            calCnt: calCnt,
            price: selector.editPrice.value,
            customer: selector.editCustomer.value,
        }
        let data = await sendRequest('/item/updateHist','POST', param);
        if(data.code === '200'){
            alert(data.msg);
        }
        selector.itemHistorySearchBtn.click();
        selector.closeModal.click();
    }

    async function 입출고이력삭제(idx){
        let gridData = grid.getRow(idx);
        console.log(gridData)
        let param = {
            id: gridData.id,
            itemIdx: gridData.itemIdx,
            cnt: gridData.cnt,
            type: gridData.type,
        }

        let data = await sendRequest('/item/deleteHist','POST', param);
        if(data.code === '200'){
            alert(data.msg);
        }
        selector.itemHistorySearchBtn.click();
    }

    return{
        setCustomer: setCustomer,
        입출고이력수정: 입출고이력수정,
        입출고이력삭제: 입출고이력삭제,
    }

})()