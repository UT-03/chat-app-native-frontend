import { StyleSheet, Text, TextInput, View } from 'react-native';

import GlobalStyles from '../Constants/style/GlobalStyles';

function Input({ label, invalid, style, textInputConfig }) {

    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 16,
        color: GlobalStyles.colors.primary500,
        marginBottom: 4,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary500,
        color: GlobalStyles.colors.primary900,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});
