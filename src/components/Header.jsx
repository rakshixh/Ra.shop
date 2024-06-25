import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "../css/header.module.css";
import { FaUser } from "react-icons/fa";
import { Stack, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Turn as Hamburger } from "hamburger-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get cart items from local storage to display the count on cart icon badge
  const CartItemsJSON = localStorage.getItem("CartItems");
  const CartItems = JSON.parse(CartItemsJSON) || [];
  const CartItemsLength = CartItems.length;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={HeaderCSS.header}>
        <div>
          <Link to="/home" className={HeaderCSS.logotext}>
            Ra.Shop
          </Link>
        </div>
        <div className={HeaderCSS.menuIcon}>
          <Hamburger direction="right" toggled={menuOpen} toggle={toggleMenu} />
        </div>
        <ul
          className={`${HeaderCSS.ulist} ${menuOpen ? HeaderCSS.menuOpen : ""}`}
        >
          <li className={HeaderCSS.list}>
            <Link to="/home" className={HeaderCSS.atag}>
              Home
            </Link>
          </li>
          <li className={HeaderCSS.list}>
            <Link to="/wishlists" className={HeaderCSS.atag}>
              Wishlist
            </Link>
          </li>
          <li className={HeaderCSS.list}>
            <Link to="/login" className={HeaderCSS.atag}>
              <FaUser className={HeaderCSS.register_icon} />
            </Link>
          </li>
          <li className={HeaderCSS.list}>
            <Link to="/cart" className={HeaderCSS.atag}>
              <Stack spacing={2} direction="row">
                <Badge badgeContent={CartItemsLength} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </Stack>
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
