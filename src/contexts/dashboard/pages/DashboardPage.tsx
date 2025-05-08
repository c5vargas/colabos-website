import { useUser, SignOutButton } from "@clerk/clerk-react";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Bienvenido, {user?.firstName}!</h1>
      <SignOutButton />
    </div>
  );
}
