import React from 'react'
import CardWrapper from './card-wrapper'

export const LoginForm   = () => {
  return (
    <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Dont ahve an account?"
        backButtonHref="/auth/register"
        showSocial
    >
        Login Form
    </CardWrapper>
  )
}
