import { ActivityIndicator, StyleSheet, View } from 'react-native';
import GlobalStyles from '../Constants/style/GlobalStyles';

const ActivityIndicatorComponent = () => {
    return (
        <View style={styles.rootContainer}>
            <ActivityIndicator
                color={GlobalStyles.colors.primary500}
                size="large" />
        </View>
    );
};

export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary100
    }
})