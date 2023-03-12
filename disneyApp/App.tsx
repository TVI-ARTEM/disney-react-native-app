import Navigation from "./src/components/screens/Navigation";
import {UserContextProvider} from "./src/providers/UserProvider";

export default function App() {
    return (
        <UserContextProvider>
            <Navigation/>
        </UserContextProvider>
    );
}

