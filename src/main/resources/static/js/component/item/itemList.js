const itemList_JS = (() =>{

    let grid;
    let selector = {
        itemListSearchBtn: null,
        excelDownBtn: null,
        savePriceBtn: null,
        startDt: null,
        endDt: null,
        itemModal: null,
        modalHistoryBody: null,
        modalItemName: null,
        itemName: null,
        itemId: null,
        price1: null,
        price2: null,
    }

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    })

    function onLoad(){
        selector.itemListSearchBtn = document.querySelector('#itemListSearchBtn');
        selector.excelDownBtn = document.querySelector('#excelDownBtn');
        selector.savePriceBtn = document.querySelector('#savePriceBtn');
        selector.startDt = document.querySelector('#startDt');
        selector.endDt = document.querySelector('#endDt');
        selector.itemModal = document.querySelector('#itemModal');
        selector.modalHistoryBody = document.querySelector('#modalHistoryBody');
        selector.modalItemName = document.querySelector('#modalItemName');
        selector.itemName = document.querySelector('#itemName');
        selector.itemId = document.querySelector('#itemId');
        selector.price1 = document.querySelector('#price1');
        selector.price2 = document.querySelector('#price2');
    }

    function initEventListener(){
        selector.itemListSearchBtn.addEventListener('click',async function(){
            let param = {
                startDate: selector.startDt.value,
                endDate: selector.endDt.value,
                itemName: selector.itemName.value,
            }
            let data = await sendRequest('/item/getItemList', 'POST', param);
            console.log(data);
            grid = tuiGrid_JS.initGrid(grid, data.data, tuiGrid_JS.Type.itemList);
            if(!grid.eventBound){
                intiGridEvent();
                grid.eventBound = true;
            }
        })

        selector.excelDownBtn.addEventListener('click', function(){
            if(isEmpty(grid)){
                alert("조회 후 이용 가능합니다");
                return;
            }
            grid.export('xlsx', {
                fileName: '품목제고조회', // 저장될 파일명
                useFormattedValue: true,    // 포맷터가 적용된 값으로 추출할지 여부
                includeHeader: true         // 헤더 포함 여부
            });
        })

        selector.savePriceBtn.addEventListener('click', async function () {
            let param = {
                id: selector.itemId.value,
                price1: selector.price1.value,
                price2: selector.price2.value,
            }

            let result = await sendRequest('/item/saveItemPriceList', 'POST', param);
            if (result.code === 200) {
                alert(result.msg);
                selector.itemModal.style.display = 'none'
                selector.itemListSearchBtn.click();
            }
        })
    }


    function intiGridEvent(){
        grid.on('dblclick', async (e) => {
            const rowData = grid.getRow(e.rowKey);
            console.log(rowData);
            selector.itemId.value = rowData.id;
            selector.price1.value = rowData.price1;
            selector.price2.value = rowData.price2;
            selector.itemModal.style.display = 'flex';
        })
    }


    async function 품목삭제(id){
        let param ={
            id:id,
        }
        await sendRequest('/item/deleteItem','POST', param);

        selector.itemListSearchBtn.click();
    }

    return {
        onLoad: onLoad,
        품목삭제:품목삭제,
    }
})();