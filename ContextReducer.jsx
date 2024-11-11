import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size ,img:action.img}]



        case "REMOVE":
            return state.filter((item, index) => index !== action.index)


        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })

        case "DROP":
            let emptyArray=[]
            return emptyArray;

        default:
            return [...state];
    }

}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);




// const CartContext = createContext();
// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, []);

//     return (
//         <CartContext.Provider value={{ state, dispatch }}>
//             {children}
//         </CartContext.Provider>
//     );
// };
// const { state, dispatch } = useContext(CartContext);  does this code also serve the same purpose