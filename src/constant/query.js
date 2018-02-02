import gql from 'graphql-tag';

export const QUERY = {
    PRODUCTS: gql`
        query {
            products {
                _id
                name
                productCode
                unit
                description
                categoryId {
                    _id
                    name
                }
                price {
                    _id
                    name
                    price
                    currency {
                        name
                    }
                }
            }
        }`,
    CATEGORIES: gql`
        query {
            categories {
                _id
                name
                description
            }
        }`,
};
