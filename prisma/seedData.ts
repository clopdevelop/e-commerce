
interface SeedProduct {
  name: string;
  description: string;
  state: string;
  price: number;
  id_category?: number;
}

type ValidSizes = 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46;
type ValidColor = "DEFAULT" | "BLUE" | "GREEN" | "RED" | "YELLOW";

interface SeedProductVariant {
  stock: number;
  productId: number;
  color: String;
  size: Number;
}

export type SeedImage = {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
};

interface SeedOrder {
  code: string;
  type: string;
  total: number;
  status: string;
  id_user: string;
  id_delivery_type: number;
  order_type: string;
  id_address: number;
}

interface SeedOrderItem {
  name: string;
  quantity: number;
  unit_price: number;
  id_order: number;
  id_product: number;
}

//PRODUCTO
const categories = [
  {
    name: "Tacones",
  },
  {
    name: "Sandalias",
  },
  {
    name: "Casuales",
  },
  {
    name: "Deportivos",
  },
  {
    name: "Botas",
  },
];

const products = [
  {
    name: "Tacones de noche",
    description: "Tacones elegantes de cuero negro",
    state: "Disponible",
    price: 49.99,
    id_category: 1,
  },
  {
    name: "Sandalias de tacón",
    description: "Sandalias de tacón elegantes para eventos formales",
    state: "Disponible",
    price: 44.99,
    id_category: 1,
  },
  {
    name: "Sandalia de verano",
    description: "Sandalia de cuero azul",
    state: "Disponible",
    price: 29.99,
    last_update: new Date("2024-05-21T00:00:00.000Z"),
    id_category: 2,
  },
  {
    name: "Sandalias de playa",
    description: "Sandalias cómodas para la playa",
    state: "Disponible",
    price: 19.99,
    id_category: 2,
  },
  {
    name: "Zapatos de diario",
    description: "Zapatos duraderos y cómodos",
    state: "Disponible",
    price: 69.99,
    id_category: 3,
  },
  {
    name: "Zapatillas con Plataforma",
    description: "Zapatillas cómodas y suaves con elevación",
    state: "Disponible",
    price: 19.99,
    id_category: 3,
  },
  {
    name: "Zapatos casuales",
    description: "Zapatos casuales elegantes y cómodos",
    state: "Disponible",
    price: 39.99,
    id_category: 3,
  },
  {
    name: "Zapatos de vestir",
    description: "Zapatos de vestir elegantes",
    state: "Disponible",
    price: 69.99,
    id_category: 3,
  },
  {
    name: "Zapatilla deportiva",
    description: "Zapatilla deportiva ligera",
    state: "Disponible",
    price: 59.99,
    id_category: 4,
  },
  {
    name: "Zapatillas de deporte",
    description: "Zapatillas de deporte ligeras y transpirables",
    state: "Disponible",
    price: 59.99,
    id_category: 4,
  },
  {
    name: "Bota de montaña",
    description: "Bota de montaña resistente",
    state: "Disponible",
    price: 79.99,
    id_category: 5,
  },
  {
    name: "Botas de senderismo",
    description: "Botas de senderismo resistentes y cómodas",
    state: "Disponible",
    price: 89.99,
    id_category: 5,
  },
  {
    name: "Botas normales",
    description: "Botas comodas para la calle",
    state: "Disponible",
    price: 79.99,
    id_category: 5,
  },
];

const productVariants = [
  {
    stock: 100,
    productId: 1,
    color: "GREEN",
    size: 35,
  },
  {
    stock: 50,
    productId: 2,
    color: "DEFAULT",
    size: 38,
  },
  {
    stock: 200,
    productId: 3,
    color: "GREEN",
    size: 46,
  },
  {
    stock: 150,
    productId: 4,
    color: "DEFAULT",
    size: 37,
  },
  {
    stock: 150,
    productId: 4,
    color: "BLUE",
    size: 37,
  },
  {
    stock: 130,
    productId: 4,
    color: "GREEN",
    size: 38,
  },
  {
    stock: 120,
    productId: 4,
    color: "RED",
    size: 39,
  },
  {
    stock: 80,
    productId: 5,
    color: "BLUE",
    size: 40,
  },
  {
    stock: 80,
    productId: 5,
    color: "YELLOW",
    size: 40,
  },
  {
    stock: 70,
    productId: 5,
    color: "DEFAULT",
    size: 41,
  },
  {
    stock: 60,
    productId: 5,
    color: "RED",
    size: 42,
  },
  {
    stock: 120,
    productId: 6,
    color: "DEFAULT",
    size: 42,
  },
  {
    stock: 120,
    productId: 6,
    color: "BLUE",
    size: 42,
  },
  {
    stock: 110,
    productId: 6,
    color: "GREEN",
    size: 43,
  },
  {
    stock: 100,
    productId: 6,
    color: "RED",
    size: 44,
  },
  {
    stock: 100,
    productId: 7,
    color: "DEFAULT",
    size: 39,
  },
  {
    stock: 60,
    productId: 8,
    color: "DEFAULT",
    size: 41,
  },
  {
    stock: 200,
    productId: 9,
    color: "DEFAULT",
    size: 43,
  },
  {
    stock: 90,
    productId: 10,
    color: "RED",
    size: 38,
  },
  {
    stock: 70,
    productId: 11,
    color: "DEFAULT",
    size: 36,
  },
  {
    stock: 110,
    productId: 12,
    color: "DEFAULT",
    size: 44,
  },
  {
    stock: 130,
    productId: 13,
    color: "DEFAULT",
    size: 40,
  },
];

const productimages = [
  //DEFAULT
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938707/tacones/yqlzghcnueqbyywwnt5b.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938720/tacones/qms7dim3apqe0bceyvu6.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940441/Sandalias/ivrvp77stmwe3m1gribz.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940576/Sandalias/q6l7mt166xd88hodqzwh.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943425/Casuales/f2bvtpgpf4gsxemzoinp.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943606/Casuales/u7ox9aj4vsbjkr9vcxwh.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943750/Casuales/qhpwghmeccxsdhekr1kz.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943933/Casuales/x9emjftdubsoxuvnekgj.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717946862/Deportivas/oobzhpt2y9vk68azfjd5.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717947322/Deportivas/n3k20rqgkdr62qhwskwx.png",
  },
  
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948572/Botas/gpedxap7hal2symdll0c.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948737/Botas/catumfwqfborcnlgi822.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948933/Botas/lvb2kzugsl4kkkkpf3bl.png",
  },


  //BLUE
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938707/tacones/hcwqeozrqhdvy4kfmthz.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938721/tacones/tjvdvfhepr8j5155veut.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940441/Sandalias/sic2vnmrisd456lknpty.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940577/Sandalias/hgrs9yq7opb6cmycfqn5.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943425/Casuales/jt59rqoko4qpbczges69.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943607/Casuales/gr3n1mlzm6gq4dxuinad.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943751/Casuales/ykpmolcyipotivjvvzge.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943933/Casuales/owm9l6gjw5w1v0lapucj.png",
  },
  
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717946862/Deportivas/ow4sxj8v9psfwotq4onu.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717947322/Deportivas/ysljgiyucodfn9fwp2r6.png",
  },
  
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948572/Botas/a9k8ygrkxsxiolqtlue9.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948735/Botas/z4n48mkrh0qmfwxe7gmy.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948933/Botas/dcijwrbnptpps0ymvojx.png",
  },

  //GREEN
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938707/tacones/awwf2wusc6wzalrypzw3.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938720/tacones/aqhbqggrg4vrilhle7k4.png"
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940441/Sandalias/sl3erb4knvgmoitasb8q.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940577/Sandalias/kpua3rwfukhfttnxtixf.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943425/Casuales/dnh63rcyr1zxwgxi4yzv.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943607/Casuales/nuukuzgimbgam1bjqtyc.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943750/Casuales/jxviwk6j6j7ifjg1si8g.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943933/Casuales/xbgqdfnqsxynuszeou41.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717946864/Deportivas/zvywt3kbdo7cgf6wmvqf.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717947321/Deportivas/yfbw7on6jhhavzv4bjmo.png",
  },
  
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948571/Botas/xl29u3v5hfbpaybmpeia.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948736/Botas/rerdo42ygax9zdcctmey.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948932/Botas/hnbr3qupsovyq5xcl5cw.png",
  },


  //RED
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938707/tacones/pdsqwjssfx9sjlrclr24.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938721/tacones/n77kpentfubousstt3so.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940441/Sandalias/bcqul9jfrdkdeccu24fm.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940577/Sandalias/sywr23f3bycjtoqeyylo.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943424/Casuales/tad8rk728ogvu0u7yha7.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943607/Casuales/rbvmtt2flbki2ungu7fo.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943751/Casuales/l3w3nki8b0todanqo62r.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943933/Casuales/aqiq7vlv17tqfnfabedr.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717946862/Deportivas/erai86cisuu2ywmwwgdt.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717947321/Deportivas/kj9jgesh6vcwkgbfpkil.png",
  },
  
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948572/Botas/jf9ku7xrcn6aqvrxhwxp.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948736/Botas/sdumnd60j4fig6ldz6y5.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948932/Botas/uxxpso6wr4zvxiceuta1.png",
  },



  //YELLOW
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938707/tacones/d9zfhmqevgt9tatxrwub.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717938721/tacones/yoi33w5au1kuyprskllb.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940441/Sandalias/dlf8404dpdgiycgozik9.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717940576/Sandalias/d363avhwn7y0zeoo3mae.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943424/Casuales/m1bb4lrcuxpllq0vkemf.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943607/Casuales/vluuo85yrnid7dnapbof.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943751/Casuales/smdwx5udkntkoszrsiqa.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717943934/Casuales/udfozkba1hoiswk7hnu1.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717946862/Deportivas/q6qpnc5uzrwgfcneynfy.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717947321/Deportivas/nxneww3wnnbbqibuou2k.png",
  },

  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948571/Botas/skssufpegdceieucrvbf.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948736/Botas/jadiycsa6uerltzv56d1.png",
  },
  {
    url: "https://res.cloudinary.com/denq9j9dq/image/upload/v1717948931/Botas/z1ojol438m6q7umyqtam.png",
  },
];

//USUARIO
interface SeedUser {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

const users = [
  {
    name: "Usuario",
    username: "Username",
    email: "usuario@gmail.com",
    password: "usuario",
    phone: "1234567890",
    role: "admin",
  },
  {
    name: "test",
    username: "testname",
    email: "test@test.com",
    phone: "0987654321",
    password: "testtest",
    role: "user",
  },
];

//DIRECCION

const orders = [
  {
    code: "#000001",
    type: "Envío",
    total: 1200.0,
    status: "Pendiente",
    id_user: 1,
    id_delivery_type: 1,
  },
  {
    code: "#000002",
    type: "Envío",
    total: 800.0,
    status: "Procesado",
    id_user: 2,
    id_delivery_type: 2,
  },
  {
    code: "#000003",
    type: "Recogida",
    total: 150.0,
    status: "Enviado",
    id_user: 3,
    id_delivery_type: 3,
  },
];

const orderItems = [
  {
    quantity: 2,
    unit_price: 1200.0,
    id_order: 1,
    id_product: 1,
  },
  {
    quantity: 1,
    unit_price: 800.0,
    id_order: 2,
    id_product: 2,
  },
  {
    quantity: 3,
    unit_price: 150.0,
    id_order: 3,
    id_product: 3,
  },
];

const deliveryTypes = [
  {
    name: "Standard",
  },
  {
    name: "Express",
  },
  {
    name: "Premium",
  },
];

const paymentMethods = [
  {
    name: "Tarjeta de crédito",
  },
  {
    name: "PayPal",
  },
  {
    name: "Transferencia bancaria",
  },
];

// const invoices = [
//   {
//     invoice_n: "INV-001",
//     type: "Venta",
//     orderId: 1,
//     amount: 1200.0,
//     state: "Pagado",
//     paymentMethodId: 1,
//   },
//   {
//     invoice_n: "INV-002",
//     type: "Venta",
//     orderId: 2,
//     amount: 800.0,
//     state: "Pagado",
//     paymentMethodId: 2,
//   },
//   {
//     invoice_n: "INV-003",
//     type: "Venta",
//     orderId: 3,
//     amount: 150.0,
//     state: "Pendiente",
//     paymentMethodId: 3,
//   },
// ];

interface SeedData {
  users: SeedUser[];
  categories: { name: string }[];
  products: SeedProduct[];
  productImages: SeedImage[];
  productVariants: SeedProductVariant[];
  deliveryTypes: { name: string }[];
  paymentMethods: { name: string }[];
}

export const initialData: SeedData = {
  users: users,
  categories: categories,
  products: products,
  productImages: productimages,
  productVariants: productVariants,
  deliveryTypes: deliveryTypes,
  paymentMethods: paymentMethods,
  // invoices: invoices,
};
