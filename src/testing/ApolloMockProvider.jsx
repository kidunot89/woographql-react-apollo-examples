import React from 'react';
import { MockedProvider  } from '@apollo/client/testing';

import { GET_PRODUCTS } from "../components/products";
const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
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
                uri: "https://www.mendtogether.com/product/tea-tumbler/",
                name: "Tea Tumbler",
                type: "SIMPLE",
                shortDescription:
                  "<p>Encourages hydration<br />\nPortable</p>\n",
                image: {
                  id: "cG9zdDo4ODQ0MA==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/tea-tumbler.png",
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
                uri: "https://www.mendtogether.com/product/vegetarian-tagines-couscous/",
                name: "Vegetarian Tagines & Couscous",
                type: "SIMPLE",
                shortDescription:
                  "<p>Inspires cooking<br />\nSupports wellness</p>\n",
                image: {
                  id: "cG9zdDo4Nzk3NQ==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/9781849754323.png",
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
                uri: "https://www.mendtogether.com/product/gift-of-hats-men/",
                name: "Gift Of Hats (Men)",
                type: "SIMPLE",
                shortDescription:
                  "<p>Covers the whole head<br />\nProtects against exposure</p>\n",
                image: {
                  id: "cG9zdDo4ODE1OA==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/GIVE-HATS-MEN-square.png",
                  altText: "",
                },
                galleryImages: {
                  nodes: [
                    {
                      id: "cG9zdDo4ODEzMQ==",
                      sourceUrl:
                        "https://shop.production.mendtogether.com/content/uploads/2021/04/Extra-soft-lightweight-hat-Black.png",
                      altText: "",
                    },
                    {
                      id: "cG9zdDo4ODEzMg==",
                      sourceUrl:
                        "https://shop.production.mendtogether.com/content/uploads/2021/04/Extra-soft-lightweight-hat-BLUE.png",
                      altText: "",
                    },
                    {
                      id: "cG9zdDo4ODEzMw==",
                      sourceUrl:
                        "https://shop.production.mendtogether.com/content/uploads/2021/04/Extra-soft-lightweight-hat.png",
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
                uri: "https://www.mendtogether.com/product/organic-lavender-hand-sanitizer-spray/",
                name: "Organic Lavender Hand Sanitizer Spray",
                type: "SIMPLE",
                shortDescription:
                  "<p>Helps reduce bacteria<br />\nCalming aroma</p>\n",
                image: {
                  id: "cG9zdDo4ODMxOQ==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/Product7_Transparent.png",
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
                uri: "https://www.mendtogether.com/product/aromatherapy-essential-oil-bundle/",
                name: "Aromatherapy Essential Oil Bundle",
                type: "SIMPLE",
                shortDescription:
                  "<p>Creates a relaxing environment<br />\nEnhances mood</p>\n",
                image: {
                  id: "cG9zdDo4ODEzMA==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/essential-oils-bundle.png",
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
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjg5MTQw",
              node: {
                id: "cHJvZHVjdDo4OTE0MA==",
                slug: "hair-regrowth-gift-set",
                uri: "https://www.mendtogether.com/product/hair-regrowth-gift-set/",
                name: "Hair Regrowth Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Encourages hair growth<br />\nMinimizes additional hair loss</p>\n",
                image: {
                  id: "cG9zdDo4ODEyOQ==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/Energizing-square.png",
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
                uri: "https://www.mendtogether.com/product/thinning-hair-gift-set/",
                name: "Thinning Hair Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Gently cleanses and conditions<br />\nCreates volume</p>\n",
                image: {
                  id: "cG9zdDo4ODA5NQ==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/DEDE-PHOTOSHOP-square.png",
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
                uri: "https://www.mendtogether.com/product/sensitive-bathbody-gift-set/",
                name: "Sensitive Bath+Body Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Protects ultra-sensitive skin<br />\nProvides nourishment</p>\n",
                image: {
                  id: "cG9zdDo4ODAxNg==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/authentic-copy-square.png",
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
                uri: "https://www.mendtogether.com/product/nourishing-hair-gift-set/",
                name: "Nourishing Hair Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Repairs damaged and dry hair<br />\nRevives and adds shine</p>\n",
                image: {
                  id: "cG9zdDo4ODI2Nw==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/OL-square.png",
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
                uri: "https://www.mendtogether.com/product/mens-hair-regrowth-gift-set/",
                name: "Men's Hair Regrowth Gift Set",
                type: "SIMPLE",
                shortDescription:
                  "<p>Encourages hair growth<br />\nStrengthens hair follicles</p>\n",
                image: {
                  id: "cG9zdDo4Nzk0MA==",
                  sourceUrl:
                    "https://shop.production.mendtogether.com/content/uploads/2021/04/6._Men_s_Hair_Regrowth_Gift_Set.png",
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
        },
      },
    },
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
