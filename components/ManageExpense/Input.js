import { Text, TextInput, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const { colors } = GlobalStyles

function Input({ label, textInputConfig, style, invalid }) {
    const inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 12
    },
    label: {
        fontSize: 16,
        color: colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: colors.primary100,
        color: colors.primary700,
        padding: 8,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: colors.error500
    },
    invalidInput: {
        backgroundColor: colors.error50
    }
})