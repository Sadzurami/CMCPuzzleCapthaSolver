# CoinMarketCap Captcha Solver

A simple nodejs function for finding puzzle position in CMC captcha.

# How it works

The function is creating image with precomposed puzzle and background, and comparing this only with background image. It works in a cycle to find the best position with the smallest difference between comparable images.

## Features

-   Efficiency 97%
-   Elapsed time: ~ 1s

# Demo

![example1](./example1.png) ==> ![example2](./example2.png) ==> { x: 148, y: 32 }

Browser Automation Studio project demo is attached to this repository (demo.xml).

## Installation

```
git clone https://github.com/Sadzurami/CMCPuzzleCapthaSolver
cd ./CMCPuzzleCapthaSolver
npm install
```

# Requirements

-   NodeJS 12+

# Used

-   [jimp](https://www.npmjs.com/package/jimp)

# Suggestions

If you have any suggestions, please contact me:

-   Email: mail.to.sadzurami@gmail.com

Please don't spam me with questions.
