import { createContext, useContext, useState } from "react";
import coinsData from "../data/coins";

const TradeContext = createContext();

export function TradeProvider({ children }) {

    const [coins] = useState(coinsData);

    const [loading] = useState(false);

    const [wallet, setWallet] = useState(10000);

    const [portfolio, setPortfolio] = useState([]);

    const [transactions, setTransactions] = useState([]);

    const buy = (coinId, quantity) => {

        quantity = Number(quantity);

        const coin = coins.find(c => c.id === coinId);

        if (!coin)
            return {
                success:false,
                message:"Coin not found."
            };

        if(quantity<=0 || isNaN(quantity))
            return{
                success:false,
                message:"Invalid quantity."
            };

        const total = coin.price * quantity;

        if(total>wallet)
            return{
                success:false,
                message:"Insufficient wallet balance."
            };

        setWallet(prev=>prev-total);

        setPortfolio(prev=>{

            const exist = prev.find(item=>item.id===coin.id);

            if(exist){

                return prev.map(item=>{

                    if(item.id!==coin.id) return item;

                    return{

                        ...item,

                        quantity:item.quantity+quantity,

                        invested:item.invested+total

                    }

                });

            }

            return[

                ...prev,

                {

                    ...coin,

                    quantity,

                    invested:total

                }

            ];

        });

        setTransactions(prev=>[

            {

                id:Date.now(),

                type:"BUY",

                coin:coin.name,

                symbol:coin.symbol,

                quantity,

                price:coin.price,

                total,

                date:new Date().toLocaleString()

            },

            ...prev

        ]);

        return{

            success:true,

            message:"Purchase Successful."

        };

    };

    const sell=(coinId,quantity)=>{

        quantity=Number(quantity);

        const coin=coins.find(c=>c.id===coinId);

        if(!coin)
            return{
                success:false,
                message:"Coin not found."
            };

        const holding=portfolio.find(item=>item.id===coin.id);

        if(!holding)
            return{
                success:false,
                message:"Coin not owned."
            };

        if(quantity>holding.quantity)
            return{
                success:false,
                message:"Not enough holdings."
            };

        const total=coin.price*quantity;

        setWallet(prev=>prev+total);

        setPortfolio(prev=>

            prev

            .map(item=>{

                if(item.id!==coin.id) return item;

                return{

                    ...item,

                    quantity:item.quantity-quantity,

                    invested:item.invested-(item.invested/item.quantity)*quantity

                }

            })

            .filter(item=>item.quantity>0)

        );

        setTransactions(prev=>[

            {

                id:Date.now(),

                type:"SELL",

                coin:coin.name,

                symbol:coin.symbol,

                quantity,

                price:coin.price,

                total,

                date:new Date().toLocaleString()

            },

            ...prev

        ]);

        return{

            success:true,

            message:"Coin Sold Successfully."

        };

    };

    return(

        <TradeContext.Provider

            value={{

                coins,

                loading,

                wallet,

                portfolio,

                transactions,

                buy,

                sell

            }}

        >

            {children}

        </TradeContext.Provider>

    );

}

export function useTradeContext(){

    return useContext(TradeContext);

}