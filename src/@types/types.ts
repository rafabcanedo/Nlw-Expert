import { LinkProps } from 'expo-router'
import { ReactNode } from 'react'
import { ImageProps, PressableProps, TouchableOpacityProps } from 'react-native'

export type HeaderProps = {
 title: string
 cartQuantity?: number
}

export type CategoryProps = PressableProps & {
 title: string
 isSelected?: boolean
}

export type ProductDataProps = {
 title: string
 description: string
 thumbnail: ImageProps
}

export type ProductProps = TouchableOpacityProps & {
 data: ProductDataProps
}

export type ButtonProps = TouchableOpacityProps & {
 children: ReactNode
}

export type ButtonTextProps = {
 children: ReactNode
}

export type ButtonIconProps = {
 children: ReactNode
}

export type ButtonLinkProps = LinkProps<string> & {
 title: string
}