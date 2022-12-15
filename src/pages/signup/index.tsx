import { useContext, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { AuthContext } from "../../providers/user";

const Signup = () => {

  const { signUp} = useContext(AuthContext)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      terms_of_use: true
    }
    signUp(data)
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Bem Vindo</h1>
          <a href="/">
            <button type="button" className={styles.white_btn}>
              Login
            </button>
          </a>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Criar Conta</h1>
            <input
              type="text"
              placeholder="Primeiro Nome"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Ultimo Nome"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Telefone"
              name="telefone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Senha"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className={styles.input}
            />
            
            <button type="submit" className={styles.green_btn} onClick={handleSubmit}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
