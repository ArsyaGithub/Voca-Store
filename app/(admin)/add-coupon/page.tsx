
import { getCoupon} from "@/lib/api/Coupun"
import CouponTable from "@/components/CouponTable"

export default async function AdminCouponPage() {
  const coupons = await getCoupon()
  return (
    <CouponTable coupons={coupons} />
  )
}