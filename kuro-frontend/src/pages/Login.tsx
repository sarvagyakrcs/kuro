import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen" >
      <nav className="absolute top-0 left-0 w-full h-16 border-b border-white/10 backdrop-blur-sm z-10 flex items-center justify-between px-4">
        <div className="flex items-center justify-between px-4">
          <a className="text-lg" href="/">{"Kuro".toLocaleUpperCase()}</a>
        </div>
        <div className="flex items-center justify-between px-4">
          <Link to="/signup">
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </div>
      </nav>
      <div className="absolute inset-0 w-full h-full bg-black opacity-50 z-0"></div>
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 w-full max-w-md px-8 py-10">
        <LoginForm />
      </div>
    </div>
  )
}
