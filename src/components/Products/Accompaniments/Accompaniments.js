import {useState } from "react";
import styles from "./Accompaniments.module.css";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

const Accompaniments = ({
  accompaniments,
  handleChangeAccompaniments,
  handleIncreaseQtyAccompaniments,
  handleDecreaseQtyAccompaniments,
  disabled,
}) => {
  const [qty, setQty] = useState("");
  const [add, setAdd] = useState(false);

  const handleChecked = (event) => {
    const { checked } = event.target;

    if (checked) {
      setQty(1);
      setAdd(true);
      handleIncreaseQtyAccompaniments(accompaniments.name);
      handleDecreaseQtyAccompaniments(accompaniments.name);
    }

    if (!checked) {
      setQty(0);
    }
  };

  const accompanimentIncrease = () => {
    const totalQty = qty + 1;

    if (totalQty < 4) {
      try {
        setQty(totalQty);
      } catch (error) {
        console.log(error);
      }
    }
    handleIncreaseQtyAccompaniments(accompaniments.name);
  };

  const accompanimentDecrease = () => {
    const totalQty = qty - 1;
   if (totalQty > -1) {
    try {
      setQty(totalQty);
    } catch (error) {
      console.log(error);
    }
   }

    handleDecreaseQtyAccompaniments(accompaniments.name);
  };

  return (
    <div className={styles.accompaniments}>
      <div className={styles.product}>
        <input
          type="checkbox"
          key={accompaniments.name}
          id={accompaniments.id}
          onClick={handleChecked}
          onChange={handleChangeAccompaniments}
          value={accompaniments.name}
          disabled={disabled}
        />
        <p>{accompaniments.name}</p>
      </div>
      {add && (
        <div className={styles.add}>
          <button onClick={accompanimentIncrease}>
            {" "}
            <FaCirclePlus />
          </button>
          <span>{qty}</span>
          <button onClick={accompanimentDecrease}>
            <FaCircleMinus />
          </button>
        </div>
      )}
    </div>
  );
};

export default Accompaniments;
