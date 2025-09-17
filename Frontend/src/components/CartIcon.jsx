import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

function CartIcon() {
  const { items } = useSelector((state) => state.cart);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // useEffect(() => {
  //   console.log("CartIcon items updated:", items);
  // }, [items]);

  return (
    <NavLink to="/customer/cart" className="relative text-amber-900 hover:text-gray-900">
      <ShoppingCart className="w-6 h-6" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {totalQuantity}
        </span>
      )}
    </NavLink>
  );
}

export default CartIcon;