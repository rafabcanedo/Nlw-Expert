import { ButtonLinkProps } from "@/@types/types"
import { Link } from "expo-router"

export function LinkButton({title, ...rest}: ButtonLinkProps) {
 return (
  <Link
   className="text-slate-300 text-center text-base font-body"
   {...rest}
  >
   {title}
  </Link>
 )
}