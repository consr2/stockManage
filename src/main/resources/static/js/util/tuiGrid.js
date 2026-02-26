const tuiGrid_JS = (() =>{

    let P_Type= {
        itemList: 'itemList',
    }

    function setGridStyle(){
        tui.Grid.applyTheme('default', {
            cell: {
                normal: {
                    background: '#ffffff',
                    border: '#e0e0e0',
                    showVerticalBorder: true,
                    showHorizontalBorder: true,
                    fontSize: '15px',
                },
                header: {
                    background: '#ededed', // 헤더도 하얗게 원하시면 #ffffff
                    border: '#e0e0e0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                },
                selectedHeader: {
                    background: '#ffffff'
                }
            }
        });
    }

    /**
     * 그리드 생성
     * @param grid 그리드 객체
     * @param data 표기할 데이터
     * @param type 그리드 옵션
     */
    function initGrid(grid, data, type){
        setGridStyle();
        G_data = data;
        if(isEmpty(grid)){
            return new tui.Grid(getGridOption(data, type));
        }else{
            grid.resetData(data);
            return 'exist';
        }
    }



    let getGridOption = (G_data, type) => {
        optionList = {
            itemList: {
                el: document.getElementById('grid'),
                data: G_data,
                scrollX: true,
                scrollY: true,
                bodyHeight: 400,
                columnOptions: {
                    resizable: true // <--- 모든 컬럼 리사이즈 활성화
                },
                rowHeaders: ['rowNum'],
                columns: [
                    {
                        header: '날짜',
                        align: 'center',
                        width: 120,
                        name: 'created_at',
                        formatter: ({value}) => {
                            return fommatter('yyyy-mm-dd', value);
                        }
                    },
                    {
                        header: '품명',
                        align: 'center',
                        name: 'item_name',
                        sortable: true
                    },
                    {
                        header: '매입단가',
                        name: 'price1',
                        width: 100,
                        align: 'center',
                        formatter: ({value}) => {
                            return fommatter('comma', value);
                        }
                    },
                    {
                        header: '매출단가',
                        align: 'center',
                        width: 100,
                        name: 'price2',
                        formatter: ({value}) => {
                            return fommatter('comma', value);
                        }
                    },
                    {
                        header: '재고',
                        align: 'center',
                        width: 60,
                        name: 'current_cnt'
                    },
                ]
            },
        }

        return optionList[type];
    }

    return {
        initGrid: initGrid,
        P_Type: P_Type,
    }
})();