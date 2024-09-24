import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const LogOutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing out:", error);
    } else {
      router.push("/login");
      router.refresh();
    }
  };
  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
    >
      Log out
    </Button>
  );
};

export default LogOutButton;
