# Highlights

## Demo: [https://gmb-eng-values.vercel.app](https://gmb-eng-values.vercel.app/)

### I am particuarly proud of the hooks patterns `useModal()` and `useIntersectionObserver()`

- **_hide complexity_** of refs, state, and effects inside the hook
- allow _overriding defaults_ via an _options_ arg

> The `useModal()` hook is especially exciting, because it returns both an **actions object** and a **component that accepts children**.

**This allows flexible cases where actions defined in the caller can be passed to arbitary modal content**.

See the implementation of the `<IntroTextAnimation />` in `/src/index` as an example.

![othertech-used](/public/tech-used.png)
