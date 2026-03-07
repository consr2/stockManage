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
    }

    function initEventListener(){
        selector.itemListSearchBtn.addEventListener('click',async function(){
            let param = {
                startDate: selector.startDt.value,
                endDate: selector.endDt.value,
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
            let priceList = document.querySelectorAll('#modalHistoryBody tr');
            let params = [];
            let 빈값있나요 = false;

            priceList.forEach(row => {
                const inputRow = row.querySelectorAll('input');
                const rowData = {
                    id: inputRow[0].dataset.id,
                    itemId: inputRow[0].dataset.itemid,
                    createAt: inputRow[1].value,
                    price1: inputRow[2].value.replace(/[^0-9]/g, ''),
                    price2: inputRow[3].value.replace(/[^0-9]/g, ''),
                    price3: inputRow[4].value.replace(/[^0-9]/g, '')
                };
                if(isEmpty(rowData.price1) || isEmpty(rowData.price2)){
                    빈값있나요 = true;
                }
                params.push(rowData);
            });
            console.log(params);
            if(빈값있나요){
                alert('금액을 입력해 주세요');
                return;
            }

            let result = await sendRequest('/item/saveItemPriceList', 'POST', params);
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
            let param = {
                id: rowData.id
            }
            let data = await sendRequest('/item/getItemPriceList', 'POST', param);
            console.log(data);
            let div = '';
            data.data.forEach(item => {
                div += createComponent.단가이력수정목록(item);
            })
            selector.modalHistoryBody.innerHTML = div;
            selector.modalItemName.innerHTML = rowData.itemName;
            selector.itemModal.style.display = 'flex';
        })
    }

    function 단가이력추가(){
        let itemId = document.querySelectorAll('#modalHistoryBody tr')[0].querySelector('input').dataset.itemid;
        let div = createComponent.단가이력수정목록({itemId:itemId});
        selector.modalHistoryBody.insertAdjacentHTML('afterbegin', div);
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
        단가이력추가: 단가이력추가,
        품목삭제:품목삭제,
    }
})();