import prisma from "../app/lib/prisma";
import { initialData } from "./seedData";
// import { countries } from './seed-countries';

async function main() {
  // 1. Borrar registros previos
  // await Promise.all( [
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.user.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.deliveryType.deleteMany();
  await prisma.paymentMethod.deleteMany();

  // ]);

  const {
    categories,
    products,
    productImages,
    users,
    deliveryTypes,
    paymentMethods,
    orders,
    orderItems,
  } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  //  Categorias
  // {
  //   name: 'Shirt'
  // }
  await prisma.category.createMany({
    data: categories,
  });
  
  // Productos
  let imageIndex = 0;

  products.forEach(async (product) => {
    const {...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
      },
    });

  console.log(dbProduct);


    // Asegúrate de que no se exceda el índice de las imágenes
    if (imageIndex < productImages.length) {
      const image = productImages[imageIndex];
      await prisma.productImage.create({
        data: {
          url: image.url,
          id_product: dbProduct.id,
        },
      });
      imageIndex++;
    }
  });

  //  DeliveryTypes
  // {
  //   name: 'Standard'
  // }
  await prisma.deliveryType.createMany({
    data: deliveryTypes,
  });

  // Recuperar los ID de las tipos de envío
  const deliveryTypesDB = await prisma.deliveryType.findMany();
  const deliveryTypesMap = deliveryTypesDB.reduce((map, deliveryType) => {
    map[deliveryType.name.toLowerCase()] = deliveryType.id;
    return map;
  }, {} as Record<string, number>); //<string=label, string=deliveryTypesID>

  //  PaymentMethods
  // {
  // name: 'PayPal',
  // }
  await prisma.paymentMethod.createMany({
    data: [
      {
        name: "Tarjeta de crédito",
        cardHolderName: "Juan Pérez",
        cardNumber: "4916156788925678", // Número de tarjeta de crédito válido para Mastercard
        expirationMonth: 10,
        expirationYear: 2025,
        cvc: "123",
        saveBillingInfo: true
      },
      {
        name: "PayPal",
        cardHolderName: "Maria García",
        cardNumber: "mariagarcia@gmail.com", // Dirección de correo electrónico asociada a la cuenta de PayPal
        expirationMonth: 12, // Fecha de expiración ficticia
        expirationYear: 2030, // Fecha de expiración ficticia
        cvc: "000", // Código de seguridad ficticio
        saveBillingInfo: false
      },
      {
        name: "Transferencia bancaria",
        cardHolderName: "N/A", // No aplica para transferencia bancaria
        cardNumber: "N/A", // No aplica para transferencia bancaria
        expirationMonth: 0, // No aplica para transferencia bancaria
        expirationYear: 0, // No aplica para transferencia bancaria
        cvc: "N/A", // No aplica para transferencia bancaria
        saveBillingInfo: false
      },
      // Puedes agregar otros métodos de pago si es necesario
    ],
  });
  
  // Recuperar los ID de los tipos de pago
  const paymentMethodsDB = await prisma.paymentMethod.findMany();
  const paymentMethodsMap = paymentMethodsDB.reduce((map, paymentMethod) => {
    map[paymentMethod.name.toLowerCase()] = paymentMethod.id;
    return map;
  }, {} as Record<string, number>);
  // Orders
  // orders.forEach(async (order) => {
  //   const dbOrder = await prisma.order.create({
  //     data: {
  //       ...order,
  //       // id_category: categoriesMap[order.type]
  //     }
  //   })

  //   // OrderItems
  //   await prisma.orderItem.createMany({
  //     data: orderItems
  //   });

  // });

  // Provinces and Cities
  const insercionProvincias = `INSERT INTO province (id, nombre) 
    VALUES
    ('01', 'Araba/Álava'),
    ('02', 'Albacete'),
    ('03', 'Alicante/Alacant'),
    ('04', 'Almería'),
    ('05', 'Ávila'),
    ('06', 'Badajoz'),
    ('07', 'Illes Balears'),
    ('08', 'Barcelona'),
    ('09', 'Burgos'),
    ('10', 'Cáceres'),
    ('11', 'Cádiz'),
    ('12', 'Castellón/Castelló'),
    ('13', 'Ciudad Real'),
    ('14', 'Córdoba'),
    ('15', 'A Coruña'),
    ('16', 'Cuenca'),
    ('17', 'Girona'),
    ('18', 'Granada'),
    ('19', 'Guadalajara'),
    ('20', 'Gipuzkoa'),
    ('21', 'Huelva'),
    ('22', 'Huesca'),
    ('23', 'Jaén'),
    ('24', 'León'),
    ('25', 'Lleida'),
    ('26', 'La Rioja'),
    ('27', 'Lugo'),
    ('28', 'Madrid'),
    ('29', 'Málaga'),
    ('30', 'Murcia'),
    ('31', 'Navarra'),
    ('32', 'Ourense'),
    ('33', 'Asturias'),
    ('34', 'Palencia'),
    ('35', 'Las Palmas'),
    ('36', 'Pontevedra'),
    ('37', 'Salamanca'),
    ('38', 'Santa Cruz de Tenerife'),
    ('39', 'Cantabria'),
    ('40', 'Segovia'),
    ('41', 'Sevilla'),
    ('42', 'Soria'),
    ('43', 'Tarragona'),
    ('44', 'Teruel'),
    ('45', 'Toledo'),
    ('46', 'Valencia/València'),
    ('47', 'Valladolid'),
    ('48', 'Bizkaia'),
    ('49', 'Zamora'),
    ('50', 'Zaragoza'),
    ('51', 'Ceuta'),
    ('52', 'Melilla')`;

  await prisma.$executeRawUnsafe(insercionProvincias);

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
})();
