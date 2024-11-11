import React, { useState, useRef, useEffect } from 'react'

import { useDispatch, useCart } from './ContextReducer';
var styleObj = {
    width: "18rem",
    maxHeight: "360px"
};


export default function Card(props) {
    let dispatch = useDispatch();
    let data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem.id) {
                food = item;
                break;
            }
        }
        if (food.length > 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, gty: qty, size: size ,img:props.foodItem.img})
                return 
            } // await console.log(data) iI
            return 
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size ,img:props.foodItem.img})
        await console.log(data);
    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    let options = props.options || {};
    let finalPrice = qty * parseInt(options[size]);
    let priceOptions = Object.keys(options);
    return (
        <div>
            <div>
                <div className="card mt-3" style={styleObj}>
                    <img className="card-img-top" src={props.foodItem.img} alt="Card image cap" style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className="container w-100">
                            <select className='m-2 h-100 bg-success' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {
                                    priceOptions.map((data) => {
                                        return <option key={data} value={data}>{data}</option>
                                    })
                                }
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                {finalPrice}
                            </div>
                        </div>
                        <hr></hr>
                        <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddtoCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
