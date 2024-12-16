import React from 'react'

import { logoutUser } from "app/api/auth";
import GenericButton from "app/components/button";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, isAuthorized } from 'app/auth/auth';
import styled from '@emotion/styled';
import BigText from 'app/components/bigText';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

const LoginInfo = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export default function UserInfoAndActions() {
  const nav = useNavigate()

  if (isAuthorized()) {
    return <Container>
      <LoginInfo>
        <span>Logged in as:</span>
        {getUserData()?.displayedUsername}
      </LoginInfo>
      <GenericButton className='rounded' onClick={logoutUser(nav)}><BigText>Logout</BigText></GenericButton>
    </Container>
  } else {
    return <Container>
      <GenericButton className='rounded' onClick={() => nav('login')}><BigText>Login</BigText></GenericButton>
      <GenericButton className='rounded' onClick={() => nav('signin')}><BigText>Register</BigText></GenericButton>
    </Container>
  }


}
