import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

const Contact = () => {
  const form = useRef();

  const abrirWhatsapp =(e) => {
    e.preventDefault()

    var url =
      "https://wa.me/5511993954214";
    window.open(url, "_blank").focus();
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_e6and6l", "template_avpk5ty", form.current, {
        publicKey: "lJyarKFpuRvaf2koK",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className={styles.contact}>
      <div className={styles.whatsApp}>
    <button onClick={abrirWhatsapp}>Enviar mensagem por WhatsApp</button>
      </div>
      <div className={styles.email}>
        <h3>Contato por E-mail</h3>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="name" />
          <label>Email</label>
          <input type="email" name="email" />
          <label>Message</label>
          <textarea name="message" />
          <button type="submit">ENVIAR </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
