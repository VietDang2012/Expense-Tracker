import { useContext, useLayoutEffect, useState } from "react"
import { View, StyleSheet } from "react-native"


import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expenses-context"
import IconButton from "../components/UI/IconButton"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import { deleteExpense, storeExpense, updateExpense } from "../util/http"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import ErrorOverlay from "../components/UI/ErrorOverlay"

const { colors } = GlobalStyles

function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState()

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack()
        } catch (error) {
            setError('Could not delete data - try again')
            setIsSubmitting(false)
        }
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData)
                expensesCtx.addExpense({ ...expenseData, id: id })
            }
            navigation.goBack()
        } catch (error) {
            setError('Could not take any action - try again')
            setIsSubmitting(false)
        }
    }

    function errorHandler() {
        setError(null)
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon='trash'
                        size={32}
                        color={colors.error500}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: colors.primary200,
        alignItems: 'center'
    }
})