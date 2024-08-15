import { PillButton } from "./views/ui/common/PillButton";

type Navigation = {
  logout: () => void;
}

function Navigation({ logout }: Navigation) {
  return (
    <>
      <button onClick={logout} type="button">Logout</button>
    </>
  )
}

export default Navigation;