import React from 'react';
import { useState, useEffect } from 'react';

const [itemList, setItemList] = useState[''];

const CartItemList = () => {

    const DUMMY_ITEM_LIST = [
        {
            id: 1,
            name: '아이스티',
            packingState: '포장불가',
            price: 1400,
            amount: 1,
            isChecked: true,
        },
        {
            id: 2,
            name: '아메리카노',
            packingState: '포장불가',
            price: 2000,
            amount: 1,
            isChecked: true,
        },
        {
            id: 3,
            name: '카라멜마끼야또',
            packingState: '포장불가',
            price: 2100,
            amount: 1,
            isChecked: false,
        },
        {
            id: 1,
            name: '카페라떼',
            packingState: '포장불가',
            price: 3000,
            amount: 1,
            isChecked: false,
        },
        {
            id: 1,
            name: '콜라',
            packingState: '포장불가',
            price: 1700,
            amount: 1,
            isChecked: false,
        }
    ]

    const amountInputHandler = event => {
        onChangeProps(item.id, 'amount', +event.targer.value);
    };

    const amountIncreaseHandler = event => {
        event.preventDefault();
        onChangeProps(item.id, 'amount', item.amount + 1);
    };

    const amountDecreaseHandler = event => {
        event.preventDefault();
        onChangeProps(item.id, 'amount', item.amount - 1);
    };

    const onChangeProps = (id, key, value) => {
        setItemList(prevState => {
          return prevState.map(obj => {
            if (obj.id === id) {
              return { ...obj, [key]: value };
            } else {
              return { ...obj };
            }
          });
        });
      };

    const setIsBtnValid = () => {
        setItemList.map
    }

    useEffect(() => {
        setIsBtnValid(item.amount > 1);
    }, [item.amount]);

    <ul>
        {itemList.map(item => {
            return (
                <CartItem key={item.id} item={item} onChangeProps={onChangeProps} />
            );
        })}
    </ul>
};

export default CartItemList;