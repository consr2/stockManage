const tuiGrid_JS = (() =>{

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
            return grid;
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
            itemHistory: {
                el: document.getElementById('grid'),
                data: G_data,
                scrollX: true,
                scrollY: true,
                bodyHeight: 400,
                columnOptions: {
                    resizable: true // <--- 모든 컬럼 리사이즈 활성화
                },
                columns: [
                    {
                        header: '날짜',
                        align: 'center',
                        width: 80,
                        name: 'date',
                        sortable: true,
                        formatter:({value}) => {
                            return fommatter('yyyy-mm-dd', value);
                        }
                    },
                    {
                        header: '품명',
                        align: 'center',
                        name: 'item_name',
                    },
                    {
                        header: '수량',
                        align: 'center',
                        width: 50,
                        name: 'cnt',
                    },
                    {
                        header: '단가',
                        align: 'center',
                        name: 'price2',
                        width: 110,
                        formatter:({value}) => {
                            return fommatter('comma', value);
                        }
                    },
                    {
                        header: '공급가액',
                        align: 'center',
                        name: 'total_price',
                        formatter:({value}) => {
                            return fommatter('comma', value);
                        }
                    },
                    {
                        header: '대상',
                        align: 'center',
                        name: 'customer'
                    },
                    {
                        header: '연락처',
                        align: 'center',
                        name: 'customer_tel',
                        width: 130,
                        formatter:({value}) => {
                            return fommatter('tel', value);
                        }
                    },
                    {
                        header: '타입',
                        name: 'type',
                        width: 50,
                        align: 'center',
                        formatter: ({value}) => {
                            const typeMap = {
                                'IN': '입고',
                                'OUT': '출고'
                            }
                            return typeMap[value];
                        }
                    },

                ]
            },
            chairList: {
                el: document.getElementById('grid'),
                scrollY: false,
                scrollbarProps: {
                    autoHide: true,
                    width: 0,  // 우측 스크롤바 두께 제거
                    height: 0  // 하단 스크롤바 두께 제거
                },
                rowHeaders: ['rowNum'],
                columnOptions: {
                    resizable: true // <--- 모든 컬럼 리사이즈 활성화
                },
                bodyHeight: 'auto', // 내용만큼 그리드 높이 자동 조절
                data: G_data,
                columns: [

                    {
                        header: '대여일',
                        align: 'center',
                        width: 100,
                        name: 'start_date',
                        sortable: true,
                        formatter:({value}) => {
                            return fommatter('yyyy-mm-dd', value);
                        }
                    },
                    {
                        header: '반납일',
                        align: 'center',
                        width: 100,
                        name: 'end_date',
                        sortable: true,
                        formatter:({value}) => {
                            return fommatter('yyyy-mm-dd', value);
                        }
                    },
                    {
                        header: '고객명',
                        align: 'center',
                        name: 'customer_name',
                    },
                    {
                        header: '연락처',
                        align: 'center',
                        name: 'customer_tel',

                    },
                    {
                        header: '휠체어 종류',
                        align: 'center',
                        width: 200,
                        name: 'wheelchair_type',
                        sortable: true,
                    },
                    {
                        header: '지불상태',
                        align: 'center',
                        name: 'payment',
                        sortable: true,
                    },
                    {
                        header: '복구',
                        align: 'center',
                        name: 'return',
                        formatter:(data) => {
                            if(data.row.payment?.length > 1){
                                return `<button class="tui-btn-red" onclick="chairRentalList_JS.휠체어반납철회(${data.row.rental_id})">철회</button>`;
                            }else{
                                return `<button class="tui-btn-blue" onclick="chairRentalList_JS.chairReturnBtn(${data.row.rental_id}, 'grid')">반납</button>`;
                            }
                        }
                    },
                ]
            },
        }

        return optionList[type];
    }

    return {
        initGrid: initGrid,
        Type: {
            itemList: 'itemList',
            itemHistory: 'itemHistory',
            chairList: 'chairList',
        },
    }
})();