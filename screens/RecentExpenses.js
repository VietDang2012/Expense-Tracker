import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext, useEffect, useState } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpense } from "../util/http"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import ErrorOverlay from "../components/UI/ErrorOverlay"

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext)

    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true)
            try {
                const expenses = await fetchExpense()
                expensesCtx.setExpenses(expenses)
            } catch (error) {
                setError('Could not fetch data')
            }
            setIsFetching(false)
        }
        getExpenses()
    }, [])

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)
        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })

    function errorHandler() {
        setError(null)
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 days'
            fallbackText='No Expenses'
        />
    )
}

export default RecentExpenses