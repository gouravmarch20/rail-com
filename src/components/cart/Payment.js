import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import './css/payment.css'
const Payment = () => {
  const { cartState, cartDispatch } = useCart()
  const [value, setValue] = useState({
    price: 0,
    priceMrp: 0,
    totalItemsInCart: 0
  })
  const [discountPrice, setDiscountPrice] = useState(0)
  const { cart, cartError, totalProductInCart } = cartState
  console.log(cart);
  useEffect(() => {
    let priceDetail = cart.reduce(
      (acc, curr) => ({
        ...acc,
        price: curr.qty * (curr.price + acc.price),
        priceMrp: curr.qty * (curr.priceMrp + acc.priceMrp),
        totalItemsInCart: curr.qty + acc.totalItemsInCart 
      }),
      {
        price: 0,
        priceMrp: 0,
        totalItemsInCart: 0
      }
    )
    let discountPrice = priceDetail.priceMrp - priceDetail.price
    console.log(priceDetail)
    setValue(prev => ({
      ...prev,
      priceMrp: priceDetail.priceMrp,
      price: priceDetail.price,
      totalItemsInCart: priceDetail.totalItemsInCart
    }))
    setDiscountPrice(discountPrice)
  }, [cartState])

  return (
    <>
      {' '}
      <div className='payment'>
        <div className=''>
          <h2 className='payment-heading'>Price Detail</h2>
          <p className='payment-item'>
            No of items - <span> &nbsp; {value?.totalItemsInCart} </span>
          </p>
        </div>
        <div>
          <p className='payment-mrp '>
            Total Mrp : &nbsp;
            <span>
              {' '}
              <del className='payment-mrp'> {value.priceMrp}</del>
            </span>
          </p>
          <p className='payment-discount'>
            Special Discount -{' '}
            <span className='payment-discount'> &nbsp; {discountPrice}</span>
          </p>
          <p className='payment-final'>
            Final Payment - <span> &nbsp; {value.price}</span>
          </p>
        </div>
        <div className=''>
          <button className='ctn-btn-pay  '>Pay now</button>
        </div>
      </div>
    </>
  )
}

export default Payment
