import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <SignUp
    routing="path"
    path="/auth/sign-up"
    signInUrl="/auth/sign-in"
    fallbackRedirectUrl="/app"
  />
);

export default SignUpPage;
