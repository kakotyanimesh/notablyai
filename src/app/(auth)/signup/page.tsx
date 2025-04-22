import AuthForm from "../../components/authForm";

export default function SignupPage(){
    return (
        <div className="space-y-5">
            <div className="text-start ">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-sm text-slate-800">Enter your email and password to create your account</p>
            </div>
            <AuthForm authTypes="signup"/>
        </div>
    )
}