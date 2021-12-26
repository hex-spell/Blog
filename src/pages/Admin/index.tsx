import React, { useState } from "react";
import { CenteredContainer, Card, Input, Button } from "components";
import styled from "styled-components";
import { Auth } from "aws-amplify";

const LoginBox = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  max-width: 70%;
`;
//@ts-ignore
window.Auth = Auth;

async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const user = await Auth.signIn(username, password);
    //@ts-ignore
    window.user = user;
    //@ts-ignore
    window.Auth = Auth;
    console.log(user);
    const currentSession = await Auth.currentSession();
    console.log(currentSession)
    let accessToken = currentSession.getAccessToken();
    let jwt = accessToken.getJwtToken();
    console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
    console.log(`myJwt: ${jwt}`);
  } catch (error) {
    console.log("error signing in", error);
  }
}

export const Admin: React.FC = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const onClickSignIn = () => signIn(formState);
  return (
    <CenteredContainer>
      <LoginBox>
        <Input
          placeholder="Username"
          name="username"
          onChange={onChangeInput}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          onChange={onChangeInput}
        />
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button onClick={onClickSignIn}>Sign in</Button>
        </div>
      </LoginBox>
    </CenteredContainer>
  );
};
