import { Transferprops } from '@/types'
import { useMutation } from '@tanstack/react-query'

interface TransferData {
    data: Transferprops
}
const useTransfer = () => {
  const createTransferMutation = useMutation({
    mutationFn: async({data}: TransferData) => {

    }
  })
}

export default useTransfer