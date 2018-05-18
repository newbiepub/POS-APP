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
        $paid:[TransactionPaidInput]!,
        $customer: TransactionCustomerInput,
        $issueRefund: Boolean,
        $issueRefundReason:String,
        $createdAt: Date,
        $description:String){
            createTransaction(productItems:$productItems, type:$type,paymentStatus:$paymentStatus,
                paymentMethod:$paymentMethod,dueDate:$dueDate, totalQuantity:$totalQuantity,totalPrice:$totalPrice,paid:$paid,description:$description,customer:$customer,issueRefund: $issueRefund,issueRefundReason:$issueRefundReason, createdAt: $createdAt
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
        }`,
    UPDATE_TRANSACTION: gql`
        mutation updateTransaction(
        $_id:String!,
        $dueDate:Date,
        $paid:TransactionPaidInput!,
        $description:String){
            updateTransaction(_id:$_id, dueDate:$dueDate,paid:$paid,description:$description){
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
        }`,
    ISSUE_REFUND: gql`
        mutation issueRefundTransaction($_id: String!,$issueRefundReason:String!,$refundDate:Date,$productItems:[TransactionProductItemsInput]! ){
            issueRefundTransaction(_id: $_id, issueRefundReason: $issueRefundReason,refundDate:$refundDate,productItems:$productItems) {
                _id
                createdAt
                productItems{
                    _id
                    productId
                    productName
                    quantity
                    priceImport
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
        }`,
    SEND_INVOICE_EMAIL: gql`
        mutation sendMailInvoice(
        $transaction:TransactionInput!,
        $email:String!){
            sendMailInvoice(transaction:$transaction, email: $email)
        }`,
    REQUEST_INVENTORY_ORDER: gql`
        mutation REQUEST_INVENTORY_ORDER($products:[ProductRequest]! ){
            REQUEST_INVENTORY_ORDER(products:$products) {
                success
            }
        }`,
    CONFIRM_INVENTORY_ORDER: gql`
        mutation CONFIRM_INVENTORY_ORDER($activityId:String! ){
            CONFIRM_INVENTORY_ORDER(activityId:$activityId) {
                success
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

