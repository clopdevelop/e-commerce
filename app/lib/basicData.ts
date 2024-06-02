


//Autenticación y Autorización

function authenticateUser(token: string): User {
    if (!token) {
        throw new AuthRequiredError();
    }
    const user = tokenService.verifyToken(token);
    if (!user) {
        throw new InvalidCredentialsError('Invalid token.');
    }
    return user;
}

function checkPermissions(user: User, requiredPermission: string): void {
    if (!user.permissions.includes(requiredPermission)) {
        throw new PermissionDeniedError();
    }
}



//Gestión de Productos

function viewCart(userId: string): Cart {
    const user = getUserById(userId);
    return user.cart;
}

//Gestión de Pedidos
function getOrderById(orderId: string): Order {
    const order = database.findOrderById(orderId);
    if (!order) {
        throw new OrderNotFoundError(`Order with ID ${orderId} not found.`);
    }
    return order;
}

function listOrders(userId: string): Order[] {
    const user = getUserById(userId);
    return database.findOrdersByUserId(user.id);
}


//Gestión de Usuarios
function getUserById(userId: string): User {
    const user = database.findUserById(userId);
    if (!user) {
        throw new UserNotFoundError(`User with ID ${userId} not found.`);
    }
    return user;
}


//Gestión de Envíos
function calculateShipping(address: Address): ShippingRates {
    try {
        return shippingService.getRates(address);
    } catch (error) {
        throw new ServiceUnavailableError('Unable to fetch shipping rates at this time.');
    }
}

function trackShipment(trackingNumber: string): ShipmentStatus {
    try {
        return shippingService.trackShipment(trackingNumber);
    } catch (error) {
        throw new NotFoundError(`Shipment with tracking number ${trackingNumber} not found.`);
    }
}



//Utilidades
function validateProduct(product: Product): void {
    if (!product.name || !product.price) {
        throw new ValidationError('Product must have a name and price.');
    }
}


function isValidToken(token: string): boolean {
    // Token validation logic...
    return true;
}


function isValidInput(input: any): boolean {
    // Input validation logic...
    return true;
}

function hasPermission(user: User, permission: string): boolean {
    return user.permissions.includes(permission);
}

function logError(error: Error): void {
    console.error(error.name, error.message, error.stack);
}
