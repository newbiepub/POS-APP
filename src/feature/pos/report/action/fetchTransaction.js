import {client} from "../../../../../App";
import gql from "graphql-tag";
import store from "../../../../store/store";
import {TRANSACTION} from "../../../../constant/actionTypes";

const FETCH_TRANSACTION = gql`
    query getTransactionEmployee($limit:Int, $skip: Int){
        FETCH_TRANSACTION : getTransactionEmployee(limit:$limit, skip: $skip){
            _id
            employeeId
            companyId
            createdAt
            productItems{
                _id
                productId
                productName
                quantity
                priceImport
                category{
                    categoryId
                    categoryName
                }
                price{
                    name
                    price
                }
                totalPrice
                unit
                discounts{
                    _id
                    name
                    type
                    value
                    description
                    appliedDate
                    dueDate
                    createdAt
                }
            }
            type
            issueRefund
            issueRefundReason
            paymentStatus{
                _id
                type
                name
            }
            paymentMethod{
                _id
                type
                name
            }
            dueDate
            paymentMethod{
                _id
                name
                type
            }
            paymentStatus{
                _id
                name
                type
            }
            totalQuantity
            totalPrice
            paid{
                date
                amount
            }
            customer{
                name
                email
                address
                phone
                description
            }
            description
        }
    }
`

export const fetchTransaction = async (employeeId, limit = 100, skip = 0) => {
    try {
        let response = await client.query({
            query: FETCH_TRANSACTION,
            variables: {
                employeeId,
                limit, skip
            },
            fetchPolicy: 'network-only'
        });
        if(response.errors) throw new Error(response.errors[0].message);
        // Fetch Data to store
        store.dispatch({
            type: TRANSACTION.GET_EMPLOYEE_TRANSACTION,
            payload: {
                userId: employeeId,
                data: response.data.FETCH_TRANSACTION
            }
        })
        console.warn(JSON.stringify(response.data.FETCH_TRANSACTION, null, 4));
        return response.data.FETCH_TRANSACTION;
    } catch (e) {
        throw e;
    }
}