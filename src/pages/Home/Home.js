//services
import React, { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
//CSS
import styles from "./Home.module.css";
//components
import ProductTypeCard from "../../components/ProductType/ProductTypeCard";
import Modal from "../../components/Modal/Modal";
//images
import modalHome from "../../images/modalHome.jpg";

const Home = () => {
  const [openModal, setOpenModal] = useState(true);
  const { documents: branchs, loading } = useFetchDocuments("branchs");

  return (
    <div className={styles.home}>
      <Modal
        isOpen={openModal}
        src={modalHome}
        setModalOpen={() => setOpenModal(!openModal)}
      />

      {loading && <p>Carregando...</p>}
      {branchs && branchs.length === 0 && (
        <div>
          <p>Não foram encontrados serviços!</p>
        </div>
      )}

      {branchs &&
        branchs.map((branch) => (
          <ProductTypeCard
            image={branch.url}
            Title={branch.branchName}
            feature={branch.features}
            to={`/store/${branch.branchName}`}
          />
        ))}

     
    </div>
  );
};

export default Home;
