import { auth } from "@/auth";
import { ThemeToggle } from "@/components/global/mode-toggle";
import SignInForm from "@/modules/auth/components/sign-in-component";
// import SignUpForm from "@/modules/auth/components/sign-up-component";

export default async function Page() {
  const session = await auth();
  return (
    <div className="flex h-screen items-center justify-center w-screen gap-3">
      <ThemeToggle />
      {/* <SignUpForm type="modal" modalLabel="icon" /> */}
      <SignInForm type="modal" modalLabel="icon" session={session} authenticated="user-button" />
    </div>
  )
}