declare class CartService {
    cartRepo: any;
    constructor();
    getAnUserCart: (id: any) => Promise<any>;
    addProduct: (input: any) => Promise<any>;
    removeAProduct: (input: any) => Promise<void>;
    removeAllProduct: (input: any) => Promise<void>;
}
declare const _default: CartService;
export default _default;
