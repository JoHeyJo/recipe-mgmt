import { PillButtonSubmit } from "./ui/PillButtonSubmit";

type Navigation = {
  logout: () => void;
};

function Navigation({ logout }: Navigation) {
  return (
    <>
      <button onClick={logout} type="button">
        Logout
      </button>
    </>
  );
}

export default Navigation;
