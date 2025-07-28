import AuthForm from "../../components/authForm";

export default function Signin(){
    return (
            <div className="space-y-5">
                <div>
                    <h1 className="text-2xl text-start font-bold">Sign In</h1>
                    <p className="text-slate-600 text-start text-sm">Enter your email and password to access your notes</p>
                </div>
                <AuthForm authTypes="login"/>
                <div className="absolute bottom-2 right-0 bg-pink-700/80 rounded-l-2xl animate-pulse px-5 text-white py-2">
                    <h1 className="text-xs">Please confirm your email address if you have not done it yet</h1>
                </div>
            </div>
    )
}