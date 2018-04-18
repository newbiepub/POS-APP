import gql from "graphql-tag";

export const exportProductToPOS = gql`
    mutation requestPOSToCompany ($employeeId: String!,$products: [ProductExport]!, $confirmOption: Boolean) {
        requestPOSToCompany(products: $products, employeeId: $employeeId, confirmOption: $confirmOption) {
            success
        }
    }
`;