import { View, StyleSheet, Text } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"

const { colors } = GlobalStyles

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 40
    }
})