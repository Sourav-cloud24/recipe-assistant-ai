import Image from "next/image";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-green-950 md:flex-row">
      <div className="relative h-56 w-full shrink-0 overflow-hidden md:min-h-screen md:w-1/2">
        <Image
          src="/Images/login_image.png"
          alt="Fresh ingredients ready for cooking"
          fill
          priority
          className="object-contain p-2.5"
        />
      </div>
      <div className="flex flex-1 items-center justify-center p-8">
        {children}
      </div>
    </main>
  );
}