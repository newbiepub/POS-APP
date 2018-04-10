import gql from 'graphql-tag';

export const MUTATION = {
    CREATE_TRANSACTION: gql`
        mutation createTransaction( $productItems:[TransactionProductItemsInput]!,
        $type:String!,
        $paymentStatus:PaymentStatusInput!,
        $paymentMethod:PaymentMethodInput!,
        $dueDate:Date,
        $totalQuantity:Int!,
        $totalPrice:Float!,
        $paid:TransactionPaidInput!,
        $customer: TransactionCustomerInput,
        $description:String){
            createTransaction(productItems:$productItems, type:$type,paymentStatus:$paymentStatus,
                paymentMethod:$paymentMethod,dueDate:$dueDate, totalQuantity:$totalQuantity,totalPrice:$totalPrice,paid:$paid,description:$description,customer:$customer
            ) {
                _id
                createdAt
                productItems{
                    _id
                    productId
                    productName
                    quantity
                    price{
                        name
                        price
                        currency{
                            name
                            symbol
                        }
                    }
                    totalPrice
                    unit
                    discount
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
        }`,
    UPDATE_TRANSACTION: gql`
        mutation updateTransaction(
        $_id:String!,
        $dueDate:Date,
        $paid:TransactionPaidInput!,
        $description:String){
            updateTransaction(_id:$_id, dueDate:$dueDate,paid:$paid,description:$description){
                _id
            }
        }`,
    ISSUE_REFUND: gql`
        mutation issueRefundTransaction($_id: String!,$issueRefundReason:String!,$refundDate:Date,$productItems:[TransactionProductItemsInput]! ){
            issueRefundTransaction(_id: $_id, issueRefundReason: $issueRefundReason,refundDate:$refundDate,productItems:$productItems) {
                _id
            }
        }`,
};
export const FRAGMENT = {
    INVETORY_PRODUCT: gql`
        fragment updateProductInventoryQuantityFragment on getUserProductInventory {
            quantity
            __typename
        }
    `
};

