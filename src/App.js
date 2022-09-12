import "./styles.css";
import Theme from "./Theme";
import { UserProvider } from "./UserContext";
import Container from "./Container";

export default function App() {
  return (
    <>
      <UserProvider>
        <Theme />
        <Container />
      </UserProvider>
    </>
  );
}
