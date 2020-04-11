import { spring } from "react-motion"

// child matches will...
export const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
        opacity: 0,
        translateX: 100,
    },
    // leave in a transparent, downscaled state
    atLeave: {
        opacity: bounce(0),
        translateX: bounce(-100),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
        opacity: bounce(1),
        translateX: bounce(0),
    },
}

// we need to map the `scale` prop we define below
// to the transform style property
export function mapStyles(styles: any) {
    return {
        opacity: styles.opacity,
        transform: `translateX(${styles.translateX}%)`,
    }
}

export function bounce(val: number) {
    return spring(val, {
        stiffness: 180,
        damping: 17,
    })
}
