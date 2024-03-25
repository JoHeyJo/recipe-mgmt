import { PillButton } from "./common/PillButton";

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