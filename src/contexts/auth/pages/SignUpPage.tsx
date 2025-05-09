import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => <SignUp routing="path" path="/auth/sign-up" fallbackRedirectUrl="/app" />;

export default SignUpPage;
