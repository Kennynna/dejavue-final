import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {ReactNode} from "react";

const queryClient = new QueryClient()

interface Query {
    children: ReactNode;
}

const TanstackProvider = ({ children}: Query) => {


    return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
}

export default TanstackProvider