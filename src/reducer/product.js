import {ITEM} from "../constant/constant";

const initialState = {
    allItem: [{name: 'Cồn', prices: [{type: "Bình thường", value: 100, SKU: 'helo'}]}, {
        name: 'Nước rửa chén',
        prices: [{type: "Bình thường", value: 1323, SKU: 'helo'}, {
            type: "Đặc biệt",
            value: 4534, SKU: 'helo'
        }, {
            type: "Bìnhassadfsafsfsafsafsafsfsadfsafsafsdfsafasdfsadfasfsadfsafsadf",
            value: 1323
        }, {type: "Đặc sdaf", value: 4534, SKU: 'helo'}, {
            type: "Đặc sdaf",
            value: 4534,
            SKU: 'helo'
        }

        ]
    }],
    allDiscount:
        [{name: 'Cồn', prices: [{type: "Bình thường", value: 100, SKU: 'helo'}]}],
    category: [
        {name: 'lẻ'},
        {name: 'sỉ'}
    ]
};

export default productReducer(initialState);

function productReducer(initialState) {
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