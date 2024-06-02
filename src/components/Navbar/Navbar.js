import { React, useEffect, useState } from "react";
//CSS
import styles from "./Navbar.module.css";
//Images
import logo from "../../images/logo.png";
//Components
import NavLinkButton from "../Button/NavLinkButton";
import MenuMobile from "../MenuMobile/MenuMobile";
//Icons
import {
  FaBars,
  FaHome,
  FaInfo,
  FaLock,
  FaPen,
  FaShoppingCart,
  FaUnlock,
} from "react-icons/fa";
import { GrContact, GrDocumentConfig } from "react-icons/gr";
import { MdRestaurantMenu } from "react-icons/md";
//hook
import { useAuthentication } from "../../hooks/useAuthentication";
//context
import { useAuthValue } from "../../context/AuthContext";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const Navbar = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const showMenuMobile = () => setMenuMobile(!menuMobile);
  const [uid, setUid] = useState("");
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [qty, setQty] = useState(0);
 
  const [documents, setDocuments] =useState([])
 


  useEffect(() => {
    async function loadData() {

      const collectionRef = await collection(db, `Cart ${user.uid}`);
      try {
        let q;

       if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createAt", "desc"));
        }
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        
      } catch (error) {
        console.log(error);
 
        
      }
    }
    if (user) {
      setUid(user.uid);
      loadData()
    }
  }, [user, uid]);
  
  useEffect(() => {
    if (documents) {
      //getting the qty from Cart in a separate array
      const qtyProducts = documents.map((cartProduct) => {
        return cartProduct.qty;
      });
      // console.log(qty);

      //reducing the qty in a single value
      const reducerOfQty = (acc, currentValue) => acc + currentValue;
      setQty(qtyProducts.reduce(reducerOfQty, 0));
    } 
  }, [documents]);

  return (
    <div className={styles.navbar}>
      {user && (
        <>
          <div className={styles.mobile}>
            <FaBars className={styles.faBars} onClick={showMenuMobile} />
            {menuMobile && <MenuMobile active={setMenuMobile} />}
          </div>
          <div className={styles.brand}>
            <img src={logo} alt="logo" className={styles.brand} />
          </div>

          <div className={styles.links}>
            <ul>
              <li>
                <NavLinkButton Icon={FaHome} to="/" Text="Início" />
              </li>
              <li>
                <NavLinkButton
                  Icon={MdRestaurantMenu}
                  to="/menu"
                  Text="Cardápio"
                />
              </li>
              <li>
                <NavLinkButton Icon={FaInfo} to="/about" Text="Sobre" />
              </li>

              <li>
                <NavLinkButton Icon={GrContact} to="/contact" Text="Contato" />
              </li>
            </ul>
          </div>

          <div className={styles.link_list}>
            {user.displayName}
            <li className={styles.cart}>
              <NavLinkButton
                Icon={FaShoppingCart}
                Text={qty}
                to={`/cart/Cart ${uid}`}
              />
            </li>
            <li>
              <NavLinkButton
                onClick={logout}
                to="/"
                Icon={FaUnlock}
                Text="Logout"
                className={styles.siderbaritem}
              ></NavLinkButton>
            </li>
          </div>
        </>
      )}

      {!user && (
        <>
          <div className={styles.mobile}>
            <FaBars className={styles.faBars} onClick={showMenuMobile} />
            {menuMobile && <MenuMobile active={setMenuMobile} />}
          </div>
          <div>
            <img src={logo} alt="logo" className={styles.brand} />
          </div>

          <div className={styles.links}>
            <ul>
              <NavLinkButton
                Icon={GrDocumentConfig}
                to="/admin/products"
                Text="Contato"
              />
              <li>
                <NavLinkButton Icon={FaHome} to="/" Text="Início" />
              </li>
              <li>
                <NavLinkButton
                  Icon={MdRestaurantMenu}
                  to="/menu"
                  Text="Cardápio"
                />
              </li>
              <li>
                <NavLinkButton Icon={FaInfo} to="/about" Text="Sobre" />
              </li>
            </ul>
          </div>

          <div className={styles.link_list}>
            <li>
              <NavLinkButton
                to="/login"
                Icon={FaLock}
                Text="Login"
              ></NavLinkButton>
            </li>
            <li>
              <NavLinkButton
                to="/register"
                Icon={FaPen}
                Text="Cadastre-se"
              ></NavLinkButton>
            </li>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
