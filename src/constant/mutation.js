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
        $paid:Float!,
        $description:String,$date:Date){
            createTransaction(productItems:$productItems, type:$type,paymentStatus:$paymentStatus,
                paymentMethod:$paymentMethod,dueDate:$dueDate, totalQuantity:$totalQuantity,totalPrice:$totalPrice,paid:$paid,description:$description,date:$date
            ) {
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

