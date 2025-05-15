import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => (
  <SignIn
    routing="path"
    path="/auth/sign-in"
    signUpUrl="/auth/sign-up"
    fallbackRedirectUrl="/app"
  />
);

export default SignInPage;
