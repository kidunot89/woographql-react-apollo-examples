import React from "react";
import { MockedProvider } from "@apollo/client/testing";

import { GET_SESSION } from "../client";
import { GET_PRODUCTS } from "../components/shop";
import { GET_PRODUCT } from "../components/product";
import {
  ADD_TO_CART,
  UPDATE_CART_ITEM_QUANTITIES,
  REMOVE_ITEMS_FROM_CART,
  APPLY_COUPON_TO_CART,
  REMOVE_COUPON_FROM_CART,
  REMOVE_COUPONS_FROM_CART,
  SET_SHIPPING_LOCALE,
  SET_SHIPPING_METHOD,
} from "../hooks/use-cart-mutations";

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        first: 5,
      },
    },
    result: {
      data: {
        products: {
          edges: [
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MjA5",
              node: {
                id: "cHJvZHVjdDo4OTIwOQ==",
                slug: "tea-tumbler",
                uri: "https://example.com/product/tea-tumbler/",
                name: "Tea Tumbler",
                type: "SIMPLE",
                shortDescription:
                  "<p>Encourages hydration<br />\nPortable</p>\n",
                image: {
                  id: "cG9zdDo4ODQ0MA==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/tea-tumbler.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$29.00",
                regularPrice: "$29.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTQ4",
              node: {
                id: "cHJvZHVjdDo4OTE0OA==",
                slug: "vegetarian-tagines-couscous",
                uri: "https://example.com/product/vegetarian-tagines-couscous/",
                name: "Vegetarian Tagines & Couscous",
                type: "SIMPLE",
                shortDescription:
                  "<p>Inspires cooking<br />\nSupports wellness</p>\n",
                image: {
                  id: "cG9zdDo4Nzk3NQ==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/9781849754323.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$25.00",
                regularPrice: "$25.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTQ2",
              node: {
                id: "cHJvZHVjdDo4OTE0Ng==",
                slug: "gift-of-hats-men",
                uri: "https://example.com/product/gift-of-hats-men/",
                name: "Gift Of Hats (Men)",
                type: "SIMPLE",
                shortDescription:
                  "<p>Covers the whole head<br />\nProtects against exposure</p>\n",
                image: {
                  id: "cG9zdDo4ODE1OA==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/GIVE-HATS-MEN-square.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [
                    {
                      id: "cG9zdDo4ODEzMQ==",
                      sourceUrl:
                        "https://example.com/content/uploads/2021/04/Extra-soft-lightweight-hat-Black.png",
                      altText: "",
                    },
                    {
                      id: "cG9zdDo4ODEzMg==",
                      sourceUrl:
                        "https://example.com/content/uploads/2021/04/Extra-soft-lightweight-hat-BLUE.png",
                      altText: "",
                    },
                    {
                      id: "cG9zdDo4ODEzMw==",
                      sourceUrl:
                        "https://example.com/content/uploads/2021/04/Extra-soft-lightweight-hat.png",
                      altText: "",
                    },
                  ],
                },
                onSale: false,
                price: "$55.00",
                regularPrice: "$55.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTQ0",
              node: {
                id: "cHJvZHVjdDo4OTE0NA==",
                slug: "organic-lavender-hand-sanitizer-spray",
                uri: "https://example.com/product/organic-lavender-hand-sanitizer-spray/",
                name: "Organic Lavender Hand Sanitizer Spray",
                type: "SIMPLE",
                shortDescription:
                  "<p>Helps reduce bacteria<br />\nCalming aroma</p>\n",
                image: {
                  id: "cG9zdDo4ODMxOQ==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/Product7_Transparent.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$9.00",
                regularPrice: "$9.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTQy",
              node: {
                id: "cHJvZHVjdDo4OTE0Mg==",
                slug: "aromatherapy-essential-oil-bundle",
                uri: "https://example.com/product/aromatherapy-essential-oil-bundle/",
                name: "Aromatherapy Essential Oil Bundle",
                type: "SIMPLE",
                shortDescription:
                  "<p>Creates a relaxing environment<br />\nEnhances mood</p>\n",
                image: {
                  id: "cG9zdDo4ODEzMA==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/essential-oils-bundle.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$59.00",
                regularPrice: "$59.00",
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: "YXJyYXljb25uZWN0aW9uOjg5MTQy",
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        first: 5,
        after: "YXJyYXljb25uZWN0aW9uOjg5MTQy",
      },
    },
    result: {
      data: {
        products: {
          edges: [
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTQw",
              node: {
                id: "cHJvZHVjdDo4OTE0MA==",
                slug: "hair-regrowth-gift-set",
                uri: "https://example.com/product/hair-regrowth-gift-set/",
                name: "Hair Regrowth Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Encourages hair growth<br />\nMinimizes additional hair loss</p>\n",
                image: {
                  id: "cG9zdDo4ODEyOQ==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/Energizing-square.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$125.00",
                regularPrice: "$125.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTM4",
              node: {
                id: "cHJvZHVjdDo4OTEzOA==",
                slug: "thinning-hair-gift-set",
                uri: "https://example.com/product/thinning-hair-gift-set/",
                name: "Thinning Hair Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Gently cleanses and conditions<br />\nCreates volume</p>\n",
                image: {
                  id: "cG9zdDo4ODA5NQ==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/DEDE-PHOTOSHOP-square.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$99.00",
                regularPrice: "$99.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTM2",
              node: {
                id: "cHJvZHVjdDo4OTEzNg==",
                slug: "sensitive-bathbody-gift-set",
                uri: "https://example.com/product/sensitive-bathbody-gift-set/",
                name: "Sensitive Bath+Body Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Protects ultra-sensitive skin<br />\nProvides nourishment</p>\n",
                image: {
                  id: "cG9zdDo4ODAxNg==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/authentic-copy-square.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$89.00",
                regularPrice: "$89.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTM0",
              node: {
                id: "cHJvZHVjdDo4OTEzNA==",
                slug: "nourishing-hair-gift-set",
                uri: "https://example.com/product/nourishing-hair-gift-set/",
                name: "Nourishing Hair Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Repairs damaged and dry hair<br />\nRevives and adds shine</p>\n",
                image: {
                  id: "cG9zdDo4ODI2Nw==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/OL-square.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$119.00",
                regularPrice: "$119.00",
              },
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTMy",
              node: {
                id: "cHJvZHVjdDo4OTEzMg==",
                slug: "mens-hair-regrowth-gift-set",
                uri: "https://example.com/product/mens-hair-regrowth-gift-set/",
                name: "Men's Hair Regrowth Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Encourages hair growth<br />\nStrengthens hair follicles</p>\n",
                image: {
                  id: "cG9zdDo4Nzk0MA==",
                  sourceUrl:
                    "https://example.com/content/uploads/2021/04/6._Men_s_Hair_Regrowth_Gift_Set.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [],
                },
                onSale: false,
                price: "$99.00",
                regularPrice: "$99.00",
              },
            },
          ],
          pageInfo: {
            hasNextPage: false,
            endCursor: "YXJyYXljb25uZWN0aW9uOjg5MTMy",
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_SESSION,
      variables: {},
    },
    result: {
      data: {
        cart: {
          contents: {
            itemCount: 4,
            nodes: [
              {
                key: "077e29b11be80ab57e1a2ecabb7da330",
                product: {
                  node: {
                    id: "cHJvZHVjdDoyNDk=",
                    databaseId: 249,
                    name: "T-Shirt with Logo",
                    slug: "t-shirt-with-logo",
                    __typename: "SimpleProduct",
                  },
                  __typename: "CartItemToProductConnectionEdge",
                },
                variation: null,
                quantity: 4,
                total: "$72.00",
                subtotal: "$72.00",
                subtotalTax: "$0.00",
                extraData: [],
                __typename: "CartItem",
              },
            ],
            __typename: "CartToCartItemConnection",
          },
          appliedCoupons: null,
          needsShippingAddress: true,
          availableShippingMethods: [
            {
              packageDetails: "T-Shirt with Logo ×4",
              supportsShippingCalculator: true,
              rates: [
                {
                  id: "flat_rate:1",
                  instanceId: 1,
                  methodId: "flat_rate",
                  label: "Flat rate",
                  cost: "100.00",
                  __typename: "ShippingRate",
                },
              ],
              __typename: "ShippingPackage",
            },
          ],
          subtotal: "$72.00",
          subtotalTax: "$0.00",
          shippingTax: "$0.00",
          shippingTotal: "$100.00",
          total: "$172.00",
          totalTax: "$0.00",
          feeTax: "$0.00",
          feeTotal: "$0.00",
          discountTax: "$0.00",
          discountTotal: "$0.00",
          __typename: "Cart",
        },
        customer: {
          id: "guest",
          sessionToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N1cGVyZHVwZXIud29vZ3JhcGhxbC5jb20iLCJpYXQiOjE2NjUwNjg0NjcsIm5iZiI6MTY2NTA2ODQ2NywiZXhwIjoxNjY2Mjc4MDY3LCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoidF80NzBiMWRjNmY4NDE2NWEzNTVlYmRlMzM1MTBlNTMiLCJjaGVja291dF91cmwiOiIvY2hlY2tvdXQ_c2Vzc2lvbl9pZD10XzQ3MGIxZGM2Zjg0MTY1YTM1NWViZGUzMzUxMGU1MyZhbXA7X3dwbm9uY2U9NjI5NjAyYTljYiJ9fQ.UezyuSfoWod6k_x5VCVW6debSKuYDiwW5B_8v26lDO8",
          shipping: {
            postcode: null,
            state: "CA",
            city: null,
            country: "US",
            __typename: "CustomerAddress",
          },
          __typename: "Customer",
        },
      },
    },
  },
  {
    request: {
      query: GET_PRODUCT,
      variables: { slug: "beanie-with-logo" },
    },
    result: {
      data: {
        product: {
          id: "cHJvZHVjdDoyNTA=",
          databaseId: 250,
          slug: "beanie-with-logo",
          name: "Beanie with Logo",
          type: "SIMPLE",
          description:
            "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\n",
          shortDescription: "<p>This is a simple product.</p>\n",
          image: {
            id: "cG9zdDoyNzM=",
            sourceUrl:
              "https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg",
            thumbnailUrl:
              "https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?func=crop&w=450&h=450",
            altText: "",
            sizes: "(max-width: 300px) 100vw, 300px",
            thumbnailSizes: "(max-width: 450px) 100vw, 450px",
            srcSet:
              "https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=800 800w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=300 300w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=150 150w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=768 768w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=450 450w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=600 600w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=100 100w",
            thumbnailSrcSet:
              "https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=800 800w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=300 300w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=150 150w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=768 768w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=450 450w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=600 600w, https://adasmqnzur.cloudimg.io/superduper.axistaylor.com/app/uploads/sites/4/2022/10/beanie-with-logo-1.jpg?w=100 100w",
            mediaDetails: {
              width: 800,
              height: 800,
              __typename: "MediaDetails",
            },
            __typename: "MediaItem",
          },
          galleryImages: {
            nodes: [],
            __typename: "ProductToMediaItemConnection",
          },
          productTags: {
            nodes: [],
            __typename: "ProductToProductTagConnection",
          },
          attributes: {
            nodes: [
              {
                id: "cGFfY29sb3I6MjUwOnBhX2NvbG9y",
                attributeId: 1,
                name: "Color",
                options: ["red"],
                variation: false,
                __typename: "GlobalProductAttribute",
              },
            ],
            __typename: "ProductToProductAttributeConnection",
          },
          onSale: true,
          stockStatus: "IN_STOCK",
          price: "$18.00",
          rawPrice: "18",
          regularPrice: "$20.00",
          salePrice: "$18.00",
          stockQuantity: null,
          soldIndividually: false,
          __typename: "SimpleProduct",
        },
      },
    },
  },
  {
    request: {
      query: ADD_TO_CART,
      variables: { quantity: 1, productId: 250 },
    },
    result: {
      data: {
        addToCart: {
          cart: {
            contents: {
              itemCount: 6,
              nodes: [
                {
                  key: "077e29b11be80ab57e1a2ecabb7da330",
                  product: {
                    node: {
                      id: "cHJvZHVjdDoyNDk=",
                      databaseId: 249,
                      name: "T-Shirt with Logo",
                      slug: "t-shirt-with-logo",
                      __typename: "SimpleProduct",
                    },
                    __typename: "CartItemToProductConnectionEdge",
                  },
                  variation: null,
                  quantity: 4,
                  total: "$72.00",
                  subtotal: "$72.00",
                  subtotalTax: "$0.00",
                  extraData: [],
                  __typename: "CartItem",
                },
                {
                  key: "6c9882bbac1c7093bd25041881277658",
                  product: {
                    node: {
                      id: "cHJvZHVjdDoyNTA=",
                      databaseId: 250,
                      name: "Beanie with Logo",
                      slug: "beanie-with-logo",
                      __typename: "SimpleProduct",
                    },
                    __typename: "CartItemToProductConnectionEdge",
                  },
                  variation: null,
                  quantity: 2,
                  total: "$36.00",
                  subtotal: "$36.00",
                  subtotalTax: "$0.00",
                  extraData: [],
                  __typename: "CartItem",
                },
              ],
              __typename: "CartToCartItemConnection",
            },
            appliedCoupons: null,
            needsShippingAddress: true,
            availableShippingMethods: [
              {
                packageDetails: "T-Shirt with Logo ×4, Beanie with Logo ×2",
                supportsShippingCalculator: true,
                rates: [
                  {
                    id: "flat_rate:1",
                    instanceId: 1,
                    methodId: "flat_rate",
                    label: "Flat rate",
                    cost: "100.00",
                    __typename: "ShippingRate",
                  },
                ],
                __typename: "ShippingPackage",
              },
            ],
            subtotal: "$108.00",
            subtotalTax: "$0.00",
            shippingTax: "$0.00",
            shippingTotal: "$100.00",
            total: "$208.00",
            totalTax: "$0.00",
            feeTax: "$0.00",
            feeTotal: "$0.00",
            discountTax: "$0.00",
            discountTotal: "$0.00",
            __typename: "Cart",
          },
          cartItem: {
            key: "6c9882bbac1c7093bd25041881277658",
            product: {
              node: {
                id: "cHJvZHVjdDoyNTA=",
                databaseId: 250,
                name: "Beanie with Logo",
                slug: "beanie-with-logo",
                __typename: "SimpleProduct",
              },
              __typename: "CartItemToProductConnectionEdge",
            },
            variation: null,
            quantity: 2,
            total: "$36.00",
            subtotal: "$36.00",
            subtotalTax: "$0.00",
            extraData: [],
            __typename: "CartItem",
          },
          __typename: "AddToCartPayload",
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_CART_ITEM_QUANTITIES,
      variables: {
        items: [{ key: "6c9882bbac1c7093bd25041881277658", quantity: 2 }],
      },
    },
    result: {
      data: {
        updateItemQuantities: {
          cart: {
            contents: {
              itemCount: 6,
              nodes: [
                {
                  key: "077e29b11be80ab57e1a2ecabb7da330",
                  product: {
                    node: {
                      id: "cHJvZHVjdDoyNDk=",
                      databaseId: 249,
                      name: "T-Shirt with Logo",
                      slug: "t-shirt-with-logo",
                      __typename: "SimpleProduct",
                    },
                    __typename: "CartItemToProductConnectionEdge",
                  },
                  variation: null,
                  quantity: 4,
                  total: "$72.00",
                  subtotal: "$72.00",
                  subtotalTax: "$0.00",
                  extraData: [],
                  __typename: "CartItem",
                },
                {
                  key: "6c9882bbac1c7093bd25041881277658",
                  product: {
                    node: {
                      id: "cHJvZHVjdDoyNTA=",
                      databaseId: 250,
                      name: "Beanie with Logo",
                      slug: "beanie-with-logo",
                      __typename: "SimpleProduct",
                    },
                    __typename: "CartItemToProductConnectionEdge",
                  },
                  variation: null,
                  quantity: 2,
                  total: "$36.00",
                  subtotal: "$36.00",
                  subtotalTax: "$0.00",
                  extraData: [],
                  __typename: "CartItem",
                },
              ],
              __typename: "CartToCartItemConnection",
            },
            appliedCoupons: null,
            needsShippingAddress: true,
            availableShippingMethods: [
              {
                packageDetails: "T-Shirt with Logo ×4, Beanie with Logo ×2",
                supportsShippingCalculator: true,
                rates: [
                  {
                    id: "flat_rate:1",
                    instanceId: 1,
                    methodId: "flat_rate",
                    label: "Flat rate",
                    cost: "100.00",
                    __typename: "ShippingRate",
                  },
                ],
                __typename: "ShippingPackage",
              },
            ],
            subtotal: "$108.00",
            subtotalTax: "$0.00",
            shippingTax: "$0.00",
            shippingTotal: "$100.00",
            total: "$208.00",
            totalTax: "$0.00",
            feeTax: "$0.00",
            feeTotal: "$0.00",
            discountTax: "$0.00",
            discountTotal: "$0.00",
            __typename: "Cart",
          },
          items: [
            {
              key: "6c9882bbac1c7093bd25041881277658",
              product: {
                node: {
                  id: "cHJvZHVjdDoyNTA=",
                  databaseId: 250,
                  name: "Beanie with Logo",
                  slug: "beanie-with-logo",
                  __typename: "SimpleProduct",
                },
                __typename: "CartItemToProductConnectionEdge",
              },
              variation: null,
              quantity: 2,
              total: "$36.00",
              subtotal: "$36.00",
              subtotalTax: "$0.00",
              extraData: [],
              __typename: "CartItem",
            },
          ],
          __typename: "UpdateItemQuantitiesPayload",
        },
      },
    },
  },
  {
    request: {
      query: REMOVE_ITEMS_FROM_CART,
      variables: { keys: ["6c9882bbac1c7093bd25041881277658"], all: false },
    },
    result: {
      data: {
        removeItemsFromCart: {
          cart: {
            contents: {
              itemCount: 4,
              nodes: [
                {
                  key: "077e29b11be80ab57e1a2ecabb7da330",
                  product: {
                    node: {
                      id: "cHJvZHVjdDoyNDk=",
                      databaseId: 249,
                      name: "T-Shirt with Logo",
                      slug: "t-shirt-with-logo",
                      __typename: "SimpleProduct",
                    },
                    __typename: "CartItemToProductConnectionEdge",
                  },
                  variation: null,
                  quantity: 4,
                  total: "$72.00",
                  subtotal: "$72.00",
                  subtotalTax: "$0.00",
                  extraData: [],
                  __typename: "CartItem",
                },
              ],
              __typename: "CartToCartItemConnection",
            },
            appliedCoupons: null,
            needsShippingAddress: true,
            availableShippingMethods: [
              {
                packageDetails: "T-Shirt with Logo ×4",
                supportsShippingCalculator: true,
                rates: [
                  {
                    id: "flat_rate:1",
                    instanceId: 1,
                    methodId: "flat_rate",
                    label: "Flat rate",
                    cost: "100.00",
                    __typename: "ShippingRate",
                  },
                ],
                __typename: "ShippingPackage",
              },
            ],
            subtotal: "$72.00",
            subtotalTax: "$0.00",
            shippingTax: "$0.00",
            shippingTotal: "$100.00",
            total: "$172.00",
            totalTax: "$0.00",
            feeTax: "$0.00",
            feeTotal: "$0.00",
            discountTax: "$0.00",
            discountTotal: "$0.00",
            __typename: "Cart",
          },
          cartItems: [
            {
              key: "6c9882bbac1c7093bd25041881277658",
              product: {
                node: {
                  id: "cHJvZHVjdDoyNTA=",
                  databaseId: 250,
                  name: "Beanie with Logo",
                  slug: "beanie-with-logo",
                  __typename: "SimpleProduct",
                },
                __typename: "CartItemToProductConnectionEdge",
              },
              variation: null,
              quantity: 1,
              total: "$18.00",
              subtotal: "$18.00",
              subtotalTax: "$0.00",
              extraData: [],
              __typename: "CartItem",
            },
          ],
          __typename: "RemoveItemsFromCartPayload",
        },
      },
    },
  },
  {
    request: {
      query: APPLY_COUPON_TO_CART,
      variables: { code: "10offbeanie" },
    },
    result: {
      data: {
        applyCoupon: {
          cart: {
            contents: {
              itemCount: 1,
              nodes: [
                {
                  key: "6c9882bbac1c7093bd25041881277658",
                  product: {
                    node: {
                      id: "cHJvZHVjdDoyNTA=",
                      databaseId: 250,
                      name: "Beanie with Logo",
                      slug: "beanie-with-logo",
                      __typename: "SimpleProduct",
                    },
                    __typename: "CartItemToProductConnectionEdge",
                  },
                  variation: null,
                  quantity: 1,
                  total: "$16.20",
                  subtotal: "$18.00",
                  subtotalTax: "$0.00",
                  extraData: [],
                  __typename: "CartItem",
                },
              ],
              __typename: "CartToCartItemConnection",
            },
            appliedCoupons: [
              {
                code: "10offbeanie",
                discountAmount: "$1.80",
                discountTax: "$0.00",
                __typename: "AppliedCoupon",
              },
            ],
            needsShippingAddress: true,
            availableShippingMethods: [
              {
                packageDetails: "Beanie with Logo ×1",
                supportsShippingCalculator: true,
                rates: [
                  {
                    id: "flat_rate:1",
                    instanceId: 1,
                    methodId: "flat_rate",
                    label: "Flat rate",
                    cost: "100.00",
                    __typename: "ShippingRate",
                  },
                ],
                __typename: "ShippingPackage",
              },
            ],
            subtotal: "$18.00",
            subtotalTax: "$0.00",
            shippingTax: "$0.00",
            shippingTotal: "$100.00",
            total: "$116.20",
            totalTax: "$0.00",
            feeTax: "$0.00",
            feeTotal: "$0.00",
            discountTax: "$0.00",
            discountTotal: "$1.80",
            __typename: "Cart",
          },
          __typename: "ApplyCouponPayload",
        },
      },
    },
  },
  {
    request: {
      query: REMOVE_COUPON_FROM_CART,
      variables: { code: "10offbeanie" },
    },
    result: {
      data: {
        removeCoupons: {
          cart: {
            contents: {
              itemCount: 1,
              nodes: [
                {
                  key: "6c9882bbac1c7093bd25041881277658",
                  product: {
                    node: {
                      id: "cHJvZHVjdDoyNTA=",
                      databaseId: 250,
                      name: "Beanie with Logo",
                      slug: "beanie-with-logo",
                      __typename: "SimpleProduct",
                    },
                    __typename: "CartItemToProductConnectionEdge",
                  },
                  variation: null,
                  quantity: 1,
                  total: "$16.20",
                  subtotal: "$18.00",
                  subtotalTax: "$0.00",
                  extraData: [],
                  __typename: "CartItem",
                },
              ],
              __typename: "CartToCartItemConnection",
            },
            appliedCoupons: null,
            needsShippingAddress: true,
            availableShippingMethods: [
              {
                packageDetails: "Beanie with Logo ×1",
                supportsShippingCalculator: true,
                rates: [
                  {
                    id: "flat_rate:1",
                    instanceId: 1,
                    methodId: "flat_rate",
                    label: "Flat rate",
                    cost: "100.00",
                    __typename: "ShippingRate",
                  },
                ],
                __typename: "ShippingPackage",
              },
            ],
            subtotal: "$18.00",
            subtotalTax: "$0.00",
            shippingTax: "$0.00",
            shippingTotal: "$100.00",
            total: "$118.00",
            totalTax: "$0.00",
            feeTax: "$0.00",
            feeTotal: "$0.00",
            discountTax: "$0.00",
            discountTotal: "$0.00",
            __typename: "Cart",
          },
          __typename: "RemoveCouponsPayload",
        },
      },
    },
  },
  {
    request: {
      query: SET_SHIPPING_LOCALE,
      variables: {
        city: "PITTSBURGH",
        state: "PA",
        zip: "12345-1234",
        country: "US",
      },
    },
    result: {
      data: {
        updateCustomer: {
          customer: {
            id: "guest",
            sessionToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N1cGVyZHVwZXIud29vZ3JhcGhxbC5jb20iLCJpYXQiOjE2NjUwNzAzNjYsIm5iZiI6MTY2NTA3MDM2NiwiZXhwIjoxNjY2Mjc5OTY2LCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoidF80NzBiMWRjNmY4NDE2NWEzNTVlYmRlMzM1MTBlNTMiLCJjaGVja291dF91cmwiOiIvY2hlY2tvdXQ_c2Vzc2lvbl9pZD10XzQ3MGIxZGM2Zjg0MTY1YTM1NWViZGUzMzUxMGU1MyZhbXA7X3dwbm9uY2U9NjI5NjAyYTljYiJ9fQ.5oZOWXtrrgCUqNuiXrfAeSBVcRSL85XtSOxvcMvYs-Q",
            shipping: {
              postcode: "12345-1234",
              state: "PA",
              city: "PITTSBURGH",
              country: "US",
              __typename: "CustomerAddress",
            },
            __typename: "Customer",
          },
          __typename: "UpdateCustomerPayload",
        },
      },
    },
  },
  {
    request: {
      query: REMOVE_COUPONS_FROM_CART,
      variables: {},
    },
    result: {},
  },
  {
    request: {
      query: SET_SHIPPING_METHOD,
      variables: {},
    },
    result: {},
  },
];

function ApolloMockProvider(props) {
  const { addTypename = false, children } = props;
  return (
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      {children}
    </MockedProvider>
  );
}

export default ApolloMockProvider;
