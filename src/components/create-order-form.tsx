import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCreateOrder} from "@/hooks/useCreateOrder.tsx";
import {IOrder, IProduct} from "@/types";
import {useForm, SubmitHandler } from "react-hook-form";
import Loader from "../../components/ui/Loader.tsx";
import {useNotification} from "@/components/ui/notification-modal.tsx";

interface IFormInput {
    name?: string
    address?: string
    number: string
}

interface ICreateOrderForm {
    deliveryEnabled: boolean
    items: IProduct[]
    clearCart: () => void
}

const CreateOrderForm = ({deliveryEnabled, items, clearCart}: ICreateOrderForm) => {

    const { mutate, isPending } = useCreateOrder();
    const notification = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()


    const onSubmit: SubmitHandler<IFormInput> = async (data: Pick<IOrder , "name" | "address" | "number">) =>{
        const {name, address, number} = data;
        const order: IOrder = {
            name,
            address,
            number: String(number),
            withCurer: deliveryEnabled,
            MyOrder: items,
        }

         mutate(order, {
             onSuccess: () => {
                 clearCart()
                 window.scroll(0,0)
                 notification.success('Ваш заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.', 'Заказ принят')
             },
             onError: (error) => {
                 notification.error(error.message || 'Произошла ошибка при оформлении заказа. Попробуйте ещё раз.')
             }
         })
    }


    return (
        <div className='mt-2 min-h-[200px] relative'>
            {isPending ? <Loader/> :
                <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit) }>
                    <Input type='text' placeholder='ФИО'  {...register("name", {required: true})} maxLength={40} />
                    <Input  type='text' placeholder='Адрес (если указали доставку)'  {...register("address")} maxLength={30}/>
                    <Input  type='number' placeholder='Номер телефона'  {...register("number",{required:true, minLength:9,})} maxLength={9} />

                    <Button type='submit' className="mt-4 p-2 h-12 w-full text-base sm:mt-6 sm:h-auto sm:text-sm" size="sm">
                        Оформить заказ
                    </Button>
                </form>
            }
        </div>
    );
}

export default CreateOrderForm;