import { Button } from "@nextui-org/react";
import { logoutAction } from "../actions/auth-actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit">
        Logout
      </Button>
    </form>
  );
}
