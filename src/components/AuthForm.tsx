'use client'

import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CardContent, CardFooter } from "./ui/card"
import { Label } from "./ui/label"
import { useTransition } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { loginAction, signupAction } from "@/actions/users"

type Props = {
    type: 'login' | 'signup'
}
const AuthForm = ({ type }: Props) => {
    const isLoginForm = type === 'login'
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            let errorMessage
            let title
            let description
            if (isLoginForm) {
                errorMessage = (await (await loginAction(email, password)).errorMessage)
                title = 'logged in'
                description = 'you have been successfully logged in'
            } else {
                errorMessage = (await (await signupAction(email, password)).errorMessage)
            }
            if (!errorMessage) {
                console.log('success')
                // Toast({title,description,  variant: 'success'})
                router.replace('/')
            } else {
                console.log('error')
                // toast({title:'error', description:errorMessage, variant:'destructive'})
            }
        })
    }
    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">email</Label>
                    <input id="email" name='email' placeholder="enter your email" type="email" disabled={isPending}></input>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">password</Label>
                    <input id="password" name='password' placeholder="enter your password" type="password" disabled={isPending}></input>
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-6">
                {/* <Button className="w-full">
                    {isPending ? (<Loader2 className="animate-spin"></Loader2>) : isLoginForm ? ('login') : ('signup')}
                </Button>
                <p className="text-xs">
                    {isLoginForm ? "don't have an account" : 'already have an account'}
                    <Link href={isLoginForm ? '/sign-up' : '/login'} className="`text-blue-500 underline ${isPending ? 'pointer-events-none opacity-50 : ''}">
                        {isLoginForm ? 'signup' : 'login'}</Link>
                </p> */}
                <Button className="w-full">
                    {isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : isLoginForm ? (
                        "Login"
                    ) : (
                        "Sign Up"
                    )}
                </Button>
                <p className="text-xs">
                    {isLoginForm
                        ? "Don't have an account yet?"
                        : "Already have an account?"}{" "}
                    <Link
                        href={isLoginForm ? "/sign-up" : "/login"}
                        className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
                    >
                        {isLoginForm ? "Sign Up" : "Login"}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm








// "use client";

// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { CardContent, CardFooter } from "./ui/card";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { useTransition } from "react";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import { loginAction, signupAction } from "@/actions/users";

// type Props = {
//     type: "login" | "signUp";
// };

// function AuthForm({ type }: Props) {
//     const isLoginForm = type === "login";

//     const router = useRouter();
//     const { toast } = useToast();

//     const [isPending, startTransition] = useTransition();

//     const handleSubmit = (formData: FormData) => {
//         startTransition(async () => {
//             const email = formData.get("email") as string;
//             const password = formData.get("password") as string;

//             let errorMessage;
//             if (isLoginForm) {
//                 errorMessage = (await loginAction(email, password)).errorMessage;
//             } else {
//                 errorMessage = (await signupAction(email, password)).errorMessage;
//             }

//             if (!errorMessage) {
//                 router.replace(`/?toastType=${type}`);
//             } else {
//                 toast({
//                     title: "Error",
//                     description: errorMessage,
//                     variant: "destructive",
//                 });
//             }
//         });
//     };

//     return (
//         <form action={handleSubmit}>
//             <CardContent className="grid w-full items-center gap-4">
//                 <div className="flex flex-col space-y-1.5">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                         id="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         type="email"
//                         required
//                         disabled={isPending}
//                     />
//                 </div>
//                 <div className="flex flex-col space-y-1.5">
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                         id="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         type="password"
//                         required
//                         disabled={isPending}
//                     />
//                 </div>
//             </CardContent>
//             <CardFooter className="mt-4 flex flex-col gap-6">
//                 <Button className="w-full">
//                     {isPending ? (
//                         <Loader2 className="animate-spin" />
//                     ) : isLoginForm ? (
//                         "Login"
//                     ) : (
//                         "Sign Up"
//                     )}
//                 </Button>
//                 <p className="text-xs">
//                     {isLoginForm
//                         ? "Don't have an account yet?"
//                         : "Already have an account?"}{" "}
//                     <Link
//                         href={isLoginForm ? "/sign-up" : "/login"}
//                         className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
//                     >
//                         {isLoginForm ? "Sign Up" : "Login"}
//                     </Link>
//                 </p>
//             </CardFooter>
//         </form>
//     );
// }

// export default AuthForm;