import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => <SignUp routing="path" path="/sign-in" fallbackRedirectUrl="/app" />

export default SignUpPage
