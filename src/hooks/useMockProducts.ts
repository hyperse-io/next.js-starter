export type Product = {
  name: string;
  desc: string;
  price: number;
  image: string;
};

export type UseMockProductsResult = {
  products: Product[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

// 商品数据
const PRODUCTS = [
  {
    name: 'T-shirt',
    desc: '100% Cotton',
    price: 0.3,
    image: 'https://picsum.photos/200/300?random=1',
  },
  {
    name: 'Sneakers',
    desc: 'Running Shoes',
    price: 1.4,
    image: 'https://picsum.photos/200/300?random=2',
  },
  {
    name: 'Backpack',
    desc: 'Waterproof',
    price: 1.2,
    image: 'https://picsum.photos/200/300?random=3',
  },
  {
    name: 'Socks',
    desc: 'Pack of 5',
    price: 2,
    image: 'https://picsum.photos/200/300?random=4',
  },
  {
    name: 'Hat',
    desc: 'Adjustable',
    price: 0.3,
    image: 'https://picsum.photos/200/300?random=5',
  },
  {
    name: 'Sunglasses',
    desc: 'UV Protection',
    price: 0.1,
    image: 'https://picsum.photos/200/300?random=6',
  },
];

export const getRandomProducts = (): UseMockProductsResult => {
  // 保证商品和订单明细一致
  // 保证至少有一个商品
  const minCount = 1;
  const maxCount = 4;
  const count =
    Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random());
  const products = shuffled.slice(0, count);

  // 计算金额
  const subtotal = products.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  return {
    products,
    subtotal,
    shipping,
    tax,
    total,
  };
};
