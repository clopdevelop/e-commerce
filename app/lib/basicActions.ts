


// //Autenticación y Autorización
// function login(username: string, password: string): User {
//     const user = database.findUserByUsername(username);
//     if (!user || !user.checkPassword(password)) {
//         throw new InvalidCredentialsError('Invalid username or password.');
//     }
//     return user;
// }

// function registerUser(email: string, username: string, password: string): User {
//     if (database.emailExists(email)) {
//         throw new EmailAlreadyExistsError('This email address is already registered.');
//     }
//     if (database.usernameExists(username)) {
//         throw new UsernameAlreadyExistsError('This username is already taken.');
//     }
//     const user = createUser(email, username, password);
//     database.saveUser(user);
//     return user;
// }



// //Gestión de Productos
// function addProduct(product: Product): void {
//     validateProduct(product);
//     database.saveProduct(product);
// }

// function updateProduct(productId: string, updates: Partial<Product>): Product {
//     const product = database.findProductById(productId);
//     if (!product) {
//         throw new ProductNotFoundError(`Product with ID ${productId} not found.`);
//     }
//     Object.assign(product, updates);
//     validateProduct(product);
//     database.saveProduct(product);
//     return product;
// }

// function deleteProduct(productId: string): void {
//     const product = database.findProductById(productId);
//     if (!product) {
//         throw new ProductNotFoundError(`Product with ID ${productId} not found.`);
//     }
//     database.deleteProduct(productId);
// }



// //Gestión de Carrito de Compras
// function addToCart(userId: string, productId: string, quantity: number): void {
//     const user = getUserById(userId);
//     const product = getProductById(productId);
//     if (product.stock < quantity) {
//         throw new OutOfStockError(`Product with ID ${productId} is out of stock.`);
//     }
//     cartService.addProductToCart(user.cart, productId, quantity);
// }

// function removeFromCart(userId: string, productId: string): void {
//     const user = getUserById(userId);
//     cartService.removeProductFromCart(user.cart, productId);
// }


// function checkout(userId: string): Order {
//     const user = getUserById(userId);
//     if (user.cart.isEmpty()) {
//         throw new CartEmptyError();
//     }
//     const order = orderService.createOrder(user.cart);
//     paymentService.processPayment(order);
//     shippingService.scheduleDelivery(order);
//     return order;
// }



//Gestión de Pedidos
function updateOrderStatus(orderId: string, status: OrderStatus): void {
    const order = getOrderById(orderId);
    order.status = status;
    database.saveOrder(order);
}



//Gestión de Usuarios
// function updateUser(userId: string, updates: Partial<User>): User {
//     const user = getUserById(userId);
//     Object.assign(user, updates);
//     database.saveUser(user);
//     return user;
// }

// function deleteUser(userId: string): void {
//     const user = getUserById(userId);
//     database.deleteUser(user.id);
// }



//Gestión de Cupones y Descuentos
// function createCoupon(code: string, discount: number, expiryDate: Date): void {
//     if (database.couponExists(code)) {
//         throw new InvalidCouponError(`Coupon code ${code} already exists.`);
//     }
//     const coupon = { code, discount, expiryDate };
//     database.saveCoupon(coupon);
// }

// function applyCoupon(userId: string, couponCode: string): void {
//     const user = getUserById(userId);
//     const coupon = database.findCouponByCode(couponCode);
//     if (!coupon || coupon.expiryDate < new Date()) {
//         throw new InvalidCouponError(`Coupon code ${couponCode} is invalid or expired.`);
//     }
//     cartService.applyCoupon(user.cart, coupon);
// }

// function removeCoupon(userId: string): void {
//     const user = getUserById(userId);
//     cartService.removeCoupon(user.cart);
// }



// //Gestión de Envíos
// function scheduleDelivery(orderId: string): void {
//     const order = getOrderById(orderId);
//     try {
//         shippingService.scheduleDelivery(order);
//     } catch (error) {
//         throw new ShippingError('Unable to schedule delivery at this time.');
//     }
// }
