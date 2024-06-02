import React from "react";
//Icons
import {
  FaHome,
  FaInfo,
  FaShoppingBag,
  FaStore,
  FaTimes,
  FaUserCog,
} from "react-icons/fa";

//components
import NavLinkButton from "../Button/NavLinkButton";
import { MdRestaurantMenu } from "react-icons/md";
import { GrContact, GrDocumentConfig } from "react-icons/gr";
import { Container, Content } from "./styles";
import { useAuthValue } from "../../context/AuthContext";

const MenuMobile = ({ active }) => {
  const closeMenu = () => {
   
    active(false);
  };

  const { user } = useAuthValue();



  return (
    <Container menumobile={active}>
      <FaTimes onClick={closeMenu} />
      {user && (
        <Content>
          <NavLinkButton Icon={FaHome} to="/" Text="Início" onClick={closeMenu} />
          <NavLinkButton
            Icon={MdRestaurantMenu}
            to="/menu"
            Text="Cardápio"
            onClick={closeMenu}
          />
          <NavLinkButton Icon={FaInfo} to="/about" Text="Sobre" onClick={closeMenu} />
          <NavLinkButton
            Icon={FaShoppingBag}
            to="/"
            Text="Meus Pedidos"
            onClick={closeMenu}
          />
          <NavLinkButton
            Icon={FaUserCog}
            to=""
            Text="Meus Dados"
            onClick={closeMenu}
          />
          <NavLinkButton
            Icon={GrContact}
            to="/contact"
            Text="Contato"
            onClick={closeMenu}
          />
          <NavLinkButton
            Icon={GrDocumentConfig}
            to="/admin/products"
            Text="Contato"
            onClick={closeMenu}
          />
     
        </Content>
      )}
      {!user && (
        <Content>
          <NavLinkButton Icon={FaHome} to="/" Text="Início" onClick={closeMenu} />
          <NavLinkButton
            Icon={MdRestaurantMenu}
            to="/menu"
            Text="Cardápio"
            onClick={closeMenu}
          />
          <NavLinkButton Icon={FaStore} to="/store" Text="Loja" onClick={closeMenu} />
          <NavLinkButton Icon={FaInfo} to="/about" Text="Sobre" onClick={closeMenu} />
          <NavLinkButton
            Icon={GrContact}
            to="/contact"
            Text="Contato"
            onClick={closeMenu}
          />
        </Content>
      )}
    </Container>
  );
};

export default MenuMobile;
