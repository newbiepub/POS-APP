import {TRANSACTION} from "../constant/constant";

const initialState = {
    transaction: [
        {
            productItems: [
                {
                    productId: "",
                    productName:'Nước',
                    quantity: 2000,
                    price: 1000,
                    unit: "Cái"
                }
            ],
            companyId: "",
            employeeId: "",
            date: "10/10/2012",
            paymentStatus: "Chưa thanh toán",
            paymentMethod: "Tiền mặt",
            description: "",
            customerName: "CC",
            customerId: "",
            totlePrice: 1000000
        },
        {
            productItems: [
                {
                    productId: "",
                    productName:'cuwts',
                    quantity: 2000,
                    price: 1000,
                    unit: "Cái"
                }
            ],
            companyId: "",
            employeeId: "",
            date: "12/10/2012",
            paymentStatus: "Chưa thanh toán",
            paymentMethod: "Tiền mặt",
            description: "",
            customerName: "CC",
            customerId: "",
        },
        {
            productItems: [
                {
                    productId: "",
                    productName:'Cồn',
                    quantity: 2000,
                    price: 1000,
                    unit: "Cái"
                }
            ],
            companyId: "",
            employeeId: "",
            date: "13/10/2012",
            paymentStatus: "Chưa thanh toán",
            paymentMethod: "Tiền mặt",
            description: "",
            customerName: "CC",
            customerId: "",
        },
        {
            productItems: [
                {
                    productId: "",
                    productName:'Ao',
                    quantity: 2000,
                    price: 1000,
                    unit: "Cái"
                }
            ],
            companyId: "",
            employeeId: "",
            date: "10/10/2012",
            paymentStatus: "Chưa thanh toán",
            paymentMethod: "Tiền mặt",
            description: "",
            customerName: "CC",
            customerId: "",
        }
    ]
};

export default transactionReducer(initialState);

function transactionReducer(initialState) {
    return function (state = initialState, action = {}) {
        switch (action.type) {
            case TRANSACTION.CREATE_TRANSACTION: {
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