import { ChangeEvent, FormEvent, useState } from "react";
import {
  LoginContainer,
  FormContainer,
  FormContainerH1,
  GreenBtn,
  Input,
  Left,
  LoginFormContainer,
  Right,
  WhiteBtn
} from "./styles";

import { useAuth } from "../../providers/user";
import { useNavigate } from "react-router-dom";

interface IAuth {
  password: string;
  email: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn, signOut, isLogged } = useAuth();

  const navigate = useNavigate()

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth: IAuth = {
      email: email,
      password: password,
    };

    signIn(auth);
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <Left>
          <FormContainer onSubmit={handleSubmit}>
            <FormContainerH1>Faça Login Para Acessar</FormContainerH1>
            <Input
              placeholder="Email"
              name="email"
              onChange={changeEmail}
              value={email}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              onChange={changePassword}
              value={password}
              required
            />
            <WhiteBtn type="submit">Login</WhiteBtn>
          </FormContainer>
        </Left>
        <Right>
          <h1 style={{color: "white"}}>Novo Aqui?</h1>
          <GreenBtn type="button" onClick={() => navigate("/signup")}>Registrar</GreenBtn>
        </Right>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
