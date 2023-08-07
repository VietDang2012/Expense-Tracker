import { FlatList, StyleSheet, View } from "react-native"
import ExpenseItem from "./ExpenseItem"

function ExpensesList({ expenses }) {
    function renderExpenseItem(itemData) {
        return (
            <ExpenseItem {...itemData.item} />
        )
    }
    return (
        <>
            <View style={styles.space}></View>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={renderExpenseItem}
            />
        </>
    )
}

export default ExpensesList

const styles = StyleSheet.create({
    space: {
        margin: 8
    }
})