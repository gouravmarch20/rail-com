import React from 'react'
import './ProductList.css'
import {
  getSortedProducts,
  getFilteredProducts,
  discontInPercent
} from '../../utils/index'
import { addToWishlist, addToCart } from '../../helpers/index'
import { useProduct } from '../../context/ProductContext'
import { useFilter } from '../../context/FilterContext'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

const ProductList = () => {
  const navigate = useNavigate()
  const {
    productState: { products, error }
  } = useProduct()
  const { filterState, filterDispatch } = useFilter()
  const {
    cartState: { cart },
    cartDispatch
  } = useCart()
  const {
    wishlistState: { wishlist },
    wishlistDispatch
  } = useWishlist()

  const sortedProducts = getSortedProducts(products, filterState)
  const filteredProducts = getFilteredProducts(sortedProducts, filterState)

  return (
    <div className='productList'>
      <h1 className='heading mt-1'>
        Total products{' '}
        <span className='subheading'>{filteredProducts.length}</span>
      </h1>
      <div className='products__listing'>
        {filteredProducts && filteredProducts.length === 0 ? (
          <h1 className='heading text-alignment'>No product found</h1>
        ) : (
          filteredProducts?.map(product => {
            const isProductAddedToCart = cart?.find(
              cardProduct => cardProduct._id === product._id
            )
            const isProductAddToWishlist = wishlist?.find(
              wishlistProduct => wishlistProduct._id === product._id
            )

            return (
              <section className='products card' key={product._id}>
                <img
                  src={product.imageSrc}
                  alt='no found'
                  className='product__image cursor-pointer'
                  onClick={() => {
                    navigate(`/products/${_id}`)
                  }}
                />
                <p className='card-title'>{product.title}</p>
                <p className='card-rating'>{product.rating}</p>

                <div className='card-pricing-detail'>
                  <span className='card-price'>{product.price} &nbsp; </span>
                  <span className='card-price-mrp'>
                    <del>{product.priceMrp}</del>
                  </span>

                  <span className='card-disount'>
                    &nbsp; {discontInPercent(product.price, product.priceMrp)}%
                  </span>
                </div>
                <div className='product__button'>
                  {cart.length != 0 && isProductAddedToCart ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => navigate('/cart')}
                    >
                      View cart
                    </button>
                  ) : (
                    <button
                      className='btn btn-info'
                      onClick={() => {
                        addToCart(product, cartDispatch)
                      }}
                    >
                      add to cart{' '}
                    </button>
                  )}

                  {/* wishlist  */}
                  {wishlist.length != 0 && isProductAddToWishlist ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => navigate('/wishlist')}
                    >
                      View Wishlist
                    </button>
                  ) : (
                    <button
                      className='btn btn-success'
                      onClick={() => addToWishlist(product, wishlistDispatch)}
                    >
                      add to wishlist{' '}
                    </button>
                  )}
                </div>
              </section>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ProductList
