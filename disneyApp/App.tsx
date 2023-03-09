import {StyleSheet} from 'react-native';
import Navigation from "./src/components/screens/Navigation";

export default function App() {
    return (
        <Navigation/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
