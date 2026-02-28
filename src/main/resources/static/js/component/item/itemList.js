const itemList_JS = (() =>{

    let itemListSearchBtn, excelDownBtn, savePriceBtn;
    let grid, 한번만실행=true;

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    })

    function onLoad(){
        itemListSearchBtn = document.querySelector('#itemListSearchBtn');
        excelDownBtn = document.querySelector('#excelDownBtn');
        savePriceBtn = document.querySelector('#savePriceBtn');
    }

    function initEventListener(){
        itemListSearchBtn.addEventListener('click',async function(){
            let startDt = document.querySelector('#startDt').value;
            let endDt = document.querySelector('#endDt').value;

            let param = {
                startDate: startDt,
                endDate: endDt,
            }
            let data = await sendRequest('/item/getItemList', 'POST', param);
            console.log(data);
            grid = tuiGrid_JS.initGrid(grid, data.data, tuiGrid_JS.Type.itemList);
            if(한번만실행){
                intiGridEvent();
                한번만실행 = false;
            }
        })

        excelDownBtn.addEventListener('click', function(){
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

        savePriceBtn.addEventListener('click', async function () {
            let priceList = document.querySelectorAll('#modalHistoryBody tr');
            let params = [];
            let 빈값있나요 = false;

            priceList.forEach(row => {
                const firstRow = row.querySelector('input');
                const rowData = {
                    id: firstRow.dataset.id,
                    itemId: firstRow.dataset.itemid,
                    createAt: row.querySelectorAll('input')[1].value,
                    price1: row.querySelectorAll('input')[2].value.replace(/[^0-9]/g, ''),
                    price2: row.querySelectorAll('input')[3].value.replace(/[^0-9]/g, ''),
                    price3: row.querySelectorAll('input')[4].value.replace(/[^0-9]/g, '')
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
            document.querySelector('#modalHistoryBody').innerHTML = div;
            document.querySelector('#modalItemName').innerHTML = rowData.itemName;
            document.querySelector('#itemModal').style.display = 'flex';
        })
    }

    function 단가수정(){
        let itemId = document.querySelectorAll('#modalHistoryBody tr')[0].querySelector('input').dataset.itemid;
        let div = createComponent.단가이력수정목록({itemId:itemId});
        document.querySelector('#modalHistoryBody').insertAdjacentHTML('afterbegin', div);
    }


    return {
        onLoad: onLoad,
        단가수정: 단가수정,
    }
})();