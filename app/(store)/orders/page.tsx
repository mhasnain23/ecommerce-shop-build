import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const OrderPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const order = await getMyOrders(userId);

  return <div></div>;
};

export default OrderPage;
