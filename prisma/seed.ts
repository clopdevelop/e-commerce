import prisma from "../app/lib/prisma";
import { initialData } from "./seedData";
import { DeliveryType } from '../app/lib/definitions';

async function main() {
  // 1. Borrar registros previos
  await Promise.all([
    await prisma.authenticator.deleteMany(),

    await prisma.orderItem.deleteMany(),
    await prisma.order.deleteMany(),

    await prisma.productImage.deleteMany(),
    await prisma.productVariant.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),

    await prisma.address.deleteMany(),
    await prisma.user.deleteMany(),

    await prisma.city.deleteMany(),
    await prisma.province.deleteMany(),
  ]);

  const {
    categories,
    products,
    productImages,
    users,
    deliveryTypes,
    paymentMethods,
  } = initialData;


  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categories,
  });


  // Productos

  products.forEach(async (product, i) => {
  let colorIndex = i;

    const { ...rest } = product;
  
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
      },
    });
  
    // Añadir todas las imágenes de un color a un producto
    for (let j = 0; j < 5; j++) {
      // Asegúrate de que no se exceda el índice de las imágenes
      if (colorIndex < productImages.length) {
        const image = productImages[colorIndex];
        await prisma.productImage.create({
          data: {
            url: image.url,
            id_product: dbProduct.id,
          },
        });
        colorIndex += 13
      }
    }
  
  });
  


  // Provinces and Cities
  
  // const insercionProvincias = `INSERT INTO province (id, nombre) 
  //   VALUES
  //   ('01', 'Araba/Álava'),
  //   ('02', 'Albacete'),
  //   ('03', 'Alicante/Alacant'),
  //   ('04', 'Almería'),
  //   ('05', 'Ávila'),
  //   ('06', 'Badajoz'),
  //   ('07', 'Illes Balears'),
  //   ('08', 'Barcelona'),
  //   ('09', 'Burgos'),
  //   ('10', 'Cáceres'),
  //   ('11', 'Cádiz'),
  //   ('12', 'Castellón/Castelló'),
  //   ('13', 'Ciudad Real'),
  //   ('14', 'Córdoba'),
  //   ('15', 'A Coruña'),
  //   ('16', 'Cuenca'),
  //   ('17', 'Girona'),
  //   ('18', 'Granada'),
  //   ('19', 'Guadalajara'),
  //   ('20', 'Gipuzkoa'),
  //   ('21', 'Huelva'),
  //   ('22', 'Huesca'),
  //   ('23', 'Jaén'),
  //   ('24', 'León'),
  //   ('25', 'Lleida'),
  //   ('26', 'La Rioja'),
  //   ('27', 'Lugo'),
  //   ('28', 'Madrid'),
  //   ('29', 'Málaga'),
  //   ('30', 'Murcia'),
  //   ('31', 'Navarra'),
  //   ('32', 'Ourense'),
  //   ('33', 'Asturias'),
  //   ('34', 'Palencia'),
  //   ('35', 'Las Palmas'),
  //   ('36', 'Pontevedra'),
  //   ('37', 'Salamanca'),
  //   ('38', 'Santa Cruz de Tenerife'),
  //   ('39', 'Cantabria'),
  //   ('40', 'Segovia'),
  //   ('41', 'Sevilla'),
  //   ('42', 'Soria'),
  //   ('43', 'Tarragona'),
  //   ('44', 'Teruel'),
  //   ('45', 'Toledo'),
  //   ('46', 'Valencia/València'),
  //   ('47', 'Valladolid'),
  //   ('48', 'Bizkaia'),
  //   ('49', 'Zamora'),
  //   ('50', 'Zaragoza'),
  //   ('51', 'Ceuta'),
  //   ('52', 'Melilla')`;

  // await prisma.$executeRawUnsafe(insercionProvincias);

  console.log("Seed ejecutado correctamente");
}

(() => {
  // if (process.env.NODE_ENV === "production") return;
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
})();
