import SignIn from "@/features/auth/components/SignIn";
import AuthLayout from "./layout/AuthLayout";

export default function Home() {
  return (
    <AuthLayout>
      <SignIn/>
    </AuthLayout>
  );
}
