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
                      name
                      price
                      currency {
                        name
                      }
                    }
                  }
            }`,
};
