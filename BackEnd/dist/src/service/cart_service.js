"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const cart_1 = require("../model/cart");
const product_1 = require("../model/product");
class CartService {
    constructor() {
        this.getAnUserCart = async (id) => {
            let query = `select p.name_product, c.cartQuantity, p.price, p.url, p.product_id, p.description
                     from carts as c
                              join products p on c.product_id = p.product_id
                              join users u on c.user_id = u.user_id
                     where c.user_id = ${id}`;
            let result = await this.cartRepo.query(query);
            return result;
        };
        this.addProduct = async (input) => {
            let query = `select *
                     from carts
                     where user_id like ${input.user_id}
                       and product_id like ${input.product_id}`;
            let checkAvail = await this.cartRepo.query(query);
            if (checkAvail.length == 0) {
                let result = await this.cartRepo.save(input);
                return result;
            }
            else {
                let newQuantity = (checkAvail[0].cartQuantity + 1);
                await this.cartRepo.query(`update carts
                                       set cartQuantity = ${newQuantity}
                                       where user_id = ${input.user_id}
                                         and product_id = ${input.product_id}`);
                let result = await this.cartRepo.query(`select *
                                                    from carts
                                                    where user_id = ${input.user_id}
                                                      and product_id = ${input.product_id}`);
                return result;
            }
        };
        this.removeAProduct = async (input) => {
            let query = `delete
                     from carts
                     where user_id = ${input.user_id}
                       and product_id = ${input.product_id}`;
            await this.cartRepo.query(query);
        };
        this.removeAllProduct = async (input) => {
            let query = `delete
                     from carts
                     where user_id = ${input.user_id}`;
            await this.cartRepo.query(query);
        };
        this.decreaseQuantity = async (input) => {
            let currentQuantity = await this.cartRepo.query(`select cartQuantity
                                                         from carts
                                                         where user_id = ${input.user_id}
                                                           and product_id = ${input.product_id}`);
            if (currentQuantity[0].cartQuantity == 0) {
                alert('Cannot lower the amount than 0');
                return currentQuantity[0].cartQuantity;
            }
            else {
                let newQuantity = (currentQuantity[0].cartQuantity - 1);
                await this.cartRepo.query(`update carts
                                       set cartQuantity = ${newQuantity}
                                       where user_id = ${input.user_id}
                                         and product_id = ${input.product_id}`);
                let result = await this.cartRepo.query(`select *
                                                    from carts
                                                    where user_id = ${input.user_id}
                                                      and product_id = ${input.product_id}`);
                return result[0].cartQuantity;
            }
        };
        this.increaseQuantity = async (input) => {
            let currentQuantity = await this.cartRepo.query(`select cartQuantity
                                                         from carts
                                                         where user_id = ${input.user_id}
                                                           and product_id = ${input.product_id}`);
            let productQuantityAvail = await this.productRepo.query(`select quantity
                                                                 from products
                                                                 where product_id = '${input.product_id}'`);
            if (productQuantityAvail[0].quantity <= currentQuantity[0].cartQuantity) {
                console.log('There are no more products in our storage');
                return currentQuantity[0].cartQuantity;
            }
            else {
                let newQuantity = (currentQuantity[0].cartQuantity + 1);
                await this.cartRepo.query(`update carts
                                       set cartQuantity = ${newQuantity}
                                       where user_id = ${input.user_id}
                                         and product_id = ${input.product_id}`);
                let product = await this.findProductById(input.product_id);
                return product[0];
            }
        };
        this.findProductById = async (id) => {
            let sql = `select *
                   from products
                   where product_id = ${id}`;
            return await this.productRepo.query(sql);
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            this.cartRepo = await connection.getRepository(cart_1.Cart);
            this.productRepo = await connection.getRepository(product_1.Product);
        });
    }
}
exports.default = new CartService();
//# sourceMappingURL=cart_service.js.map