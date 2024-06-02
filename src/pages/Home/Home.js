//services
import React, { useEffect, useState } from "react";
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
  const state = "ATIVO";
  const { documents: branchs, loading } = useFetchDocuments("branchs", null, state);
  const [existBranch, setExistBranch] = useState([])

  useEffect(() => {
    function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    if (branchs) {
      const sortBranchsName = branchs.sort(compare);
      setExistBranch(sortBranchsName);
    }

  }, [branchs]);
  
   

  

  return (
    <div className={styles.home}>
      <Modal
        isOpen={openModal}
        src={modalHome}
        setModalOpen={() => setOpenModal(!openModal)}
      />

      {loading && <p>Carregando...</p>}
      {existBranch && existBranch.length === 0 && (
        <div>
          <p>Não foram encontrados serviços!</p>
        </div>
      )}

      {existBranch &&
        existBranch.map((branch) => (
          <ProductTypeCard
            image={branch.url}
            Title={branch.name}
            feature={branch.features}
            to={`/store/${branch.name}`}
          />
        ))}

     
    </div>
  );
};

export default Home;
