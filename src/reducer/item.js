import {ITEM} from "../constant/constant";

const initialState = {
    allItem:[{name: 'Cồn', prices: [{type: "Bình thường", value: 100}]}, {
        name: 'Nước rửa chén',
        prices: [{type: "Bình thường", value: 1323}, {
            type: "Đặc biệt",
            value: 4534
        }, {
            type: "Bìnhassadfsafsfsafsafsafsfsadfsafsafsdfsafasdfsadfasfsadfsafsadf",
            value: 1323
        }, {type: "Đặc sdaf", value: 4534}]
    }],
    allDiscount:
        [{name: 'Cồn', prices: [{type: "Bình thường", value: 100}]}],
    category:[
        {name: 'lẻ'},
        {name:'sỉ'}
    ]
};

export default routeReducer(initialState);

function routeReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case ITEM.CREATE_ITEM: {
                return {
                    ...state,
                }
            }
            default: {
                return {
                    ...state
                }
            }
        }
    }
}