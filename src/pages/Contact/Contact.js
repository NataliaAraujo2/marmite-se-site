import React, { useState } from 'react';
import styles from "./Contact.module.css"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Aqui você pode implementar o envio dos dados para o backend
    };

    return (
        <div className={styles.contact}>
            <h1>Entre em Contato</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    E-mail:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Mensagem:
                    <textarea name="message" value={formData.message} onChange={handleChange} />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Contact;