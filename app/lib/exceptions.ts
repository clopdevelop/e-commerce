export class AuthRequiredError extends Error {
    constructor(message: string = 'Auth is required to access this page.') {
        super(message);
        this.name = 'AuthRequiredError';
    }
}

export class ProductNotFoundError extends Error {
    constructor(message: string = 'Product not found.') {
        super(message);
        this.name = 'ProductNotFoundError';
    }
}

export class OutOfStockError extends Error {
    constructor(message: string = 'Product is out of stock.') {
        super(message);
        this.name = 'OutOfStockError';
    }
}

export class InvalidCouponError extends Error {
    constructor(message: string = 'Invalid coupon.') {
        super(message);
        this.name = 'InvalidCouponError';
    }
}

export class PaymentFailedError extends Error {
    constructor(message: string = 'Payment failed.') {
        super(message);
        this.name = 'PaymentFailedError';
    }
}

export class OrderNotFoundError extends Error {
    constructor(message: string = 'Order not found.') {
        super(message);
        this.name = 'OrderNotFoundError';
    }
}

export class UserNotFoundError extends Error {
    constructor(message: string = 'User not found.') {
        super(message);
        this.name = 'UserNotFoundError';
    }
}

export class PermissionDeniedError extends Error {
    constructor(message: string = 'Permission denied.') {
        super(message);
        this.name = 'PermissionDeniedError';
    }
}

export class ValidationError extends Error {
    constructor(message: string = 'Validation error.') {
        super(message);
        this.name = 'ValidationError';
    }
}

export class DatabaseError extends Error {
    constructor(message: string = 'Database error.') {
        super(message);
        this.name = 'DatabaseError';
    }
}

export class TimeoutError extends Error {
    constructor(message: string = 'Request timed out.') {
        super(message);
        this.name = 'TimeoutError';
    }
}

export class InvalidInputError extends Error {
    constructor(message: string = 'Invalid input provided.') {
        super(message);
        this.name = 'InvalidInputError';
    }
}

export class EmailAlreadyExistsError extends Error {
    constructor(message: string = 'Email already exists.') {
        super(message);
        this.name = 'EmailAlreadyExistsError';
    }
}

export class UsernameAlreadyExistsError extends Error {
    constructor(message: string = 'Username already exists.') {
        super(message);
        this.name = 'UsernameAlreadyExistsError';
    }
}

export class CartEmptyError extends Error {
    constructor(message: string = 'Shopping cart is empty.') {
        super(message);
        this.name = 'CartEmptyError';
    }
}

export class AddressNotFoundError extends Error {
    constructor(message: string = 'Address not found.') {
        super(message);
        this.name = 'AddressNotFoundError';
    }
}

export class ShippingError extends Error {
    constructor(message: string = 'Shipping error.') {
        super(message);
        this.name = 'ShippingError';
    }
}

export class InsufficientPermissionsError extends Error {
    constructor(message: string = 'Insufficient permissions to perform this action.') {
        super(message);
        this.name = 'InsufficientPermissionsError';
    }
}

export class RateLimitExceededError extends Error {
    constructor(message: string = 'Rate limit exceeded.') {
        super(message);
        this.name = 'RateLimitExceededError';
    }
}

export class InternalServerError extends Error {
    constructor(message: string = 'Internal server error.') {
        super(message);
        this.name = 'InternalServerError';
    }
}

export class ServiceUnavailableError extends Error {
    constructor(message: string = 'Service is currently unavailable.') {
        super(message);
        this.name = 'ServiceUnavailableError';
    }
}

export class InvalidCredentialsError extends Error {
    constructor(message: string = 'Invalid credentials provided.') {
        super(message);
        this.name = 'InvalidCredentialsError';
    }
}

export class ForbiddenError extends Error {
    constructor(message: string = 'Access to this resource is forbidden.') {
        super(message);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends Error {
    constructor(message: string = 'Requested resource not found.') {
        super(message);
        this.name = 'NotFoundError';
    }
}
