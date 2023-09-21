import { DeviceOptions } from "./interface"
export const MOBILE_WIDTH = 640
export const TABLET_WIDTH = 1024
export const LAPTOP_WIDTH = 1200

export const determineDevice = (width: number): DeviceOptions => {
  if (width < MOBILE_WIDTH) {
    return 'mobile'
  } else if (width < TABLET_WIDTH) {
    return 'tablet'
  } else if (width < LAPTOP_WIDTH) {
    return 'laptop'
  } else {
    return 'desktop'
  }
}

export const initWidth = window.innerWidth
