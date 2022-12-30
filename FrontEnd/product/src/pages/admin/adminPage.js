import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProducts, getProducts} from "../../services/productService";

function AdminPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => {
        console.log(state, 'productlist')
        return state.product.products;
    })
    console.log(products, 'productssssss')
    useEffect(() => {
        dispatch(getProducts());
    }, [])
    return (
        <div className={'row'}>
            <div className="col-12" style={{textAlign: "center"}}>
                <h1>Admin</h1>
                <table className="table table-striped">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">NameProduct</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Description</th>

                    </tr>

                    {products.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name_product}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.description}</td>
                                    <button >Edit</button>
                                    <button onClick={() => {
                                        dispatch(deleteProducts(item.product_id))
                                    }}>Delete
                                    </button>
                                </tr>
                            )
                    })
                    }</table>
            </div>
        </div>
    );
}

export default AdminPage;