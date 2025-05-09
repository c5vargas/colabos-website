import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => <SignIn routing="path" path="/auth/sign-in" fallbackRedirectUrl="/app" />;

export default SignInPage;
