


<!-- ABOUT THE PROJECT -->

## About The Project
This is a simple clone of gmail andriod mobile application built with react native. The aim of this project is to make an attempt use react native to implement some of the app features such as 'swiping an email to archive it', 'animating a component when an email is selected', 'custom drawer contents' and many more.

## Feautures

- [X] Users can swipe emails to archive it
- [X] Emails snippets is animated back in when undo is clicked
- [X] Email can be selected by long pressing
- [X] Lottied animation files

## Todo
- [ ] When an email is opened users can view the next email by swipping left or right
- [ ] Selected emails can be deselected when the back button is pressed
- [ ] Add buttom sheet component to the MEET screen without using any NPM packages
-[ ] Animate primary header when search bar is clicked

## Issues
- On the 'Email' screen, if we scroll continuously in oposite directions without lifting our finger, the PrimaryHeader component does not appear. Here's why.

In other for the primary header component to be visible when we scroll down from any where in the screen we need to clamp the animated value between a lowerbound and upperbound. This can be achieved using diffclamp ( [official react native docs](https://reactnative.dev/docs/animated#diffclamp))

For unknown reasons diffclamp from reanimated 2 crashes the app so the function below is used to as advice [here](https://stackoverflow.com/questions/68380161/how-to-use-diffclamp-in-reanimated-2). 

```js
   const clamp = (value, lowerBound, upperBound) => {
        "worklet";
        return Math.min(Math.max(lowerBound, value), upperBound);
      };
```
For the function above to work the lowerbound is dependent on the scrollView content offset as seen below which is gotten as soon as the scroll starts and stored in a context. ([More on context](https://docs.swmansion.com/react-native-reanimated/docs/events#using-context))

```js
     const scrollhandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            const diff = event.contentOffset.y - ctx.prevY;
            translateY.value = clamp(translateY.value + diff, 0, 70);

            FABwidth.value = event.contentOffset.y
    
        },
        onBeginDrag: (event, ctx) => {
            ctx.prevY = event.contentOffset.y;
        },

        
    })
```

If we change directions while scrolling without lifting our hand, the onBeginDrag event is not fired therefore lowerBound value is not changed so the Primary header component does not show. But if we lift our hand before changing direction, lowerbound value is changed because 'onBeginDrag' event is fired.

## Helpful videos and articles:




### Built With

* [React Native](https://reactnative.dev/)
* [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
* [Expo](https://docs.expo.dev/)



<!-- GETTING STARTED -->
## Getting Started
This app was build primarily with expo, it is an attempt to implement some of gmail's andriod app with react native. Animations are done with reanimated 2, to improve performance


### Prerequisites

You should have expo and react native cli installed globally
* npm
  ```sh
  npm install expo-cli -g 
  ```
  ```sh
  npm install react-native-cli -g 
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/uwemneku/Banking-App-Clone-react-native
   ```
2. Install NPM packages
   ```sh
   Yarn install
   ```
3. Start the app on expo
   ```sh
   expo start
   ```





4. Fork the Project
5. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
6. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the Branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Your Name - [uwemneku](https://twitter.com/uwemneku) - uwemneku@gmail.com










<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/uwemneku/Banking-App-Clone-react-native/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://www.linkedin.com/in/uwemisrael/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: screenshots/1.jpg
[product-screenshot1]: screenshots/2.jpg



<!-- ABOUT THE PROJECT -->

## About The Project
This is a simple clone of gmail andriod mobile application built with react native. The aim of this project is to make an attempt use react native to implement some of the app features such as 'swiping an email to archive it', 'animating a component when an email is selected', 'custom drawer contents' and many more.

## Feautures

- [X] Users can swipe emails to archive it
- [X] Emails snippets is animated back in when undo is clicked
- [X] Email can be selected by long pressing
- [X] Lottied animation files

## Todo
- [ ] When an email is opened users can view the next email by swipping left or right
- [ ] Selected emails can be deselected when the back button is pressed
- [ ] Add buttom sheet component to the MEET screen without using any NPM packages
-[ ] Animate primary header when search bar is clicked

## Issues
- On the 'Email' screen, if we scroll continuously in oposite directions without lifting our finger, the PrimaryHeader component does not appear. Here's why.

In other for the primary header component to be visible when we scroll down from any where in the screen we need to clamp the animated value between a lowerbound and upperbound. This can be achieved using diffclamp ( [official react native docs](https://reactnative.dev/docs/animated#diffclamp))

For unknown reasons diffclamp from reanimated 2 crashes the app so the function below is used to as advice [here](https://stackoverflow.com/questions/68380161/how-to-use-diffclamp-in-reanimated-2). 

```js
   const clamp = (value, lowerBound, upperBound) => {
        "worklet";
        return Math.min(Math.max(lowerBound, value), upperBound);
      };
```
For the function above to work the lowerbound is dependent on the scrollView content offset as seen below which is gotten as soon as the scroll starts and stored in a context. ([More on context](https://docs.swmansion.com/react-native-reanimated/docs/events#using-context))

```js
     const scrollhandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            const diff = event.contentOffset.y - ctx.prevY;
            translateY.value = clamp(translateY.value + diff, 0, 70);

            FABwidth.value = event.contentOffset.y
    
        },
        onBeginDrag: (event, ctx) => {
            ctx.prevY = event.contentOffset.y;
        },

        
    })
```

If we change directions while scrolling without lifting our hand, the onBeginDrag event is not fired therefore lowerBound value is not changed so the Primary header component does not show. But if we lift our hand before changing direction, lowerbound value is changed because 'onBeginDrag' event is fired.

## Helpful videos and articles:




### Built With

* [React Native](https://reactnative.dev/)
* [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
* [Expo](https://docs.expo.dev/)



<!-- GETTING STARTED -->
## Getting Started
This app was build primarily with expo, it is an attempt to implement some of gmail's andriod app with react native. Animations are done with reanimated 2, to improve performance


### Prerequisites

You should have expo and react native cli installed globally
* npm
  ```sh
  npm install expo-cli -g 
  ```
  ```sh
  npm install react-native-cli -g 
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/uwemneku/Banking-App-Clone-react-native
   ```
2. Install NPM packages
   ```sh
   Yarn install
   ```
3. Start the app on expo
   ```sh
   expo start
   ```





4. Fork the Project
5. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
6. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the Branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Your Name - [uwemneku](https://twitter.com/uwemneku) - uwemneku@gmail.com










<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/uwemneku/Banking-App-Clone-react-native/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://www.linkedin.com/in/uwemisrael/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: screenshots/1.jpg
[product-screenshot1]: screenshots/2.jpg
