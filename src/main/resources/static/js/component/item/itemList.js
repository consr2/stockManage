const itemChange_JS = (() =>{

    let itemListSearchBtn, excelDownBtn
    let grid;

    document.addEventListener('DOMContentLoaded', function() {
        onLoad();
        initEventListener();
    })

    function onLoad(){
        itemListSearchBtn = document.querySelector('#itemListSearchBtn');
        excelDownBtn = document.querySelector('#excelDownBtn');
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
    }


    return {
        onLoad: onLoad,
    }
})();