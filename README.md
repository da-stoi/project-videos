# Automatic Portfolio Videos

- [Project Page](https://daniel.stoiber.network/project/project-videos)

This is a simple project that makes use of [Remotion](https://www.remotion.dev/), a React framework for creating videos programmatically. It takes any project published on [my portfolio](https://daniel.stoiber.network) and renders a video of the project.

## Commands

### Install Dependencies

```console
yarn
```

### Start Preview

```console
yarn start
```

### Render videos

First, pick the project index in `src/Video.tsx` and then run:

*By default it will render my most recent project.*

**Desktop**
```console
yarn run buildDesktop
```
**Mobile**
```console
yarn run buildMobile
```
*Mobile rendering has some buggy alignment at the moment*

## Output

<!-- Lab Lister Section -->
<img src="https://da-stoi.github.io/portfolio-assets/project/lab-lister/icon.png" alt="Lab Lister Logo" width="50"/>

### Lab Lister

![Lab Lister Video](./assets/lab-lister.gif)

---

<!-- CovaxSF Section -->
<img src="https://da-stoi.github.io/portfolio-assets/project/covaxsf/icon.png" alt="CovaxSF Logo" width="50"/>

### CovaxSF

![CovaxSF Video](./assets/covaxsf.gif)

---

<!-- Smart Split Section -->
<img src="https://da-stoi.github.io/portfolio-assets/project/smart-split/icon.png" alt="Smart Split Logo" width="50"/>

### Smart Split

![Smart Split Video](./assets/smart-split.gif)