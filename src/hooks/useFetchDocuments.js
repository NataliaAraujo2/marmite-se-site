import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const useFetchDocuments = (docCollection, uid = null, state=null, branchName=null, product=null) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);
      const collectionRef = await collection(db, docCollection);

      try {
        let q;

       if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createAt", "desc")
          );
        } else if(state) {
          q = await query(
            collectionRef,
            where("state", "==", state),
            orderBy("createAt", "desc")
          );
        } else if(branchName){
          q = await query(
            collectionRef,
            where("branchName", "==", branchName),
            orderBy("createAt", "desc")
          );
        }else if(product) {
            q = await query(
            collectionRef,
            where("id", "==", product),
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

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, uid, cancelled, branchName, product, state]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
