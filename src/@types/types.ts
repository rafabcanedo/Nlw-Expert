import { PressableProps } from 'react-native'

export type HeaderProps = {
 title: string
 cartQuantity?: number
}

export type CategoryProps = PressableProps & {
 title: string
 isSelected?: boolean
}